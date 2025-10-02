"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Plus, 
  Search, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Eye,
  Calendar,
  Clock,
  User,
  FileText,
  TrendingUp
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content?: string;
  image: string;
  category: string;
  status: "Draft" | "Published" | "Scheduled";
  author: string;
  publishedAt?: string;
  createdAt: string;
  views: number;
  readTime: string;
  featured: boolean;
  tags: string[];
}

const mockBlogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Future of Web Development: Trends to Watch in 2024",
    excerpt: "Explore the cutting-edge technologies and methodologies shaping the web development landscape this year, from AI-powered tools to serverless architectures.",
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=300&auto=format&fit=crop",
    category: "Web Development",
    status: "Published",
    author: "John Doe",
    publishedAt: "2024-01-15",
    createdAt: "2024-01-12",
    views: 2340,
    readTime: "7 min read",
    featured: true,
    tags: ["Web Development", "AI", "Serverless", "2024 Trends"],
  },
  {
    id: 2,
    title: "Mastering SEO: Essential Strategies for Modern Websites",
    excerpt: "Unlock the secrets to higher search engine rankings with our comprehensive guide to SEO best practices, including keyword research and optimization.",
    image: "https://images.unsplash.com/photo-1557804506-669a67965da0?q=80&w=300&auto=format&fit=crop",
    category: "SEO",
    status: "Draft",
    author: "Jane Smith",
    createdAt: "2024-01-10",
    views: 0,
    readTime: "5 min read",
    featured: false,
    tags: ["SEO", "Marketing", "Keywords", "Optimization"],
  },
  {
    id: 3,
    title: "UI/UX Design Principles for High-Converting Websites",
    excerpt: "Discover how user-centric design can significantly boost your website's conversion rates. Learn about intuitive interfaces and compelling visuals.",
    image: "https://images.unsplash.com/photo-1522199755839-e2ba9b43d813?q=80&w=300&auto=format&fit=crop",
    category: "Design",
    status: "Published",
    author: "Alex Johnson",
    publishedAt: "2024-01-08",
    createdAt: "2024-01-05",
    views: 1850,
    readTime: "6 min read",
    featured: true,
    tags: ["UI/UX", "Design", "Conversion", "User Experience"],
  },
  {
    id: 4,
    title: "Building Scalable Web Applications with Microservices",
    excerpt: "Dive into the world of microservices architecture and learn how to design and implement highly scalable, resilient web applications.",
    image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=300&auto=format&fit=crop",
    category: "Architecture",
    status: "Scheduled",
    author: "John Doe",
    publishedAt: "2024-01-25",
    createdAt: "2024-01-18",
    views: 0,
    readTime: "8 min read",
    featured: false,
    tags: ["Microservices", "Architecture", "Scalability", "Backend"],
  },
];

const statusColors = {
  "Draft": "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
  "Published": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  "Scheduled": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
};

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>(mockBlogPosts);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || post.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || post.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleDeletePost = (id: number) => {
    setPosts(posts.filter(p => p.id !== id));
  };

  const categories = [...new Set(posts.map(post => post.category))];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Blog Posts</h1>
          <p className="text-muted-foreground">
            Create and manage your blog content to engage your audience.
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Write New Post
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Posts</p>
                <p className="text-2xl font-bold">{posts.length}</p>
              </div>
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Published</p>
                <p className="text-2xl font-bold">{posts.filter(p => p.status === "Published").length}</p>
              </div>
              <Eye className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Views</p>
                <p className="text-2xl font-bold">{posts.reduce((sum, post) => sum + post.views, 0).toLocaleString()}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Drafts</p>
                <p className="text-2xl font-bold">{posts.filter(p => p.status === "Draft").length}</p>
              </div>
              <Edit className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Published">Published</SelectItem>
                <SelectItem value="Draft">Draft</SelectItem>
                <SelectItem value="Scheduled">Scheduled</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Posts List */}
      <div className="space-y-6">
        {filteredPosts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Image */}
                  <div className="lg:w-48 lg:flex-shrink-0">
                    <div className="aspect-video lg:aspect-square relative overflow-hidden rounded-lg">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge className={statusColors[post.status]}>
                            {post.status}
                          </Badge>
                          {post.featured && (
                            <Badge variant="outline">Featured</Badge>
                          )}
                          <Badge variant="secondary">{post.category}</Badge>
                        </div>
                        <h3 className="text-xl font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-muted-foreground line-clamp-2">
                          {post.excerpt}
                        </p>
                      </div>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="w-4 h-4 mr-2" />
                            View Post
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Post
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-red-600"
                            onClick={() => handleDeletePost(post.id)}
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {post.status === "Published" && post.publishedAt
                            ? `Published ${new Date(post.publishedAt).toLocaleDateString()}`
                            : post.status === "Scheduled" && post.publishedAt
                            ? `Scheduled for ${new Date(post.publishedAt).toLocaleDateString()}`
                            : `Created ${new Date(post.createdAt).toLocaleDateString()}`}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{post.readTime}</span>
                      </div>
                      {post.status === "Published" && (
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          <span>{post.views.toLocaleString()} views</span>
                        </div>
                      )}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {post.tags.slice(0, 4).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {post.tags.length > 4 && (
                        <Badge variant="outline" className="text-xs">
                          +{post.tags.length - 4}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredPosts.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No blog posts found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || statusFilter !== "all" || categoryFilter !== "all"
                ? "Try adjusting your search or filters."
                : "Get started by writing your first blog post."}
            </p>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Write New Post
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
