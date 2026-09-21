import VisibilityIcon from "@mui/icons-material/Visibility";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Button from "../../Button";
import UserAvatar from "../../common/UserAvatar";
import { getTaskSchemaColor } from "../../../utils/schema";

function TaskCardSub({ task, onOpen }) {
  const isExpired = task.expiredAt && new Date(task.expiredAt) < new Date();
  const dueDate = task.expiredAt || task.dueDate;

  return (
    <div
      className={`
        rounded-xl flex flex-col gap-3 border transition-all duration-300
        hover:shadow-lg 
        ${isExpired ? "border-red-500" : "border-(--border)"}
      `}
      style={{
        backgroundColor: "var(--bg-card)",
        color: "var(--text-primary)",
      }}
    >
      <div className="p-4 min-h-36 flex flex-col justify-between gap-3 bg-(--bg-primary) rounded-xl">
        <div className="flex justify-between items-start gap-2">
          <div className="flex-1 min-w-0">
            <h2 className="font-semibold text-sm sm:text-base wrap-break-word">
              {task.title}
            </h2>

            {task.desc && (
              <p className="text-xs text-(--text-secondary) line-clamp-2 mt-0.5">
                {task.desc}
              </p>
            )}
          </div>

          <Button
            variant="other"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              onOpen(task);
            }}
            className="p-1 rounded hover:bg-(--bg-secondary)"
          >
            <VisibilityIcon fontSize="small" />
          </Button>
        </div>

        {/* PILLS */}
        <div className="flex flex-wrap gap-1 text-xs">
          <span
            className={`px-2 py-0.5 text-[10px] font-semibold text-white rounded capitalize ${getTaskSchemaColor(
              "statusBar",
              task.status,
            )}`}
          >
            {task.status}
          </span>

          <span
            className={`px-2 py-0.5 text-[10px] font-semibold text-white rounded capitalize ${getTaskSchemaColor(
              "priorityBar",
              task.priority,
            )}`}
          >
            {task.priority}
          </span>

          {task.category && (
            <span
              className={`px-2 py-0.5 text-[10px] font-medium rounded capitalize ${getTaskSchemaColor(
                "categoryBar",
                task.category,
              )}`}
            >
              {task.category}
            </span>
          )}
        </div>

        {/* FOOTER: ASSIGNEE & DUE DATE */}
        <div className="flex items-center justify-between pt-2 border-t border-(--border) text-[11px] text-(--text-muted)">
          {dueDate ? (
            <div className={`flex items-center gap-1 ${isExpired ? "text-red-500 font-semibold" : ""}`}>
              <AccessTimeIcon className="!text-xs" />
              <span>
                {new Date(dueDate).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
          ) : (
            <span />
          )}

          {task.assignedTo ? (
            <div className="flex items-center gap-1.5" title={`Assigned to ${task.assignedTo.firstName || task.assignedTo.email}`}>
              <UserAvatar user={task.assignedTo} size="xs" />
              <span className="text-[11px] font-medium text-(--text-secondary) max-w-[80px] truncate">
                {task.assignedTo.firstName || "Assigned"}
              </span>
            </div>
          ) : (
            <span className="text-[10px] italic text-(--text-muted)">Unassigned</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default TaskCardSub;
