import { useContext, useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { ProjectContext } from "../context/projectCntext";
import { projectsPresenters } from "../presenters/projectsPresnters";
import { taskPresenters } from "../presenters/taskPresenters";
import Button from "../components/Button";
import TaskNavabar from "../components/tasks/TaskNavabar";
import AddEntityForm from "../components/tasks/AddEntityForm";
import TaskShownComponents from "../components/tasks/kanban/TaskShownComponents";
import NotionSidebar from "../components/workspace/NotionSidebar";
import ViewSwitcher from "../components/workspace/ViewSwitcher";
import NotionTableView from "../components/tasks/table/NotionTableView";
import InviteMemberModal from "../components/workspace/InviteMemberModal";
import { buttonVariants } from "../utils/schema";
import { SIGNIN } from "../utils/route";
import { taskFormFields } from "../utils/constants/taskFormFields";
import { projectFormFields } from "../utils/constants/projectFormFields";

function DashboardPage() {
  const navigate = useNavigate();

  const { authData } = useContext(AuthContext);
  const { projects, tasks, setProjects } = useContext(ProjectContext);

  // Notion-style UI states
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentView, setCurrentView] = useState("board"); // "board" | "table"
  const [activeProjectId, setActiveProjectId] = useState(null); // null means "All Projects"
  const [filterAssignedToMe, setFilterAssignedToMe] = useState(false);
  const [openInviteModal, setOpenInviteModal] = useState(false);

  // Modals & Entity Forms
  const [openAddMenu, setOpenAddMenu] = useState(false);
  const [addProject, setAddProject] = useState(false);
  const [editTaskId, setEditTaskId] = useState(false);
  const [editProjectId, setEditProjectId] = useState(false);

  const [project, setProject] = useState({});
  const [task, setTask] = useState({});
  const [navbarFilteredTasks, setNavbarFilteredTasks] = useState(tasks);

  useEffect(() => {
    setNavbarFilteredTasks(tasks);
  }, [tasks]);

  // Project options for dropdowns
  const projectOptions = useMemo(() => {
    return projects.map((p) => ({ label: `${p.icon || "📁"} ${p.title}`, value: p._id }));
  }, [projects]);

  // Active Project object
  const activeProject = useMemo(() => {
    if (!activeProjectId) return projects[0] || null;
    return projects.find((p) => p._id === activeProjectId) || null;
  }, [projects, activeProjectId]);

  // Collect all project members across current scope for task assignment dropdown
  const memberOptions = useMemo(() => {
    const memberMap = new Map();

    const targetProjects = activeProjectId
      ? projects.filter((p) => p._id === activeProjectId)
      : projects;

    targetProjects.forEach((proj) => {
      if (proj.userId) {
        const u = proj.userId;
        const uid = u._id || u;
        if (!memberMap.has(String(uid))) {
          memberMap.set(String(uid), {
            label: u.firstName ? `${u.firstName} ${u.lastName || ""} (Owner)` : "Project Owner",
            value: String(uid),
          });
        }
      }
      if (proj.members) {
        proj.members.forEach((m) => {
          if (m.user) {
            const u = m.user;
            const uid = u._id || u;
            if (!memberMap.has(String(uid))) {
              memberMap.set(String(uid), {
                label: u.firstName
                  ? `${u.firstName} ${u.lastName || ""} (${m.role || "Member"})`
                  : u.email || "Collaborator",
                value: String(uid),
              });
            }
          }
        });
      }
    });

    return Array.from(memberMap.values());
  }, [projects, activeProjectId]);

  // Effective projects displayed in board
  const displayedProjects = useMemo(() => {
    if (!activeProjectId) return projects;
    return projects.filter((p) => p._id === activeProjectId);
  }, [projects, activeProjectId]);

  // Effective tasks displayed after combining Navbar search, Project scope, and Assigned-To-Me filters
  const displayedTasks = useMemo(() => {
    let result = navbarFilteredTasks || [];

    // Filter by active project if selected
    if (activeProjectId) {
      result = result.filter(
        (t) => String(t.projectId?._id || t.projectId) === String(activeProjectId)
      );
    }

    // Filter by assigned to me
    if (filterAssignedToMe && authData) {
      const myId = String(authData._id || authData.id);
      result = result.filter(
        (t) => String(t.assignedTo?._id || t.assignedTo) === myId
      );
    }

    return result;
  }, [navbarFilteredTasks, activeProjectId, filterAssignedToMe, authData]);

  // Handlers for Add/Edit
  const handleProjectAdd = () => {
    setOpenAddMenu(true);
    setAddProject(true);
  };

  const handleTaskAdd = () => {
    setOpenAddMenu(true);
    setAddProject(false);
    setEditTaskId(false);
    setTask({
      projectId: activeProjectId || (projects[0]?._id ?? ""),
    });
  };

  const handleCancle = () => {
    setOpenAddMenu(false);
    setAddProject(false);
    setEditTaskId(false);
    setEditProjectId(false);
    setTask({});
    setProject({});
  };

  const handleTaskSubmit = (formData) => {
    if (editTaskId) {
      taskPresenters.updatetask(editTaskId, formData, projects, setProjects);
      setEditTaskId(false);
      setTask({});
      setOpenAddMenu(false);
    } else {
      taskPresenters.createTask(formData, projects, setProjects);
      setOpenAddMenu(false);
      setAddProject(false);
      setProject({});
      setTask({});
    }
  };

  const handleEditTask = (taskData) => {
    setEditTaskId(taskData._id);
    setTask(taskData);
    setAddProject(false);
    setOpenAddMenu(true);
  };

  const handleEditProject = (projectData) => {
    setEditProjectId(projectData._id);
    setProject(projectData);
    setAddProject(true);
    setOpenAddMenu(true);
  };

  const handleProjectSubmit = (formData) => {
    if (editProjectId) {
      projectsPresenters.updateProject(
        editProjectId,
        formData,
        projects,
        setProjects
      );
      setAddProject(false);
      setProject({});
      setEditProjectId(null);
      setOpenAddMenu(false);
    } else {
      projectsPresenters.createProject(formData, projects, setProjects);
      setAddProject(false);
      setOpenAddMenu(false);
      setProject({});
    }
  };

  const handleDeleteTask = (id) => {
    taskPresenters.deletetask(id, projects, setProjects);
  };

  const handleShowProject = (id) => {
    setActiveProjectId(id);
  };

  const handleDragTask = (dropData) => {
    projectsPresenters.dargeAndDrop(dropData, projects, setProjects);
  };

  // Inline fast update from Table View
  const handleUpdateTaskProperty = (taskId, patchData) => {
    taskPresenters.updatetask(taskId, patchData, projects, setProjects);
  };

  if (!authData) {
    return (
      <div className="flex justify-center items-center p-4 min-h-screen bg-(--bg)">
        <Button
          variant={buttonVariants.PRIMARY}
          onClick={() => navigate(SIGNIN)}
        >
          First Login Your Self.
        </Button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-(--bg) text-(--text-primary)">
      {/* NOTION-STYLE COLLAPSIBLE SIDEBAR */}
      <NotionSidebar
        projects={projects}
        activeProjectId={activeProjectId}
        onSelectProject={setActiveProjectId}
        onAddProject={handleProjectAdd}
        currentUser={authData}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* MAIN WORKSPACE CONTENT */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        {/* TOP SEARCH & FILTER BAR */}
        <TaskNavabar
          handleProjectAdd={handleProjectAdd}
          handleTaskAdd={handleTaskAdd}
          tasks={tasks}
          setFilterTask={setNavbarFilteredTasks}
        />

        {/* VIEW SWITCHER & WORKSPACE ACTIONS */}
        <ViewSwitcher
          currentView={currentView}
          setCurrentView={setCurrentView}
          filterAssignedToMe={filterAssignedToMe}
          setFilterAssignedToMe={setFilterAssignedToMe}
          activeProject={activeProject}
          onOpenInvite={() => setOpenInviteModal(true)}
          onAddTask={handleTaskAdd}
          onAddProject={handleProjectAdd}
        />

        {/* WORKSPACE VIEW AREA */}
        <div className="flex-1 p-3 sm:p-5 overflow-y-auto">
          {/* ACTIVE PROJECT HEADER INFO */}
          {activeProjectId && activeProject && (
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl border border-(--border) bg-(--bg-card)">
              <div className="flex items-center gap-3">
                <span className="text-3xl select-none">{activeProject.icon || "📁"}</span>
                <div>
                  <h1 className="text-xl sm:text-2xl font-extrabold text-(--text-primary)">
                    {activeProject.title}
                  </h1>
                  {activeProject.desc && (
                    <p className="text-xs text-(--text-secondary) mt-0.5 max-w-xl">
                      {activeProject.desc}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs px-2.5 py-1 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 font-semibold">
                  {(activeProject.members?.length || 0) + 1} Member(s)
                </span>
                <button
                  onClick={() => setOpenInviteModal(true)}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-sky-500 hover:bg-sky-600 text-white shadow-sm cursor-pointer transition"
                >
                  Share & Invite
                </button>
              </div>
            </div>
          )}

          {/* VIEW RENDERER */}
          {currentView === "board" ? (
            <div className="mt-2">
              <TaskShownComponents
                task={displayedTasks}
                project={displayedProjects}
                handleDragTask={handleDragTask}
                handleDeleteTask={handleDeleteTask}
                handleEditTask={handleEditTask}
                handleEditProject={handleEditProject}
                handleShowProject={handleShowProject}
              />
            </div>
          ) : (
            <div className="mt-2">
              <NotionTableView
                tasks={displayedTasks}
                projects={projects}
                onEditTask={handleEditTask}
                onDeleteTask={handleDeleteTask}
                onUpdateTaskProperty={handleUpdateTaskProperty}
                onAddTask={handleTaskAdd}
              />
            </div>
          )}
        </div>
      </div>

      {/* SHARE / INVITE MODAL */}
      {openInviteModal && activeProject && (
        <InviteMemberModal
          project={activeProject}
          currentUserId={authData._id || authData.id}
          setProjects={setProjects}
          onClose={() => setOpenInviteModal(false)}
        />
      )}

      {/* ADD / EDIT MODAL */}
      {openAddMenu &&
        (addProject ? (
          <AddEntityForm
            handleSubmit={handleProjectSubmit}
            editEntityId={editProjectId}
            handleCancle={handleCancle}
            entity={project}
            formDataFields={projectFormFields.addProjectFields(
              editProjectId,
              project
            )}
            formDataButtons={projectFormFields.addProjectButtons}
          />
        ) : (
          <AddEntityForm
            handleSubmit={handleTaskSubmit}
            editEntityId={editTaskId}
            handleCancle={handleCancle}
            entity={task}
            formDataFields={taskFormFields.addTaskFields(
              editTaskId,
              task,
              projectOptions,
              memberOptions
            )}
            formDataButtons={taskFormFields.addTaskButtons}
          />
        ))}
    </div>
  );
}

export default DashboardPage;
