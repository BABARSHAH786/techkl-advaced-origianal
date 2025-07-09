import { connectToDatabase } from '@/lib/database';
import { Blog } from '@/models/Blog';

export async function PUT(req) {
  try {
    await connectToDatabase();
    const body = await req.json();

    const updated = await Blog.findByIdAndUpdate(
      body._id,
      {
        ...body,
        updatedAt: new Date(),
      },
      { new: true }
    );

    if (!updated) throw new Error('Blog not found');

    return new Response(JSON.stringify(updated), { status: 200 });
  } catch (error) {
    console.error('❌ Error updating blog:', error);
    return new Response(JSON.stringify({ error: 'Failed to update blog' }), {
      status: 500,
    });
  }
}
