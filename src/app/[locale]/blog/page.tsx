"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Search,
  Calendar,
  Clock,
  Eye,
  ArrowRight,
  Filter,
  Grid3X3,
  List,
  TrendingUp,
  BookOpen,
  Tag,
} from "lucide-react";

// Mock blog posts data
const blogPosts = [
  {
    id: 1,
    title: "The Future of Web Development: Trends to Watch in 2024",
    slug: "future-web-development-2024",
    excerpt: "Explore the cutting-edge technologies and methodologies shaping the web development landscape this year, from AI-powered tools to serverless architectures.",
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=2070&auto=format&fit=crop",
    category: {
      name: "Web Development",
      color: "bg-blue-500/10 text-blue-500",
    },
    author: {
      name: "John Doe",
      role: "Senior Developer",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop",
    },
    publishedAt: "2024-03-15",
    readTime: "7 min read",
    views: 1250,
    featured: true,
  },
  {
    id: 2,
    title: "Mastering SEO: Essential Strategies for Modern Websites",
    slug: "seo-strategies-2024",
    excerpt: "Unlock the secrets to higher search engine rankings with our comprehensive guide to SEO best practices, including keyword research, on-page optimization, and link building.",
    image: "https://images.unsplash.com/photo-1557804506-669a67965da0?q=80&w=2070&auto=format&fit=crop",
    category: {
      name: "SEO Optimization",
      color: "bg-green-500/10 text-green-500",
    },
    author: {
      name: "Jane Smith",
      role: "SEO Specialist",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop",
    },
    publishedAt: "2024-03-10",
    readTime: "5 min read",
    views: 890,
    featured: false,
  },
  {
    id: 3,
    title: "UI/UX Design Principles for High-Converting Websites",
    slug: "uiux-design-principles",
    excerpt: "Discover how user-centric design can significantly boost your website's conversion rates. Learn about intuitive interfaces, compelling visuals, and seamless user journeys.",
    image: "https://images.unsplash.com/photo-1522199755839-e2ba9b43d813?q=80&w=2070&auto=format&fit=crop",
    category: {
      name: "UI/UX Design",
      color: "bg-purple-500/10 text-purple-500",
    },
    author: {
      name: "Alex Johnson",
      role: "UI/UX Designer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop",
    },
    publishedAt: "2024-03-05",
    readTime: "6 min read",
    views: 1100,
    featured: false,
  },
  {
    id: 4,
    title: "Building Scalable Web Applications with Microservices",
    slug: "scalable-microservices",
    excerpt: "Dive into the world of microservices architecture and learn how to design and implement highly scalable, resilient, and maintainable web applications.",
    image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=2070&auto=format&fit=crop",
    category: {
      name: "Architecture",
      color: "bg-orange-500/10 text-orange-500",
    },
    author: {
      name: "John Doe",
      role: "Senior Developer",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop",
    },
    publishedAt: "2024-02-28",
    readTime: "8 min read",
    views: 750,
    featured: true,
  },
  {
    id: 5,
    title: "The Impact of AI on Digital Marketing Strategies",
    slug: "ai-digital-marketing",
    excerpt: "Explore how artificial intelligence is revolutionizing digital marketing, from personalized content creation to predictive analytics and automated campaigns.",
    image: "https://images.unsplash.com/photo-1550547640-02594691679b?q=80&w=2070&auto=format&fit=crop",
    category: {
      name: "Digital Marketing",
      color: "bg-pink-500/10 text-pink-500",
    },
    author: {
      name: "Sarah Connor",
      role: "Marketing Lead",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop",
    },
    publishedAt: "2024-02-20",
    readTime: "7 min read",
    views: 920,
    featured: false,
  },
  {
    id: 6,
    title: "Designing for Accessibility: Creating Inclusive Digital Experiences",
    slug: "accessibility-design",
    excerpt: "Learn the importance of accessible design and how to implement best practices to ensure your website is usable by everyone, regardless of their abilities.",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop",
    category: {
      name: "Accessibility",
      color: "bg-teal-500/10 text-teal-500",
    },
    author: {
      name: "Alex Johnson",
      role: "UI/UX Designer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop",
    },
    publishedAt: "2024-02-15",
    readTime: "5 min read",
    views: 680,
    featured: false,
  },
];

