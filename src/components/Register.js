import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Message from "./Message";
import { useDispatch, useSelector } from "react-redux";

const Register = () => {
  const navigate = useNavigate();

  const { logged, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (logged) {
      navigate("/admin/dashboard", { replace: true });
    }
  }, []);

  const [fullName, setFullName] = useState("");
  const [nickName, setNickName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [messages, setMessages] = useState([]);

  const register = async (e) => {
    e.preventDefault();

    try {
      const register = await axios.post("/auth/register", {
        full_name: fullName,
        nick_name: nickName,
        email: email,
        password: password,
        confirm_password: confirmPassword,
      });

      if (register.data.status == "SUCCESS") navigate("/", { replace: true });
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
              <form className="box" onSubmit={register}>
                <div className="field mt-3">
                  <label className="label">Full Name</label>
                  <div className="controls">
                    <input
                      type="text"
                      className="input"
                      placeholder="Full Name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="field mt-3">
                  <label className="label">Nick Name</label>
                  <div className="controls">
                    <input
                      type="text"
                      className="input"
                      placeholder="Nick Name"
                      value={nickName}
                      onChange={(e) => setNickName(e.target.value)}
                    />
                  </div>
                </div>
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
                  <label className="label">Confirm Password</label>
                  <div className="controls">
                    <input
                      type="password"
                      className="input"
                      placeholder="Consfirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="field mt-3">
                  <button className="button is-success is-fullwidth">
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
