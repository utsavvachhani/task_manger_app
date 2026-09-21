export const APIENDPOINTS = {
  SIGNIN: "/auth/signin",
  SIGNUP: "/auth/signup",
  LOGOUT: "/auth/logout",
  REFRESHTOKEN: "/auth/refresh",
  
  CREATETASK: "/task/add",
  UPDATETASK: "/task/update/",
  DELETETASK: "/task/delete/",
  DRAPDROPTASK: "/task/dragdrop",

  CREATEPROJECT: "/project/add",
  UPDATEPROJECT: "/project/update/",
  DELETEPROJECT: "/project/delete/",
  GETPROJECT: "/project/fetch",
  INVITEMEMBER: (projectId) => `/project/${projectId}/invite`,
  REMOVEMEMBER: (projectId, memberId) => `/project/${projectId}/members/${memberId}`,
  GETMEMBERS: (projectId) => `/project/${projectId}/members`,
};
