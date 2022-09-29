import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateAuth } from "../../features/authSlice";
import { Link } from "react-router-dom";

const AdminNavbar = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const logout = async () => {
    try {
      await axios.post(`/auth/logout`);
      console.log("broo");
      dispatch(
        updateAuth({
          logged: false,
          userId: null,
          userEmail: null,
        })
      );
      navigate("/login", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav
      className="navbar is-light"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <Link className="navbar-item" to={`/`}>
            <strong>
              <h2>BLOG QUADRANT</h2>
            </strong>
          </Link>

          <a
            href="/"
            role="button"
            className="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <a href="/admin/dashboard" className="navbar-item">
              Dashboard
            </a>
            <a href="/admin/category" className="navbar-item">
              Category
            </a>
            <a href="/admin/blog" className="navbar-item">
              Blog
            </a>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <button onClick={logout} className="button is-light">
                  Log out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
