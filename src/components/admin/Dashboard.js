import React, { useEffect } from "react";
import AdminLayout from "../layouts/AdminLayout";
import { useSelector, useDispatch } from "react-redux";

const Dashboard = () => {
  const { logged, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {}, [dispatch]);

  return (
    <AdminLayout>
      <div className="container mt-5">
        <h1>
          Welcome back <strong>{user}</strong>
        </h1>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
