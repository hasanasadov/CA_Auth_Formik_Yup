import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { paths } from "../../constants/paths";

const AuthRoute = () => {
  const { token } = useSelector((state) => state.user);

  if (token) {
    return <Navigate to={paths.home} />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default AuthRoute;
