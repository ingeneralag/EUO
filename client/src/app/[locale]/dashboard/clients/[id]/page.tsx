"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Building2,
  Globe,
  Plus,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Edit,
  Calendar,
  Trash2,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

// Mock client data
const mockClient = {
  id: "1",
  name: "Milano Fashion House",
  company: "Fashion Retail",
  industry: "E-commerce",
  email: "contact@milanofashion.it",
  phone: "+39 02 1234 5678",
  country: "Italy",
  city: "Milan",
  address: "Via Montenapoleone, 8",
  website: "https://milanofashion.it",
  agentName: "Marco Rossi",
  agentEmail: "marco.rossi@sitovia.com",
  addedDate: "2024-03-15",
  status: "active",
  notes: "Premium client, high priority projects",
};

// Mock briefs data
const mockBriefs = [
  {
    id: "1",
    title: "E-commerce Website Redesign",
    projectType: "Web Development",
    status: "in-progress",
    priority: "high",
    submittedDate: "2024-03-20",
    deadline: "2024-05-15",
    budget: "€25,000 - €35,000",
    description: "Complete redesign of the e-commerce platform with modern UI/UX",
    requirements: [
      "Responsive design",
      "Mobile-first approach",
      "Payment gateway integration",
      "Multi-language support",
    ],
  },
  {
    id: "2",
    title: "Mobile App Development",
    projectType: "Mobile Development",
    status: "pending",
    priority: "medium",
    submittedDate: "2024-03-25",
    deadline: "2024-07-01",
    budget: "€40,000 - €50,000",
    description: "iOS and Android app for seamless shopping experience",
    requirements: [
      "Native iOS app",
      "Native Android app",
      "Push notifications",
      "In-app purchases",
    ],
  },
  {
    id: "3",
    title: "SEO Optimization Campaign",
    projectType: "SEO",
    status: "completed",
    priority: "low",
    submittedDate: "2024-02-10",
    deadline: "2024-03-10",
    budget: "€5,000 - €8,000",
    description: "Comprehensive SEO audit and optimization",
    requirements: [
      "Technical SEO audit",
      "Content optimization",
      "Backlink strategy",
      "Performance monitoring",
    ],
  },
];

