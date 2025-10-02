"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  Clock, 
  ArrowRight, 
  User,
  Tag,
  TrendingUp,
  Code,
  Palette,
  Search
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  category: {
    name: string;
    color: string;
    icon: React.ReactNode;
  };
  publishedAt: string;
  readTime: string;
  image: string;
  featured: boolean;
  tags: string[];
}

export function BlogSection() {
  const t = useTranslations("blog");

  const blogPosts: BlogPost[] = [
    {
      id: "1",
      title: "The Future of Web Development: Trends to Watch in 2024",
      excerpt: "Explore the latest trends shaping the web development landscape, from AI integration to progressive web apps and beyond.",
      content: "Full article content here...",
      author: {
        name: "Marco Rossi",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
        role: "Senior Developer"
      },
      category: {
        name: "Web Development",
        color: "bg-blue-500",
        icon: <Code className="w-4 h-4" />
      },
      publishedAt: "2024-01-15",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop",
      featured: true,
      tags: ["React", "Next.js", "AI", "Trends"]
    },
    {
      id: "2",
      title: "SEO Best Practices for Modern Websites",
      excerpt: "Learn how to optimize your website for search engines with the latest SEO techniques and strategies that actually work.",
      content: "Full article content here...",
      author: {
        name: "Sofia Martinez",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
        role: "SEO Specialist"
      },
      category: {
        name: "SEO",
        color: "bg-green-500",
        icon: <TrendingUp className="w-4 h-4" />
      },
      publishedAt: "2024-01-12",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&h=600&fit=crop",
      featured: false,
      tags: ["SEO", "Marketing", "Analytics"]
    },
    {
      id: "3",
      title: "UI/UX Design Principles That Drive Conversions",
      excerpt: "Discover the design principles that not only look great but also convert visitors into customers and boost your business.",
      content: "Full article content here...",
      author: {
        name: "Elena Bianchi",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
        role: "UI/UX Designer"
      },
      category: {
        name: "UI/UX Design",
        color: "bg-purple-500",
        icon: <Palette className="w-4 h-4" />
      },
      publishedAt: "2024-01-10",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop",
      featured: false,
      tags: ["Design", "UX", "Conversion"]
    },
    {
      id: "4",
      title: "Building Scalable Applications with Modern Architecture",
      excerpt: "A deep dive into microservices, serverless architecture, and cloud-native solutions for building scalable applications.",
      content: "Full article content here...",
      author: {
        name: "Alessandro Conti",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
        role: "Solutions Architect"
      },
      category: {
        name: "Architecture",
        color: "bg-orange-500",
        icon: <Code className="w-4 h-4" />
      },
      publishedAt: "2024-01-08",
      readTime: "12 min read",
      image: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=800&h=600&fit=crop",
      featured: false,
      tags: ["Architecture", "Scalability", "Cloud"]
    },
    {
      id: "5",
      title: "The Complete Guide to Website Performance Optimization",
      excerpt: "Learn how to make your website lightning fast with proven optimization techniques and modern performance strategies.",
      content: "Full article content here...",
      author: {
        name: "Luca Ferrari",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
        role: "Performance Engineer"
      },
      category: {
        name: "Performance",
        color: "bg-red-500",
        icon: <TrendingUp className="w-4 h-4" />
      },
      publishedAt: "2024-01-05",
      readTime: "10 min read",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      featured: false,
      tags: ["Performance", "Optimization", "Speed"]
    }
  ];

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section className="w-full bg-background dark:bg-black relative pt-12 md:pt-16 lg:pt-20 pb-16 md:pb-20 lg:pb-24 overflow-hidden">
      {/* Background Pattern - Same as other sections */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)]" />

        {/* Floating Orbs */}
        <motion.div
          className="absolute top-[15%] left-[20%] w-72 h-72 bg-blue-500/30 dark:bg-blue-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 70, -35, 0],
            y: [0, -35, 25, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-[20%] right-[25%] w-96 h-96 bg-purple-500/30 dark:bg-purple-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, -60, 30, 0],
            y: [0, 40, -20, 0],
            scale: [1, 0.8, 1.2, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-6 md:mb-8 lg:mb-10"
        >
          <Badge variant="outline" className="mb-3 md:mb-4 bg-background dark:bg-black text-xs md:text-sm">
            {t("badge")}
          </Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 px-2">
            {t("heading")}
          </h2>
          <p className="text-muted-foreground dark:text-white/70 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-2">
            {t("description")}
          </p>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 lg:gap-8 mb-6 md:mb-8 lg:mb-10">
          {/* Featured Post */}
          {featuredPost && (
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-7"
            >
              <div className="group relative overflow-hidden rounded-2xl border border-border bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 h-full">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <Badge className={`${featuredPost.category.color} text-white border-0 gap-1`}>
                      {featuredPost.category.icon}
                      {featuredPost.category.name}
                    </Badge>
                  </div>

                  {/* Featured Badge */}
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="bg-primary text-primary-foreground border-0">
                      {t("featured")}
                    </Badge>
                  </div>
                </div>

                <div className="p-4 md:p-6 lg:p-8">
                  {/* Meta Info */}
                  <div className="flex items-center gap-3 md:gap-4 text-xs md:text-sm text-muted-foreground mb-3 md:mb-4">
                    <div className="flex items-center gap-1 md:gap-2">
                      <Calendar className="w-3 h-3 md:w-4 md:h-4" />
                      <span className="hidden sm:inline">{formatDate(featuredPost.publishedAt)}</span>
                      <span className="sm:hidden">{new Date(featuredPost.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-1 md:gap-2">
                      <Clock className="w-3 h-3 md:w-4 md:h-4" />
                      {featuredPost.readTime}
                    </div>
                  </div>

                  {/* Title and Excerpt */}
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-2 md:mb-3 group-hover:text-primary transition-colors line-clamp-2 md:line-clamp-none">
                    {featuredPost.title}
                  </h3>
                  <p className="text-muted-foreground text-sm md:text-base mb-4 md:mb-6 line-clamp-2 md:line-clamp-3">
                    {featuredPost.excerpt}
                  </p>

                  {/* Author and CTA */}
                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <div className="flex items-center gap-2 md:gap-3">
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden">
                        <Image
                          src={featuredPost.author.avatar}
                          alt={featuredPost.author.name}
                          width={40}
                          height={40}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-xs md:text-sm font-medium text-foreground">
                          {featuredPost.author.name}
                        </p>
                        <p className="text-xs text-muted-foreground hidden md:block">
                          {featuredPost.author.role}
                        </p>
                      </div>
                    </div>

                    <Button variant="ghost" size="sm" className="group/btn text-xs md:text-sm">
                      {t("readMore")}
                      <ArrowRight className="w-3 h-3 md:w-4 md:h-4 ml-1 transition-transform group-hover/btn:translate-x-1" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.article>
          )}

          {/* Regular Posts */}
          <div className="lg:col-span-5 space-y-3 md:space-y-4 lg:space-y-6">
            {regularPosts.slice(0, 4).map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="group"
              >
                <div className="flex gap-3 md:gap-4 p-3 md:p-6 rounded-xl border border-border bg-card/30 backdrop-blur-sm hover:border-primary/50 hover:bg-card/50 transition-all duration-300">
                  {/* Image */}
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex-shrink-0 overflow-hidden rounded-lg">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    {/* Category */}
                    <Badge 
                      variant="secondary" 
                      className={`${post.category.color} text-white border-0 text-xs mb-2 gap-1`}
                    >
                      {post.category.icon}
                      {post.category.name}
                    </Badge>

                    {/* Title */}
                    <h3 className="font-semibold text-foreground text-xs sm:text-sm md:text-base mb-1 md:mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>

                    {/* Meta */}
                    <div className="flex items-center gap-2 md:gap-3 text-xs text-muted-foreground mb-1 md:mb-2">
                      <span className="truncate">{formatDate(post.publishedAt)}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>

                    {/* Author */}
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full overflow-hidden">
                        <Image
                          src={post.author.avatar}
                          alt={post.author.name}
                          width={24}
                          height={24}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {post.author.name}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 text-center mt-8 md:mt-12 lg:mt-16"
        >
          <Button size="lg" className="gap-2 shadow-lg">
            {t("viewAll")}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
