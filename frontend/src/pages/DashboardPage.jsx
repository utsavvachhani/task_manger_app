import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { ProjectContext } from "../context/projectCntext";
import { projectsPresenters } from "../presenters/projectsPresnters";
import { taskPresenters } from "../presenters/taskPresenters";
import Button from "../components/Button";
import TaskNavabar from "../components/tasks/TaskNavabar";
import AddEntityForm from "../components/tasks/AddEntityForm";
import TaskShownComponents from "../components/tasks/kanban/TaskShownComponents";
import { buttonVariants } from "../utils/schema";
import { SIGNIN } from "../utils/route";
import { taskFormFields } from "../utils/constants/taskFormFields";
import { projectFormFields } from "../utils/constants/projectFormFields";

function DashboardPage() {
  const navigate = useNavigate();

  const { authData } = useContext(AuthContext);
  const { projects, tasks, setProjects } = useContext(ProjectContext);

  const [openAddMenu, setOpenAddMenu] = useState(false);
  const [addProject, setAddProject] = useState(false);
  const [editTaskId, setEditTaskId] = useState(false);
  const [editProjectId, setEditProjectId] = useState(false);

  const [project, setProject] = useState({});
  const [task, setTask] = useState({});
  const [projectOptions, setProjectOptions] = useState({});
  const [filterTask, setFilterTask] = useState(tasks);

  useEffect(() => setFilterTask(tasks), [tasks]);

  useEffect(() => {
    setProjectOptions(
      projects.map((project) => ({ label: project.title, value: project._id })),
    );
  }, [projects]);

  const handleProjectAdd = () => {
    setOpenAddMenu(true);
    setAddProject(true);
  };

  const handleTaskAdd = () => {
    setOpenAddMenu(true);
    setAddProject(false);
    setEditTaskId(false);
  };

  const handleCancle = () => {
    setOpenAddMenu(false);
    setAddProject(false);
    setEditTaskId(false);
    setEditProjectId(false);
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
    }
  };

  const handleEditTask = (task) => {
    setEditTaskId(task._id);
    setTask(task);
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
        setProjects,
      );
      setAddProject(false);
      setProject({});
      setEditProjectId(null);
      setOpenAddMenu(false);
    } else {
      projectsPresenters.createProject(formData, projects, setProjects);
      setAddProject(false);
      setOpenAddMenu(false);
    }
  };

  const handleDeleteTask = (id) => {
    taskPresenters.deletetask(id, projects, setProjects);
  };

  const handleShowProject = (id) => {
    navigate(`/project/${id}`);
  };

  const handleDragTask = (dropData) => {
    projectsPresenters.dargeAndDrop(dropData, projects, setProjects);
  };

  if (!authData) {
    return (
      <div className="flex justify-center p-4 min-h-screen bg-(--bg)">
        <div>
          <Button
            variant={buttonVariants.PRIMARY}
            onClick={() => navigate(SIGNIN)}
          >
            First Login Your Self.
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-(--bg) min-h-screen pb-12">
      <TaskNavabar
        handleProjectAdd={handleProjectAdd}
        handleTaskAdd={handleTaskAdd}
        tasks={tasks}
        setFilterTask={setFilterTask}
      />

      <div className="max-w-7xl mx-auto px-2 sm:px-4 mt-2">
        <TaskShownComponents
          task={filterTask}
          project={projects}
          handleDragTask={handleDragTask}
          handleDeleteTask={handleDeleteTask}
          handleEditTask={handleEditTask}
          handleEditProject={handleEditProject}
          handleShowProject={handleShowProject}
        />
      </div>

      {openAddMenu &&
        (addProject ? (
          <AddEntityForm
            handleSubmit={handleProjectSubmit}
            editEntityId={editProjectId}
            handleCancle={handleCancle}
            entity={project}
            formDataFields={projectFormFields.addProjectFields(
              editProjectId,
              project,
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
            )}
            formDataButtons={taskFormFields.addTaskButtons}
          />
        ))}
    </div>
  );
}

export default DashboardPage;
