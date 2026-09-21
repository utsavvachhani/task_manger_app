import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import UserAvatar from "../../common/UserAvatar";
import { TaskSchema } from "../../../utils/schema";

const PRIORITY_STYLES = {
  low: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  medium: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20",
  high: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  urgent: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
};

const STATUS_STYLES = {
  pending: "bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20",
  inprogress: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  reviewing: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
  completed: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  rejected: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
  onhold: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  blocked: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
};

function NotionTableView({
  tasks = [],
  projects = [],
  onEditTask,
  onDeleteTask,
  onUpdateTaskProperty,
  onAddTask,
}) {
  const getProjectForTask = (task) => {
    const pId = task.projectId?._id || task.projectId;
    return projects.find((p) => String(p._id) === String(pId));
  };

  const getAvailableMembers = (task) => {
    const project = getProjectForTask(task);
    if (!project) return [];
    const members = [];
    if (project.userId) members.push(project.userId);
    if (project.members) {
      project.members.forEach((m) => {
        if (m.user && !members.some((u) => u._id === m.user._id)) {
          members.push(m.user);
        }
      });
    }
    return members;
  };

  if (!tasks || tasks.length === 0) {
    return (
      <div className="rounded-2xl border border-(--border) bg-(--bg-card) p-12 text-center my-6">
        <p className="text-sm text-(--text-muted)">No tasks found in this view.</p>
        <button
          onClick={onAddTask}
          className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-sky-500 hover:bg-sky-600 text-white transition shadow-sm cursor-pointer"
        >
          <AddIcon className="!text-sm" />
          <span>Add New Task</span>
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-(--border) bg-(--bg-card) overflow-hidden shadow-sm my-4">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-(--border) bg-(--bg-secondary)/50 font-bold uppercase tracking-wider text-[11px] text-(--text-muted)">
              <th className="py-3 px-4 min-w-[200px]">Task Title</th>
              <th className="py-3 px-4 min-w-[140px]">Project</th>
              <th className="py-3 px-4 min-w-[130px]">Status</th>
              <th className="py-3 px-4 min-w-[110px]">Priority</th>
              <th className="py-3 px-4 min-w-[140px]">Assignee</th>
              <th className="py-3 px-4 min-w-[110px]">Phase</th>
              <th className="py-3 px-4 min-w-[110px]">Due Date</th>
              <th className="py-3 px-4 text-right min-w-[80px]">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-(--border)">
            {tasks.map((task) => {
              const project = getProjectForTask(task);
              const members = getAvailableMembers(task);
              const priority = task.priority?.toLowerCase() || "low";
              const status = task.status?.toLowerCase() || "pending";

              return (
                <tr
                  key={task._id}
                  className="hover:bg-(--bg-secondary)/30 transition group"
                >
                  {/* TITLE & DESCRIPTION */}
                  <td className="py-3 px-4">
                    <div className="font-semibold text-sm text-(--text-primary) hover:text-sky-500 transition cursor-pointer" onClick={() => onEditTask(task)}>
                      {task.title}
                    </div>
                    {task.desc && (
                      <p className="text-[11px] text-(--text-muted) truncate max-w-xs mt-0.5">
                        {task.desc}
                      </p>
                    )}
                  </td>

                  {/* PROJECT TAG */}
                  <td className="py-3 px-4">
                    {project ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-(--bg-secondary) border border-(--border) font-medium text-xs text-(--text-primary)">
                        <span>{project.icon || "📁"}</span>
                        <span className="truncate max-w-[110px]">{project.title}</span>
                      </span>
                    ) : (
                      <span className="text-(--text-muted)">-</span>
                    )}
                  </td>

                  {/* STATUS DROPDOWN */}
                  <td className="py-3 px-4">
                    <select
                      value={task.status}
                      onChange={(e) =>
                        onUpdateTaskProperty(task._id, { status: e.target.value })
                      }
                      className={`px-2 py-1 rounded-md text-[11px] font-semibold border outline-none cursor-pointer capitalize ${
                        STATUS_STYLES[status] || "bg-(--bg-secondary)"
                      }`}
                    >
                      {TaskSchema.statusBar.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </td>

                  {/* PRIORITY DROPDOWN */}
                  <td className="py-3 px-4">
                    <select
                      value={task.priority}
                      onChange={(e) =>
                        onUpdateTaskProperty(task._id, { priority: e.target.value })
                      }
                      className={`px-2 py-1 rounded-md text-[11px] font-semibold border outline-none cursor-pointer capitalize ${
                        PRIORITY_STYLES[priority] || "bg-(--bg-secondary)"
                      }`}
                    >
                      {TaskSchema.priorityBar.map((pr) => (
                        <option key={pr} value={pr}>
                          {pr}
                        </option>
                      ))}
                    </select>
                  </td>

                  {/* ASSIGNEE */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <select
                        value={task.assignedTo?._id || task.assignedTo || ""}
                        onChange={(e) =>
                          onUpdateTaskProperty(task._id, {
                            assignedTo: e.target.value || null,
                          })
                        }
                        className="px-2 py-1 text-xs rounded-lg border border-(--border) bg-(--bg-secondary) text-(--text-primary) outline-none cursor-pointer"
                      >
                        <option value="">Unassigned</option>
                        {members.map((m) => (
                          <option key={m._id} value={m._id}>
                            {m.firstName ? `${m.firstName} ${m.lastName || ""}` : m.email}
                          </option>
                        ))}
                      </select>
                      {task.assignedTo && (
                        <UserAvatar user={task.assignedTo} size="xs" />
                      )}
                    </div>
                  </td>

                  {/* PHASE */}
                  <td className="py-3 px-4">
                    <span className="text-[11px] font-medium text-(--text-secondary) capitalize">
                      {task.phase || "planning"}
                    </span>
                  </td>

                  {/* DUE DATE */}
                  <td className="py-3 px-4">
                    {task.expiredAt || task.dueDate ? (
                      <span className="inline-flex items-center gap-1 text-[11px] text-(--text-muted)">
                        <AccessTimeIcon className="!text-xs" />
                        <span>
                          {new Date(task.expiredAt || task.dueDate).toLocaleDateString(undefined, {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </span>
                    ) : (
                      <span className="text-(--text-muted)">-</span>
                    )}
                  </td>

                  {/* ACTIONS */}
                  <td className="py-3 px-4 text-right">
                    <div className="inline-flex items-center gap-1 opacity-80 group-hover:opacity-100 transition">
                      <button
                        onClick={() => onEditTask(task)}
                        title="Edit task"
                        className="p-1 rounded-md text-(--text-secondary) hover:text-sky-500 hover:bg-(--bg-secondary) transition cursor-pointer"
                      >
                        <EditIcon className="!text-sm" />
                      </button>
                      <button
                        onClick={() => onDeleteTask(task._id)}
                        title="Delete task"
                        className="p-1 rounded-md text-(--text-secondary) hover:text-rose-500 hover:bg-rose-500/10 transition cursor-pointer"
                      >
                        <DeleteOutlineIcon className="!text-sm" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* QUICK ADD ROW */}
      <div className="p-3 bg-(--bg-secondary)/30 border-t border-(--border)">
        <button
          onClick={onAddTask}
          className="flex items-center gap-1 text-xs font-semibold text-sky-500 hover:text-sky-600 transition cursor-pointer px-2 py-1 rounded-lg hover:bg-(--bg-secondary)"
        >
          <AddIcon className="!text-sm" />
          <span>New Task</span>
        </button>
      </div>
    </div>
  );
}

export default NotionTableView;
