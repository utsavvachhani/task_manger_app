import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import { projectController } from "../controller/project.controller.js";

const router = express.Router();

router.post("/add", authMiddleware, projectController.createProjectControoler);
router.put(
  `/update/:id`,
  authMiddleware,
  projectController.updateProjectController,
);
router.delete(
  `/delete/:id`,
  authMiddleware,
  projectController.deleteProjectController,
);
router.get("/fetch", authMiddleware, projectController.fetchProjectController);

// Collaboration routes
router.post(
  "/:id/invite",
  authMiddleware,
  projectController.inviteMemberController,
);
router.delete(
  "/:id/members/:memberId",
  authMiddleware,
  projectController.removeMemberController,
);
router.get(
  "/:id/members",
  authMiddleware,
  projectController.getMembersController,
);

export default router;
