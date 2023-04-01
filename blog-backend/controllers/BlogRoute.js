import { sendResponse } from "../helpers/sendResponse.js";
import Blog from "../models/Blog.js";
import userSchema from "../models/UserAuth.js";

/**
 * Create New Blog Post
 */
export const createBlog = async (request, response) => {
  try {
    /***
     * Create New Blog Instance
     */
    let newBlog = new Blog(request.body);

    /**
     * Save New Blog
     */
    await newBlog.save();

    return response
      .status(200)
      .json(
        sendResponse(1, "Blog created successfully.", { blog_id: newBlog._id })
      );
  } catch (e) {
    console.log(e);
    return response
      .status(406)
      .json(sendResponse(0, "Error While Creating Blog."));
  }
};

/**
 * Update Existing Blog If Exist
 */
export const updateNewBlog = async (request, response) => {
  try {
    /***
     * Check If user Exist
     */
    let userExist = await userSchema.findOne({ _id: request.body.created_by });

    if (userExist == null)
      return response.status(406).json(sendResponse(0, "User does not exist"));

    /**
     * Check If Blog Exist
     */
    let checkBlogExist = await Blog.findOne({ _id: request.body.blog_id });

    /**
     * Blog Exist
     */
    if (checkBlogExist == null)
      return response.status(406).json(sendResponse(0, "Blog does not exist."));

    /**
     * Update Blog0
     */
    let updatedBlog = await Blog.updateOne(
      { _id: checkBlogExist._id },
      req.body
    );
    if (updatedBlog == null) {
      return response
        .status(406)
        .json(sendResponse(0, "Error while updating the blog"));
    } else {
      return response
        .status(200)
        .json(sendResponse(1, "Blog Updated Successfully."));
    }
  } catch (e) {
    console.log(e);
    return response
      .status(406)
      .json(sendResponse(0, "Error While Creating Blog."));
  }
};
/**
 * Get Blog By Id
 */
export const getBlogById = async (request, response) => {
  try {
    /***
     * Check If user Exist
     */
    let userExist = await userSchema.findOne({ _id: request.body.created_by });

    if (userExist == null)
      return response.status(406).json(sendResponse(0, "User does not exist"));

    /**
     * Check If Blog Exist
     */
    let checkBlogExist = await Blog.findOne({ _id: request.params.id });

    /**
     * Check If Exist Send Response else send Error
     */
    if (checkBlogExist == null)
      return response.status(406).json(sendResponse(0, "Blog does not exist."));
    else
      return response.status(200).json(
        sendResponse(1, "Blog obtained successfully,", {
          blog: checkBlogExist,
        })
      );
  } catch (e) {
    console.log(e);
    return response
      .status(406)
      .json(sendResponse(0, "Error While Creating Blog."));
  }
};
/**
 * Get Blogs by User Id
 */
export const getBlogByUserId = async (request, response) => {
  try {
    /***
     * Check If user Exist
     */
    let userExist = await userSchema.findOne({ _id: request.params.id });

    if (userExist == null)
      return response.status(406).json(sendResponse(0, "User does not exist"));

    /**
     * Check If Blog Exist
     */
    let myblogs = await Blog.find({ created_by: request.params.id });

    return response.status(200).json(
      sendResponse(1, "Blogs obtained successfully,", {
        blogs: myblogs,
      })
    );
  } catch (e) {
    console.log(e);
    return response
      .status(406)
      .json(sendResponse(0, "Error while obtaining blogs."));
  }
};
/**
 * Get All Blogs
 */
export const getBlogs = async (request, response) => {
  try {
    /***
     * Check If user Exist
     */
    let userExist = await userSchema.findOne({ _id: request.params.id });

    if (userExist == null)
      return response.status(406).json(sendResponse(0, "User does not exist"));

    /**
     * Check If Blog Exist
     */
    let myblogs = await Blog.find();

    return response.status(200).json(
      sendResponse(1, "Blogs obtained successfully,", {
        blogs: myblogs,
      })
    );
  } catch (e) {
    console.log(e);
    return response
      .status(406)
      .json(sendResponse(0, "Error while obtaining blogs."));
  }
};
/**
 * Delete Blog
 */
export const deleteBlog = async (request, response) => {
  try {
    /***
     * Check If user Exist
     */
    let userExist = await userSchema.findOne({ _id: request.params.id });

    if (userExist == null)
      return response.status(406).json(sendResponse(0, "User does not exist"));

    /**
     * Check for blog delete
     */
    let myblogs = await Blog.findByIdAndDelete({ _id: request.body._id });
    if (myblogs === null)
      return response.status(406).json(
        sendResponse(0, "Blog Not found")
      );
    else
      return response.status(200).json(
        sendResponse(1, "Blog Deleted Successfull.", {
          blogs: myblogs,
        })
      );
  } catch (e) {
    console.log(e);
    return response
      .status(406)
      .json(sendResponse(0, "Error while Deleting Blog."));
  }
};
