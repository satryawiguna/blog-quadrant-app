import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  categorySelectors,
  fetchCategories,
} from "../../features/categorySlice";

const CommonSideBar = () => {
  const dispatch = useDispatch();
  const categories = useSelector(categorySelectors.selectAll);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <aside className="column is-2 is-narrow-mobile is-fullheight section is-hidden-mobile">
      <p className="menu-label is-hidden-touch">Navigation</p>
      <ul className="menu-list">
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        {categories.map((category, index) => (
          <li key={index}>
            <Link to={`/category/${category.id}`}>{category.name}</Link>
          </li>
        ))}
        <li>
          <a href="#" className="">
            About
          </a>
        </li>
      </ul>
    </aside>
  );
};

export default CommonSideBar;
