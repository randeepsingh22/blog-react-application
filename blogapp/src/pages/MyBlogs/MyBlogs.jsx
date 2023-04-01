import { React, useEffect, useState } from "react";
import "../Dashboard/Dashboard.css";
import dashboardImage from "../../Utils/dashboard_main_img.jpg";
import BlogDescriptionCard from "../../Components/BaseComponents/BlogDescriptionCard/BlogDescriptionCard";
import { getUserId, getUserName } from "../../helpers/sessionFile";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../services/api";
import LoadingAnim from "../../Components/BaseComponents/LoadingAnimation/LoadingAnim";
import CreateBlog from "../BlogOption/WriteBlog";
import UpdateBlog from "../BlogOption/UpdateBlog";

export default function MyBlogs(props) {
  const navigate = useNavigate();

  const [blogList, setblogList] = useState([]);
  const [isResCome, setisResCome] = useState(false);
  const [updateBlog, setupdateBlog] = useState(false);
  useEffect(() => {
    getMyBlogs();
  }, []);
  let blogUpdate = {};

  const onEditTap = (id) => {
    console.log("onEditTapCalled" ,id)
    if (blogList) {
      blogList.forEach((blog) => {
        if (blog._id === id) {
          blogUpdate = blog;
          blogUpdate["isFromCreate"] = true;
          console.log("onEditTapCalled" ,blogUpdate)
          setupdateBlog(true);
        }
      });
    }
  };

  /**
   * Get My Blogs
   */
  const getMyBlogs = async () => {
    axiosInstance
      .get(`/getMyBlogs/${getUserId()}`)
      .then((response) => {
        console.log(response.data?.data);
        setblogList(response.data.data.blogs);
        var list = [];
        setisResCome(true);

        if (response.data.blogs && response.data.blogs.length > 0) {
          response.data.blogs.forEach((blog) => list.push(blog));
          console.log("DataJi");
          console.log(list);
          setblogList(list);
        }
        // if (response.data?.status.toString() === "1") {
        //   console.log(response.data?.data.user._id);
        //   setmessage(response.data.message);
        //   setUserId(response.data?.data.user._id);
        //   setUserName(response.data?.data.user.full_name);
        //   navigate("/home");
        // }
      })
      .catch((error) => {
        // setmessage(error.response.data.message);
      });
  };
  return (
    <>
      {" "}
      {updateBlog ? (
        <UpdateBlog blog={blogUpdate}/>
      ) : (
        <>
          <div className="main-picture-view">
            <div className="content-vw">
              <div></div>
              <div></div>
              <div></div>
              <div className="main-content-vw">
                <div className="slogan-text">Stay Updated.</div>
                <div className="slogan-view">
                  Read most trending Articles, Writing from bloggers all over
                  the world at one place.
                </div>
                <div
                  className="start-reading-button"
                  onClick={() => {
                    navigate("/write");
                  }}
                >
                  {getUserId ? "Start Writing" : "Start Reading"}
                </div>
              </div>
            </div>

            <img className="poster-image" src={dashboardImage} alt="" />
          </div>
          <div className="trending-blogs-vw">
            <div className="trending-title">
              <h5 className="trending-text">
                {props.isFromMyBlogs ? "My Blogs" : "Trending"}
              </h5>
              <div></div>{" "}
            </div>

            {!isResCome ? <LoadingAnim /> : ""}
            {isResCome && blogList && blogList.length > 0
              ? blogList.map((blog) => {
                  blog["isFromMyBlogs"] = true;
                  return (
                    <BlogDescriptionCard
                      key={blog._id}
                      blog={blog}
                      onEditButtonClick ={(e) => {onEditTap(e)}}
                    />
                  );
                })
              : isResCome && (
                  <div className="blog-not-created-vw">
                    <div className="no-blog-found">Oops! No Blogs Found</div>{" "}
                    <div className="create-now">Create Now</div>
                  </div>
                )}
          </div>
        </>
      )}
    </>
  );
}
