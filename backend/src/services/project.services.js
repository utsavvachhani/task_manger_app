import Project from "../modules/Project.modules.js";
import Task from "../modules/Task.modules.js";
import User from "../modules/User.modules.js";
import { AuthValidation } from "../validations/AuthValidtion.js";
import { ProjectValidation } from "../validations/ProjectValidation.js";
import AppError from "../utils/AppError.js";

export const projectServices = {
  createProjectService: async (data, userId) => {
    AuthValidation.userExists(userId);
    ProjectValidation.notExistesData(data);
    const { title, desc, icon, color } = data;

    const newProject = await Project.create({
      title,
      desc: desc || "",
      icon: icon || "📁",
      color: color || "sky",
      userId,
      members: [
        {
          user: userId,
          role: "owner",
          joinedAt: new Date(),
        },
      ],
    });

    return await Project.findById(newProject._id)
      .populate("userId", "firstName lastName email")
      .populate("members.user", "firstName lastName email");
  },

  updateProjectService: async (data, _id, userId) => {
    AuthValidation.userExists(userId);
    ProjectValidation.notExistesData(data);

    const existingProject = await Project.findById(_id);
    ProjectValidation.projectExists(existingProject);

    // Allow owner or admin member
    const isOwner = existingProject.userId.toString() === userId.toString();
    const isAdmin = existingProject.members?.some(
      (m) => m.user?.toString() === userId.toString() && (m.role === "admin" || m.role === "owner")
    );

    if (!isOwner && !isAdmin) {
      throw new AppError("Access denied: only project owners or admins can edit project details", 403);
    }

    const { title, desc, icon, color } = data;
    const updateData = { updatedAt: new Date() };

    if (title) updateData.title = title;
    if (desc !== undefined) updateData.desc = desc;
    if (icon) updateData.icon = icon;
    if (color) updateData.color = color;

    const updatedProject = await Project.findByIdAndUpdate(_id, updateData, {
      returnDocument: "after",
    })
      .populate("userId", "firstName lastName email")
      .populate("members.user", "firstName lastName email");

    return updatedProject;
  },

  deleteProjectService: async (_id, userId) => {
    const existingProject = await Project.findById(_id);
    ProjectValidation.projectExists(existingProject);
    AuthValidation.accessChecking(existingProject.userId, userId);

    await Project.deleteOne({ _id });
    await Task.deleteMany({ projectId: _id });
    return existingProject;
  },

  fetchProjectService: async (userId) => {
    AuthValidation.userExists(userId);

    // Fetch projects where user is owner OR member
    const allProjects = await Project.find({
      $or: [{ userId: userId }, { "members.user": userId }],
    })
      .populate("userId", "firstName lastName email")
      .populate("members.user", "firstName lastName email")
      .sort({ createdAt: -1 });

    const projectIds = allProjects.map((p) => p._id);

    // Fetch all tasks for visible projects, populating assigned user
    const allTasks = await Task.find({ projectId: { $in: projectIds } })
      .populate("assignedTo", "firstName lastName email")
      .populate("userId", "firstName lastName email")
      .sort({ order: 1 });

    const projectsDetails = allProjects.map((project) => {
      const projectTasks = allTasks.filter(
        (task) => task.projectId.toString() === project._id.toString()
      );

      return {
        _id: project._id,
        title: project.title,
        desc: project.desc,
        icon: project.icon || "📁",
        color: project.color || "sky",
        userId: project.userId,
        members: project.members || [],
        invitations: project.invitations || [],
        createdAt: project.createdAt,
        updatedAt: project.updatedAt,
        tasks: projectTasks,
      };
    });

    return projectsDetails;
  },

  // COLLABORATION: Invite member by email
  inviteMemberService: async (projectId, { email, role = "member" }, currentUserId) => {
    AuthValidation.userExists(currentUserId);
    if (!email) throw new AppError("Collaborator email is required", 400);

    const project = await Project.findById(projectId);
    ProjectValidation.projectExists(project);

    // Check permissions
    const isOwner = project.userId.toString() === currentUserId.toString();
    const isAdmin = project.members?.some(
      (m) => m.user?.toString() === currentUserId.toString() && (m.role === "admin" || m.role === "owner")
    );

    if (!isOwner && !isAdmin) {
      throw new AppError("Only project owner or admins can invite collaborators", 403);
    }

    const normalizedEmail = email.trim().toLowerCase();
    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      // Check if already member
      const alreadyMember = project.members.some(
        (m) => m.user?.toString() === existingUser._id.toString()
      );

      if (alreadyMember) {
        throw new AppError("This user is already a member of the project", 400);
      }

      project.members.push({
        user: existingUser._id,
        role: role || "member",
        joinedAt: new Date(),
      });
    } else {
      // Check if already invited
      const alreadyInvited = project.invitations.some(
        (inv) => inv.email.toLowerCase() === normalizedEmail && inv.status === "pending"
      );

      if (alreadyInvited) {
        throw new AppError("An invitation is already pending for this email", 400);
      }

      project.invitations.push({
        email: normalizedEmail,
        role: role || "member",
        status: "pending",
        invitedBy: currentUserId,
        createdAt: new Date(),
      });
    }

    await project.save();

    return await Project.findById(projectId)
      .populate("userId", "firstName lastName email")
      .populate("members.user", "firstName lastName email");
  },

  // COLLABORATION: Remove member
  removeMemberService: async (projectId, memberUserId, currentUserId) => {
    AuthValidation.userExists(currentUserId);
    const project = await Project.findById(projectId);
    ProjectValidation.projectExists(project);

    const isOwner = project.userId.toString() === currentUserId.toString();
    if (!isOwner && currentUserId.toString() !== memberUserId.toString()) {
      throw new AppError("Only project owner can remove members (or member can leave)", 403);
    }

    if (project.userId.toString() === memberUserId.toString()) {
      throw new AppError("Project owner cannot be removed from their own project", 400);
    }

    project.members = project.members.filter(
      (m) => m.user?.toString() !== memberUserId.toString()
    );

    await project.save();

    return await Project.findById(projectId)
      .populate("userId", "firstName lastName email")
      .populate("members.user", "firstName lastName email");
  },

  // COLLABORATION: Get members
  getProjectMembersService: async (projectId, currentUserId) => {
    AuthValidation.userExists(currentUserId);
    const project = await Project.findById(projectId)
      .populate("userId", "firstName lastName email")
      .populate("members.user", "firstName lastName email")
      .populate("invitations.invitedBy", "firstName lastName email");

    ProjectValidation.projectExists(project);

    return {
      owner: project.userId,
      members: project.members,
      invitations: project.invitations,
    };
  },
};
