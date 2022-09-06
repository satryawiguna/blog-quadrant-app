import React, { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  categorySelectors,
  fetchAdminCategories,
} from "../../../features/categorySlice";
import Message from "../../Message";
import AxiosJwt from "../../../utils/AxiosJwt";

const EditCategory = () => {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [messages, setMessages] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const category = useSelector((state) =>
    categorySelectors.selectById(state, id)
  );

  useEffect(() => {
    dispatch(fetchAdminCategories());
  }, [dispatch]);

  useEffect(() => {
    if (category) {
      setName(category.name);
      setSlug(category.slug);
    }
  }, [category]);

  const update = async (e) => {
    e.preventDefault();

    const data = {
      name: name,
      slug: name.toLowerCase().replace(" ", "-"),
    };

    try {
      const update = await AxiosJwt.put(`/category/${id}`, data);

      if (update.data.status == "SUCCESS") {
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
        <form onSubmit={update} className="box">
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

export default EditCategory;
