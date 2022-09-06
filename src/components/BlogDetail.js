import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommonLayout from "./layouts/CommonLayout";
import { blogSelectors, fetchBlogs } from "../features/blogSlice";
import { useParams, useNavigate } from "react-router-dom";

const BlogDetail = () => {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [viewed, setViewed] = useState("");
  const [category, setCategory] = useState({});
  const [imageFile, setImageFile] = useState("");
  const [imagePath, setImagePath] = useState("");
  const [user, setUser] = useState({});
  const [createdDate, setCreatedDate] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const blog = useSelector((state) => blogSelectors.selectById(state, id));

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  useEffect(() => {
    if (blog) {
      setTitle(blog.title);
      setSlug(blog.slug);
      setDescription(blog.description);
      setViewed(blog.viewed);
      setCategory(blog.category);
      setImageFile(blog.image_file);
      setImagePath(blog.image_path);
      setUser(blog.user);
      setCreatedDate(blog.created_date);
    }
  }, [blog]);

  return (
    <CommonLayout>
      <div className="box mt-5">
        <h2 className="title is-4">{title}</h2>
        <small>{slug}</small> - <small>{createdDate}</small>
        <img
          src={`${process.env.REACT_APP_BASE_IMAGE_URL}/${blog.image_path}/${blog.image_file}`}
          className="mt-3 mb-3"
        />
        <p>{description}</p>
      </div>
    </CommonLayout>
  );
};

export default BlogDetail;
