// "use client";

// import { useSearchParams, useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// export default function UpdateBlogPage() {
//   const searchParams = useSearchParams();
//   const id = searchParams.get("id");
//   const router = useRouter();

//   const [form, setForm] = useState({
//     _id: "",
//     title: "",
//     author: "",
//     description: "",
//     content: "",
//     tags: "",
//     featured: false,
//   });

//   const [loading, setLoading] = useState(false);

//   // Fetch the blog by ID and fill the form
//   const fetchBlog = async () => {
//     const res = await fetch("/api/blog/all");
//     const data = await res.json();
//     const blog = data.blogs.find((b) => b._id === id);
//     if (blog) {
//       setForm({
//         ...blog,
//         tags: blog.tags.join(", "),
//       });
//     }
//   };

//   useEffect(() => {
//     if (id) fetchBlog();
//   }, [id]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const res = await fetch("/api/blog/update", {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         ...form,
//         tags: form.tags.split(",").map((tag) => tag.trim()),
//       }),
//     });

//     const data = await res.json();
//     setLoading(false);

//     if (res.ok) {
//       alert("✅ Blog updated!");
//       router.push("/admin");
//     } else {
//       alert("❌ Failed: " + data.error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
//         <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">
//           ✏️ Update Blog Post
//         </h2>
//         <form onSubmit={handleSubmit} className="space-y-5">
//           <input
//             className="w-full p-3 border rounded"
//             placeholder="Blog Title"
//             value={form.title}
//             onChange={(e) => setForm({ ...form, title: e.target.value })}
//             required
//           />
//           <input
//             className="w-full p-3 border rounded"
//             placeholder="Author"
//             value={form.author}
//             onChange={(e) => setForm({ ...form, author: e.target.value })}
//             required
//           />
//           <textarea
//             className="w-full p-3 border rounded"
//             placeholder="Short Description"
//             rows={2}
//             value={form.description}
//             onChange={(e) => setForm({ ...form, description: e.target.value })}
//           />
//           <textarea
//             className="w-full p-3 border rounded"
//             placeholder="Full Blog Content"
//             rows={6}
//             value={form.content}
//             onChange={(e) => setForm({ ...form, content: e.target.value })}
//           />
//           <input
//             className="w-full p-3 border rounded"
//             placeholder="Tags (comma-separated)"
//             value={form.tags}
//             onChange={(e) => setForm({ ...form, tags: e.target.value })}
//           />
//           <div className="flex items-center gap-2">
//             <input
//               type="checkbox"
//               checked={form.featured}
//               onChange={(e) =>
//                 setForm({ ...form, featured: e.target.checked })
//               }
//             />
//             <label>Mark as Featured</label>
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded"
//           >
//             {loading ? "Updating..." : "Update Blog"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }
