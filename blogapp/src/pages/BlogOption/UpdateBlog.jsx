import React, { useState, useEffect } from "react";
import "../BlogOption/WriteBlog.css";
import { getUserId } from "../../helpers/sessionFile";
import axiosInstance from "../../services/api";
import { useNavigate } from "react-router-dom";

function UpdateBlog(props) {
  const blog = props.blog;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title:  blog.title,
    sub_title: blog.short_desc,
    body: blog.description,
    category:  blog.category
  });
  const [image, setImage] = useState("");
  const [blogMessage, setBlogMessage] = useState("");
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    console.log(reader.result);
    reader.onload = () => {
      setImage(reader.result);
    };

    reader.readAsDataURL(file);
  };


  /*
   * Create New Blog
   */
  const createNewBlog = async () => {
 
      axiosInstance
        .post("/update", {
          title: formData.title,
          created_by: getUserId(),
          short_desc: formData.sub_title,
          description: formData.body,
          category: formData.category,
          blog_id: blog._id,
        })
        .then((response) => {
          if (response.data?.status === 1) {
            setBlogMessage(response.data?.message);
            // navigate("/home");
          }
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
          console.log(error.response.data.message);
          setBlogMessage(error.response.data.message);
        });
    
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    createNewBlog();
  };

  return (
    <div className="main-container">
      <h1 className="main-heading">
        {blogMessage === "" ? (
          <div> { "Update"}</div>
        ) : (
          ""
        )}
      </h1>
      {blogMessage === "" ? (
        <form onSubmit={handleSubmit}>
          {image !== null && image !== "" ? (
            <div className="blog-image-view">
              <img src={image} alt="" className="poster-img-vw" />
              <div className="cross-icon" onClick={() => setImage("")}>
                Remove
              </div>
            </div>
          ) : (
            <div className="add-image">
              <div className="add-image-text">Add Blog Image</div>
              <input
                type="file"
                className="image-text"
                title="Add Image"
                accept=".jpg,.png"
                placeholder="Add Image"
                onChange={handleImageUpload}
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="title">Add Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Add Title"
              value={formData.title}
              onChange={handleInputChange}
            />
          </div>
          <div className="sub-title">
            <label htmlFor="title">Short Description:</label>
            <input
              type="text"
              id="title"
              name="sub_title"
              placeholder="Add Short Description"
              value={formData.sub_title}
              onChange={handleInputChange}
            />
          </div>

          <div className="body-text-area">
            <label htmlFor="body">Description:</label>
            <textarea
              name="body"
              className="text-area"
              placeholder="Add Description"
              value={formData.body}
              onChange={handleInputChange}
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="category">Category:</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
            >
              <option value="">Select a category</option>
              <option value="tech">Technology</option>
              <option value="lifestyle">Lifestyle</option>
              <option value="food">Food</option>
              <option value="travel">Travel</option>
            </select>
          </div>

          <button type="submit" className="submit-btn">
            Publish
          </button>
        </form>
      ) : (
        <div className="alertvw">
          <div className="text-message-vw">{blogMessage}</div>
        </div>
      )}
    </div>
  );
}

export default UpdateBlog;
