import mongoose from "mongoose";
import Task from "../modules/Task.modules.js";
import Project from "../modules/Project.modules.js";
import { TaskValidation } from "../validations/TaskValidation.js";
import { AuthValidation } from "../validations/AuthValidtion.js";
import AppError from "../utils/AppError.js";

// Helper to check if user has access to a project
const checkProjectAccess = async (projectId, userId) => {
  const project = await Project.findById(projectId);
  if (!project) throw new AppError("Project not found", 404);

  const isOwner = project.userId.toString() === userId.toString();
  const isMember = project.members?.some(
    (m) => m.user?.toString() === userId.toString()
  );

  if (!isOwner && !isMember) {
    throw new AppError("You do not have access to this project", 403);
  }

  return project;
};

export const taskServices = {
  createTaskService: async (data, userId) => {
    AuthValidation.userExists(userId);
    TaskValidation.notExistesData(data);
    const {
      title,
      desc,
      expiredAt,
      status,
      category,
      priority,
      phase,
      projectId,
      assignedTo,
      dueDate,
      tags,
    } = data;

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      throw new AppError("Invalid project ID", 400);
    }

    await checkProjectAccess(projectId, userId);

    const lastTask = await Task.findOne({ projectId }).sort({ order: 1 });
    const order = lastTask ? lastTask.order - 1000 : 100000;

    const newTask = await Task.create({
      title,
      desc,
      expiredAt: expiredAt || dueDate || null,
      dueDate: dueDate || expiredAt || null,
      status,
      category,
      priority,
      phase,
      tags: tags || [],
      assignedTo: assignedTo && mongoose.Types.ObjectId.isValid(assignedTo) ? assignedTo : null,
      userId,
      order,
      projectId: new mongoose.Types.ObjectId(projectId),
    });

    return await Task.findById(newTask._id)
      .populate("assignedTo", "firstName lastName email")
      .populate("userId", "firstName lastName email");
  },

  updateTaskService: async (data, _id, userId) => {
    TaskValidation.notExistesData(data);
    const existingTask = await Task.findById(_id);
    TaskValidation.taskExistes(existingTask);

    // Verify user is creator or member of project
    await checkProjectAccess(existingTask.projectId, userId);

    const {
      title,
      desc,
      status,
      category,
      priority,
      phase,
      expiredAt,
      dueDate,
      assignedTo,
      tags,
    } = data;

    const updateData = { updatedAt: new Date() };

    if (title) updateData.title = title;
    if (desc !== undefined) updateData.desc = desc;
    if (status) updateData.status = status;
    if (expiredAt !== undefined) updateData.expiredAt = expiredAt;
    if (dueDate !== undefined) updateData.dueDate = dueDate;
    if (category) updateData.category = category;
    if (priority) updateData.priority = priority;
    if (phase) updateData.phase = phase;
    if (tags !== undefined) updateData.tags = tags;
    if (assignedTo !== undefined) {
      updateData.assignedTo = assignedTo && mongoose.Types.ObjectId.isValid(assignedTo) ? assignedTo : null;
    }

    const updatedTask = await Task.findByIdAndUpdate(_id, updateData, {
      returnDocument: "after",
    })
      .populate("assignedTo", "firstName lastName email")
      .populate("userId", "firstName lastName email");

    return updatedTask;
  },

  deleteTaskService: async (_id, userId) => {
    const existingTask = await Task.findById(_id);
    TaskValidation.taskExistes(existingTask);

    await checkProjectAccess(existingTask.projectId, userId);

    await Task.deleteOne({ _id });
    return existingTask;
  },

  dargeAndDrop: async (data, userId) => {
    AuthValidation.userExists(userId);

    const { currentTaskId, prevTaskId, nextTaskId, newProjectId } = data;

    const currentTask = await Task.findById(currentTaskId);
    if (!currentTask) throw new AppError("Task not found", 404);

    // Verify access to both source and target projects
    await checkProjectAccess(currentTask.projectId, userId);
    if (newProjectId && newProjectId.toString() !== currentTask.projectId.toString()) {
      await checkProjectAccess(newProjectId, userId);
    }

    const nextTask = nextTaskId ? await Task.findById(nextTaskId) : null;
    const prevTask = prevTaskId ? await Task.findById(prevTaskId) : null;

    const pastProjectId = currentTask.projectId;
    let order;

    // CASE 1: only item
    if (!prevTask && !nextTask) {
      order = 100000;
    }
    // CASE 2: at bottom
    else if (prevTask && !nextTask) {
      order = prevTask.order - 1000;
    }
    // CASE 3: at top
    else if (!prevTask && nextTask) {
      order = nextTask.order + 1000;
    }
    // CASE 4: middle
    else {
      order = Math.floor((prevTask.order + nextTask.order) / 2);
    }

    currentTask.order = order;
    if (newProjectId) {
      currentTask.projectId = newProjectId;
    }

    await currentTask.save();

    return {
      currentTask: await Task.findById(currentTask._id)
        .populate("assignedTo", "firstName lastName email")
        .populate("userId", "firstName lastName email"),
      newProjectId,
      pastProjectId,
      order,
    };
  },
};
