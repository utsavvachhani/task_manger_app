import { MESSAGES } from "../utils/messages/index.js";
import { projectServices } from "../services/project.services.js";

export const projectController = {
  createProjectControoler: async (req, res) => {
    try {
      const data = await projectServices.createProjectService(
        req.body,
        req.userId,
      );
      return res
        .status(201)
        .json({ message: MESSAGES.PROJECT_CREATED, project: data });
    } catch (error) {
      console.log(error);
      return res.status(error.statusCode || 500).json({
        message: error.message || MESSAGES.SOMETHING_WRONG,
      });
    }
  },
  updateProjectController: async (req, res) => {
    try {
      const data = await projectServices.updateProjectService(
        req.body,
        req.params.id,
        req.userId,
      );
      return res.status(200).json({
        message: MESSAGES.PROJECT_UPDATED,
        project: data,
      });
    } catch (error) {
      console.log(error);
      return res.status(error.statusCode || 500).json({
        message: error.message || MESSAGES.SOMETHING_WRONG,
      });
    }
  },
  deleteProjectController: async (req, res) => {
    try {
      const data = await projectServices.deleteProjectService(
        req.params.id,
        req.userId,
      );
      return res
        .status(200)
        .json({ message: MESSAGES.deleteProject, project: data });
    } catch (error) {
      console.log(error);
      return res.status(error.statusCode || 500).json({
        message: error.message || MESSAGES.SOMETHING_WRONG,
      });
    }
  },
  fetchProjectController: async (req, res) => {
    try {
      const data = await projectServices.fetchProjectService(req.userId);
      return res
        .status(200)
        .json({ message: MESSAGES.FETCHED_SUCCESSFULY, project: data });
    } catch (error) {
      console.log(error);
      return res.status(error.statusCode || 500).json({
        message: error.message || MESSAGES.SOMETHING_WRONG,
      });
    }
  },

  // Collaboration: Invite member
  inviteMemberController: async (req, res) => {
    try {
      const data = await projectServices.inviteMemberService(
        req.params.id,
        req.body,
        req.userId
      );
      return res.status(200).json({
        message: "Collaborator successfully invited!",
        project: data,
      });
    } catch (error) {
      console.log(error);
      return res.status(error.statusCode || 500).json({
        message: error.message || MESSAGES.SOMETHING_WRONG,
      });
    }
  },

  // Collaboration: Remove member
  removeMemberController: async (req, res) => {
    try {
      const data = await projectServices.removeMemberService(
        req.params.id,
        req.params.memberId,
        req.userId
      );
      return res.status(200).json({
        message: "Member removed from project",
        project: data,
      });
    } catch (error) {
      console.log(error);
      return res.status(error.statusCode || 500).json({
        message: error.message || MESSAGES.SOMETHING_WRONG,
      });
    }
  },

  // Collaboration: Get members
  getMembersController: async (req, res) => {
    try {
      const data = await projectServices.getProjectMembersService(
        req.params.id,
        req.userId
      );
      return res.status(200).json({
        message: MESSAGES.FETCHED_SUCCESSFULY,
        data,
      });
    } catch (error) {
      console.log(error);
      return res.status(error.statusCode || 500).json({
        message: error.message || MESSAGES.SOMETHING_WRONG,
      });
    }
  },
};
