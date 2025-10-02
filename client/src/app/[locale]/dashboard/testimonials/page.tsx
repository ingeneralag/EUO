"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Plus, 
  Search, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Eye,
  Star,
  User,
  Building2,
  Calendar,
  Volume2,
  VolumeX,
  Play,
  Pause,
  X,
  Upload,
  Save,
  AlertTriangle
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  text: string;
  audioUrl?: string;
  status: "Published" | "Draft" | "Pending Review";
  featured: boolean;
  createdAt: string;
  project?: string;
}

const mockTestimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "CEO",
    company: "TechCorp Solutions",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    rating: 5,
    text: "Working with Sitovia has been an absolute game-changer for our business. Their team delivered a stunning e-commerce platform that exceeded all our expectations. The attention to detail and technical expertise is unmatched.",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    status: "Published",
    featured: true,
    createdAt: "2024-01-15",
    project: "E-Commerce Platform",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "CTO",
    company: "MedTech Solutions",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    rating: 5,
    text: "The healthcare mobile app they developed for us has revolutionized how we serve our patients. The user experience is intuitive, and the technical implementation is flawless. Highly recommended!",
    status: "Published",
    featured: true,
    createdAt: "2024-01-12",
    project: "Healthcare Mobile App",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Marketing Director",
    company: "Business Inc",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
    rating: 4,
    text: "Our new corporate website has significantly improved our online presence. The SEO optimization and modern design have led to a 40% increase in leads. Great work!",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    status: "Published",
    featured: false,
    createdAt: "2024-01-08",
    project: "Corporate Website",
  },
  {
    id: 4,
    name: "David Thompson",
    role: "Owner",
    company: "Foodie Restaurant",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
    rating: 5,
    text: "The restaurant ordering system has streamlined our operations and improved customer satisfaction. Orders have increased by 60% since launch!",
    status: "Draft",
    featured: false,
    createdAt: "2024-01-05",
    project: "Restaurant Ordering System",
  },
  {
    id: 5,
    name: "Lisa Wang",
    role: "Product Manager",
    company: "StartupXYZ",
    avatar: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=150&h=150&fit=crop",
    rating: 5,
    text: "Exceptional service and outstanding results. The team was professional, responsive, and delivered exactly what we needed on time and within budget.",
    status: "Pending Review",
    featured: false,
    createdAt: "2024-01-03",
  },
];

