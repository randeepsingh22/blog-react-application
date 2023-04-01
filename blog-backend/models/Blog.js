import mongoose from "mongoose";

const Blog = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: "",
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  short_desc: {
    type: String,
    required: true,
    default: "",
  },
  description: {
    type: String,
    required: true,
    default: "",
  },
  category: {
    type: String,
    required: true,
    default: "",
  },
  created_on: {
    type: Date,
    default: Date.now(),
  },
});

const blog = mongoose.model("blog", Blog);
export default blog;
