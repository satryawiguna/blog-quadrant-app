import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Message from "./Message";
import { useDispatch, useSelector } from "react-redux";
import { updateAuth } from "../features/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { logged, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (logged) {
      navigate("/admin/dashboard", { replace: true });
    }
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [messages, setMessages] = useState([]);

  const auth = async (e) => {
    e.preventDefault();

    try {
      const register = await axios.post("/auth/login", {
        email: email,
        password: password,
      });

      if (register.data.status == "SUCCESS") {
        dispatch(
          updateAuth({
            logged: true,
            userId: register.data.payload.id,
            userEmail: email,
          })
        );
        localStorage.setItem(
          "access_token",
          register.data.payload.access_token
        );
        navigate("/admin/dashboard", { replace: true });
      }
    } catch (error) {
      if (error.response) {
        setMessages(error.response.data.messages);
      }
    }
  };

  const closeMessage = () => {
    setMessages([]);
  };

  return (
    <section className="hero has-background-grey-light is-fullheight is-fullwidth">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-4-desktop">
              <Message messages={messages} closeMessage={closeMessage} />
              <form onSubmit={auth} className="box">
                <div className="field mt-3">
                  <label className="label">Email</label>
                  <div className="controls">
                    <input
                      type="text"
                      className="input"
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="field mt-3">
                  <label className="label">Password</label>
                  <div className="controls">
                    <input
                      type="password"
                      className="input"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="field mt-3">
                  <button className="button is-success is-fullwidth">
                    Login
                  </button>
                </div>
                <div className="field mt-3">
                  <small>
                    Don't have account? <Link to={"/register"}>Click here</Link>{" "}
                    for registration or back to <Link to={"/"}>Homepage</Link>
                  </small>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
