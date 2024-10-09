import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { paths } from "../../constants/paths";
import { getCurrentUserAsync } from "../../store/features/userSlice";
import { USER_ROLE } from "../../constants";

const ProtectedRoute = ({ isAdmin = false }) => {
  const { token, loading, error, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token && !user) {
      dispatch(getCurrentUserAsync(token));
    }
  }, [token]);

  if (!token) {
    return <Navigate to={paths.login} />;
  }

  if (loading && !user) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (isAdmin && user.role !== USER_ROLE.ADMIN) {
    return <Navigate to={paths.dashboard} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
