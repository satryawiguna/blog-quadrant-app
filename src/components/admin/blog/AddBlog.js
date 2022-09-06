import React, { useEffect } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AxiosJwt from "../../../utils/AxiosJwt";
import Message from "../../Message";
import { useSelector } from "react-redux";
import {
  categorySelectors,
  fetchAdminCategories,
} from "../../../features/categorySlice";
import { useDispatch } from "react-redux";

const AddBlog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const categories = useSelector(categorySelectors.selectAll);
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchAdminCategories());
  }, [dispatch]);

  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState(0);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState([]);

  const [messages, setMessages] = useState([]);

  const store = async (e) => {
    e.preventDefault();

    const image = e.currentTarget["image"].files[0];

    let formData = new FormData();

    formData.append("title", title);
    formData.append("category_id", categoryId);
    formData.append("user_id", auth.userId);
    formData.append("slug", title.toLowerCase().replace(" ", "-"));
    formData.append("description", description);
    formData.append("image", image);

    try {
      const store = await AxiosJwt.post("/blog", formData);

      if (store.data.status == "SUCCESS") {
        navigate("/admin/blog");
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
            <label className="label">Title</label>
            <div className="controls">
              <input
                type="text"
                className="input"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>
          <div className="field mt-3">
            <label className="label">Category</label>
            <div className="controls">
              <select
                className="input"
                onChange={(e) => setCategoryId(e.target.value)}
              >
                <option value="">Please select</option>
                {categories.map((category, index) => (
                  <option key={index} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="field mt-3">
            <label className="label">Description</label>
            <div className="controls">
              <textarea
                className="input"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="4"
              ></textarea>
            </div>
          </div>
          <div className="field mt-3">
            <label className="label">Image</label>
            <div className="controls">
              <input
                id="image"
                type="file"
                className="input"
                value={image}
                onChange={(e) => setImage(e.target.value)}
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

export default AddBlog;
