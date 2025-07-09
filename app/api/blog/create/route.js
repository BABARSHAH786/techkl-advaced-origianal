import { connectToDatabase } from '@/lib/database'; // ✅ NEW, safe addition
import { Blog } from '@/models/Blog';

export async function POST(req) {
  try {
    await connectToDatabase(); // ✅ connect safely

    const body = await req.json();
    console.log('📦 Incoming Body:', body);

    const blog = await Blog.create({
      ...body,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    console.log('✅ Blog saved:', blog);

    return new Response(JSON.stringify(blog), { status: 201 });
  } catch (error) {
    console.error('❌ Error creating blog:', error);
    return new Response(JSON.stringify({ error: 'Failed to create blog' }), {
      status: 500,
    });
  }
}
