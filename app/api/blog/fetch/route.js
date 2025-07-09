// app/api/blog/fetch/route.js
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(req) {
  const id = req.nextUrl.searchParams.get("id");

  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  const client = await clientPromise;
  const db = client.db("blog");
  const blog = await db.collection("blog").findOne({ _id: new ObjectId(id) });

  if (!blog) {
    return NextResponse.json({ error: "Blog not found" }, { status: 404 });
  }

  blog._id = blog._id.toString(); // stringify for client

  return NextResponse.json({ blog });
}
