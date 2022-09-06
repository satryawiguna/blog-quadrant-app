import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CommonLayout from "./layouts/CommonLayout";
import { blogSelectors, fetchBlogs } from "../features/blogSlice";
import { Link } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const blogs = useSelector(blogSelectors.selectAll);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  return (
    <CommonLayout>
      {blogs.map((blog, index) => (
        <div key={index} className="box mt-5">
          <Link to={`/blog/${blog.id}`}>
            <h2 className="title is-4">{blog.title}</h2>
          </Link>
          <small>{blog.slug}</small> - <small>{blog.created_date}</small>
          <img
            src={`${process.env.REACT_APP_BASE_IMAGE_URL}/${blog.image_path}/${blog.image_file}`}
            className="mt-3 mb-3"
          />
        </div>
      ))}
    </CommonLayout>
  );
};

export default Home;
