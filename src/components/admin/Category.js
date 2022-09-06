import React, { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import {
  categorySelectors,
  fetchAdminCategories,
} from "../../features/categorySlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AxiosJwt from "../../utils/AxiosJwt";
import Message from "../Message";

const Category = () => {
  const dispatch = useDispatch();
  const categories = useSelector(categorySelectors.selectAll);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    dispatch(fetchAdminCategories());
  }, []);

  const remove = async (id) => {
    try {
      const remove = await AxiosJwt.delete(`/category/${id}`);

      if (remove.data.status == "SUCCESS") {
        dispatch(fetchAdminCategories());
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
        <Link to={"/admin/category/add"} className="button is-primary mb-5">
          Add Category
        </Link>
        <Message messages={messages} closeMessage={closeMessage} />
        <table className="table is-striped is-fullwidth">
          <thead>
            <tr>
              <th>Name</th>
              <th>Slug</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id}>
                <td>{category.name}</td>
                <td>{category.slug}</td>
                <td>
                  <Link
                    to={`/admin/category/${category.id}`}
                    className="button is-info is-email mr-3"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => remove(category.id)}
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

export default Category;
