"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Edit,
  Calendar,
  DollarSign,
  Target,
  CheckSquare,
  Clock,
  Building2,
  User,
  Mail,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

// Mock brief data
const mockBrief = {
  id: "1",
  title: "E-commerce Website Redesign",
  projectType: "Web Development",
  status: "in-progress",
  priority: "high",
  submittedDate: "2024-03-20",
  deadline: "2024-05-15",
  startDate: "2024-03-25",
  budget: "€25,000 - €35,000",
  description: "Complete redesign of the e-commerce platform with modern UI/UX, focusing on improving user experience and conversion rates.",
  objectives: "Increase conversion rate by 30%, improve mobile user experience, implement modern design trends, enhance site performance.",
  targetAudience: "Fashion-conscious individuals aged 25-45, primarily women, with medium to high purchasing power.",
  requirements: [
    "Responsive design for all devices",
    "Mobile-first approach",
    "Payment gateway integration (Stripe, PayPal)",
    "Multi-language support (Italian, English, Spanish)",
    "Product filtering and search functionality",
    "Wishlist and cart persistence",
  ],
  technicalRequirements: "Next.js 14, TypeScript, Tailwind CSS, PostgreSQL, Redis for caching, AWS deployment",
  designPreferences: "Clean, modern, minimalist design. Use of white space. Brand colors: Navy blue (#1e3a8a), Gold (#fbbf24). References: Apple, Farfetch, Net-a-Porter",
  competitors: "https://www.farfetch.com, https://www.net-a-porter.com, https://www.mytheresa.com",
  additionalNotes: "Client prefers weekly progress updates. High priority project with potential for long-term partnership.",
  client: {
    name: "Milano Fashion House",
    contact: "Maria Rossi",
    email: "maria@milanofashion.it",
  },
  agent: {
    name: "Marco Rossi",
    email: "marco.rossi@sitovia.com",
  },
};

export default function BriefDetailsPage() {
  const params = useParams();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "in-progress":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "pending":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "cancelled":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500/10 text-red-500";
      case "medium":
        return "bg-yellow-500/10 text-yellow-500";
      case "low":
        return "bg-green-500/10 text-green-500";
      default:
        return "bg-gray-500/10 text-gray-500";
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href={`/dashboard/clients/${params.id}`}>
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-foreground">{mockBrief.title}</h1>
              <Badge className={getStatusColor(mockBrief.status)}>
                {mockBrief.status}
              </Badge>
              <Badge className={getPriorityColor(mockBrief.priority)}>
                {mockBrief.priority} priority
              </Badge>
            </div>
            <p className="text-muted-foreground">
              {mockBrief.projectType} • Submitted on {new Date(mockBrief.submittedDate).toLocaleDateString()}
            </p>
          </div>
        </div>
        <Link href={`/dashboard/clients/${params.id}/briefs/${params.briefId}/edit`}>
          <Button className="gap-2">
            <Edit className="w-4 h-4" />
            Edit Brief
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border border-border bg-card p-6"
          >
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              Project Overview
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {mockBrief.description}
            </p>
          </motion.div>

          {/* Objectives */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-xl border border-border bg-card p-6"
          >
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              Objectives & Goals
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {mockBrief.objectives}
            </p>
            
            {mockBrief.targetAudience && (
              <div className="mt-4 p-4 rounded-lg bg-muted/30">
                <h3 className="font-semibold text-sm mb-2">Target Audience</h3>
                <p className="text-sm text-muted-foreground">{mockBrief.targetAudience}</p>
              </div>
            )}
          </motion.div>

          {/* Requirements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-xl border border-border bg-card p-6"
          >
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-primary" />
              Key Requirements
            </h2>
            <ul className="space-y-2">
              {mockBrief.requirements.map((req, index) => (
                <li key={index} className="flex items-start gap-2 text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
                  {req}
                </li>
              ))}
            </ul>

            {mockBrief.technicalRequirements && (
              <div className="mt-4 p-4 rounded-lg bg-muted/30">
                <h3 className="font-semibold text-sm mb-2">Technical Requirements</h3>
                <p className="text-sm text-muted-foreground">{mockBrief.technicalRequirements}</p>
              </div>
            )}
          </motion.div>

          {/* Design Preferences */}
          {mockBrief.designPreferences && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="rounded-xl border border-border bg-card p-6"
            >
              <h2 className="text-xl font-semibold mb-4">Design Preferences</h2>
              <p className="text-muted-foreground leading-relaxed">
                {mockBrief.designPreferences}
              </p>
            </motion.div>
          )}

          {/* Competitors & References */}
          {mockBrief.competitors && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="rounded-xl border border-border bg-card p-6"
            >
              <h2 className="text-xl font-semibold mb-4">Competitor/Reference Websites</h2>
              <div className="space-y-2">
                {mockBrief.competitors.split(',').map((url, index) => (
                  <a
                    key={index}
                    href={url.trim()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-primary hover:underline"
                  >
                    {url.trim()}
                  </a>
                ))}
              </div>
            </motion.div>
          )}

          {/* Additional Notes */}
          {mockBrief.additionalNotes && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="rounded-xl border border-border bg-card p-6"
            >
              <h2 className="text-xl font-semibold mb-4">Additional Notes</h2>
              <p className="text-muted-foreground leading-relaxed">
                {mockBrief.additionalNotes}
              </p>
            </motion.div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Timeline & Budget */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border border-border bg-card p-6 space-y-4"
          >
            <h2 className="text-lg font-semibold">Timeline & Budget</h2>
            
            <div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <Calendar className="w-4 h-4" />
                Submitted
              </div>
              <p className="font-medium">
                {new Date(mockBrief.submittedDate).toLocaleDateString()}
              </p>
            </div>

            {mockBrief.startDate && (
              <div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                  <Calendar className="w-4 h-4" />
                  Start Date
                </div>
                <p className="font-medium">
                  {new Date(mockBrief.startDate).toLocaleDateString()}
                </p>
              </div>
            )}

            <div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <Clock className="w-4 h-4" />
                Deadline
              </div>
              <p className="font-medium">
                {new Date(mockBrief.deadline).toLocaleDateString()}
              </p>
            </div>

            <div className="pt-4 border-t border-border">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <DollarSign className="w-4 h-4" />
                Budget
              </div>
              <p className="font-medium">{mockBrief.budget}</p>
            </div>
          </motion.div>

          {/* Client Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-xl border border-border bg-card p-6 space-y-4"
          >
            <h2 className="text-lg font-semibold">Client Information</h2>
            
            <div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <Building2 className="w-4 h-4" />
                Company
              </div>
              <p className="font-medium">{mockBrief.client.name}</p>
            </div>

            <div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <User className="w-4 h-4" />
                Contact Person
              </div>
              <p className="font-medium">{mockBrief.client.contact}</p>
            </div>

            <div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <Mail className="w-4 h-4" />
                Email
              </div>
              <a href={`mailto:${mockBrief.client.email}`} className="font-medium text-primary hover:underline text-sm">
                {mockBrief.client.email}
              </a>
            </div>
          </motion.div>

          {/* Agent Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-xl border border-border bg-card p-6 space-y-4"
          >
            <h2 className="text-lg font-semibold">Assigned Agent</h2>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-sm font-bold text-primary">
                  {mockBrief.agent.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <p className="font-medium">{mockBrief.agent.name}</p>
                <a href={`mailto:${mockBrief.agent.email}`} className="text-sm text-primary hover:underline">
                  {mockBrief.agent.email}
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
