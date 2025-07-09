"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CreateBlogPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    author: "",
    description: "",
    content: "",
    tags: "",
    featured: false,
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/blog/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        tags: form.tags.split(",").map((tag) => tag.trim()),
        slug: form.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      alert("✅ Blog created!");
      router.push("/update");
    } else {
      alert("❌ Failed: " + data.error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl p-8 animate-fade-in">
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-6">
          <Plus className="inline mr-2" /> Create New Blog Post
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            className="w-full p-3 border border-gray-300 rounded-lg"
            placeholder="Blog Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
          <input
            className="w-full p-3 border border-gray-300 rounded-lg"
            placeholder="Author"
            value={form.author}
            onChange={(e) => setForm({ ...form, author: e.target.value })}
            required
          />
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg"
            placeholder="Short Description"
            rows={2}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg"
            placeholder="Full Blog Content"
            rows={6}
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
          />
          <input
            className="w-full p-3 border border-gray-300 rounded-lg"
            placeholder="Tags (comma-separated)"
            value={form.tags}
            onChange={(e) => setForm({ ...form, tags: e.target.value })}
          />
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => setForm({ ...form, featured: e.target.checked })}
            />
            <label className="text-gray-700">Mark as Featured</label>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              "Create Blog"
            )}
          </Button>
        </form>
      </div>

      {/* Fade in animation */}
      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.6s ease-in-out both;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
