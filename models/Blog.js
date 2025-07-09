// models/Blog.js
import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: String,
    author: String,
    description: String,
    content: String,
    tags: [String],
    featured: Boolean,
    slug: String,
  },
  {
    timestamps: true,
    collection: "blog", // ✅ force correct collection
  }
);

export const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);
