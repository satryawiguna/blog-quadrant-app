import React, { useState, useEffect } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  categorySelectors,
  fetchAdminCategories,
} from "../../../features/categorySlice";
import { fetchAdminBlogs, blogSelectors } from "../../../features/blogSlice";
import Message from "../../Message";
import AxiosJwt from "../../../utils/AxiosJwt";

const EditBlog = () => {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [categoryId, setCategoryId] = useState(0);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState([]);
  const [imageOld, setImageOld] = useState([]);

  const [messages, setMessages] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const blog = useSelector((state) => blogSelectors.selectById(state, id));

  const auth = useSelector((state) => state.auth);
  const categories = useSelector(categorySelectors.selectAll);

  useEffect(() => {
    dispatch(fetchAdminBlogs());
    dispatch(fetchAdminCategories());
  }, [dispatch]);

  useEffect(() => {
    if (blog) {
      setTitle(blog.title);
      setCategoryId(blog.category.id);
      setSlug(blog.slug);
      setDescription(blog.description);
      setCategoryId(blog.categoryId);
      setImageOld(`${blog.image_path}/${blog.image_file}`);
    }
  }, [blog]);

  const update = async (e) => {
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
      const update = await AxiosJwt.put(`/blog/${id}`, formData);

      if (update.data.status == "SUCCESS") {
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
        <form onSubmit={update}>
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
                defaultValue={categoryId}
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

export default EditBlog;
