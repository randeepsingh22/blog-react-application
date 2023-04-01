import { React, useEffect, useState } from "react";
import "../Dashboard/Dashboard.css";
import dashboardImage from "../../Utils/dashboard_main_img.jpg";
import BlogDescriptionCard from "../../Components/BaseComponents/BlogDescriptionCard/BlogDescriptionCard";
import { getUserId, getUserName } from "../../helpers/sessionFile";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../services/api";
import { createRenderer } from "react-dom/test-utils";
import LoadingAnim from "../../Components/BaseComponents/LoadingAnimation/LoadingAnim";

export default function Dashboard(props) {
  const navigate = useNavigate();

  const [blogList, setblogList] = useState([]);
  const [isResCome, setisResCome] = useState(false);
  // blogLists = [
  //   {
  //     _id: "1",
  //     title: "Veg Recipes Tricks",
  //     short_desc:
  //       "In This Arcticle I will tell you how to create best from raw vegetable and make life healthy and easier. Lets learn How cook better Food and make our life more healter so lets get started. So please make sure to follow the steps that I have mentioned this artcile to do beetter cooking.",
  //     created_on: Date.now(),
  //     created_by: "Randeep Singh",
  //   },
  //   {
  //     id: "2",
  //     title: "Veg Recipes Tricks",
  //     description:
  //       "In This Arcticle I will tell you how to create best from raw vegetable and make life healthy and easier.",
  //     created_on: Date.now(),
  //     created_by: "Randeep Singh",
  //     is_favourite: true,
  //   },
  //   {
  //     id: "21",
  //     title: "Veg Recipes Tricks",
  //     description:
  //       "In This Arcticle I will tell you how to create best from raw vegetable and make life healthy and easier.",
  //     created_on: Date.now(),
  //     created_by: "Randeep Singh",
  //     is_favourite: true,
  //   },
  //   {
  //     id: "12",
  //     title: "Veg Recipes Tricks",
  //     description:
  //       "In This Arcticle I will tell you how to create best from raw vegetable and make life healthy and easier.",
  //     created_on: Date.now(),
  //     created_by: "Randeep Singh",
  //   },
  //   {
  //     id: "43",
  //     title: "Veg Recipes Tricks",
  //     description:
  //       "In This Arcticle I will tell you how to create best from raw vegetable and make life healthy and easier.",
  //     created_on: Date.now(),
  //     created_by: "Randeep Singh",
  //   },
  //   {
  //     id: "76",
  //     title: "Veg Recipes Tricks",
  //     description:
  //       "In This Arcticle I will tell you how to create best from raw vegetable and make life healthy and easier.",
  //     created_on: Date.now(),
  //     created_by: "Randeep Singh",
  //   },
  // ];
  useEffect(() => {
    getMyBlogs();
  }, []);

  /**
   * Get My Blogs
   */
  const getMyBlogs = async () => {
    axiosInstance

      .get(`/getBlogs/${getUserId()}`)
      .then((response) => {
        console.log(response.data?.data);
        setblogList(response.data.data.blogs);
        var list = [];
        setisResCome(true)
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
      <div className="main-picture-view">
        <div className="content-vw">
          <div></div>
          <div></div>
          <div></div>
          <div className="main-content-vw">
            <div className="slogan-text">Stay Updated.</div>
            <div className="slogan-view">
              Read most trending Articles, Writing from bloggers all over the
              world at one place.
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
          <h5 className="trending-text">"Trending</h5>
          <div></div>{" "}
        </div>

        {!isResCome ? <LoadingAnim /> :""}
        {isResCome && blogList && blogList.length > 0 ? (
          blogList.map((blog) => {
            blog["isFromMyBlogs"] = false
            return <BlogDescriptionCard key={blog._id} blog={blog} />;
          })
        ) : (
          isResCome && <div className="blog-not-created-vw">
            <div className="no-blog-found">Oops! No Blogs Found</div>{" "}
            <div className="create-now">Create Now</div>
          </div>
        )}
      </div>
    </>
  );
}
