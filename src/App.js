import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Register from "./components/Register";
import Dashboard from "./components/admin/Dashboard";
import Category from "./components/admin/Category";
import Blog from "./components/admin/Blog";
import BlogDetail from "./components/BlogDetail";
import AddCategory from "./components/admin/category/AddCategory";
import EditCategory from "./components/admin/category/EditCategory";
import AddBlog from "./components/admin/blog/AddBlog";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/blog/:id" element={<BlogDetail />} />
      <Route
        path="/admin/dashboard"
        element={
          <>
            <Dashboard />
          </>
        }
      />
      <Route
        path="/admin/category"
        element={
          <>
            <Category />
          </>
        }
      />
      <Route
        path="/admin/category/add"
        element={
          <>
            <AddCategory />
          </>
        }
      />
      <Route
        path="/admin/category/:id"
        element={
          <>
            <EditCategory />
          </>
        }
      />
      <Route
        path="/admin/blog"
        element={
          <>
            <Blog />
          </>
        }
      />
      <Route
        path="/admin/blog/add"
        element={
          <>
            <AddBlog />
          </>
        }
      />
    </Routes>
  );
}

export default App;
