"use client";
import { useState } from "react";

export default function BlogEditor({ initialData }) {
  const [title, setTitle] = useState(initialData.title || "");
  const [content, setContent] = useState(initialData.content || "");
  const [author, setAuthor] = useState(initialData.author || "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/blog/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        _id: initialData._id,
        title,
        content,
        author,
      }),
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
      <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content" required />
      <input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Author" required />
      <button type="submit">Update Blog</button>
    </form>
  );
}
