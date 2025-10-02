"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Plus,
  Save,
  Trash2,
  GripVertical,
  Edit,
  Eye,
  Settings,
  AlertCircle,
  Download,
  Link as LinkIcon,
  Copy,
  Upload,
  Star,
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
  fileTypes?: string[]; // For file upload fields
  maxFiles?: number; // For file upload fields
  ratingMax?: number; // For rating fields
}

const initialFields: FormField[] = [
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
    options: ["Web Development", "Mobile Development", "SEO", "UI/UX Design"],
    section: "basic",
  },
];

export default function BriefFormBuilderPage() {
  const [fields, setFields] = useState<FormField[]>(initialFields);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [editingField, setEditingField] = useState<FormField | null>(null);
  const [newField, setNewField] = useState<Partial<FormField>>({
    label: "",
    type: "text",
    required: false,
    section: "basic",
    placeholder: "",
  });
  const [optionsInput, setOptionsInput] = useState("");
  const [googleFormUrl, setGoogleFormUrl] = useState("");
  const [isImporting, setIsImporting] = useState(false);
  const [fileTypesInput, setFileTypesInput] = useState("");
  const [showShareModal, setShowShareModal] = useState(false);
  const [formUrl, setFormUrl] = useState("");

  const sections = [
    { id: "basic", label: "Basic Information" },
    { id: "objectives", label: "Objectives & Goals" },
    { id: "budget", label: "Budget" },
    { id: "timeline", label: "Timeline" },
    { id: "requirements", label: "Requirements" },
    { id: "research", label: "Research & References" },
    { id: "other", label: "Other Information" },
  ];

  const fieldTypes = [
    { value: "text", label: "Text Input" },
    { value: "textarea", label: "Text Area" },
    { value: "select", label: "Dropdown" },
    { value: "radio", label: "Radio Buttons" },
    { value: "checkbox", label: "Checkboxes" },
    { value: "date", label: "Date Picker" },
    { value: "time", label: "Time Picker" },
    { value: "number", label: "Number Input" },
    { value: "email", label: "Email Input" },
    { value: "phone", label: "Phone Input" },
    { value: "url", label: "URL Input" },
    { value: "file", label: "File Upload" },
    { value: "rating", label: "Rating Scale" },
  ];

  const handleAddField = () => {
    if (newField.label && newField.type) {
      const options = (newField.type === "select" || newField.type === "radio" || newField.type === "checkbox") && optionsInput
        ? optionsInput.split('\n').map(opt => opt.trim()).filter(opt => opt)
        : undefined;

      const fileTypes = newField.type === "file" && fileTypesInput
        ? fileTypesInput.split(',').map(type => type.trim()).filter(type => type)
        : undefined;

      const field: FormField = {
        id: editingField?.id || `field_${Date.now()}`,
        label: newField.label,
        type: newField.type as FormField["type"],
        required: newField.required || false,
        placeholder: newField.placeholder,
        options: options,
        section: newField.section || "basic",
        fileTypes: fileTypes,
        maxFiles: newField.type === "file" ? (newField as FormField & {maxFiles?: number}).maxFiles || 1 : undefined,
        ratingMax: newField.type === "rating" ? (newField as FormField & {ratingMax?: number}).ratingMax || 5 : undefined,
      };

      if (editingField) {
        setFields(fields.map(f => f.id === editingField.id ? field : f));
      } else {
        setFields([...fields, field]);
      }

      setNewField({
        label: "",
        type: "text",
        required: false,
        section: "basic",
        placeholder: "",
      });
      setOptionsInput("");
      setFileTypesInput("");
      setEditingField(null);
      setShowAddModal(false);
    }
  };

  const handleDeleteField = (id: string) => {
    setFields(fields.filter(f => f.id !== id));
  };

  const handleSaveForm = () => {
    // Save to database
    console.log("Saving form structure:", fields);
    // Show success message
    const successMsg = document.createElement('div');
    successMsg.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
    successMsg.textContent = 'Form structure saved successfully!';
    document.body.appendChild(successMsg);
    setTimeout(() => successMsg.remove(), 3000);
  };

  const handleEditField = (field: FormField) => {
    setEditingField(field);
    setNewField({
      label: field.label,
      type: field.type,
      required: field.required,
      section: field.section,
      placeholder: field.placeholder,
      ...(field.type === "file" && field.maxFiles ? { maxFiles: field.maxFiles } : {}),
      ...(field.type === "rating" && field.ratingMax ? { ratingMax: field.ratingMax } : {}),
    });
    setOptionsInput(field.options?.join('\n') || '');
    setFileTypesInput(field.fileTypes?.join(', ') || '');
    setShowAddModal(true);
  };

  const generateFormUrl = () => {
    // Generate a unique form ID
    const formId = `form_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const baseUrl = window.location.origin;
    const currentLocale = window.location.pathname.split('/')[1] || 'en';
    const url = `${baseUrl}/${currentLocale}/forms/${formId}`;
    setFormUrl(url);
    
    // In a real app, you would save the form structure to database with this ID
    localStorage.setItem(`form_${formId}`, JSON.stringify(fields));
    
    return url;
  };

  const handleImportFromGoogleForm = async () => {
    if (!googleFormUrl) return;

    setIsImporting(true);
    try {
      // Extract form ID from URL
      const formIdMatch = googleFormUrl.match(/\/d\/e\/([^\/]+)|\/d\/([^\/]+)/);
      if (!formIdMatch) {
        throw new Error("Invalid Google Form URL");
      }

      const formId = formIdMatch[1] || formIdMatch[2];
      
      // Fetch and parse the Google Form
      await parseGoogleForm(googleFormUrl, formId);
      
      setShowImportModal(false);
      setGoogleFormUrl("");
      
      // Show success message
      const successMsg = document.createElement('div');
      successMsg.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
      successMsg.textContent = 'Google Form imported successfully!';
      document.body.appendChild(successMsg);
      setTimeout(() => successMsg.remove(), 3000);
    } catch (error) {
      console.error("Import failed:", error);
      const errorMsg = document.createElement('div');
      errorMsg.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
      errorMsg.textContent = error instanceof Error ? error.message : 'Failed to import form. Please check the URL and try again.';
      document.body.appendChild(errorMsg);
      setTimeout(() => errorMsg.remove(), 3000);
    } finally {
      setIsImporting(false);
    }
  };

  const parseGoogleForm = async (url: string, formId: string) => {
    try {
      // Try different CORS proxies in order
      const proxies = [
        'https://corsproxy.io/?',
        'https://api.allorigins.win/raw?url=',
      ];
      
      const formUrl = `https://docs.google.com/forms/d/e/${formId}/viewform`;
      let html = '';
      let lastError = null;

      // Try each proxy until one works
      for (const proxyUrl of proxies) {
        try {
          const response = await fetch(proxyUrl + encodeURIComponent(formUrl), {
            method: 'GET',
            headers: {
              'Accept': 'text/html',
            },
          });
          
          if (response.ok) {
            html = await response.text();
            if (html && html.length > 100) {
              break; // Successfully got the HTML
            }
          }
        } catch (e) {
          lastError = e;
          continue; // Try next proxy
        }
      }

      if (!html || html.length < 100) {
        throw lastError || new Error("Unable to fetch form. Please make sure the form is public and accessible.");
      }
      
      // Parse the HTML to extract form fields
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      
      // Extract form data from the script tags
      const scripts = doc.querySelectorAll('script');
      let formData: unknown = null;
      
      console.log('Looking for form data in scripts...');
      
      for (const script of scripts) {
        const content = script.textContent || '';
        // Look for the FB_PUBLIC_LOAD_DATA_ variable which contains form structure
        const match = content.match(/FB_PUBLIC_LOAD_DATA_\s*=\s*(\[.*?\]);/s);
        if (match) {
          try {
            formData = JSON.parse(match[1]);
            console.log('Found form data:', formData);
            break;
          } catch (e) {
            console.error('Failed to parse form data:', e);
            continue;
          }
        }
      }

      if (!formData || !Array.isArray(formData) || !formData[1] || !formData[1][1]) {
        console.error('Form data structure:', formData);
        throw new Error("Could not parse form structure. The form might be restricted or the format has changed.");
      }

      // Extract questions from the form data
      const questions = (formData as unknown[])[1] as unknown[];
      console.log('Found questions:', questions.length);
      const importedFields: FormField[] = [];

      for (let i = 0; i < questions.length; i++) {
        const question = questions[i] as unknown[];
        if (!question || !question[1]) continue;

        const questionTitle = (question[1] as string) || `Question ${i + 1}`;
        const questionType = question[3] as number; // Type ID
        const isRequired = question[4] && (question[4] as unknown[])[0] && ((question[4] as unknown[])[0] as unknown[])[2] === 1;
        const helpText = (question[2] as string) || "";
        
        // Get options for multiple choice questions
        let options: string[] | undefined;
        if (question[4] && (question[4] as unknown[])[0] && ((question[4] as unknown[])[0] as unknown[])[1]) {
          const choicesData = ((question[4] as unknown[])[0] as unknown[])[1] as unknown[];
          options = choicesData.map((choice: unknown[]) => choice[0] as string).filter(Boolean);
        }

        // Determine field type and section based on question type
        let fieldType: FormField["type"] = "text";
        let section = "basic";

        // Map Google Form question types to our field types
        switch (questionType) {
          case 0: // Short answer
            fieldType = "text";
            break;
          case 1: // Paragraph
            fieldType = "textarea";
            break;
          case 2: // Multiple choice
          case 3: // Dropdown
          case 4: // Checkboxes
            fieldType = "select";
            break;
          case 5: // Linear scale
            fieldType = "number";
            break;
          case 9: // Date
            fieldType = "date";
            section = "timeline";
            break;
          case 10: // Time
            fieldType = "text";
            break;
          default:
            fieldType = "text";
        }

        // Smart section assignment based on keywords
        const titleLower = questionTitle.toLowerCase();
        if (titleLower.includes('budget') || titleLower.includes('price') || titleLower.includes('cost')) {
          section = "budget";
        } else if (titleLower.includes('deadline') || titleLower.includes('timeline') || titleLower.includes('date') || titleLower.includes('when')) {
          section = "timeline";
        } else if (titleLower.includes('requirement') || titleLower.includes('feature') || titleLower.includes('need')) {
          section = "requirements";
        } else if (titleLower.includes('objective') || titleLower.includes('goal') || titleLower.includes('target')) {
          section = "objectives";
        } else if (titleLower.includes('note') || titleLower.includes('comment') || titleLower.includes('additional')) {
          section = "other";
        } else if (i < 3) {
          section = "basic";
        }

        const field = {
          id: `field_${Date.now()}_${i}`,
          label: questionTitle,
          type: fieldType,
          required: isRequired,
          placeholder: helpText || undefined,
          options: options,
          section: section,
        };
        
        console.log(`Field ${i + 1}:`, field);
        importedFields.push(field);
      }

      if (importedFields.length === 0) {
        throw new Error("No questions found in the form. Please check if the form is valid.");
      }

      console.log('Total imported fields:', importedFields.length);
      
      // Add imported fields to existing fields
      setFields([...fields, ...importedFields]);
      
    } catch (error) {
      console.error("Parsing error:", error);
      throw new Error("Failed to parse Google Form. Make sure the form is public and try again.");
    }
  };

  // Form Preview Component
  const FormPreview = () => {
    const [previewData, setPreviewData] = useState<{[key: string]: unknown}>({});
    
    const handlePreviewChange = (fieldId: string, value: unknown) => {
      setPreviewData(prev => ({
        ...prev,
        [fieldId]: value
      }));
    };

    const renderPreviewField = (field: FormField) => {
      const commonProps = {
        key: field.id,
        required: field.required,
        placeholder: field.placeholder,
      };

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
                value={previewData[field.id] || ""}
                onChange={(e) => handlePreviewChange(field.id, e.target.value)}
                className="w-full"
              />
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
                value={previewData[field.id] || ""}
                onChange={(e) => handlePreviewChange(field.id, e.target.value)}
                className="w-full min-h-[100px] px-3 py-2 border border-input bg-background rounded-md text-sm resize-vertical"
              />
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
                value={previewData[field.id] || ""}
                onChange={(e) => handlePreviewChange(field.id, e.target.value)}
                className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm"
              >
                <option value="">Select an option...</option>
                {field.options?.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
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
                      checked={previewData[field.id] === option}
                      onChange={(e) => handlePreviewChange(field.id, e.target.value)}
                      className="w-4 h-4"
                    />
                    <label htmlFor={`${field.id}_${index}`} className="text-sm">
                      {option}
                    </label>
                  </div>
                ))}
              </div>
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
                      checked={(previewData[field.id] || []).includes(option)}
                      onChange={(e) => {
                        const currentValues = previewData[field.id] || [];
                        const newValues = e.target.checked
                          ? [...currentValues, option]
                          : currentValues.filter((v: string) => v !== option);
                        handlePreviewChange(field.id, newValues);
                      }}
                      className="w-4 h-4"
                    />
                    <label htmlFor={`${field.id}_${index}`} className="text-sm">
                      {option}
                    </label>
                  </div>
                ))}
              </div>
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
                value={previewData[field.id] || ""}
                onChange={(e) => handlePreviewChange(field.id, e.target.value)}
                className="w-full"
              />
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
                value={previewData[field.id] || ""}
                onChange={(e) => handlePreviewChange(field.id, e.target.value)}
                className="w-full"
              />
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
                value={previewData[field.id] || ""}
                onChange={(e) => handlePreviewChange(field.id, e.target.value)}
                className="w-full"
              />
            </div>
          );

        case "file":
          return (
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-1">
                {field.label}
                {field.required && <span className="text-red-500">*</span>}
              </label>
              <div className="border-2 border-dashed border-input rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
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
                  onChange={(e) => handlePreviewChange(field.id, e.target.files)}
                  className="hidden"
                  id={`file_${field.id}`}
                />
                <label
                  htmlFor={`file_${field.id}`}
                  className="cursor-pointer inline-block mt-2 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm hover:bg-primary/90 transition-colors"
                >
                  Choose Files
                </label>
              </div>
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
                    onClick={() => handlePreviewChange(field.id, index + 1)}
                    className={`w-8 h-8 ${
                      (previewData[field.id] || 0) > index
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    } hover:text-yellow-400 transition-colors`}
                  >
                    <Star className="w-full h-full" />
                  </button>
                ))}
                <span className="ml-2 text-sm text-muted-foreground">
                  {previewData[field.id] || 0} / {maxRating}
                </span>
              </div>
            </div>
          );

        default:
          return null;
      }
    };

    const groupedFields = sections.map(section => ({
      ...section,
      fields: fields.filter(field => field.section === section.id)
    })).filter(section => section.fields.length > 0);

    return (
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold">Project Brief Form</h2>
          <p className="text-muted-foreground">
            Please fill out all the required information about your project
          </p>
        </div>

        {groupedFields.map(section => (
          <div key={section.id} className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">
              {section.label}
            </h3>
            <div className="space-y-4">
              {section.fields.map(renderPreviewField)}
            </div>
          </div>
        ))}

        <div className="flex gap-4 pt-6 border-t">
          <Button className="flex-1" size="lg">
            Submit Brief
          </Button>
          <Button variant="outline" size="lg">
            Save as Draft
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Brief Form Builder</h1>
            <p className="text-muted-foreground mt-1">
              Customize the project brief form fields
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setShowImportModal(true)} variant="secondary" className="gap-2">
            <LinkIcon className="w-4 h-4" />
            Import from Google Form
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              generateFormUrl();
              setShowShareModal(true);
            }}
            className="flex items-center gap-2"
          >
            <LinkIcon className="w-4 h-4" />
            Generate Link
          </Button>
          <Button onClick={handleSaveForm} className="gap-2">
            <Save className="w-4 h-4" />
            Save Changes
          </Button>
          <Button variant="outline" className="gap-2" onClick={() => setShowPreviewModal(true)}>
            <Eye className="w-4 h-4" />
            Preview
          </Button>
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
              Admin Control
            </p>
            <p className="text-sm text-muted-foreground">
              Add, remove, or modify form fields. Changes will apply to all new briefs submitted by agents.
              Existing briefs will not be affected.
            </p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Fields List */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border border-border bg-card p-6 space-y-4"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-foreground">
                Form Fields ({fields.length})
              </h2>
              <Button onClick={() => setShowAddModal(true)} size="sm" className="gap-2">
                <Plus className="w-4 h-4" />
                Add Field
              </Button>
            </div>

            {sections.map((section) => {
              const sectionFields = fields.filter(f => f.section === section.id);
              if (sectionFields.length === 0) return null;

              return (
                <div key={section.id} className="mb-6">
                  <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">
                    {section.label}
                  </h3>
                  <div className="space-y-2">
                    {sectionFields.map((field, index) => (
                      <motion.div
                        key={field.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center gap-3 p-4 rounded-lg border border-border bg-muted/30 hover:border-primary/50 transition-all group"
                      >
                        <GripVertical className="w-4 h-4 text-muted-foreground cursor-move" />
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-medium text-foreground">{field.label}</p>
                            {field.required && (
                              <Badge variant="outline" className="text-xs">Required</Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span className="capitalize">{field.type}</span>
                            {field.placeholder && (
                              <>
                                <span>•</span>
                                <span>&quot;{field.placeholder}&quot;</span>
                              </>
                            )}
                          </div>
                        </div>

                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleEditField(field)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive"
                            onClick={() => handleDeleteField(field.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              );
            })}

            {fields.length === 0 && (
              <div className="text-center py-12">
                <Settings className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No fields yet</h3>
                <p className="text-muted-foreground mb-4">
                  Start building your form by adding fields
                </p>
                <Button onClick={() => setShowAddModal(true)} className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add First Field
                </Button>
              </div>
            )}
          </motion.div>
        </div>

        {/* Settings Panel */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-xl border border-border bg-card p-6 space-y-6 sticky top-6"
          >
            <h2 className="text-lg font-semibold text-foreground">Form Settings</h2>

            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-foreground mb-2">Total Fields</p>
                <p className="text-3xl font-bold text-primary">{fields.length}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-foreground mb-2">Required Fields</p>
                <p className="text-3xl font-bold text-primary">
                  {fields.filter(f => f.required).length}
                </p>
              </div>

              <div>
                <p className="text-sm font-medium text-foreground mb-2">Sections</p>
                <div className="flex flex-wrap gap-2">
                  {sections.map(section => {
                    const count = fields.filter(f => f.section === section.id).length;
                    if (count === 0) return null;
                    return (
                      <Badge key={section.id} variant="outline">
                        {section.label} ({count})
                      </Badge>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-border">
              <h3 className="text-sm font-semibold text-foreground mb-3">Quick Actions</h3>
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-start gap-2" 
                  size="sm"
                  onClick={() => setShowImportModal(true)}
                >
                  <LinkIcon className="w-4 h-4" />
                  Import Google Form
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start gap-2" 
                  size="sm"
                  onClick={() => setShowPreviewModal(true)}
                >
                  <Eye className="w-4 h-4" />
                  Preview Form
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start gap-2" 
                  size="sm"
                  onClick={() => {
                    const dataStr = JSON.stringify(fields, null, 2);
                    const dataBlob = new Blob([dataStr], { type: 'application/json' });
                    const url = URL.createObjectURL(dataBlob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = 'brief-form-template.json';
                    link.click();
                  }}
                >
                  <Download className="w-4 h-4" />
                  Export Template
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Add/Edit Field Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card rounded-xl border border-border p-6 max-w-md w-full max-h-[90vh] overflow-y-auto"
          >
            <h2 className="text-2xl font-bold mb-4">
              {editingField ? "Edit Field" : "Add New Field"}
            </h2>

            <div className="space-y-4">
              <div>
                <Label htmlFor="label">Field Label *</Label>
                <Input
                  id="label"
                  value={newField.label}
                  onChange={(e) => setNewField({ ...newField, label: e.target.value })}
                  placeholder="E.g., Project Budget"
                />
              </div>

              <div>
                <Label htmlFor="type">Field Type *</Label>
                <select
                  id="type"
                  value={newField.type}
                  onChange={(e) => setNewField({ ...newField, type: e.target.value as FormField["type"] })}
                  className="w-full px-3 py-2 rounded-md border border-input bg-background text-foreground"
                >
                  {fieldTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label htmlFor="section">Section *</Label>
                <select
                  id="section"
                  value={newField.section}
                  onChange={(e) => setNewField({ ...newField, section: e.target.value })}
                  className="w-full px-3 py-2 rounded-md border border-input bg-background text-foreground"
                >
                  {sections.map(section => (
                    <option key={section.id} value={section.id}>
                      {section.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label htmlFor="placeholder">Placeholder Text</Label>
                <Input
                  id="placeholder"
                  value={newField.placeholder}
                  onChange={(e) => setNewField({ ...newField, placeholder: e.target.value })}
                  placeholder="E.g., Enter your budget range"
                />
              </div>

              {(newField.type === "select" || newField.type === "radio" || newField.type === "checkbox") && (
                <div>
                  <Label htmlFor="options">Options (one per line)</Label>
                  <textarea
                    id="options"
                    value={optionsInput}
                    onChange={(e) => setOptionsInput(e.target.value)}
                    placeholder="Option 1&#10;Option 2&#10;Option 3"
                    className="w-full min-h-[100px] px-3 py-2 rounded-md border border-input bg-background text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Enter each option on a new line
                  </p>
                </div>
              )}

              {newField.type === "file" && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="fileTypes">Accepted File Types (comma separated)</Label>
                    <Input
                      id="fileTypes"
                      value={fileTypesInput}
                      onChange={(e) => setFileTypesInput(e.target.value)}
                      placeholder="pdf, doc, docx, jpg, png"
                      className="mt-2"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Leave empty to accept all file types
                    </p>
                  </div>
                  <div>
                    <Label htmlFor="maxFiles">Maximum Files</Label>
                    <Input
                      id="maxFiles"
                      type="number"
                      min="1"
                      max="10"
                      value={(newField as FormField & {maxFiles?: number}).maxFiles || 1}
                      onChange={(e) => setNewField({...newField, maxFiles: parseInt(e.target.value) || 1})}
                      className="mt-2"
                    />
                  </div>
                </div>
              )}

              {newField.type === "rating" && (
                <div>
                  <Label htmlFor="ratingMax">Maximum Rating</Label>
                    <Input
                      id="ratingMax"
                      type="number"
                      min="3"
                      max="10"
                      value={(newField as FormField & {ratingMax?: number}).ratingMax || 5}
                      onChange={(e) => setNewField({...newField, ratingMax: parseInt(e.target.value) || 5})}
                      placeholder="5"
                      className="mt-2"
                    />
                  <p className="text-xs text-muted-foreground mt-1">
                    Number of stars (3-10)
                  </p>
                </div>
              )}

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="required"
                  checked={newField.required}
                  onChange={(e) => setNewField({ ...newField, required: e.target.checked })}
                  className="rounded"
                />
                <Label htmlFor="required" className="cursor-pointer">
                  Required Field
                </Label>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button onClick={handleAddField} className="flex-1">
                {editingField ? "Update Field" : "Add Field"}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowAddModal(false);
                  setEditingField(null);
                  setNewField({
                    label: "",
                    type: "text",
                    required: false,
                    section: "basic",
                    placeholder: "",
                  });
                  setOptionsInput("");
                }}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </motion.div>
        </div>
      )}


      {/* Import from Google Form Modal */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card rounded-xl border border-border p-6 max-w-2xl w-full"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-lg bg-primary/10">
                <LinkIcon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Import from Google Form</h2>
                <p className="text-sm text-muted-foreground">
                  Paste your Google Form URL to automatically import all fields
                </p>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <Label htmlFor="googleFormUrl">Google Form URL</Label>
                <Input
                  id="googleFormUrl"
                  value={googleFormUrl}
                  onChange={(e) => setGoogleFormUrl(e.target.value)}
                  placeholder="https://docs.google.com/forms/d/e/..."
                  className="mt-2"
                  disabled={isImporting}
                />
              </div>

              <div className="rounded-lg border border-blue-500/20 bg-blue-500/10 p-4">
                <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-blue-500" />
                  How to get your Google Form URL:
                </h3>
                <ol className="text-sm text-muted-foreground space-y-1 ml-6 list-decimal">
                  <li>Open your Google Form</li>
                  <li>Click on &quot;Send&quot; button (top right)</li>
                  <li>Click on the link icon (🔗)</li>
                  <li>Copy the shortened URL</li>
                  <li>Paste it here</li>
                </ol>
              </div>

              <div className="rounded-lg border border-amber-500/20 bg-amber-500/10 p-4">
                <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-500" />
                  What will be imported:
                </h3>
                <ul className="text-sm text-muted-foreground space-y-1 ml-6 list-disc">
                  <li>All question titles as field labels</li>
                  <li>Question types (text, paragraph, multiple choice, etc.)</li>
                  <li>Multiple choice options as dropdown options</li>
                  <li>Required field markers</li>
                  <li>Help text as placeholder text</li>
                </ul>
              </div>

              <div className="rounded-lg border border-purple-500/20 bg-purple-500/10 p-4">
                <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-purple-500" />
                  Important Notes:
                </h3>
                <ul className="text-sm text-muted-foreground space-y-1 ml-6 list-disc">
                  <li>The form must be public (not restricted)</li>
                  <li>Imported fields will be added to your existing form</li>
                  <li>Fields are auto-categorized by content (budget, timeline, etc.)</li>
                  <li>You can edit, reorder, or delete fields after import</li>
                  <li>The actual form structure will be parsed and imported</li>
                </ul>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={handleImportFromGoogleForm}
                disabled={!googleFormUrl || isImporting}
                className="flex-1 gap-2"
              >
                {isImporting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Importing...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    Import Form
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowImportModal(false);
                  setGoogleFormUrl("");
                }}
                disabled={isImporting}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card rounded-xl border border-border p-6 max-w-md w-full"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Share Form</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowShareModal(false)}
              >
                ✕
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <Label>Form URL</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    value={formUrl}
                    readOnly
                    className="flex-1"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      navigator.clipboard.writeText(formUrl);
                      // Show success message
                      const successMsg = document.createElement('div');
                      successMsg.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50';
                      successMsg.textContent = 'Link copied to clipboard!';
                      document.body.appendChild(successMsg);
                      setTimeout(() => successMsg.remove(), 2000);
                    }}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="rounded-lg border border-blue-500/20 bg-blue-500/10 p-4">
                <h3 className="text-sm font-semibold text-foreground mb-2">
                  📋 How to use this link:
                </h3>
                <ul className="text-sm text-muted-foreground space-y-1 ml-4 list-disc">
                  <li>Share this link with your agents</li>
                  <li>Clients can fill out the form directly</li>
                  <li>Responses will be saved to your dashboard</li>
                  <li>You&apos;ll get notified of new submissions</li>
                </ul>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button
                onClick={() => setShowShareModal(false)}
                className="flex-1"
              >
                Done
              </Button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Enhanced Preview Modal */}
      {showPreviewModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card rounded-xl border border-border p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto my-8"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold">Form Preview & Test</h2>
                <p className="text-sm text-muted-foreground">Test your form before sharing it with clients</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowPreviewModal(false)}
              >
                ✕
              </Button>
            </div>

            <div className="bg-background rounded-lg border p-6">
              <FormPreview />
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
