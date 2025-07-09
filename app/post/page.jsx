"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PostPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    author: "",
    description: "",
    content: "",
    tags: "",
    featured: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/blog/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      alert("✅ Blog posted!");
      router.push("/admin");
    } else {
      alert("❌ Failed to post blog");
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h2>📝 Post a New Blog</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
          style={{ width: "100%", marginBottom: 10 }}
        />
        <input
          placeholder="Author"
          value={form.author}
          onChange={(e) => setForm({ ...form, author: e.target.value })}
          required
          style={{ width: "100%", marginBottom: 10 }}
        />
        <textarea
          placeholder="Short Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          rows={2}
          required
          style={{ width: "100%", marginBottom: 10 }}
        />
        <textarea
          placeholder="Content"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          rows={6}
          required
          style={{ width: "100%", marginBottom: 10 }}
        />
        <input
          placeholder="Tags (comma separated)"
          value={form.tags}
          onChange={(e) => setForm({ ...form, tags: e.target.value })}
          style={{ width: "100%", marginBottom: 10 }}
        />
        <label>
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e) => setForm({ ...form, featured: e.target.checked })}
            style={{ marginRight: 5 }}
          />
          Featured?
        </label>
        <br />
        <button type="submit" style={{ marginTop: 15 }}>Post Blog</button>
      </form>
    </div>
  );
}
