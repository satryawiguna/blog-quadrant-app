import React from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AxiosJwt from "../../../utils/AxiosJwt";
import Message from "../../Message";

const AddCategory = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [messages, setMessages] = useState([]);

  const store = async (e) => {
    e.preventDefault();

    const data = {
      name: name,
      slug: name.toLowerCase().replace(" ", "-"),
    };

    try {
      const store = await AxiosJwt.post("/category", data);

      if (store.data.status == "SUCCESS") {
        navigate("/admin/category");
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
    <AdminLayout>
      <div className="container box mt-5">
        <Message messages={messages} closeMessage={closeMessage} />
        <form onSubmit={store}>
          <div className="field mt-3">
            <label className="label">Name</label>
            <div className="controls">
              <input
                type="text"
                className="input"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <div className="field mt-3">
            <button className="button is-success is-fullwidth">Save</button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AddCategory;
