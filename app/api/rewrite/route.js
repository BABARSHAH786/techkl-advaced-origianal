import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req) {
  const { title, description } = await req.json();

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `
  Rewrite the following news title and description to be original and SEO-friendly, without changing the meaning.

  Title: "${title}"
  Description: "${description}"

  Respond in this format:
  {
    "title": "...",
    "description": "..."
  }
  `;

  try {
    const result = await model.generateContent(prompt);
    const raw = result.response.text();

    // Try to clean and parse the response
    const json = JSON.parse(raw.trim());
    return new Response(JSON.stringify(json), { status: 200 });
  } catch (err) {
    console.error("Rewrite error:", err);
    return new Response(JSON.stringify({ error: "Rewrite failed" }), { status: 500 });
  }
}
