"use client";
import { useEffect, useState } from "react";

export default function UpdatePage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await fetch("/api/blog/all");
      const data = await res.json();
      console.log("Fetched blogs:", data.blogs); // Check in console
      if (data?.blogs) {
        setBlogs(data.blogs);
      }
      setLoading(false);
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20 text-purple-600 font-semibold text-xl">
        Loading Blogs...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-purple-50 py-12 px-6">
      <h1 className="text-4xl font-bold text-center mb-10 text-purple-700">All Blogs</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition p-6 border border-purple-100"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">{blog.title}</h2>
            <p className="text-gray-500 text-sm mb-2">By {blog.author}</p>
            <p className="text-gray-600 mb-4">{blog.description}</p>
            <div className="flex flex-wrap gap-2">
              {blog.tags?.map((tag, i) => (
                <span
                  key={i}
                  className="bg-purple-100 text-purple-700 text-xs px-3 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-4">
              Created: {new Date(blog.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
