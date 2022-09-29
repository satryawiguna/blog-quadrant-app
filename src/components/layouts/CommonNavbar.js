import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { updateAuth } from "../../features/authSlice";

const CommonNavbar = () => {
  const { logged } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = async () => {
    try {
      await axios.post(`/auth/logout`);

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
          <div className="navbar-start"></div>

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                {logged ? (
                  <>
                    <Link to={"/admin/dashboard"} className="button is-light">
                      Dashboard
                    </Link>
                    <button onClick={logout} className="button is-light">
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link to={"/login"} className="button is-light">
                      Login
                    </Link>
                    <Link to={"/register"} className="button is-light">
                      Register
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default CommonNavbar;
