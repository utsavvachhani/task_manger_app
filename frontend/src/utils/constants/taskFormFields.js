import { buttonVariants, TaskSchema, buttonInputTypes } from "../schema";

export const taskFormFields = {
  addTaskFields: (editTaskId, task, projectOptions, memberOptions = []) => [
    {
      type: buttonInputTypes.TEXT,
      name: "title",
      placeholder: "Enter Title",
      value: editTaskId ? task.title : "",
      required: true,
    },
    {
      type: buttonInputTypes.TEXT,
      name: "desc",
      placeholder: "Enter Description",
      value: editTaskId ? task.desc : "",
      required: true,
    },
    {
      type: buttonInputTypes.SELECT,
      name: "projectId",
      placeholder: "select the project",
      value: editTaskId ? (task.projectId?._id || task.projectId) : "",
      options: projectOptions,
    },
    {
      type: buttonInputTypes.SELECT,
      name: "assignedTo",
      placeholder: "Assign to (Optional)",
      value: editTaskId ? (task.assignedTo?._id || task.assignedTo || "") : "",
      options: [
        { label: "Unassigned", value: "" },
        ...(memberOptions || []),
      ],
    },
    {
      type: buttonInputTypes.SELECT,
      name: "status",
      placeholder: "select the status",
      value: editTaskId ? task.status : "",
      options: TaskSchema.statusBar,
    },
    {
      type: buttonInputTypes.SELECT,
      name: "category",
      placeholder: "select the category",
      value: editTaskId ? task.category : "",
      options: TaskSchema.categoryBar,
    },
    {
      type: buttonInputTypes.SELECT,
      name: "priority",
      placeholder: "select the priority",
      value: editTaskId ? task.priority : "",
      options: TaskSchema.priorityBar,
    },
    {
      type: buttonInputTypes.SELECT,
      name: "phase",
      placeholder: "select the phase",
      value: editTaskId ? task.phase : "",
      options: TaskSchema.phaseBar,
    },
    {
      type: buttonInputTypes.DATETIME_LOCAL,
      name: "expiredAt",
      value: editTaskId ? task.expiredAt : "",
      placeholder: "select the date & time",
    },
  ],
  addTaskButtons: (handleCancle, editTaskId) => [
    {
      type: buttonInputTypes.CANCLE,
      variant: buttonVariants.OUTLINE,
      label: "cancle",
      onClick: handleCancle,
    },
    {
      type: buttonInputTypes.SUBMIT,
      variant: buttonVariants.PRIMARY,
      label: `${editTaskId ? "Update" : "Add"} Task`,
    },
  ],
  fillterTaskFields: [
    {
      type: buttonInputTypes.SELECT,
      name: "status",
      placeholder: "select the status",
      value: "",
      options: TaskSchema.statusBar,
    },
    {
      type: buttonInputTypes.SELECT,
      name: "category",
      placeholder: "select the category",
      value: "",
      options: TaskSchema.categoryBar,
    },
    {
      type: buttonInputTypes.SELECT,
      name: "priority",
      placeholder: "select the priority",
      value: "",
      options: TaskSchema.priorityBar,
    },
    {
      type: buttonInputTypes.SELECT,
      name: "phase",
      placeholder: "select the phase",
      value: "",
      options: TaskSchema.phaseBar,
    },
  ],
};
