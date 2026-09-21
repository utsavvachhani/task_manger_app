import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/authContext.jsx";
import { DASHBOARD } from "../utils/route.js";

const PublicRoute = () => {
  const { authData } = useContext(AuthContext);

  return authData ? <Navigate to={DASHBOARD} replace /> : <Outlet />;
};

export default PublicRoute;