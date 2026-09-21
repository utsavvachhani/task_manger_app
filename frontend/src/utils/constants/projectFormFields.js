import { buttonVariants, buttonInputTypes } from "../schema";

export const projectFormFields = {
  addProjectFields: (editProjectId, project) => [
    {
      type: buttonInputTypes.TEXT,
      name: "title",
      placeholder: "Enter Title",
      value: editProjectId ? project.title : "",
      required: true,
    },
    {
      type: buttonInputTypes.TEXT,
      name: "desc",
      placeholder: "Enter Description",
      value: editProjectId ? project.desc : "",
      required: true,
    },
    {
      type: buttonInputTypes.SELECT,
      name: "icon",
      placeholder: "Select Project Icon",
      value: editProjectId ? project.icon || "📁" : "📁",
      options: ["📁", "🚀", "💡", "⚡", "🎨", "🛠️", "🎯", "🔥", "📊"],
    },
  ],
  addProjectButtons: (handleCancle, editProjectId) => [
    {
      type: buttonInputTypes.CANCLE,
      variant: buttonVariants.OUTLINE,
      label: "cancle",
      onClick: handleCancle,
    },
    {
      type: buttonInputTypes.SUBMIT,
      variant: buttonVariants.PRIMARY,
      label: `${editProjectId ? "Update" : "Add"} Project`,
    },
  ],
};
