import React, { useState } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import FolderSpecialIcon from "@mui/icons-material/FolderSpecial";
import AddIcon from "@mui/icons-material/Add";
import LayersIcon from "@mui/icons-material/Layers";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import UserAvatar from "../common/UserAvatar";

function NotionSidebar({
  projects = [],
  activeProjectId,
  onSelectProject,
  onAddProject,
  currentUser,
  isOpen,
  onToggle,
}) {
  const [search, setSearch] = useState("");

  const filteredProjects = projects.filter((p) =>
    p.title?.toLowerCase().includes(search.toLowerCase())
  );

  const totalTasksCount = projects.reduce(
    (acc, p) => acc + (p.tasks?.length || 0),
    0
  );

  return (
    <>
      {/* SIDEBAR CONTAINER */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-40 flex flex-col bg-(--bg-card) border-r border-(--border) transition-all duration-300 ${
          isOpen ? "w-64 translate-x-0" : "w-0 -translate-x-full md:w-16 md:translate-x-0"
        } overflow-hidden shrink-0 select-none`}
      >
        {/* TOP WORKSPACE BADGE */}
        <div className="h-16 flex items-center justify-between px-3.5 border-b border-(--border)">
          {isOpen ? (
            <div className="flex items-center gap-2.5 overflow-hidden">
              <UserAvatar user={currentUser} size="sm" />
              <div className="truncate">
                <h2 className="text-xs font-bold text-(--text-primary) truncate">
                  {currentUser?.firstName ? `${currentUser.firstName}'s Space` : "Workspace"}
                </h2>
                <p className="text-[10px] text-(--text-muted) truncate">{currentUser?.email}</p>
              </div>
            </div>
          ) : (
            <div className="mx-auto">
              <UserAvatar user={currentUser} size="sm" />
            </div>
          )}

          <button
            onClick={onToggle}
            className="p-1 rounded-lg text-(--text-muted) hover:text-(--text-primary) hover:bg-(--bg-secondary) transition cursor-pointer"
            title={isOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            {isOpen ? <ChevronLeftIcon className="!text-lg" /> : <ChevronRightIcon className="!text-lg" />}
          </button>
        </div>

        {/* SEARCH BAR (WHEN OPEN) */}
        {isOpen && (
          <div className="p-3 border-b border-(--border)">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Quick search project..."
              className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-(--border) bg-(--bg-secondary) text-(--text-primary) placeholder:text-(--text-muted) outline-none focus:border-sky-500"
            />
          </div>
        )}

        {/* PROJECTS DIRECTORY */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {/* ALL PROJECTS ITEM */}
          <button
            onClick={() => onSelectProject(null)}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
              activeProjectId === null
                ? "bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20"
                : "text-(--text-secondary) hover:bg-(--bg-secondary) hover:text-(--text-primary)"
            }`}
            title="All Projects Overview"
          >
            <LayersIcon className="!text-base shrink-0" />
            {isOpen && (
              <div className="flex-1 flex items-center justify-between truncate">
                <span className="truncate">All Projects</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-(--bg-secondary) text-(--text-muted)">
                  {totalTasksCount}
                </span>
              </div>
            )}
          </button>

          {/* PROJECT HEADER IN SIDEBAR */}
          {isOpen && (
            <div className="pt-3 pb-1 px-3 flex items-center justify-between text-[10px] font-bold tracking-wider uppercase text-(--text-muted)">
              <span>Projects ({projects.length})</span>
              <button
                onClick={onAddProject}
                className="hover:text-(--text-primary) cursor-pointer"
                title="Add New Project"
              >
                <AddIcon className="!text-sm" />
              </button>
            </div>
          )}

          {/* PROJECT ITEMS */}
          {filteredProjects.map((p) => {
            const isSelected = activeProjectId === p._id;
            const taskCount = p.tasks?.length || 0;
            const memberCount = (p.members?.length || 0) + 1;

            return (
              <button
                key={p._id}
                onClick={() => onSelectProject(p._id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition cursor-pointer ${
                  isSelected
                    ? "bg-sky-500/15 text-sky-600 dark:text-sky-400 font-bold border border-sky-500/20"
                    : "text-(--text-secondary) hover:bg-(--bg-secondary) hover:text-(--text-primary)"
                }`}
                title={`${p.title} (${taskCount} tasks)`}
              >
                <span className="text-base shrink-0 select-none">
                  {p.icon || "📁"}
                </span>

                {isOpen && (
                  <div className="flex-1 flex items-center justify-between truncate">
                    <span className="truncate">{p.title}</span>
                    <div className="flex items-center gap-1 shrink-0 ml-1">
                      {memberCount > 1 && (
                        <span
                          title={`${memberCount} collaborators`}
                          className="flex items-center text-[10px] text-indigo-500 font-bold"
                        >
                          <PeopleAltIcon className="!text-xs" />
                        </span>
                      )}
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-(--bg-secondary) text-(--text-muted)">
                        {taskCount}
                      </span>
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* BOTTOM QUICK ADD */}
        {isOpen && (
          <div className="p-3 border-t border-(--border)">
            <button
              onClick={onAddProject}
              className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold border border-dashed border-(--border) hover:border-sky-500/50 hover:bg-(--bg-secondary) text-(--text-secondary) hover:text-(--text-primary) transition cursor-pointer"
            >
              <AddIcon className="!text-sm text-sky-500" />
              <span>New Project</span>
            </button>
          </div>
        )}
      </aside>

      {/* MOBILE BACKDROP OVERLAY */}
      {isOpen && (
        <div
          onClick={onToggle}
          className="md:hidden fixed inset-0 z-30 bg-black/40 backdrop-blur-xs"
        />
      )}
    </>
  );
}

export default NotionSidebar;
