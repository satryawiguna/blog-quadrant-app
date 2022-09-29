import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommonLayout from "./layouts/CommonLayout";
import { blogSelectors } from "../features/blogSlice";
import {
  commentSelectors,
  fetchCommentsByBlogId,
  createComment,
} from "../features/commentSlice";
import { useParams, useNavigate } from "react-router-dom";
import AxiosJwt from "../utils/AxiosJwt";

const BlogDetail = () => {
  const [blogId, setBlogId] = useState(0);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [viewed, setViewed] = useState("");
  const [category, setCategory] = useState({});
  const [imageFile, setImageFile] = useState("");
  const [imagePath, setImagePath] = useState("");
  const [user, setUser] = useState({});
  const [createdDate, setCreatedDate] = useState("");

  const [comment, setComment] = useState("");
  const [messages, setMessages] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { logged, userId } = useSelector((state) => state.auth);
  const blog = useSelector((state) => blogSelectors.selectById(state, id));
  const comments = useSelector(commentSelectors.selectAll);

  useEffect(() => {
    dispatch(fetchCommentsByBlogId(id));
  }, []);

  useEffect(() => {
    if (blog) {
      setBlogId(blog.id);
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

  const store = async (e) => {
    e.preventDefault();

    const data = {
      userId: userId,
      comment: comment,
    };

    try {
      await dispatch(createComment({ id, data }));
      setComment("");
    } catch (error) {
      if (error.response) {
        setMessages(error.response.data.messages);
      }
    }
  };

  return (
    <CommonLayout>
      <div className="box mt-5">
        <h2 className="title is-4">{title}</h2>
        <p>
          <small>{slug}</small> : <small>{createdDate}</small>
        </p>
        <img
          src={`${process.env.REACT_APP_BASE_IMAGE_URL}${blog.image_path}/${blog.image_file}`}
          className="mt-3 mb-3"
        />
        <p>{description}</p>
      </div>
      {logged ? (
        <form onSubmit={store}>
          <div className="field mt-3">
            <label className="label">Comment</label>
            <div className="controls">
              <input
                type="text"
                className="input"
                placeholder="Comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
          </div>
          <div className="field mt-3">
            <input type="hidden" className="input" value={userId} />
            <button className="button is-success is-fullwidth">
              Post Comment
            </button>
          </div>
        </form>
      ) : (
        ""
      )}

      {comments
        ? comments.map((comment, index) => (
            <div key={index} className="box mt-5">
              <strong>{comment.user.fullName} :</strong>
              <br />
              {comment.comment}
            </div>
          ))
        : ""}
    </CommonLayout>
  );
};

export default BlogDetail;
