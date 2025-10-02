"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Save,
  FileText,
  Calendar,
  DollarSign,
  Target,
  CheckSquare,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

// Mock brief data
const mockBrief = {
  id: "1",
  title: "E-commerce Website Redesign",
  projectType: "web-development",
  description: "Complete redesign of the e-commerce platform with modern UI/UX",
  objectives: "Increase conversion rate by 30%, improve mobile user experience",
  targetAudience: "Fashion-conscious individuals aged 25-45",
  budget: "€25,000 - €35,000",
  deadline: "2024-05-15",
  startDate: "2024-03-25",
  priority: "high",
  requirements: "Responsive design\nMobile-first approach\nPayment gateway integration\nMulti-language support",
  technicalRequirements: "Next.js 14, TypeScript, Tailwind CSS, PostgreSQL",
  designPreferences: "Clean, modern, minimalist design. Brand colors: Navy blue, Gold",
  competitors: "https://www.farfetch.com, https://www.net-a-porter.com",
  additionalNotes: "Client prefers weekly progress updates",
};

export default function EditBriefPage() {
  const params = useParams();
  const router = useRouter();
  const [formData, setFormData] = useState(mockBrief);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updated brief:", formData);
    // Save to database
    router.push(`/dashboard/clients/${params.id}/briefs/${params.briefId}`);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href={`/dashboard/clients/${params.id}/briefs/${params.briefId}`}>
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Edit Project Brief</h1>
          <p className="text-muted-foreground mt-1">
            Update project details and requirements
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-border bg-card p-6 space-y-4"
        >
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">Basic Information</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Label htmlFor="title">Project Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="projectType">Project Type *</Label>
              <select
                id="projectType"
                value={formData.projectType}
                onChange={(e) => handleChange("projectType", e.target.value)}
                required
                className="w-full px-3 py-2 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="web-development">Web Development</option>
                <option value="mobile-development">Mobile Development</option>
                <option value="seo">SEO</option>
                <option value="uiux-design">UI/UX Design</option>
                <option value="ecommerce">E-commerce</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <Label htmlFor="priority">Priority Level *</Label>
              <select
                id="priority"
                value={formData.priority}
                onChange={(e) => handleChange("priority", e.target.value)}
                required
                className="w-full px-3 py-2 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="description">Project Description *</Label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                required
                className="w-full min-h-[120px] px-3 py-2 rounded-md border border-input bg-background text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </motion.div>

        {/* Objectives & Goals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-xl border border-border bg-card p-6 space-y-4"
        >
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">Objectives & Goals</h2>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label htmlFor="objectives">Project Objectives *</Label>
              <textarea
                id="objectives"
                value={formData.objectives}
                onChange={(e) => handleChange("objectives", e.target.value)}
                required
                className="w-full min-h-[100px] px-3 py-2 rounded-md border border-input bg-background text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <Label htmlFor="targetAudience">Target Audience</Label>
              <Input
                id="targetAudience"
                value={formData.targetAudience}
                onChange={(e) => handleChange("targetAudience", e.target.value)}
              />
            </div>
          </div>
        </motion.div>

        {/* Budget & Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-xl border border-border bg-card p-6 space-y-4"
        >
          <div className="flex items-center gap-2 mb-4">
            <DollarSign className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">Budget & Timeline</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="budget">Budget Range *</Label>
              <Input
                id="budget"
                value={formData.budget}
                onChange={(e) => handleChange("budget", e.target.value)}
                placeholder="€10,000 - €20,000"
                required
              />
            </div>

            <div>
              <Label htmlFor="startDate">Preferred Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => handleChange("startDate", e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="deadline">Desired Deadline *</Label>
              <Input
                id="deadline"
                type="date"
                value={formData.deadline}
                onChange={(e) => handleChange("deadline", e.target.value)}
                required
              />
            </div>
          </div>
        </motion.div>

        {/* Requirements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-xl border border-border bg-card p-6 space-y-4"
        >
          <div className="flex items-center gap-2 mb-4">
            <CheckSquare className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">Requirements</h2>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label htmlFor="requirements">Key Requirements (one per line)</Label>
              <textarea
                id="requirements"
                value={formData.requirements}
                onChange={(e) => handleChange("requirements", e.target.value)}
                placeholder="List key requirements..."
                className="w-full min-h-[120px] px-3 py-2 rounded-md border border-input bg-background text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <Label htmlFor="technicalRequirements">Technical Requirements</Label>
              <textarea
                id="technicalRequirements"
                value={formData.technicalRequirements}
                onChange={(e) => handleChange("technicalRequirements", e.target.value)}
                placeholder="Any specific technical requirements?"
                className="w-full min-h-[100px] px-3 py-2 rounded-md border border-input bg-background text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <Label htmlFor="designPreferences">Design Preferences</Label>
              <textarea
                id="designPreferences"
                value={formData.designPreferences}
                onChange={(e) => handleChange("designPreferences", e.target.value)}
                placeholder="Colors, style, references..."
                className="w-full min-h-[100px] px-3 py-2 rounded-md border border-input bg-background text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </motion.div>

        {/* Research & Other */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-xl border border-border bg-card p-6 space-y-4"
        >
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">Research & Additional Info</h2>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label htmlFor="competitors">Competitor/Reference Websites</Label>
              <textarea
                id="competitors"
                value={formData.competitors}
                onChange={(e) => handleChange("competitors", e.target.value)}
                placeholder="List competitor or reference websites..."
                className="w-full min-h-[80px] px-3 py-2 rounded-md border border-input bg-background text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <Label htmlFor="additionalNotes">Additional Notes</Label>
              <textarea
                id="additionalNotes"
                value={formData.additionalNotes}
                onChange={(e) => handleChange("additionalNotes", e.target.value)}
                placeholder="Any other information we should know?"
                className="w-full min-h-[100px] px-3 py-2 rounded-md border border-input bg-background text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex gap-3"
        >
          <Button type="submit" className="flex-1 gap-2">
            <Save className="w-4 h-4" />
            Save Changes
          </Button>
          <Link href={`/dashboard/clients/${params.id}/briefs/${params.briefId}`} className="flex-1">
            <Button type="button" variant="outline" className="w-full">
              Cancel
            </Button>
          </Link>
        </motion.div>
      </form>
    </div>
  );
}
