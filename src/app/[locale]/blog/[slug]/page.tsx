"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Eye,
  Heart,
  Share2,
  BookmarkPlus,
  MessageCircle,
  ThumbsUp,
  Twitter,
  Facebook,
  Linkedin,
  Copy,
  Tag,
  User,
} from "lucide-react";

// Mock blog posts data
const blogPosts = {
  "future-web-development-2024": {
    id: 1,
    title: "The Future of Web Development: Trends to Watch in 2024",
    slug: "future-web-development-2024",
    excerpt: "Explore the cutting-edge technologies and methodologies shaping the web development landscape this year, from AI-powered tools to serverless architectures.",
    content: `
      <h2>Introduction</h2>
      <p>The web development landscape is constantly evolving, and 2024 promises to be a year of significant transformation. As we navigate through an era of rapid technological advancement, developers and businesses alike must stay ahead of the curve to remain competitive.</p>
      
      <h2>AI-Powered Development Tools</h2>
      <p>Artificial Intelligence is revolutionizing how we write, test, and deploy code. From GitHub Copilot to ChatGPT, AI assistants are becoming indispensable tools for developers worldwide.</p>
      
      <h3>Key Benefits:</h3>
      <ul>
        <li>Faster code generation and debugging</li>
        <li>Automated testing and quality assurance</li>
        <li>Intelligent code suggestions and optimizations</li>
        <li>Natural language to code conversion</li>
      </ul>
      
      <h2>Serverless Architecture</h2>
      <p>Serverless computing continues to gain momentum, offering developers the ability to build and deploy applications without managing infrastructure. This approach reduces costs, improves scalability, and accelerates development cycles.</p>
      
      <blockquote>
        "Serverless is not about eliminating servers, but about eliminating the need to think about servers." - Anonymous Developer
      </blockquote>
      
      <h2>Progressive Web Apps (PWAs)</h2>
      <p>PWAs are bridging the gap between web and native applications, providing users with app-like experiences directly in their browsers. With improved offline capabilities and push notifications, PWAs are becoming the preferred choice for many businesses.</p>
      
      <h2>WebAssembly (WASM)</h2>
      <p>WebAssembly is enabling high-performance applications to run in browsers, opening up new possibilities for web development. From gaming to data visualization, WASM is pushing the boundaries of what's possible on the web.</p>
      
      <h2>Conclusion</h2>
      <p>As we move forward in 2024, these trends will continue to shape the future of web development. Staying informed and adapting to these changes will be crucial for developers and businesses looking to succeed in the digital landscape.</p>
    `,
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=2070&auto=format&fit=crop",
    category: {
      name: "Web Development",
      color: "bg-blue-500/10 text-blue-500",
    },
    author: {
      name: "John Doe",
      role: "Senior Developer",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop",
      bio: "John is a senior full-stack developer with over 8 years of experience in modern web technologies. He specializes in React, Node.js, and cloud architecture.",
    },
    publishedAt: "2024-03-15",
    readTime: "7 min read",
    views: 1250,
    likes: 89,
    tags: ["Web Development", "AI", "Serverless", "PWA", "WebAssembly"],
    featured: true,
  },
  "seo-strategies-2024": {
    id: 2,
    title: "Mastering SEO: Essential Strategies for Modern Websites",
    slug: "seo-strategies-2024",
    excerpt: "Unlock the secrets to higher search engine rankings with our comprehensive guide to SEO best practices, including keyword research, on-page optimization, and link building.",
    content: `
      <h2>Understanding Modern SEO</h2>
      <p>Search Engine Optimization has evolved significantly over the years. Today's SEO is about creating valuable, user-focused content that naturally attracts both users and search engines.</p>
      
      <h2>Keyword Research in 2024</h2>
      <p>Effective keyword research goes beyond search volume. It's about understanding user intent and creating content that matches what your audience is actually looking for.</p>
      
      <h3>Tools for Keyword Research:</h3>
      <ul>
        <li>Google Keyword Planner</li>
        <li>Ahrefs Keywords Explorer</li>
        <li>SEMrush Keyword Magic Tool</li>
        <li>Ubersuggest</li>
      </ul>
      
      <h2>On-Page Optimization</h2>
      <p>On-page SEO involves optimizing individual web pages to rank higher and earn more relevant traffic. This includes optimizing title tags, meta descriptions, headers, and content.</p>
      
      <h2>Technical SEO</h2>
      <p>Technical SEO ensures that search engines can crawl and index your website effectively. This includes site speed optimization, mobile responsiveness, and proper URL structure.</p>
      
      <h2>Content Strategy</h2>
      <p>High-quality, relevant content remains the cornerstone of effective SEO. Focus on creating comprehensive, well-researched content that provides real value to your audience.</p>
    `,
    image: "https://images.unsplash.com/photo-1557804506-669a67965da0?q=80&w=2070&auto=format&fit=crop",
    category: {
      name: "SEO Optimization",
      color: "bg-green-500/10 text-green-500",
    },
    author: {
      name: "Jane Smith",
      role: "SEO Specialist",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop",
      bio: "Jane is an SEO expert with 6 years of experience helping businesses improve their search engine visibility and organic traffic.",
    },
    publishedAt: "2024-03-10",
    readTime: "5 min read",
    views: 890,
    likes: 67,
    tags: ["SEO", "Digital Marketing", "Content Strategy", "Keywords"],
    featured: false,
  },
};

