"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    const res = await fetch("/api/blog/all");
    const data = await res.json();
    setBlogs(data.blogs || []);
    setLoading(false);
  };

  const deleteBlog = async (_id) => {
    const confirmDelete = window.confirm("Delete this blog?");
    if (!confirmDelete) return;

    const res = await fetch(`/api/blog/delete?id=${_id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    alert(data.message);
    fetchBlogs(); // refresh list
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  if (loading) return <p>Loading blogs...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>🛠 Admin Panel – Blog Manager</h2>
      {blogs.length === 0 && <p>No blogs found.</p>}

      <ul>
        {blogs.map((blog) => (
          <li key={blog._id} style={{ marginBottom: 20, borderBottom: "1px solid #ccc", paddingBottom: 10 }}>
            <strong>{blog.title}</strong> by {blog.author}
            <br />
            <code>{blog.slug}</code>
            <br />
            <Link href={`/admin/update?id=${blog._id}`}>
            {/* <Link href={`/update?id=${blog._id}`}> */}
              <button style={{ marginRight: 10 }}>✏️ Edit</button>
            </Link>
            
            <button onClick={() => deleteBlog(blog._id)}>🗑 Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
