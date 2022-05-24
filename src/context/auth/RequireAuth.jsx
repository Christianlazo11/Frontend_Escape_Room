import { useEffect, useState } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();

  // return auth.rol && allowedRoles.includes(auth.rol[0]) ? (
  return auth.rol === allowedRoles ? (
    <Outlet />
  ) : auth.email ? (
    <Navigate to="/unauthorized" />
  ) : (
    <Navigate to="/login" />
  );
};

export default RequireAuth;
