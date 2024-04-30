import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
const Authentication = ({ children }) => {
  const user = useSelector((state) => state.user);
  const [userDet, setUserDet] = useState({});

  useEffect(() => {
    setUserDet(user);
  }, [user]);

  const location = useLocation();
  if (!userDet.userName) {
    return <Navigate to="/login" state={{ path: location.pathname }} />;
  }
  return children;
};
export default Authentication;
