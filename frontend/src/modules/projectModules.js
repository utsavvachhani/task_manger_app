import API from "../services";
import { APIENDPOINTS } from "../utils/apiEndPoints";

export const projectModules = {
  createProject: (formData) => API.post(APIENDPOINTS.CREATEPROJECT, formData),
  updateProject: (id, formData) =>
    API.put(`${APIENDPOINTS.UPDATEPROJECT}${id}`, formData),
  deleteProject: (id) => API.delete(`${APIENDPOINTS.DELETEPROJECT}${id}`),
  getProject: () => API.get(APIENDPOINTS.GETPROJECT),
  dargeAndDrop: (dropData) => API.put(APIENDPOINTS.DRAPDROPTASK, dropData),
  inviteMember: (projectId, inviteData) =>
    API.post(APIENDPOINTS.INVITEMEMBER(projectId), inviteData),
  removeMember: (projectId, memberId) =>
    API.delete(APIENDPOINTS.REMOVEMEMBER(projectId, memberId)),
  getMembers: (projectId) =>
    API.get(APIENDPOINTS.GETMEMBERS(projectId)),
};
