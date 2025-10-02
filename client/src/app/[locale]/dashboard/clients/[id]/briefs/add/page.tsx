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

// This form structure would be fetched from admin settings
// Admins can customize which fields to show
const briefFormFields = [
  {
    id: "title",
    label: "Project Title",
    type: "text",
    required: true,
    placeholder: "E.g., Website Redesign",
    section: "basic",
  },
  {
    id: "projectType",
    label: "Project Type",
    type: "select",
    required: true,
    options: ["Web Development", "Mobile Development", "SEO", "UI/UX Design", "E-commerce", "Other"],
    section: "basic",
  },
  {
    id: "description",
    label: "Project Description",
    type: "textarea",
    required: true,
    placeholder: "Describe the project in detail...",
    section: "basic",
  },
  {
    id: "objectives",
    label: "Project Objectives",
    type: "textarea",
    required: true,
    placeholder: "What are the main goals of this project?",
    section: "objectives",
  },
  {
    id: "targetAudience",
    label: "Target Audience",
    type: "text",
    required: false,
    placeholder: "Who is the target audience?",
    section: "objectives",
  },
  {
    id: "budget",
    label: "Budget Range",
    type: "text",
    required: true,
    placeholder: "€10,000 - €20,000",
    section: "budget",
  },
  {
    id: "deadline",
    label: "Desired Deadline",
    type: "date",
    required: true,
    section: "timeline",
  },
  {
    id: "startDate",
    label: "Preferred Start Date",
    type: "date",
    required: false,
    section: "timeline",
  },
  {
    id: "priority",
    label: "Priority Level",
    type: "select",
    required: true,
    options: ["Low", "Medium", "High", "Urgent"],
    section: "other",
  },
  {
    id: "requirements",
    label: "Key Requirements (one per line)",
    type: "textarea",
    required: false,
    placeholder: "List key requirements...\n- Requirement 1\n- Requirement 2",
    section: "requirements",
  },
  {
    id: "technicalRequirements",
    label: "Technical Requirements",
    type: "textarea",
    required: false,
    placeholder: "Any specific technical requirements?",
    section: "requirements",
  },
  {
    id: "designPreferences",
    label: "Design Preferences",
    type: "textarea",
    required: false,
    placeholder: "Colors, style, references...",
    section: "requirements",
  },
  {
    id: "competitors",
    label: "Competitor/Reference Websites",
    type: "textarea",
    required: false,
    placeholder: "List competitor or reference websites...",
    section: "research",
  },
  {
    id: "additionalNotes",
    label: "Additional Notes",
    type: "textarea",
    required: false,
    placeholder: "Any other information we should know?",
    section: "other",
  },
];

export default function AddBriefPage() {
  const params = useParams();
  const router = useRouter();
  const [formData, setFormData] = useState<{ [key: string]: string }>({});

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("New brief:", formData);
    // Save to database
    router.push(`/dashboard/clients/${params.id}`);
  };

  const sections = [
    { id: "basic", title: "Basic Information", icon: <FileText className="w-5 h-5" /> },
    { id: "objectives", title: "Objectives & Goals", icon: <Target className="w-5 h-5" /> },
    { id: "budget", title: "Budget", icon: <DollarSign className="w-5 h-5" /> },
    { id: "timeline", title: "Timeline", icon: <Calendar className="w-5 h-5" /> },
    { id: "requirements", title: "Requirements", icon: <CheckSquare className="w-5 h-5" /> },
    { id: "research", title: "Research & References", icon: <AlertCircle className="w-5 h-5" /> },
    { id: "other", title: "Other Information", icon: <FileText className="w-5 h-5" /> },
  ];

  const renderField = (field: typeof briefFormFields[0]) => {
    switch (field.type) {
      case "text":
        return (
          <Input
            id={field.id}
            value={formData[field.id] || ""}
            onChange={(e) => handleChange(field.id, e.target.value)}
            placeholder={field.placeholder}
            required={field.required}
          />
        );
      
      case "textarea":
        return (
          <textarea
            id={field.id}
            value={formData[field.id] || ""}
            onChange={(e) => handleChange(field.id, e.target.value)}
            placeholder={field.placeholder}
            required={field.required}
            className="w-full min-h-[120px] px-3 py-2 rounded-md border border-input bg-background text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary"
          />
        );
      
      case "select":
        return (
          <select
            id={field.id}
            value={formData[field.id] || ""}
            onChange={(e) => handleChange(field.id, e.target.value)}
            required={field.required}
            className="w-full px-3 py-2 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Select an option</option>
            {field.options?.map((option) => (
              <option key={option} value={option.toLowerCase()}>
                {option}
              </option>
            ))}
          </select>
        );
      
      case "date":
        return (
          <Input
            id={field.id}
            type="date"
            value={formData[field.id] || ""}
            onChange={(e) => handleChange(field.id, e.target.value)}
            required={field.required}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href={`/dashboard/clients/${params.id}`}>
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Add Project Brief</h1>
          <p className="text-muted-foreground mt-1">
            Fill in the project details to get started
          </p>
        </div>
      </div>

      {/* Info Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl border border-blue-500/20 bg-blue-500/10 p-4"
      >
        <div className="flex gap-3">
          <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground mb-1">
              Customizable Form
            </p>
            <p className="text-sm text-muted-foreground">
              This form can be customized by admins. Fields marked with * are required.
              Admins can add, remove, or modify fields based on project needs.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {sections.map((section, sectionIndex) => {
          const sectionFields = briefFormFields.filter(f => f.section === section.id);
          if (sectionFields.length === 0) return null;

          return (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: sectionIndex * 0.1 }}
              className="rounded-xl border border-border bg-card p-6 space-y-4"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="text-primary">{section.icon}</div>
                <h2 className="text-xl font-semibold text-foreground">{section.title}</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sectionFields.map((field) => (
                  <div
                    key={field.id}
                    className={field.type === "textarea" ? "md:col-span-2" : ""}
                  >
                    <Label htmlFor={field.id}>
                      {field.label} {field.required && <span className="text-red-500">*</span>}
                    </Label>
                    {renderField(field)}
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: sections.length * 0.1 }}
          className="flex gap-3 pt-6"
        >
          <Button type="submit" className="flex-1 gap-2">
            <Save className="w-4 h-4" />
            Submit Brief
          </Button>
          <Link href={`/dashboard/clients/${params.id}`} className="flex-1">
            <Button type="button" variant="outline" className="w-full">
              Cancel
            </Button>
          </Link>
        </motion.div>
      </form>

      {/* Admin Note */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: (sections.length + 1) * 0.1 }}
        className="rounded-xl border border-border bg-card p-6"
      >
        <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-primary" />
          For Admins
        </h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
            Form fields can be customized in Dashboard Settings → Brief Form Builder
          </li>
          <li className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
            You can add custom fields, change field types, or make fields required/optional
          </li>
          <li className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
            Changes to the form will apply to all new briefs going forward
          </li>
        </ul>
      </motion.div>
    </div>
  );
}
