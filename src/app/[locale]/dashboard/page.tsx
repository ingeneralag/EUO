"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  BarChart3, 
  Users, 
  FileText, 
  Briefcase, 
  TrendingUp, 
  Eye,
  MessageSquare,
  Globe,
  ArrowUpRight,
  Calendar,
  Clock
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const stats = [
  {
    title: "Active Agents",
    value: "8",
    change: "+2",
    trend: "up",
    icon: Users,
    color: "text-blue-600",
    bgColor: "bg-blue-100 dark:bg-blue-900/20",
  },
  {
    title: "Total Clients",
    value: "45",
    change: "+12%",
    trend: "up",
    icon: Briefcase,
    color: "text-green-600",
    bgColor: "bg-green-100 dark:bg-green-900/20",
  },
  {
    title: "Active Briefs",
    value: "18",
    change: "+5",
    trend: "up",
    icon: FileText,
    color: "text-orange-600",
    bgColor: "bg-orange-100 dark:bg-orange-900/20",
  },
  {
    title: "Projects",
    value: "24",
    change: "+8%",
    trend: "up",
    icon: Globe,
    color: "text-purple-600",
    bgColor: "bg-purple-100 dark:bg-purple-900/20",
  },
  {
    title: "Page Views",
    value: "12.5K",
    change: "+23%",
    trend: "up",
    icon: Eye,
    color: "text-orange-600",
    bgColor: "bg-orange-100 dark:bg-orange-900/20",
  },
];

const recentBriefs = [
  {
    id: 1,
    title: "E-commerce Website Redesign",
    status: "In Progress",
    client: "Milano Fashion House",
    agent: "Marco Rossi",
    date: "2024-03-20",
    priority: "High",
  },
  {
    id: 2,
    title: "Mobile App Development",
    status: "Pending",
    client: "Sabor Español",
    agent: "Carmen García",
    date: "2024-03-25",
    priority: "Medium",
  },
  {
    id: 3,
    title: "SEO Optimization Campaign",
    status: "Completed",
    client: "AlpenBank Digital",
    agent: "Klaus Weber",
    date: "2024-03-10",
    priority: "Low",
  },
];

const recentAgents = [
  {
    id: 1,
    name: "Marco Rossi",
    country: "Italy",
    clients: 12,
    activeBriefs: 5,
    status: "Active",
  },
  {
    id: 2,
    name: "Carmen García",
    country: "Spain",
    clients: 8,
    activeBriefs: 3,
    status: "Active",
  },
  {
    id: 3,
    name: "Klaus Weber",
    country: "Austria",
    clients: 10,
    activeBriefs: 4,
    status: "Active",
  },
];

const recentBlogPosts = [
  {
    id: 1,
    title: "The Future of Web Development: Trends to Watch in 2024",
    status: "Published",
    views: "2.3K",
    date: "2024-01-12",
  },
  {
    id: 2,
    title: "Mastering SEO: Essential Strategies for Modern Websites",
    status: "Draft",
    views: "0",
    date: "2024-01-10",
  },
  {
    id: 3,
    title: "UI/UX Design Principles for High-Converting Websites",
    status: "Published",
    views: "1.8K",
    date: "2024-01-08",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening with your website.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`w-4 h-4 ${stat.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <TrendingUp className="w-3 h-3 mr-1 text-green-600" />
                    <span className="text-green-600">{stat.change}</span>
                    <span className="ml-1">from last month</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-auto flex-col py-4 gap-2" asChild>
                <a href="/dashboard/agents">
                  <Users className="w-6 h-6 text-blue-600" />
                  <span className="text-sm">Manage Agents</span>
                </a>
              </Button>
              <Button variant="outline" className="h-auto flex-col py-4 gap-2" asChild>
                <a href="/dashboard/clients">
                  <Briefcase className="w-6 h-6 text-green-600" />
                  <span className="text-sm">View Clients</span>
                </a>
              </Button>
              <Button variant="outline" className="h-auto flex-col py-4 gap-2" asChild>
                <a href="/dashboard/clients/add">
                  <FileText className="w-6 h-6 text-orange-600" />
                  <span className="text-sm">Add Client</span>
                </a>
              </Button>
              <Button variant="outline" className="h-auto flex-col py-4 gap-2" asChild>
                <a href="/dashboard/settings/brief-form">
                  <Globe className="w-6 h-6 text-purple-600" />
                  <span className="text-sm">Form Builder</span>
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Briefs */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold">Recent Briefs</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <a href="/dashboard/clients">
                  View All
                  <ArrowUpRight className="w-4 h-4 ml-1" />
                </a>
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentBriefs.map((brief) => (
                <div key={brief.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium">{brief.title}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge 
                        variant={brief.status === "Completed" ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {brief.status}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {brief.priority}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {brief.client}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                      <Users className="w-3 h-3" />
                      <span>{brief.agent}</span>
                      <Calendar className="w-3 h-3 ml-2" />
                      <span>{new Date(brief.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Agents */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold">Active Agents</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <a href="/dashboard/agents">
                  View All
                  <ArrowUpRight className="w-4 h-4 ml-1" />
                </a>
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentAgents.map((agent) => (
                <div key={agent.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">
                        {agent.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-medium">{agent.name}</h4>
                      <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                        <Globe className="w-3 h-3" />
                        <span>{agent.country}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{agent.clients} Clients</div>
                    <div className="text-xs text-muted-foreground">{agent.activeBriefs} Active Briefs</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Blog Posts */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold">Recent Blog Posts</CardTitle>
              <Button variant="ghost" size="sm">
                View All
                <ArrowUpRight className="w-4 h-4 ml-1" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentBlogPosts.map((post) => (
                <div key={post.id} className="flex items-start justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium line-clamp-2">{post.title}</h4>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge 
                        variant={post.status === "Published" ? "default" : "outline"}
                        className="text-xs"
                      >
                        {post.status}
                      </Badge>
                      {post.status === "Published" && (
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Eye className="w-3 h-3 mr-1" />
                          {post.views} views
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground ml-4">
                    <Clock className="w-3 h-3 inline mr-1" />
                    {new Date(post.date).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button className="h-20 flex-col gap-2" variant="outline">
                <Briefcase className="w-6 h-6" />
                Add New Project
              </Button>
              <Button className="h-20 flex-col gap-2" variant="outline">
                <FileText className="w-6 h-6" />
                Write Blog Post
              </Button>
              <Button className="h-20 flex-col gap-2" variant="outline">
                <MessageSquare className="w-6 h-6" />
                Add Testimonial
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