// Related posts (mock data)
const relatedPosts = [
  {
    id: 3,
    title: "UI/UX Design Principles for High-Converting Websites",
    slug: "uiux-design-principles",
    image: "https://images.unsplash.com/photo-1522199755839-e2ba9b43d813?q=80&w=400&auto=format&fit=crop",
    category: "UI/UX Design",
    readTime: "6 min read",
  },
  {
    id: 4,
    title: "Building Scalable Web Applications with Microservices",
    slug: "scalable-microservices",
    image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=400&auto=format&fit=crop",
    category: "Architecture",
    readTime: "8 min read",
  },
  {
    id: 5,
    title: "The Impact of AI on Digital Marketing Strategies",
    slug: "ai-digital-marketing",
    image: "https://images.unsplash.com/photo-1550547640-02594691679b?q=80&w=400&auto=format&fit=crop",
    category: "Marketing",
    readTime: "7 min read",
  },
];

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const locale = params.locale as string;
  
  const [post, setPost] = useState<typeof blogPosts[keyof typeof blogPosts] | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  useEffect(() => {
    // In a real app, you would fetch the post from an API
    const foundPost = Object.values(blogPosts).find(p => p.slug === slug);
    setPost(foundPost || null);
  }, [slug]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    // In a real app, you would send this to your API
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // In a real app, you would send this to your API
  };

  const handleShare = (platform: string) => {
    if (!post) return;
    
    const url = window.location.href;
    const title = post.title;
    
    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`);
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`);
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        // Show success message
        const successMsg = document.createElement('div');
        successMsg.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50';
        successMsg.textContent = 'Link copied to clipboard!';
        document.body.appendChild(successMsg);
        setTimeout(() => successMsg.remove(), 2000);
        break;
    }
    setShowShareMenu(false);
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Post Not Found</h1>
          <p className="text-muted-foreground mb-6">The blog post you&apos;re looking for doesn&apos;t exist.</p>
          <Link href={`/${locale}`}>
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <Link href={`/${locale}`}>
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>

      <article className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Article Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-6">
            <Badge className={post.category.color}>
              {post.category.name}
            </Badge>
            {post.featured && (
              <Badge variant="secondary">Featured</Badge>
            )}
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            {post.title}
          </h1>

          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            {post.excerpt}
          </p>

          {/* Article Meta */}
          <div className="flex flex-wrap items-center gap-6 mb-8">
            <div className="flex items-center gap-3">
              <Avatar className="w-12 h-12">
                <AvatarImage src={post.author.avatar} alt={post.author.name} />
                <AvatarFallback>
                  {post.author.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{post.author.name}</p>
                <p className="text-sm text-muted-foreground">{post.author.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
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
                {post.views} views
              </div>
            </div>
          </div>

          {/* Social Actions */}
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant={isLiked ? "default" : "outline"}
              size="sm"
              onClick={handleLike}
              className="gap-2"
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
              {post.likes + (isLiked ? 1 : 0)}
            </Button>

            <Button
              variant={isBookmarked ? "default" : "outline"}
              size="sm"
              onClick={handleBookmark}
              className="gap-2"
            >
              <BookmarkPlus className="w-4 h-4" />
              {isBookmarked ? 'Saved' : 'Save'}
            </Button>

            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="gap-2"
              >
                <Share2 className="w-4 h-4" />
                Share
              </Button>

              {showShareMenu && (
                <div className="absolute top-full left-0 mt-2 bg-card border rounded-lg shadow-lg p-2 z-10">
                  <div className="flex flex-col gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleShare('twitter')}
                      className="justify-start gap-2"
                    >
                      <Twitter className="w-4 h-4" />
                      Twitter
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleShare('facebook')}
                      className="justify-start gap-2"
                    >
                      <Facebook className="w-4 h-4" />
                      Facebook
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleShare('linkedin')}
                      className="justify-start gap-2"
                    >
                      <Linkedin className="w-4 h-4" />
                      LinkedIn
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleShare('copy')}
                      className="justify-start gap-2"
                    >
                      <Copy className="w-4 h-4" />
                      Copy Link
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.header>

        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="relative aspect-video rounded-xl overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </motion.div>

        {/* Article Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="prose prose-lg max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 mb-4">
            <Tag className="w-4 h-4" />
            <span className="font-semibold">Tags:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag, index) => (
              <Badge key={index} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </motion.div>

        {/* Author Bio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-muted/50 rounded-xl p-6 mb-12"
        >
          <div className="flex items-start gap-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src={post.author.avatar} alt={post.author.name} />
              <AvatarFallback>
                {post.author.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-xl font-semibold mb-2">About {post.author.name}</h3>
              <p className="text-muted-foreground mb-3">{post.author.bio}</p>
              <Button variant="outline" size="sm">
                <User className="w-4 h-4 mr-2" />
                View Profile
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Related Posts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((relatedPost) => (
              <Link
                key={relatedPost.id}
                href={`/${locale}/blog/${relatedPost.slug}`}
                className="group"
              >
                <div className="bg-card rounded-xl border overflow-hidden hover:border-primary/50 transition-all">
                  <div className="relative aspect-video">
                    <Image
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <Badge variant="secondary" className="mb-2">
                      {relatedPost.category}
                    </Badge>
                    <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                      {relatedPost.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {relatedPost.readTime}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      </article>
    </div>
  );
}
