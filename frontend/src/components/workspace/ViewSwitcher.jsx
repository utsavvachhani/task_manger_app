import React from "react";
import ViewKanbanIcon from "@mui/icons-material/ViewKanban";
import TableChartIcon from "@mui/icons-material/TableChart";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import ShareIcon from "@mui/icons-material/Share";
import AddIcon from "@mui/icons-material/Add";

function ViewSwitcher({
  currentView,
  setCurrentView,
  filterAssignedToMe,
  setFilterAssignedToMe,
  activeProject,
  onOpenInvite,
  onAddTask,
  onAddProject,
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 py-3 px-4 bg-(--bg-card) border-b border-(--border)">
      {/* LEFT: VIEW SWITCHER (BOARD vs TABLE) */}
      <div className="flex items-center gap-1.5 p-1 rounded-xl bg-(--bg-secondary) border border-(--border)">
        <button
          onClick={() => setCurrentView("board")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
            currentView === "board"
              ? "bg-sky-500 text-white shadow-sm"
              : "text-(--text-secondary) hover:text-(--text-primary)"
          }`}
        >
          <ViewKanbanIcon className="!text-base" />
          <span>Board View</span>
        </button>

        <button
          onClick={() => setCurrentView("table")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
            currentView === "table"
              ? "bg-sky-500 text-white shadow-sm"
              : "text-(--text-secondary) hover:text-(--text-primary)"
          }`}
        >
          <TableChartIcon className="!text-base" />
          <span>Table View</span>
        </button>
      </div>

      {/* CENTER: ASSIGNED TO ME FILTER */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setFilterAssignedToMe(!filterAssignedToMe)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition cursor-pointer ${
            filterAssignedToMe
              ? "bg-sky-500/15 text-sky-600 dark:text-sky-400 border-sky-500/30"
              : "border-(--border) text-(--text-secondary) hover:text-(--text-primary)"
          }`}
        >
          {filterAssignedToMe ? <PersonIcon className="!text-base" /> : <GroupIcon className="!text-base" />}
          <span>{filterAssignedToMe ? "My Assigned Tasks Only" : "All Team Tasks"}</span>
        </button>
      </div>

      {/* RIGHT: QUICK ACTIONS */}
      <div className="flex items-center gap-2">
        {activeProject && (
          <button
            onClick={onOpenInvite}
            title="Invite Collaborators"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border border-(--border) hover:border-sky-500/50 hover:bg-(--bg-secondary) transition cursor-pointer text-(--text-primary)"
          >
            <ShareIcon className="!text-sm text-sky-500" />
            <span className="hidden sm:inline">Invite / Share</span>
          </button>
        )}

        <button
          onClick={onAddProject}
          className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold border border-(--border) hover:bg-(--bg-secondary) transition cursor-pointer text-(--text-primary)"
        >
          <AddIcon className="!text-sm" />
          <span>Project</span>
        </button>

        <button
          onClick={onAddTask}
          className="flex items-center gap-1 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-sky-500 hover:bg-sky-600 text-white shadow-sm transition cursor-pointer"
        >
          <AddIcon className="!text-sm" />
          <span>Task</span>
        </button>
      </div>
    </div>
  );
}

export default ViewSwitcher;
