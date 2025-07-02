"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Save, X, Lock, Eye, EyeOff, BookOpen } from "lucide-react"
import { useBlogData, type BlogPost } from "@/hooks/use-blog-data"

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const { posts, loading, createPost, updatePost, deletePost } = useBlogData()
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const [isCreating, setIsCreating] = useState(false)

  // Simple authentication (not secure, just for demo)
  const handleLogin = () => {
    if (password === "admin123") {
      setIsAuthenticated(true)
      localStorage.setItem("admin_auth", "true")
    } else {
      alert("Invalid password")
    }
  }

  useEffect(() => {
    const authStatus = localStorage.getItem("admin_auth")
    if (authStatus === "true") {
      setIsAuthenticated(true)
    }
  }, [])

  const handleCreatePost = () => {
    const newPost: Omit<BlogPost, "id"> = {
      title: "",
      excerpt: "",
      content: "",
      author: "TechKL Team",
      date: new Date().toISOString().split("T")[0],
      tags: [],
      published: false,
      image: "/placeholder.svg?height=300&width=600",
      readTime: "5 min read",
    }
    setEditingPost(newPost as BlogPost)
    setIsCreating(true)
  }

  const handleSavePost = () => {
    if (!editingPost) return

    if (isCreating) {
      createPost(editingPost)
    } else {
      updatePost(editingPost.id, editingPost)
    }

    setEditingPost(null)
    setIsCreating(false)
  }

  const handleDeletePost = (id: number) => {
    if (confirm("Are you sure you want to delete this post?")) {
      deletePost(id)
    }
  }

  const handleTogglePublished = (post: BlogPost) => {
    updatePost(post.id, { published: !post.published })
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem("admin_auth")
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center py-12">
        <Card className="w-full max-w-md bg-white/80 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Lock className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl">Admin Access</CardTitle>
            <CardDescription>Enter the admin password to access the content management system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Input
                type="password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleLogin()}
                className="bg-white/50 backdrop-blur-sm"
              />
              <Button onClick={handleLogin} className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                Login
              </Button>
              <p className="text-sm text-gray-500 text-center">Demo password: admin123</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <BookOpen className="h-8 w-8 animate-pulse mx-auto mb-4 text-blue-600" />
            <p className="text-lg text-gray-600">Loading admin dashboard...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="relative z-10 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-2">
                Admin Dashboard
              </h1>
              <p className="text-gray-600">Manage your blog posts and content</p>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                <span>Total Posts: {posts.length}</span>
                <span>Published: {posts.filter((p) => p.published).length}</span>
                <span>Drafts: {posts.filter((p) => !p.published).length}</span>
              </div>
            </div>
            <div className="flex space-x-4">
              <Button
                onClick={handleCreatePost}
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Plus className="mr-2 h-4 w-4" />
                New Post
              </Button>
              <Button variant="outline" onClick={handleLogout} className="bg-white/80 backdrop-blur-sm">
                Logout
              </Button>
            </div>
          </div>

          {/* Edit Form */}
          {editingPost && (
            <Card className="mb-8 bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Edit className="h-5 w-5" />
                  {isCreating ? "Create New Post" : "Edit Post"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                    <Input
                      placeholder="Post title"
                      value={editingPost.title}
                      onChange={(e) =>
                        setEditingPost({
                          ...editingPost,
                          title: e.target.value,
                        })
                      }
                      className="bg-white/50 backdrop-blur-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Author</label>
                    <Input
                      placeholder="Author name"
                      value={editingPost.author}
                      onChange={(e) =>
                        setEditingPost({
                          ...editingPost,
                          author: e.target.value,
                        })
                      }
                      className="bg-white/50 backdrop-blur-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Excerpt *</label>
                  <Textarea
                    placeholder="Brief description of the post"
                    value={editingPost.excerpt}
                    onChange={(e) =>
                      setEditingPost({
                        ...editingPost,
                        excerpt: e.target.value,
                      })
                    }
                    rows={3}
                    className="bg-white/50 backdrop-blur-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Content *</label>
                  <Textarea
                    placeholder="Post content (HTML allowed)"
                    value={editingPost.content}
                    onChange={(e) =>
                      setEditingPost({
                        ...editingPost,
                        content: e.target.value,
                      })
                    }
                    rows={15}
                    className="bg-white/50 backdrop-blur-sm font-mono text-sm"
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                    <Input
                      type="date"
                      value={editingPost.date}
                      onChange={(e) =>
                        setEditingPost({
                          ...editingPost,
                          date: e.target.value,
                        })
                      }
                      className="bg-white/50 backdrop-blur-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Read Time</label>
                    <Input
                      placeholder="e.g., 5 min read"
                      value={editingPost.readTime || ""}
                      onChange={(e) =>
                        setEditingPost({
                          ...editingPost,
                          readTime: e.target.value,
                        })
                      }
                      className="bg-white/50 backdrop-blur-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                    <Input
                      placeholder="Image URL"
                      value={editingPost.image || ""}
                      onChange={(e) =>
                        setEditingPost({
                          ...editingPost,
                          image: e.target.value,
                        })
                      }
                      className="bg-white/50 backdrop-blur-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                  <Input
                    placeholder="Tags (comma separated)"
                    value={editingPost.tags.join(", ")}
                    onChange={(e) =>
                      setEditingPost({
                        ...editingPost,
                        tags: e.target.value
                          .split(",")
                          .map((tag) => tag.trim())
                          .filter(Boolean),
                      })
                    }
                    className="bg-white/50 backdrop-blur-sm"
                  />
                </div>

                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingPost.published}
                      onChange={(e) =>
                        setEditingPost({
                          ...editingPost,
                          published: e.target.checked,
                        })
                      }
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm font-medium text-gray-700">Published</span>
                  </label>
                </div>

                <div className="flex space-x-4 pt-4 border-t">
                  <Button
                    onClick={handleSavePost}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Save Post
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setEditingPost(null)
                      setIsCreating(false)
                    }}
                    className="bg-white/50 backdrop-blur-sm"
                  >
                    <X className="mr-2 h-4 w-4" />
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Posts List */}
          <div className="grid gap-6">
            {posts.map((post) => (
              <Card
                key={post.id}
                className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <CardTitle className="text-xl">{post.title}</CardTitle>
                        <Badge variant={post.published ? "default" : "secondary"} className="ml-2">
                          {post.published ? (
                            <>
                              <Eye className="w-3 h-3 mr-1" />
                              Published
                            </>
                          ) : (
                            <>
                              <EyeOff className="w-3 h-3 mr-1" />
                              Draft
                            </>
                          )}
                        </Badge>
                      </div>
                      <CardDescription className="mb-3">{post.excerpt}</CardDescription>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>By {post.author}</span>
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                        {post.readTime && <span>{post.readTime}</span>}
                        <div className="flex space-x-1">
                          {post.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleTogglePublished(post)}
                        className="bg-white/50 backdrop-blur-sm"
                      >
                        {post.published ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setEditingPost(post)}
                        className="bg-white/50 backdrop-blur-sm"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeletePost(post.id)}
                        className="bg-white/50 backdrop-blur-sm hover:bg-red-50 hover:border-red-200 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>

          {posts.length === 0 && (
            <div className="text-center py-16">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No blog posts yet</h3>
              <p className="text-gray-600 mb-6">Create your first blog post to get started.</p>
              <Button
                onClick={handleCreatePost}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Plus className="mr-2 h-4 w-4" />
                Create Your First Post
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
