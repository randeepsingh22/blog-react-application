import React from "react";
import "./Navbar.css";
import logoImage from "../../../Utils/blog.png";
import { useNavigate } from "react-router-dom";
import {
  getUserId,
  setUserId,
  setUserName,
} from "../../../helpers/sessionFile";
const Navbar = (props) => {
  const { title } = props;
  const navigate = useNavigate();
  const writeArticle = () => {
    if (userId !== undefined && userId !== "") {
      navigate("/write");
    } else {
      navigate("/signin");
    }
  };
  var userId = getUserId;

  const readArcticle = () => {
    console.log(userId);
    if (userId !== undefined && userId !== "") {
      navigate("/read");
    } else {
      navigate("/signin");
    }
  };
  const homeRoute = () => {
    navigate("/");
  };
  const signIn = () => {
    navigate("/signin");
  };
  const getStarted = () => {
    if (userId !== undefined && userId !== "") {
      setUserId("");
      setUserName("");
      navigate("/signin");
    } else {
      navigate("/signin");
    }
  };
  return (
    <div>
      <div className="main-navbar">
        <div className="title-view">
          <img src={logoImage} alt="Blog Dekho" className="logo-image" />
          <h3 className="title-name">{title}</h3>
        </div>
        <div className="main-options">
          <div className="option">
            <p className="option" onClick={homeRoute}>
              Home
            </p>
          </div>
          {/* <div className="option">
            <p className="option" onClick={readArcticle}>
              Read
            </p>
          </div> */}
          <div className="option">
            <p className="option" onClick={writeArticle}>
              Write
            </p>
          </div>
          {userId !== undefined && userId !== "" ? (
            <div className="option">
              <p
                className="option"
                onClick={() => {
                  navigate("/myBlogs");
                }}
              >
                My Blogs
              </p>
            </div>
          ) : (
            ""
          )}
          {userId === undefined || userId === "" ? (
            <div className="option">
              <p className="option" onClick={signIn}>
                Sign In
              </p>
            </div>
          ) : (
            ""
          )}

          <div>
            <p onClick={getStarted} className="get-started-btn">
              {userId === undefined || userId === ""
                ? "Get Started"
                : "Log Out"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