const statusColors = {
  "Published": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  "Draft": "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
  "Pending Review": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
};

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(mockTestimonials);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [ratingFilter, setRatingFilter] = useState<string>("all");
  const [playingAudio, setPlayingAudio] = useState<number | null>(null);
  
  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);
  
  // Form states
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    company: "",
    avatar: "",
    rating: 5,
    text: "",
    audioUrl: "",
    status: "Draft" as const,
    featured: false,
    project: "",
  });
  
  // Audio refs
  const audioRefs = useRef<{ [key: number]: HTMLAudioElement }>({});

  const filteredTestimonials = testimonials.filter((testimonial) => {
    const matchesSearch = testimonial.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         testimonial.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         testimonial.text.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || testimonial.status === statusFilter;
    const matchesRating = ratingFilter === "all" || testimonial.rating.toString() === ratingFilter;
    
    return matchesSearch && matchesStatus && matchesRating;
  });

  // Reset form data
  const resetFormData = () => {
    setFormData({
      name: "",
      role: "",
      company: "",
      avatar: "",
      rating: 5,
      text: "",
      audioUrl: "",
      status: "Draft",
      featured: false,
      project: "",
    });
  };

  // Add testimonial
  const handleAddTestimonial = () => {
    const newTestimonial: Testimonial = {
      id: Math.max(...testimonials.map(t => t.id)) + 1,
      ...formData,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setTestimonials([newTestimonial, ...testimonials]);
    setIsAddModalOpen(false);
    resetFormData();
    
    // Show success message
    const successMsg = document.createElement('div');
    successMsg.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
    successMsg.textContent = 'Testimonial added successfully!';
    document.body.appendChild(successMsg);
    setTimeout(() => successMsg.remove(), 3000);
  };

  // Edit testimonial
  const handleEditTestimonial = (testimonial: Testimonial) => {
    setSelectedTestimonial(testimonial);
    setFormData({
      name: testimonial.name,
      role: testimonial.role,
      company: testimonial.company,
      avatar: testimonial.avatar,
      rating: testimonial.rating,
      text: testimonial.text,
      audioUrl: testimonial.audioUrl || "",
      status: testimonial.status,
      featured: testimonial.featured,
      project: testimonial.project || "",
    });
    setIsEditModalOpen(true);
  };

  // Save edited testimonial
  const handleSaveEditedTestimonial = () => {
    if (!selectedTestimonial) return;
    
    const updatedTestimonials = testimonials.map(t => 
      t.id === selectedTestimonial.id 
        ? { ...t, ...formData }
        : t
    );
    setTestimonials(updatedTestimonials);
    setIsEditModalOpen(false);
    setSelectedTestimonial(null);
    resetFormData();
    
    // Show success message
    const successMsg = document.createElement('div');
    successMsg.className = 'fixed top-4 right-4 bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
    successMsg.textContent = 'Testimonial updated successfully!';
    document.body.appendChild(successMsg);
    setTimeout(() => successMsg.remove(), 3000);
  };

  // View testimonial details
  const handleViewTestimonial = (testimonial: Testimonial) => {
    setSelectedTestimonial(testimonial);
    setIsViewModalOpen(true);
  };

  // Delete testimonial with confirmation
  const handleDeleteClick = (testimonial: Testimonial) => {
    setSelectedTestimonial(testimonial);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!selectedTestimonial) return;
    
    setTestimonials(testimonials.filter(t => t.id !== selectedTestimonial.id));
    setIsDeleteModalOpen(false);
    setSelectedTestimonial(null);
    
    // Show success message
    const successMsg = document.createElement('div');
    successMsg.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
    successMsg.textContent = 'Testimonial deleted successfully!';
    document.body.appendChild(successMsg);
    setTimeout(() => successMsg.remove(), 3000);
  };

  // Audio playback with real functionality
  const handlePlayAudio = (id: number, audioUrl?: string) => {
    if (!audioUrl) return;
    
    // Stop all other audio
    Object.values(audioRefs.current).forEach(audio => {
      if (audio && !audio.paused) {
        audio.pause();
        audio.currentTime = 0;
      }
    });
    
    if (playingAudio === id) {
      setPlayingAudio(null);
      return;
    }
    
    // Create or get audio element
    if (!audioRefs.current[id]) {
      audioRefs.current[id] = new Audio(audioUrl);
      audioRefs.current[id].addEventListener('ended', () => {
        setPlayingAudio(null);
      });
    }
    
    audioRefs.current[id].play().then(() => {
      setPlayingAudio(id);
    }).catch((error) => {
      console.error('Error playing audio:', error);
      // Show error message
      const errorMsg = document.createElement('div');
      errorMsg.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
      errorMsg.textContent = 'Error playing audio file';
      document.body.appendChild(errorMsg);
      setTimeout(() => errorMsg.remove(), 3000);
    });
  };

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      Object.values(audioRefs.current).forEach(audio => {
        if (audio) {
          audio.pause();
          audio.src = '';
        }
      });
    };
  }, []);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  const averageRating = testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Testimonials</h1>
          <p className="text-muted-foreground">
            Manage client feedback and showcase your success stories.
          </p>
        </div>
        <Button className="gap-2" onClick={() => setIsAddModalOpen(true)}>
          <Plus className="w-4 h-4" />
          Add Testimonial
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Reviews</p>
                <p className="text-2xl font-bold">{testimonials.length}</p>
              </div>
              <User className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Average Rating</p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold">{averageRating.toFixed(1)}</p>
                  <div className="flex">
                    {renderStars(Math.round(averageRating))}
                  </div>
                </div>
              </div>
              <Star className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Published</p>
                <p className="text-2xl font-bold">{testimonials.filter(t => t.status === "Published").length}</p>
              </div>
              <Eye className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Featured</p>
                <p className="text-2xl font-bold">{testimonials.filter(t => t.featured).length}</p>
              </div>
              <Star className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search testimonials..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Published">Published</SelectItem>
                <SelectItem value="Draft">Draft</SelectItem>
                <SelectItem value="Pending Review">Pending Review</SelectItem>
              </SelectContent>
            </Select>
            <Select value={ratingFilter} onValueChange={setRatingFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ratings</SelectItem>
                <SelectItem value="5">5 Stars</SelectItem>
                <SelectItem value="4">4 Stars</SelectItem>
                <SelectItem value="3">3 Stars</SelectItem>
                <SelectItem value="2">2 Stars</SelectItem>
                <SelectItem value="1">1 Star</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredTestimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="group hover:shadow-lg transition-all duration-300 h-full">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                        <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{testimonial.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.role} at {testimonial.company}
                        </p>
                      </div>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewTestimonial(testimonial)}>
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditTestimonial(testimonial)}>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit Testimonial
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-red-600"
                          onClick={() => handleDeleteClick(testimonial)}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {/* Status and Rating */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge className={statusColors[testimonial.status]}>
                        {testimonial.status}
                      </Badge>
                      {testimonial.featured && (
                        <Badge variant="outline">Featured</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      {renderStars(testimonial.rating)}
                    </div>
                  </div>

                  {/* Audio Controls */}
                  {testimonial.audioUrl && (
                    <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handlePlayAudio(testimonial.id, testimonial.audioUrl)}
                        className="h-8 w-8"
                      >
                        {playingAudio === testimonial.id ? (
                          <Pause className="w-4 h-4" />
                        ) : (
                          <Play className="w-4 h-4" />
                        )}
                      </Button>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Volume2 className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">Audio Testimonial</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Testimonial Text */}
                  <blockquote className="text-sm leading-relaxed italic">
                    "{testimonial.text}"
                  </blockquote>

                  {/* Meta Info */}
                  <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground pt-2 border-t">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(testimonial.createdAt).toLocaleDateString()}</span>
                    </div>
                    {testimonial.project && (
                      <div className="flex items-center gap-1">
                        <Building2 className="w-3 h-3" />
                        <span>{testimonial.project}</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredTestimonials.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <User className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No testimonials found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || statusFilter !== "all" || ratingFilter !== "all"
                ? "Try adjusting your search or filters."
                : "Get started by adding your first testimonial."}
            </p>
            <Button onClick={() => setIsAddModalOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Testimonial
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Add Testimonial Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Testimonial</DialogTitle>
            <DialogDescription>
              Create a new client testimonial to showcase your success stories.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Client Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="John Doe"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role *</Label>
                <Input
                  id="role"
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                  placeholder="CEO"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company">Company *</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                  placeholder="TechCorp Solutions"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="project">Project</Label>
                <Input
                  id="project"
                  value={formData.project}
                  onChange={(e) => setFormData({...formData, project: e.target.value})}
                  placeholder="E-Commerce Platform"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="avatar">Avatar URL</Label>
              <Input
                id="avatar"
                value={formData.avatar}
                onChange={(e) => setFormData({...formData, avatar: e.target.value})}
                placeholder="https://example.com/avatar.jpg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="text">Testimonial Text *</Label>
              <Textarea
                id="text"
                value={formData.text}
                onChange={(e) => setFormData({...formData, text: e.target.value})}
                placeholder="Working with this team has been amazing..."
                rows={4}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="audioUrl">Audio URL (Optional)</Label>
              <Input
                id="audioUrl"
                value={formData.audioUrl}
                onChange={(e) => setFormData({...formData, audioUrl: e.target.value})}
                placeholder="https://example.com/audio.mp3"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="rating">Rating</Label>
                <Select value={formData.rating.toString()} onValueChange={(value) => setFormData({...formData, rating: parseInt(value)})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 Stars</SelectItem>
                    <SelectItem value="4">4 Stars</SelectItem>
                    <SelectItem value="3">3 Stars</SelectItem>
                    <SelectItem value="2">2 Stars</SelectItem>
                    <SelectItem value="1">1 Star</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value: any) => setFormData({...formData, status: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Published">Published</SelectItem>
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Pending Review">Pending Review</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="featured">Featured</Label>
                <div className="flex items-center space-x-2 h-10">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                    className="rounded border-gray-300"
                  />
                  <Label htmlFor="featured" className="text-sm">Mark as featured</Label>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => {setIsAddModalOpen(false); resetFormData();}}>
              Cancel
            </Button>
            <Button onClick={handleAddTestimonial} disabled={!formData.name || !formData.role || !formData.company || !formData.text}>
              <Save className="w-4 h-4 mr-2" />
              Add Testimonial
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Testimonial Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Testimonial</DialogTitle>
            <DialogDescription>
              Update the testimonial information and content.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Client Name *</Label>
                <Input
                  id="edit-name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="John Doe"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-role">Role *</Label>
                <Input
                  id="edit-role"
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                  placeholder="CEO"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-company">Company *</Label>
                <Input
                  id="edit-company"
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                  placeholder="TechCorp Solutions"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-project">Project</Label>
                <Input
                  id="edit-project"
                  value={formData.project}
                  onChange={(e) => setFormData({...formData, project: e.target.value})}
                  placeholder="E-Commerce Platform"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-avatar">Avatar URL</Label>
              <Input
                id="edit-avatar"
                value={formData.avatar}
                onChange={(e) => setFormData({...formData, avatar: e.target.value})}
                placeholder="https://example.com/avatar.jpg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-text">Testimonial Text *</Label>
              <Textarea
                id="edit-text"
                value={formData.text}
                onChange={(e) => setFormData({...formData, text: e.target.value})}
                placeholder="Working with this team has been amazing..."
                rows={4}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-audioUrl">Audio URL (Optional)</Label>
              <Input
                id="edit-audioUrl"
                value={formData.audioUrl}
                onChange={(e) => setFormData({...formData, audioUrl: e.target.value})}
                placeholder="https://example.com/audio.mp3"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-rating">Rating</Label>
                <Select value={formData.rating.toString()} onValueChange={(value) => setFormData({...formData, rating: parseInt(value)})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 Stars</SelectItem>
                    <SelectItem value="4">4 Stars</SelectItem>
                    <SelectItem value="3">3 Stars</SelectItem>
                    <SelectItem value="2">2 Stars</SelectItem>
                    <SelectItem value="1">1 Star</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-status">Status</Label>
                <Select value={formData.status} onValueChange={(value: any) => setFormData({...formData, status: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Published">Published</SelectItem>
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Pending Review">Pending Review</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-featured">Featured</Label>
                <div className="flex items-center space-x-2 h-10">
                  <input
                    type="checkbox"
                    id="edit-featured"
                    checked={formData.featured}
                    onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                    className="rounded border-gray-300"
                  />
                  <Label htmlFor="edit-featured" className="text-sm">Mark as featured</Label>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => {setIsEditModalOpen(false); setSelectedTestimonial(null); resetFormData();}}>
              Cancel
            </Button>
            <Button onClick={handleSaveEditedTestimonial} disabled={!formData.name || !formData.role || !formData.company || !formData.text}>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Details Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Testimonial Details</DialogTitle>
            <DialogDescription>
              Complete information about this testimonial.
            </DialogDescription>
          </DialogHeader>
          
          {selectedTestimonial && (
            <div className="space-y-6">
              {/* Client Info */}
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={selectedTestimonial.avatar} alt={selectedTestimonial.name} />
                  <AvatarFallback>{selectedTestimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold">{selectedTestimonial.name}</h3>
                  <p className="text-muted-foreground">{selectedTestimonial.role} at {selectedTestimonial.company}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex">
                      {renderStars(selectedTestimonial.rating)}
                    </div>
                    <span className="text-sm text-muted-foreground">({selectedTestimonial.rating}/5)</span>
                  </div>
                </div>
              </div>

              {/* Status and Meta */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Status</Label>
                  <div className="mt-1">
                    <Badge className={statusColors[selectedTestimonial.status]}>
                      {selectedTestimonial.status}
                    </Badge>
                    {selectedTestimonial.featured && (
                      <Badge variant="outline" className="ml-2">Featured</Badge>
                    )}
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">Created</Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    {new Date(selectedTestimonial.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {selectedTestimonial.project && (
                <div>
                  <Label className="text-sm font-medium">Project</Label>
                  <p className="text-sm text-muted-foreground mt-1">{selectedTestimonial.project}</p>
                </div>
              )}

              {/* Testimonial Text */}
              <div>
                <Label className="text-sm font-medium">Testimonial</Label>
                <blockquote className="mt-2 p-4 bg-muted/50 rounded-lg italic">
                  "{selectedTestimonial.text}"
                </blockquote>
              </div>

              {/* Audio */}
              {selectedTestimonial.audioUrl && (
                <div>
                  <Label className="text-sm font-medium">Audio Testimonial</Label>
                  <div className="flex items-center gap-2 mt-2 p-3 bg-muted/50 rounded-lg">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handlePlayAudio(selectedTestimonial.id, selectedTestimonial.audioUrl)}
                      className="h-8 w-8"
                    >
                      {playingAudio === selectedTestimonial.id ? (
                        <Pause className="w-4 h-4" />
                      ) : (
                        <Play className="w-4 h-4" />
                      )}
                    </Button>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Volume2 className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Click to play audio</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => {setIsViewModalOpen(false); setSelectedTestimonial(null);}}>
              Close
            </Button>
            <Button onClick={() => {
              setIsViewModalOpen(false);
              if (selectedTestimonial) handleEditTestimonial(selectedTestimonial);
            }}>
              <Edit className="w-4 h-4 mr-2" />
              Edit Testimonial
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              Delete Testimonial
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this testimonial? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          {selectedTestimonial && (
            <div className="py-4">
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={selectedTestimonial.avatar} alt={selectedTestimonial.name} />
                  <AvatarFallback>{selectedTestimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{selectedTestimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{selectedTestimonial.company}</p>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => {setIsDeleteModalOpen(false); setSelectedTestimonial(null);}}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Testimonial
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
