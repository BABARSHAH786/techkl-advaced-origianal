"use client"

import { useState, useEffect, useCallback } from "react"

export interface BlogPost {
  id: number
  title: string
  excerpt: string
  content: string
  author: string
  date: string
  tags: string[]
  published: boolean
  image?: string
  readTime?: string
}

const BLOG_STORAGE_KEY = "techkl_blog_posts"

// Default sample posts to initialize with
const defaultPosts: BlogPost[] = [
  {
    id: 1,
    title: "Getting Started with React 18: New Features and Best Practices",
    excerpt:
      "Explore the latest features in React 18 including concurrent rendering, automatic batching, and Suspense improvements.",
    content: `
      <h2>Introduction to React 18</h2>
      <p>React 18 introduces several groundbreaking features that enhance performance and developer experience. In this comprehensive guide, we'll explore the most important updates and how to implement them in your projects.</p>
      
      <h3>Concurrent Rendering</h3>
      <p>One of the most significant additions is concurrent rendering, which allows React to interrupt rendering work to handle high-priority updates. This means your app can stay responsive even during heavy rendering tasks.</p>
      
      <h3>Automatic Batching</h3>
      <p>React 18 automatically batches multiple state updates for better performance. This reduces the number of re-renders and improves your app's efficiency.</p>
      
      <h3>New Hooks</h3>
      <p>Several new hooks have been introduced, including useId, useDeferredValue, and useTransition, each designed to solve specific performance and user experience challenges.</p>
      
      <h3>Suspense Improvements</h3>
      <p>Suspense has been enhanced to work better with server-side rendering and provides more granular control over loading states.</p>
      
      <h3>Getting Started</h3>
      <p>To upgrade to React 18, simply update your dependencies and replace ReactDOM.render with createRoot. Here's a quick example:</p>
      
      <pre><code>
// Before (React 17)
ReactDOM.render(&lt;App /&gt;, document.getElementById('root'));

// After (React 18)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(&lt;App /&gt;);
      </code></pre>
      
      <p>With these changes, you'll be ready to take advantage of all the new features React 18 has to offer!</p>
    `,
    author: "TechKL Team",
    date: "2024-01-15",
    tags: ["React", "JavaScript", "Frontend"],
    published: true,
    image: "/placeholder.svg?height=300&width=600",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "Understanding TypeScript: A Comprehensive Guide for Beginners",
    excerpt:
      "Learn TypeScript fundamentals, type annotations, interfaces, and how to integrate it into your JavaScript projects.",
    content: `
      <h2>What is TypeScript?</h2>
      <p>TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale. Developed by Microsoft, it adds static type definitions to JavaScript, helping you catch errors early and write more maintainable code.</p>
      
      <h3>Why Use TypeScript?</h3>
      <ul>
        <li><strong>Type Safety:</strong> Catch errors at compile time rather than runtime</li>
        <li><strong>Better IDE Support:</strong> Enhanced autocomplete, refactoring, and navigation</li>
        <li><strong>Self-Documenting Code:</strong> Types serve as inline documentation</li>
        <li><strong>Easier Refactoring:</strong> Confident code changes with type checking</li>
      </ul>
      
      <h3>Basic Types</h3>
      <p>TypeScript provides several basic types including:</p>
      <ul>
        <li><code>string</code> - Text data</li>
        <li><code>number</code> - Numeric values</li>
        <li><code>boolean</code> - True/false values</li>
        <li><code>array</code> - Collections of values</li>
        <li><code>object</code> - Complex data structures</li>
      </ul>
      
      <h3>Interfaces and Types</h3>
      <p>Define the shape of objects using interfaces:</p>
      
      <pre><code>
interface User {
  id: number;
  name: string;
  email: string;
  isActive?: boolean; // Optional property
}

const user: User = {
  id: 1,
  name: "John Doe",
  email: "john@example.com"
};
      </code></pre>
      
      <h3>Getting Started</h3>
      <p>Install TypeScript globally and start using it in your projects:</p>
      
      <pre><code>
npm install -g typescript
tsc --init
      </code></pre>
      
      <p>TypeScript is an excellent choice for any JavaScript project, from small scripts to large applications!</p>
    `,
    author: "Sarah Johnson",
    date: "2024-01-10",
    tags: ["TypeScript", "JavaScript", "Programming"],
    published: true,
    image: "/placeholder.svg?height=300&width=600",
    readTime: "8 min read",
  },
  {
    id: 3,
    title: "Building Responsive Web Applications with Tailwind CSS",
    excerpt: "Master the art of responsive design using Tailwind CSS utility classes and modern CSS techniques.",
    content: `
      <h2>Introduction to Tailwind CSS</h2>
      <p>Tailwind CSS is a utility-first CSS framework that provides low-level utility classes to build custom designs without writing custom CSS. It's designed to be highly customizable and helps you build modern web applications quickly.</p>
      
      <h3>Why Choose Tailwind CSS?</h3>
      <ul>
        <li><strong>Utility-First:</strong> Build complex components from simple utilities</li>
        <li><strong>Responsive Design:</strong> Built-in responsive design utilities</li>
        <li><strong>Customizable:</strong> Easy to customize and extend</li>
        <li><strong>Performance:</strong> Only includes the CSS you actually use</li>
      </ul>
      
      <h3>Responsive Design Made Easy</h3>
      <p>Tailwind makes responsive design simple with its mobile-first approach. Use responsive prefixes to apply styles at different breakpoints:</p>
      
      <pre><code>
&lt;div class="w-full md:w-1/2 lg:w-1/3"&gt;
  &lt;!-- Full width on mobile, half on tablet, third on desktop --&gt;
&lt;/div&gt;
      </code></pre>
      
      <h3>Common Responsive Patterns</h3>
      <p>Here are some common responsive patterns using Tailwind:</p>
      
      <h4>Responsive Grid</h4>
      <pre><code>
&lt;div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"&gt;
  &lt;!-- Grid items --&gt;
&lt;/div&gt;
      </code></pre>
      
      <h4>Responsive Typography</h4>
      <pre><code>
&lt;h1 class="text-2xl md:text-4xl lg:text-6xl font-bold"&gt;
  Responsive Heading
&lt;/h1&gt;
      </code></pre>
      
      <h3>Best Practices</h3>
      <ul>
        <li>Start with mobile design first</li>
        <li>Use consistent spacing scales</li>
        <li>Leverage Tailwind's design system</li>
        <li>Customize your configuration file</li>
        <li>Use component extraction for repeated patterns</li>
      </ul>
      
      <h3>Getting Started</h3>
      <p>Install Tailwind CSS in your project:</p>
      
      <pre><code>
npm install tailwindcss
npx tailwindcss init
      </code></pre>
      
      <p>Tailwind CSS is perfect for building modern, responsive web applications with a consistent design system!</p>
    `,
    author: "Mike Chen",
    date: "2024-01-05",
    tags: ["CSS", "Tailwind", "Responsive Design"],
    published: true,
    image: "/placeholder.svg?height=300&width=600",
    readTime: "6 min read",
  },
]

