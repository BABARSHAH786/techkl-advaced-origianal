// app/api/blog/all/route.js
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongoose"; // ✅ use your file
import { Blog } from "@/models/Blog";

export async function GET() {
  try {
    await connectToDatabase(); // ✅ use your function
    const blogs = await Blog.find().sort({ createdAt: -1 });

    return NextResponse.json({ blogs });
  } catch (error) {
    console.error("❌ Blog fetch error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
