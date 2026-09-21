import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    default: "",
  },
  icon: {
    type: String,
    default: "📁",
  },
  color: {
    type: String,
    default: "sky",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  members: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      role: {
        type: String,
        enum: ["owner", "admin", "member", "viewer"],
        default: "member",
      },
      joinedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  invitations: [
    {
      email: {
        type: String,
        required: true,
      },
      role: {
        type: String,
        enum: ["admin", "member", "viewer"],
        default: "member",
      },
      status: {
        type: String,
        enum: ["pending", "accepted", "revoked"],
        default: "pending",
      },
      invitedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: null,
  },
});

const Project = mongoose.model("Project", projectSchema);
export default Project;
