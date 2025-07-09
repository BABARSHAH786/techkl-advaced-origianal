import { connectToDatabase } from '@/lib/database';
import { Blog } from '@/models/Blog';

export async function DELETE(req) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const deleted = await Blog.findByIdAndDelete(id);
    if (!deleted) throw new Error("Blog not found");

    return new Response(JSON.stringify({ message: "✅ Deleted" }), { status: 200 });
  } catch (err) {
    console.error("❌ Delete error:", err);
    return new Response(JSON.stringify({ error: "Delete failed" }), { status: 500 });
  }
}
