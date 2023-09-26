import "./Sidebar.css";
import { useAuth } from "../../context/authContext";
import { PF } from "../../baseInstance,";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Sidebar = () => {
  // eslint-disable-next-line
  const [user, setUser] = useAuth();
  const [categories, setCategories] = useState([]);

  const getAllCategories = async () => {
    await axios
      .get("/category/")
      .then((response) => {
        setCategories(response.data.categories);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img
          src={user.user.profilePic ? PF + user.user.profilePic : ""}
          alt=""
          className="sidebarImg"
        />
        <p>
          Laboris sunt aute cupidatat velit magna velit ullamco dolore mollit
          amet ex esse.Sunt eu ut nostrud id quis proident.
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
          {categories.map((category, index) => {
            return (
              <Link
                className="link"
                to={{ pathname: "/", search: `?category=${category._id}` }}
              >
                <li key={index} className="sidebarListItem">
                  {category.name}
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fab fa-facebook-square"></i>
          <i className="sidebarIcon fab fa-instagram-square"></i>
          <i className="sidebarIcon fab fa-pinterest-square"></i>
          <i className="sidebarIcon fab fa-twitter-square"></i>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
