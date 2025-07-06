"use client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

// ✅ RSS sources (19 total)
const RSS_FEEDS = [
  { name: "BBC World", url: "https://feeds.bbci.co.uk/news/world/rss.xml", color: "blue-700" },
  { name: "Dawn (Pakistan)", url: "https://www.dawn.com/feeds/home", color: "green-700" },
  { name: "ARY News", url: "https://arynews.tv/feed/", color: "red-700" },
  { name: "Al Jazeera", url: "https://www.aljazeera.com/xml/rss/all.xml", color: "purple-700" },
  // { name: "CNN", url: "https://rss.cnn.com/rss/cnn_topstories.rss", color: "rose-700" },
  // { name: "Reuters", url: "https://feeds.reuters.com/reuters/topNews", color: "teal-700" },
  { name: "The Guardian", url: "https://www.theguardian.com/world/rss", color: "amber-700" },
  // { name: "Express Tribune", url: "https://tribune.com.pk/feed", color: "yellow-700" },
  // { name: "Geo News", url: "https://urdu.geo.tv/rss/latest.xml", color: "sky-700" },
  // { name: "Samaa TV", url: "https://www.samaa.tv/feed/", color: "cyan-700" },
  { name: "CNBC", url: "https://www.cnbc.com/id/100003114/device/rss/rss.html", color: "orange-700" },
  { name: "TechCrunch", url: "https://techcrunch.com/feed/", color: "lime-700" },
  { name: "Wired", url: "https://www.wired.com/feed/rss", color: "fuchsia-700" },
  // { name: "VOA News", url: "https://www.voanews.com/rss", color: "violet-700" },
  // { name: "Bloomberg", url: "https://www.bloomberg.com/feed/podcast/bloombergaudio.xml", color: "gray-700" },
  // Indian
  { name: "The Hindu", url: "https://www.thehindu.com/news/national/feeder/default.rss", color: "indigo-700" },
  { name: "Times of India", url: "https://timesofindia.indiatimes.com/rssfeeds/-2128936835.cms", color: "orange-800" },
  { name: "NDTV India", url: "https://feeds.feedburner.com/ndtvnews-india-news", color: "blue-900" },
  { name: "India Today", url: "https://www.indiatoday.in/rss/home", color: "green-900" },
];

// 🧠 Cache rewritten content per link
const rewriteCache = new Map();

// 🔧 Util to get image
const getImage = (item) =>
  item.thumbnail ||
  item.enclosure?.link ||
  item.enclosure?.url ||
  item.media?.content?.url ||
  null;

// 🧽 Strip HTML
const stripHtml = (html) => {
  if (typeof window === "undefined") return html;
  const temp = document.createElement("div");
  temp.innerHTML = html;
  return temp.textContent || temp.innerText || "";
};

// ✂️ Trim long text
const trimText = (text, maxLength = 160) =>
  text.length > maxLength ? text.slice(0, maxLength) + "..." : text;

// ✅ Safe <img> component (no flicker)
function NewsImage({ src, alt }) {
  const [error, setError] = useState(false);
  const finalSrc = error || !src ? "/no-images.jpeg" : src;

  return (
    <img
      src={finalSrc}
      alt={alt}
      onError={() => setError(true)}
      className="w-full h-40 object-cover"
    />
  );
}

// 🤖 Gemini AI Rewriting
async function rewriteNewsItem(item) {
  const cacheKey = item.link;
  if (rewriteCache.has(cacheKey)) return rewriteCache.get(cacheKey);

  try {
    const res = await fetch("/api/rewrite", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: item.title, description: item.description }),
    });

    const data = await res.json();
    if (data?.title && data?.description) {
      const clean = {
        title: stripHtml(data.title),
        description: stripHtml(data.description),
      };
      rewriteCache.set(cacheKey, clean);
      return clean;
    }
  } catch (err) {
    console.error("Gemini error:", err);
  }

  const fallback = {
    title: stripHtml(item.title),
    description: stripHtml(item.description),
  };
  rewriteCache.set(cacheKey, fallback);
  return fallback;
}

export default function NewsFetch() {
  const [newsData, setNewsData] = useState({});
  const [search, setSearch] = useState("");
  const [rewrittenData, setRewrittenData] = useState({});

  // 📰 Fetch RSS feeds
  useEffect(() => {
    RSS_FEEDS.forEach(({ name, url }) => {
      const proxy = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(url)}`;
      fetch(proxy)
        .then((res) => res.json())
        .then((data) => {
          setNewsData((prev) => ({ ...prev, [name]: data.items || [] }));
        })
        .catch((e) => console.error(`Failed to fetch ${name}:`, e));
    });
  }, []);

  // ✨ Rewrite with Gemini
  useEffect(() => {
    Object.entries(newsData).forEach(([source, items]) => {
      items.slice(0, 6).forEach(async (item) => {
        const rewritten = await rewriteNewsItem(item);
        setRewrittenData((prev) => ({
          ...prev,
          [item.link]: rewritten,
        }));
      });
    });
  }, [newsData]);

  const filterNews = (items) =>
    items.filter(
      (item) =>
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-12">
      <Input
        type="text"
        placeholder="Search all news..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border p-2 shadow-md mb-8"
      />

      {RSS_FEEDS.map(({ name, color }) => (
        <section key={name}>
          <h2 className={`text-2xl font-bold mb-4 text-${color}`}>🗞️ {name}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filterNews(newsData[name] || []).slice(0, 6).map((item, idx) => {
              const rewritten = rewrittenData[item.link];
              const imageSrc = getImage(item);

              return (
                <div
                  key={idx}
                  className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition"
                >
                  <NewsImage src={imageSrc} alt={stripHtml(item.title)} />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-1 line-clamp-2">
                      📝 {rewritten ? trimText(rewritten.title, 100) : "Rewriting..."}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-3">
                      {rewritten ? trimText(rewritten.description, 180) : ""}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">Source: {name}</p>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 underline mt-2 inline-block"
                    >
                      Read full article →
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