export function useBlogData() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  // Load posts from localStorage
  const loadPosts = useCallback(() => {
    try {
      const savedPosts = localStorage.getItem(BLOG_STORAGE_KEY)
      if (savedPosts) {
        const parsedPosts = JSON.parse(savedPosts)
        setPosts(parsedPosts)
      } else {
        // Initialize with default posts
        setPosts(defaultPosts)
        localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(defaultPosts))
      }
    } catch (error) {
      console.error("Error loading blog posts:", error)
      setPosts(defaultPosts)
    } finally {
      setLoading(false)
    }
  }, [])

  // Save posts to localStorage
  const savePosts = useCallback((updatedPosts: BlogPost[]) => {
    try {
      setPosts(updatedPosts)
      localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(updatedPosts))
    } catch (error) {
      console.error("Error saving blog posts:", error)
    }
  }, [])

  // Create a new post
  const createPost = useCallback(
    (postData: Omit<BlogPost, "id">) => {
      const newPost: BlogPost = {
        ...postData,
        id: Date.now(), // Simple ID generation
      }
      const updatedPosts = [...posts, newPost]
      savePosts(updatedPosts)
      return newPost
    },
    [posts, savePosts],
  )

  // Update an existing post
  const updatePost = useCallback(
    (id: number, postData: Partial<BlogPost>) => {
      const updatedPosts = posts.map((post) => (post.id === id ? { ...post, ...postData } : post))
      savePosts(updatedPosts)
    },
    [posts, savePosts],
  )

  // Delete a post
  const deletePost = useCallback(
    (id: number) => {
      const updatedPosts = posts.filter((post) => post.id !== id)
      savePosts(updatedPosts)
    },
    [posts, savePosts],
  )

  // Get published posts only
  const getPublishedPosts = useCallback(() => {
    return posts.filter((post) => post.published)
  }, [posts])

  // Get post by ID
  const getPostById = useCallback(
    (id: number) => {
      return posts.find((post) => post.id === id)
    },
    [posts],
  )

  useEffect(() => {
    loadPosts()
  }, [loadPosts])

  return {
    posts,
    loading,
    createPost,
    updatePost,
    deletePost,
    getPublishedPosts,
    getPostById,
    refreshPosts: loadPosts,
  }
}
