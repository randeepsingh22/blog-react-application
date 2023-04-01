import React from "react";
import userImage from "../../../Utils/user_icon.png";
import "../BlogDescriptionCard/BlogDescriptionCard.css";
import dashboardImage from "../../../Utils/dashboard_main_img.jpg";
import deleteIcon from "../../../Utils/delete.png";
import editBlog from "../../../Utils/editing.png";

const BlogDescriptionCard = (props) => {
  let {
    _id,
    title,
    short_desc,
    created_on,
    created_by,
    isFromMyBlogs,
  } = props.blog;

  const onClickEdit =()=>{
    props.onEditButtonClick(_id)
  }
  const onDeleteTap =()=>{
    props.onDeleteTap(_id)
  }

  var createdOn = created_on
    ? `${Date(created_on).split(" ")[1]} ${Date(created_on).split(" ")[2]}`
    : "months ago";
  return (
    <div className="main-card-vw">
      <div className="blog-info-vw">
        <div className="creater-info-vw">
          <div>
            <div className="user-image-vw">
              <img src={userImage} alt="" className="image-vw" />
              <div className="created-by">{created_by}</div>
            </div>
          </div>
          {isFromMyBlogs ? (
            <div>
              <img src={editBlog} onClick={onClickEdit} alt="" className="action-btn1" />
              <img src={deleteIcon} alt="" onClick={onDeleteTap} className="action-btn2" />
            </div>
          ) : (
            ""
          )}

          {/* <img src={fa ? favouriteImage : unFavouriteImage} alt="" className="favourite-article" /> */}
        </div>

        <div className="blog-title">{title}</div>
        <div className="blog-description">{short_desc}</div>
        <div className="other-blog-info-vw">
          <div className="created-on">Posted on. {createdOn}</div>
        </div>
      </div>
      <img src={dashboardImage} className="blog-poster-image" alt="" />
    </div>
  );
};
export default BlogDescriptionCard;
