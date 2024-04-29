import React from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import Unauthorized from "../../pages/Unauthorized/Unauthorized";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

const Authorization = ({ permissions }) => {
  const user = useSelector((state) => state.user);
  const [userDet, setUserDet] = useState({});

  useEffect(() => {
    if (user) {
      setUserDet(user);
    }
  }, [user]);

  const location = useLocation();

  if (userDet.userName) {
    const userpermission = user.permissions;
    const isAllowed = permissions.some((allowed) =>
      userpermission.includes(allowed)
    );
    return isAllowed ? <Outlet /> : <Unauthorized />;
  }
  return <Navigate to="/login" state={{ path: location.pathname }} replace />;
};
export default Authorization;
