import express from "express";
import { signUp,signin } from "../controllers/AuthRoute.js";
import { createBlog, getBlogById, getBlogByUserId, getBlogs, updateNewBlog } from "../controllers/BlogRoute.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signin);

/**
 * Blog End Points
 */
router.post("/create", createBlog);
router.put("/update", updateNewBlog);
router.get("/getBlogById/:id", getBlogById);
router.get("/getMyBlogs/:id", getBlogByUserId);
router.get("/getBlogs/:id", getBlogs);

export { router };
