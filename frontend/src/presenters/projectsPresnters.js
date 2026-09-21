import toast from "../utils/Toast";
import { MESSAGES } from "../utils/messages";
import { projectModules } from "../modules/projectModules";

export const projectsPresenters = {
  createProject: async (formData, projects, setProjects) => {
    try {
      const { data } = await projectModules.createProject(formData);
      setProjects((projects) => [data.project, ...projects]);
      toast.success(MESSAGES.PROJECT_ADD);
      return { success: true };
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || MESSAGES.SOMETHING_WRONG);
      return { success: false };
    }
  },

  updateProject: async (id, formData, projects, setProjects) => {
    try {
      const { data } = await projectModules.updateProject(id, formData);
      setProjects(
        projects.map((project) => {
          if (project._id !== data.project._id) return project;
          else {
            return {
              ...project,
              title: data.project.title,
              desc: data.project.desc,
              updateAt: data.project.updateAt,
            };
          }
        }),
      );
      toast.success(MESSAGES.PROJECT_UPDATED);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || MESSAGES.SOMETHING_WRONG);
      return { success: false };
    }
  },

  deleteProject: async (id, projects, setProjects) => {
    try {
      const { data } = await projectModules.deleteProject(id);
      setProjects(
        projects.filter((project) => project._id !== data.project._id),
      );
      toast.success(MESSAGES.PROECT_DELETE);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || MESSAGES.SOMETHING_WRONG);
      return { success: false };
    }
  },
  
  fetchProjects: async (shownToast, setProjects) => {
    try {
      const { data } = await projectModules.getProject();
      setProjects(data.project);
      if (shownToast) {
        toast.success(MESSAGES.FETCHED_SUCCESSFULY);
      }
      return { success: true };
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || MESSAGES.SOMETHING_WRONG);
      return { success: false };
    }
  },
  dargeAndDrop: async (dropData, projects, setProjects) => {
    try {
      const { data } = await projectModules.dargeAndDrop(dropData);
      
      // setProjects(
      //   projects.map((project) => {
      //     if (
      //       project._id !== data.newProjectId &&
      //       project._id !== data.pastProjectId
      //     )
      //       return project;
      //     if (
      //       project._id === data.newProjectId &&
      //       project._id === data.pastProjectId
      //     ) {
      //       return {
      //         ...project,
      //         tasks: tasks.map((task) => {
      //           if (task._id !== data.currentTask._id) return task;
      //           return { ...task, order: data.order };
      //         }),
      //       };
      //     }
      //     if (project._id === data.pastProjectId)
      //       return {
      //         ...project,
      //         tasks: tasks.filter((task) => task._id !== currentTask._id),
      //       };
      //     if (project._id === data.newProjectId)
      //       return { ...project, tasks: [...tasks, currentTask] };
      //   }),
      // );

      return { success: true };
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || MESSAGES.SOMETHING_WRONG);
      return { success: false };
    }
  },

  inviteMember: async (projectId, inviteData, setProjects) => {
    try {
      const { data } = await projectModules.inviteMember(projectId, inviteData);
      if (setProjects) {
        setProjects((projects) =>
          projects.map((p) => (p._id === projectId ? { ...p, ...data.project } : p))
        );
      }
      toast.success(data.message || "Invitation sent successfully!");
      return { success: true, project: data.project };
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || MESSAGES.SOMETHING_WRONG);
      return { success: false };
    }
  },

  removeMember: async (projectId, memberId, setProjects) => {
    try {
      const { data } = await projectModules.removeMember(projectId, memberId);
      if (setProjects) {
        setProjects((projects) =>
          projects.map((p) => (p._id === projectId ? { ...p, ...data.project } : p))
        );
      }
      toast.success(data.message || "Member removed successfully");
      return { success: true, project: data.project };
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || MESSAGES.SOMETHING_WRONG);
      return { success: false };
    }
  },

  getMembers: async (projectId) => {
    try {
      const { data } = await projectModules.getMembers(projectId);
      return { success: true, data: data.data };
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || MESSAGES.SOMETHING_WRONG);
      return { success: false };
    }
  },
};
