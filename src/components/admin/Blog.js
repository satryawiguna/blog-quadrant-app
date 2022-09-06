import React, { useState, useEffect } from "react";
import AdminLayout from "../layouts/AdminLayout";
import { blogSelectors, fetchAdminBlogs } from "../../features/blogSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AxiosJwt from "../../utils/AxiosJwt";
import Message from "../Message";

const Blog = () => {
  const dispatch = useDispatch();
  const blogs = useSelector(blogSelectors.selectAll);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    dispatch(fetchAdminBlogs());
  }, []);

  const remove = async (id) => {
    try {
      const remove = await AxiosJwt.delete(`/blog/${id}`);

      if (remove.data.status == "SUCCESS") {
        dispatch(fetchAdminBlogs());
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
        <Link to={"/admin/blog/add"} className="button is-primary mb-5">
          Add Blog
        </Link>
        <Message messages={messages} closeMessage={closeMessage} />
        <table className="table is-striped is-fullwidth">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Slug</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog.id}>
                <td>
                  <img
                    src={`${process.env.REACT_APP_BASE_IMAGE_URL}/${blog.image_path}/${blog.image_file}`}
                    width="50"
                  />
                </td>
                <td>{blog.title}</td>
                <td>{blog.slug}</td>
                <td>
                  <Link
                    to={`/admin/blog/${blog.id}`}
                    className="button is-info is-email mr-3"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => remove(blog.id)}
                    className="button is-danger is-email"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default Blog;