const categories = [
  "All",
  "Web Development",
  "SEO Optimization",
  "UI/UX Design",
  "Architecture",
  "Digital Marketing",
  "Accessibility",
];

export default function BlogPage() {
  const params = useParams();
  const locale = params.locale as string;
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || post.category.name === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <>
      {/* Header */}
      <Header />
      
      <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 border-b">
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Badge className="mb-4">
              <BookOpen className="w-4 h-4 mr-2" />
              Latest Insights
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our Blog
            </h1>
            <p className="text-lg text-muted-foreground">
              Stay updated with the latest trends, tips, and insights from our team of experts 
              in web development, SEO, and design.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-6">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Featured Post */}
        {featuredPost && selectedCategory === "All" && !searchQuery && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-bold">Featured Article</h2>
            </div>
            
            <Link href={`/${locale}/blog/${featuredPost.slug}`} className="group">
              <div className="bg-card rounded-2xl border overflow-hidden hover:border-primary/50 transition-all">
                <div className="grid lg:grid-cols-2 gap-0">
                  <div className="relative aspect-video lg:aspect-auto">
                    <Image
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-4 mb-4">
                      <Badge className={featuredPost.category.color}>
                        {featuredPost.category.name}
                      </Badge>
                      <Badge variant="secondary">Featured</Badge>
                    </div>
                    <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                      {featuredPost.title}
                    </h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(featuredPost.publishedAt).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {featuredPost.readTime}
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {featuredPost.views} views
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Image
                        src={featuredPost.author.avatar}
                        alt={featuredPost.author.name}
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                      <div>
                        <p className="font-medium text-sm">{featuredPost.author.name}</p>
                        <p className="text-xs text-muted-foreground">{featuredPost.author.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Blog Posts Grid/List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">
              {searchQuery ? `Search Results (${filteredPosts.length})` : 'All Articles'}
            </h2>
            <p className="text-muted-foreground">
              {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} found
            </p>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No articles found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search or filter criteria
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className={
              viewMode === "grid" 
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                : "space-y-6"
            }>
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Link href={`/${locale}/blog/${post.slug}`} className="group">
                    <article className={
                      viewMode === "grid"
                        ? "bg-card rounded-xl border overflow-hidden hover:border-primary/50 transition-all h-full flex flex-col"
                        : "bg-card rounded-xl border p-6 hover:border-primary/50 transition-all flex gap-6"
                    }>
                      <div className={
                        viewMode === "grid"
                          ? "relative aspect-video"
                          : "relative w-48 aspect-video flex-shrink-0"
                      }>
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className={`object-cover group-hover:scale-105 transition-transform duration-300 ${
                            viewMode === "grid" ? "" : "rounded-lg"
                          }`}
                        />
                      </div>
                      
                      <div className={viewMode === "grid" ? "p-6 flex-1 flex flex-col" : "flex-1"}>
                        <div className="flex items-center gap-2 mb-3">
                          <Badge className={post.category.color}>
                            {post.category.name}
                          </Badge>
                          {post.featured && (
                            <Badge variant="secondary">Featured</Badge>
                          )}
                        </div>
                        
                        <h3 className={`font-bold mb-3 group-hover:text-primary transition-colors ${
                          viewMode === "grid" ? "text-lg" : "text-xl"
                        }`}>
                          {post.title}
                        </h3>
                        
                        <p className={`text-muted-foreground mb-4 leading-relaxed ${
                          viewMode === "grid" ? "flex-1" : ""
                        }`}>
                          {post.excerpt}
                        </p>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(post.publishedAt).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {post.readTime}
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            {post.views}
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Image
                              src={post.author.avatar}
                              alt={post.author.name}
                              width={32}
                              height={32}
                              className="rounded-full"
                            />
                            <div>
                              <p className="font-medium text-sm">{post.author.name}</p>
                              <p className="text-xs text-muted-foreground">{post.author.role}</p>
                            </div>
                          </div>
                          
                          <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                        </div>
                      </div>
                    </article>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Load More Button */}
        {filteredPosts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12"
          >
            <Button variant="outline" size="lg">
              Load More Articles
            </Button>
          </motion.div>
        )}
      </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}
