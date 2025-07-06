// components/ArticleGrid.jsx

"use client";

export default function ArticleGrid() {
  const articles = [
    {
      title: "How AI is Transforming Software Development",
      summary: "Explore how tools like GitHub Copilot and ChatGPT are reshaping how we write code.",
    },
    {
      title: "Top 5 AI Tools Every Developer Should Know",
      summary: "From TensorFlow to Midjourney, these tools are changing how we build and create.",
    },
    {
      title: "What is Prompt Engineering in AI?",
      summary: "Understand the art of crafting inputs to get optimal results from language models.",
    },
    {
      title: "AI in Cybersecurity: Boon or Threat?",
      summary: "AI can help prevent attacks—but also create smarter ones. Here’s the balance.",
    },
    {
      title: "Beginner’s Guide to Neural Networks",
      summary: "Learn what neural networks are and how they power today's AI innovations.",
    },
    {
      title: "The Rise of No-Code AI Platforms",
      summary: "Build smart apps without writing ML code. Here's how no-code AI works.",
    },
    {
      title: "ChatGPT vs Google Bard: A Comparison",
      summary: "Which AI model is better for research, coding, or creativity? We tested both.",
    },
    {
      title: "AI and Ethics: Where Do We Draw the Line?",
      summary: "Deepfakes, bias, surveillance—here’s where ethics meet technology.",
    },
    {
      title: "AI Tools That Make IT Support Smarter",
      summary: "Automate ticketing, predict failures, and enhance support using AI.",
    },
    {
      title: "Understanding Machine Learning in Simple Terms",
      summary: "A non-technical introduction to what makes machine learning work.",
    },
    {
      title: "Will AI Replace IT Jobs?",
      summary: "Many fear AI will automate IT jobs. Here’s what’s actually happening.",
    },
    {
      title: "Top IT Certifications in the Age of AI",
      summary: "Certs like AWS AI, Microsoft AI-900, and more that boost your career.",
    },
    {
      title: "Real-World Applications of AI in Healthcare",
      summary: "From diagnosis to drug discovery, AI is saving lives.",
    },
    {
      title: "AI-Powered Coding Assistants: Worth It?",
      summary: "How GitHub Copilot and others change your daily coding experience.",
    },
    {
      title: "Top Programming Languages for AI",
      summary: "Why Python dominates—and what others are catching up.",
    },
    {
      title: "Building a Simple AI Chatbot with Python",
      summary: "Learn how to build a basic chatbot using just Python and logic.",
    },
    {
      title: "5 AI Startups to Watch in 2025",
      summary: "These startups are pushing the boundaries of what AI can do.",
    },
    {
      title: "How IT Infrastructure is Evolving with AI",
      summary: "AI is changing how networks, cloud, and support systems are designed.",
    },
    {
      title: "Introduction to Generative AI",
      summary: "Learn what generative AI is and how it creates text, images, and code.",
    },
    {
      title: "AI in Edge Computing: The Next Wave",
      summary: "Smart devices and edge AI are bringing intelligence to the edge of networks.",
    },
  ];

  return (
    <section className="py-12 px-4 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-10">Latest in AI & IT</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {articles.map((article, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 p-6 hover:-translate-y-1"
          >
            <h3 className="text-lg font-semibold mb-2">{article.title}</h3>
            <p className="text-gray-600 text-sm">{article.summary}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