export default function ClientDetailsPage() {
  const params = useParams();
  const [briefs, setBriefs] = useState(mockBriefs);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [briefToDelete, setBriefToDelete] = useState<string | null>(null);

  const handleDeleteBrief = (briefId: string) => {
    setBriefToDelete(briefId);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (briefToDelete) {
      setBriefs(briefs.filter(b => b.id !== briefToDelete));
      setShowDeleteModal(false);
      setBriefToDelete(null);
    }
  };

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
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/clients">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-foreground">{mockClient.name}</h1>
              <Badge variant={mockClient.status === "active" ? "default" : "secondary"}>
                {mockClient.status}
              </Badge>
            </div>
            <p className="text-muted-foreground mt-1">{mockClient.company}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link href={`/dashboard/clients/${params.id}/briefs/add`}>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Add Brief
            </Button>
          </Link>
          <Link href={`/dashboard/clients/${params.id}/edit`}>
            <Button variant="outline" className="gap-2">
              <Edit className="w-4 h-4" />
              Edit Client
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Client Details */}
        <div className="lg:col-span-1 space-y-6">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border border-border bg-card p-6 space-y-4"
          >
            <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Building2 className="w-5 h-5 text-primary" />
              Contact Information
            </h2>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-muted-foreground mt-1" />
                <div>
                  <p className="text-sm font-medium text-foreground">Email</p>
                  <a href={`mailto:${mockClient.email}`} className="text-sm text-primary hover:underline">
                    {mockClient.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-muted-foreground mt-1" />
                <div>
                  <p className="text-sm font-medium text-foreground">Phone</p>
                  <a href={`tel:${mockClient.phone}`} className="text-sm text-muted-foreground">
                    {mockClient.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-muted-foreground mt-1" />
                <div>
                  <p className="text-sm font-medium text-foreground">Location</p>
                  <p className="text-sm text-muted-foreground">
                    {mockClient.address}<br />
                    {mockClient.city}, {mockClient.country}
                  </p>
                </div>
              </div>

              {mockClient.website && (
                <div className="flex items-start gap-3">
                  <Globe className="w-4 h-4 text-muted-foreground mt-1" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Website</p>
                    <a 
                      href={mockClient.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline"
                    >
                      {mockClient.website}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Agent Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-xl border border-border bg-card p-6 space-y-4"
          >
            <h2 className="text-lg font-semibold text-foreground">Assigned Agent</h2>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-sm font-bold text-primary">
                  {mockClient.agentName.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <p className="font-medium text-foreground">{mockClient.agentName}</p>
                <a href={`mailto:${mockClient.agentEmail}`} className="text-sm text-primary hover:underline">
                  {mockClient.agentEmail}
                </a>
              </div>
            </div>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-xl border border-border bg-card p-6 space-y-4"
          >
            <h2 className="text-lg font-semibold text-foreground">Additional Information</h2>
            
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-foreground">Industry</p>
                <p className="text-sm text-muted-foreground">{mockClient.industry}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-foreground">Client Since</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(mockClient.addedDate).toLocaleDateString()}
                </p>
              </div>

              {mockClient.notes && (
                <div>
                  <p className="text-sm font-medium text-foreground">Notes</p>
                  <p className="text-sm text-muted-foreground">{mockClient.notes}</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Briefs List */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border border-border bg-card p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-foreground flex items-center gap-2">
                <FileText className="w-6 h-6 text-primary" />
                Project Briefs ({briefs.length})
              </h2>
            </div>

            <div className="space-y-4">
              {briefs.map((brief, index) => (
                <motion.div
                  key={brief.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 rounded-lg border border-border hover:border-primary/50 transition-all"
                >
                  {/* Brief Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-foreground">{brief.title}</h3>
                        <Badge className={getPriorityColor(brief.priority)}>
                          {brief.priority}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Building2 className="w-3 h-3" />
                          {brief.projectType}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(brief.submittedDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <Badge className={getStatusColor(brief.status)}>
                      {brief.status}
                    </Badge>
                  </div>

                  {/* Brief Description */}
                  <p className="text-sm text-muted-foreground mb-4">
                    {brief.description}
                  </p>

                  {/* Brief Details */}
                  <div className="grid grid-cols-2 gap-4 mb-4 p-4 rounded-lg bg-muted/30">
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-1">Deadline</p>
                      <p className="text-sm font-semibold text-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(brief.deadline).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-1">Budget</p>
                      <p className="text-sm font-semibold text-foreground">{brief.budget}</p>
                    </div>
                  </div>

                  {/* Requirements */}
                  <div className="mb-4">
                    <p className="text-sm font-medium text-foreground mb-2">Key Requirements:</p>
                    <div className="flex flex-wrap gap-2">
                      {brief.requirements.map((req, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {req}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-4 border-t border-border">
                    <Link href={`/dashboard/clients/${params.id}/briefs/${brief.id}`}>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Eye className="w-4 h-4" />
                        View Details
                      </Button>
                    </Link>
                    <Link href={`/dashboard/clients/${params.id}/briefs/${brief.id}/edit`}>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Edit className="w-4 h-4" />
                        Edit Brief
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 text-destructive hover:text-destructive"
                      onClick={() => handleDeleteBrief(brief.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </Button>
                  </div>
                </motion.div>
              ))}

              {briefs.length === 0 && (
                <div className="text-center py-12">
                  <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No briefs yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Create the first project brief for this client
                  </p>
                  <Link href={`/dashboard/clients/${params.id}/briefs/add`}>
                    <Button className="gap-2">
                      <Plus className="w-4 h-4" />
                      Add First Brief
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card rounded-xl border border-border p-6 max-w-md w-full"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-full bg-destructive/10">
                <AlertTriangle className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">Delete Brief</h2>
                <p className="text-sm text-muted-foreground">This action cannot be undone</p>
              </div>
            </div>
            
            <p className="text-muted-foreground mb-6">
              Are you sure you want to delete this project brief? All associated data will be permanently removed.
            </p>

            <div className="flex gap-3">
              <Button
                variant="destructive"
                onClick={confirmDelete}
                className="flex-1"
              >
                Delete Brief
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowDeleteModal(false);
                  setBriefToDelete(null);
                }}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
