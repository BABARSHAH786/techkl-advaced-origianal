"use client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input"; // or use native input

const RSS_FEEDS = [
  { name: "BBC World", url: "https://feeds.bbci.co.uk/news/world/rss.xml", color: "blue-700" },
  { name: "Dawn (Pakistan)", url: "https://www.dawn.com/feeds/home", color: "green-700" },
  { name: "ARY News", url: "https://arynews.tv/feed/", color: "red-700" },
  { name: "Al Jazeera", url: "https://www.aljazeera.com/xml/rss/all.xml", color: "purple-700" },
];

export default function NewsFeed() {
  const [newsData, setNewsData] = useState({});
  const [search, setSearch] = useState("");

  useEffect(() => {
    RSS_FEEDS.forEach(({ name, url }) => {
      const proxy = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(url)}`;
      fetch(proxy)
        .then((res) => res.json())
        .then((data) => {
          setNewsData((prev) => ({ ...prev, [name]: data.items || [] }));
        })
        .catch((e) => console.error(`Failed to fetch ${name} feed:`, e));
    });
  }, []);

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
            {(filterNews(newsData[name] || [])).slice(0, 6).map((item, idx) => (
              <a
                key={idx}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition"
              >
                {item.thumbnail && (
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-40 object-cover"
                  />
                )}
                <div className="p-4">
                  <h3 className="font-semibold text-lg line-clamp-2 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-3">{item.description}</p>
                </div>
              </a>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
