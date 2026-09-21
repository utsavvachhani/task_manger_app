import mongoose from "mongoose";
import { Task as TaskDeclared } from "../utils/schema/index.js";

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: null,
  },
  status: {
    type: String,
    enum: TaskDeclared.statusBar,
    default: TaskDeclared.statusBar[0],
  },

  category: {
    type: String,
    enum: TaskDeclared.categoryBar,
    default: TaskDeclared.categoryBar[0],
  },

  priority: {
    type: String,
    enum: TaskDeclared.priorityBar,
    default: TaskDeclared.priorityBar[0],
  },

  phase: {
    type: String,
    enum: TaskDeclared.phaseBar,
    default: TaskDeclared.phaseBar[0],
  },

  expiredAt: {
    type: Date,
  },

  order: {
    type: Number,
    require: true,
    index: true,
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  dueDate: {
    type: Date,
    default: null,
  },
  tags: {
    type: [String],
    default: [],
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
});

const Task = mongoose.model("Task", taskSchema);

export default Task;
