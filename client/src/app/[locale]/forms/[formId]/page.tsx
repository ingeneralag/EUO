"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Upload,
  Star,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

interface FormField {
  id: string;
  label: string;
  type: "text" | "textarea" | "select" | "date" | "number" | "file" | "email" | "phone" | "url" | "time" | "rating" | "checkbox" | "radio";
  required: boolean;
  placeholder?: string;
  options?: string[];
  section: string;
  fileTypes?: string[];
  maxFiles?: number;
  ratingMax?: number;
}

export default function PublicFormPage() {
  const params = useParams();
  const formId = params.formId as string;
  
  const [fields, setFields] = useState<FormField[]>([]);
  const [formData, setFormData] = useState<{[key: string]: unknown}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isLoading, setIsLoading] = useState(true);

  const sections = [
    { id: "basic", label: "Basic Information" },
    { id: "objectives", label: "Objectives & Goals" },
    { id: "budget", label: "Budget" },
    { id: "timeline", label: "Timeline" },
    { id: "requirements", label: "Requirements" },
    { id: "research", label: "Research & References" },
    { id: "other", label: "Other Information" },
  ];

  useEffect(() => {
    // Load form structure from localStorage (in a real app, this would be from API)
    const savedForm = localStorage.getItem(`form_${formId}`);
    if (savedForm) {
      try {
        const parsedFields = JSON.parse(savedForm);
        setFields(parsedFields);
      } catch (error) {
        console.error("Error parsing form data:", error);
      }
    }
    setIsLoading(false);
  }, [formId]);

  const handleInputChange = (fieldId: string, value: unknown) => {
    setFormData(prev => ({
      ...prev,
      [fieldId]: value
    }));
    
    // Clear error when user starts typing
    if (errors[fieldId]) {
      setErrors(prev => ({
        ...prev,
        [fieldId]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    fields.forEach(field => {
      if (field.required) {
        const value = formData[field.id];
        if (!value || (Array.isArray(value) && value.length === 0) || value === "") {
          newErrors[field.id] = `${field.label} is required`;
        }
      }
      
      // Email validation
      if (field.type === "email" && formData[field.id]) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData[field.id])) {
          newErrors[field.id] = "Please enter a valid email address";
        }
      }
      
      // URL validation
      if (field.type === "url" && formData[field.id]) {
        try {
          new URL(formData[field.id]);
        } catch {
          newErrors[field.id] = "Please enter a valid URL";
        }
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real app, you would send the data to your backend
      console.log("Form submitted:", { formId, formData });
      
      // Save to localStorage for demo purposes
      const submissions = JSON.parse(localStorage.getItem("form_submissions") || "[]");
      submissions.push({
        id: Date.now(),
        formId,
        data: formData,
        submittedAt: new Date().toISOString(),
      });
      localStorage.setItem("form_submissions", JSON.stringify(submissions));
      
      setIsSubmitted(true);
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderField = (field: FormField) => {
    const commonProps = {
      key: field.id,
      required: field.required,
      placeholder: field.placeholder,
    };

    const hasError = !!errors[field.id];

    switch (field.type) {
      case "text":
      case "email":
      case "phone":
      case "url":
        return (
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-1">
              {field.label}
              {field.required && <span className="text-red-500">*</span>}
            </label>
            <Input
              {...commonProps}
              type={field.type === "text" ? "text" : field.type}
              value={formData[field.id] || ""}
              onChange={(e) => handleInputChange(field.id, e.target.value)}
              className={`w-full ${hasError ? "border-red-500" : ""}`}
            />
            {hasError && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors[field.id]}
              </p>
            )}
          </div>
        );

      case "textarea":
        return (
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-1">
              {field.label}
              {field.required && <span className="text-red-500">*</span>}
            </label>
            <textarea
              {...commonProps}
              value={formData[field.id] || ""}
              onChange={(e) => handleInputChange(field.id, e.target.value)}
              className={`w-full min-h-[100px] px-3 py-2 border bg-background rounded-md text-sm resize-vertical ${
                hasError ? "border-red-500" : "border-input"
              }`}
            />
            {hasError && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors[field.id]}
              </p>
            )}
          </div>
        );

      case "select":
        return (
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-1">
              {field.label}
              {field.required && <span className="text-red-500">*</span>}
            </label>
            <select
              {...commonProps}
              value={formData[field.id] || ""}
              onChange={(e) => handleInputChange(field.id, e.target.value)}
              className={`w-full px-3 py-2 border bg-background rounded-md text-sm ${
                hasError ? "border-red-500" : "border-input"
              }`}
            >
              <option value="">Select an option...</option>
              {field.options?.map((option, index) => (
                <option key={index} value={option}>{option}</option>
              ))}
            </select>
            {hasError && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors[field.id]}
              </p>
            )}
          </div>
        );

      case "radio":
        return (
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-1">
              {field.label}
              {field.required && <span className="text-red-500">*</span>}
            </label>
            <div className="space-y-2">
              {field.options?.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id={`${field.id}_${index}`}
                    name={field.id}
                    value={option}
                    checked={formData[field.id] === option}
                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                    className="w-4 h-4"
                  />
                  <label htmlFor={`${field.id}_${index}`} className="text-sm">
                    {option}
                  </label>
                </div>
              ))}
            </div>
            {hasError && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors[field.id]}
              </p>
            )}
          </div>
        );

      case "checkbox":
        return (
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-1">
              {field.label}
              {field.required && <span className="text-red-500">*</span>}
            </label>
            <div className="space-y-2">
              {field.options?.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={`${field.id}_${index}`}
                    value={option}
                    checked={(formData[field.id] || []).includes(option)}
                    onChange={(e) => {
                      const currentValues = formData[field.id] || [];
                      const newValues = e.target.checked
                        ? [...currentValues, option]
                        : currentValues.filter((v: string) => v !== option);
                      handleInputChange(field.id, newValues);
                    }}
                    className="w-4 h-4"
                  />
                  <label htmlFor={`${field.id}_${index}`} className="text-sm">
                    {option}
                  </label>
                </div>
              ))}
            </div>
            {hasError && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors[field.id]}
              </p>
            )}
          </div>
        );

      case "date":
        return (
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-1">
              {field.label}
              {field.required && <span className="text-red-500">*</span>}
            </label>
            <Input
              {...commonProps}
              type="date"
              value={formData[field.id] || ""}
              onChange={(e) => handleInputChange(field.id, e.target.value)}
              className={`w-full ${hasError ? "border-red-500" : ""}`}
            />
            {hasError && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors[field.id]}
              </p>
            )}
          </div>
        );

      case "time":
        return (
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-1">
              {field.label}
              {field.required && <span className="text-red-500">*</span>}
            </label>
            <Input
              {...commonProps}
              type="time"
              value={formData[field.id] || ""}
              onChange={(e) => handleInputChange(field.id, e.target.value)}
              className={`w-full ${hasError ? "border-red-500" : ""}`}
            />
            {hasError && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors[field.id]}
              </p>
            )}
          </div>
        );

      case "number":
        return (
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-1">
              {field.label}
              {field.required && <span className="text-red-500">*</span>}
            </label>
            <Input
              {...commonProps}
              type="number"
              value={formData[field.id] || ""}
              onChange={(e) => handleInputChange(field.id, e.target.value)}
              className={`w-full ${hasError ? "border-red-500" : ""}`}
            />
            {hasError && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors[field.id]}
              </p>
            )}
          </div>
        );

      case "file":
        return (
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-1">
              {field.label}
              {field.required && <span className="text-red-500">*</span>}
            </label>
            <div className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
              hasError ? "border-red-500" : "border-input hover:border-primary/50"
            }`}>
              <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground mb-2">
                Click to upload or drag and drop
              </p>
              {field.fileTypes && (
                <p className="text-xs text-muted-foreground mb-2">
                  Accepted: {field.fileTypes.join(', ')}
                </p>
              )}
              {field.maxFiles && field.maxFiles > 1 && (
                <p className="text-xs text-muted-foreground">
                  Max {field.maxFiles} files
                </p>
              )}
              <input
                type="file"
                multiple={field.maxFiles ? field.maxFiles > 1 : false}
                accept={field.fileTypes?.map(type => `.${type}`).join(',')}
                onChange={(e) => handleInputChange(field.id, e.target.files)}
                className="hidden"
                id={`file_${field.id}`}
              />
              <label
                htmlFor={`file_${field.id}`}
                className="cursor-pointer inline-block mt-2 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm hover:bg-primary/90 transition-colors"
              >
                Choose Files
              </label>
              {formData[field.id] && formData[field.id].length > 0 && (
                <div className="mt-2 text-sm text-muted-foreground">
                  {formData[field.id].length} file(s) selected
                </div>
              )}
            </div>
            {hasError && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors[field.id]}
              </p>
            )}
          </div>
        );

      case "rating":
        const maxRating = field.ratingMax || 5;
        return (
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-1">
              {field.label}
              {field.required && <span className="text-red-500">*</span>}
            </label>
            <div className="flex items-center space-x-1">
              {Array.from({ length: maxRating }, (_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleInputChange(field.id, index + 1)}
                  className={`w-8 h-8 ${
                    (formData[field.id] || 0) > index
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  } hover:text-yellow-400 transition-colors`}
                >
                  <Star className="w-full h-full" />
                </button>
              ))}
              <span className="ml-2 text-sm text-muted-foreground">
                {formData[field.id] || 0} / {maxRating}
              </span>
            </div>
            {hasError && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors[field.id]}
              </p>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading form...</p>
        </div>
      </div>
    );
  }

  if (fields.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <AlertCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Form Not Found</h1>
          <p className="text-muted-foreground mb-4">
            The form you&apos;re looking for doesn&apos;t exist or has been removed.
          </p>
          <Link href="/">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md mx-auto p-6"
        >
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Thank You!</h1>
          <p className="text-muted-foreground mb-4">
            Your project brief has been submitted successfully. We&apos;ll review it and get back to you soon.
          </p>
          <Link href="/">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Home
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  const groupedFields = sections.map(section => ({
    ...section,
    fields: fields.filter(field => field.section === section.id)
  })).filter(section => section.fields.length > 0);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="text-center space-y-4">
            <Badge variant="outline" className="mb-2">
              Project Brief Form
            </Badge>
            <h1 className="text-3xl font-bold">Tell Us About Your Project</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Please fill out all the required information about your project. This will help us understand your needs and provide you with the best possible solution.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {groupedFields.map(section => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-card rounded-lg border p-6 space-y-6"
              >
                <h2 className="text-xl font-semibold border-b pb-2">
                  {section.label}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {section.fields.map(field => (
                    <div
                      key={field.id}
                      className={field.type === "textarea" ? "md:col-span-2" : ""}
                    >
                      {renderField(field)}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex gap-4 pt-6"
            >
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 h-12 text-lg"
                size="lg"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Submitting...
                  </>
                ) : (
                  "Submit Project Brief"
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="lg"
                className="h-12"
                onClick={() => {
                  // Save as draft
                  localStorage.setItem(`form_draft_${formId}`, JSON.stringify(formData));
                  const successMsg = document.createElement('div');
                  successMsg.className = 'fixed top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg z-50';
                  successMsg.textContent = 'Draft saved!';
                  document.body.appendChild(successMsg);
                  setTimeout(() => successMsg.remove(), 2000);
                }}
              >
                Save as Draft
              </Button>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
