"use client";

import React, { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { 
  ExternalLink, 
  Github, 
  Globe, 
  Smartphone, 
  ShoppingCart, 
  Briefcase,
  ArrowRight,
  Search,
  Filter,
  Grid3X3,
  List,
  Calendar,
  MapPin,
  Star,
  ArrowLeft
} from "lucide-react";
import { cn } from "@/lib/utils";
import { projectsData, ProjectData } from "@/data/projects";
import { WorldMap } from "@/components/ui/world-map";

type ViewMode = "grid" | "list";
type SortBy = "newest" | "oldest" | "featured" | "alphabetical";

export default function AllProjectsPage() {
  const t = useTranslations("work");
  const params = useParams();
  const locale = params.locale as string;
  
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [sortBy, setSortBy] = useState<SortBy>("newest");

  const categories = [
    { id: "all", label: t("filters.all"), icon: <Briefcase className="w-4 h-4" />, count: projectsData.length },
    { id: "web", label: t("filters.web"), icon: <Globe className="w-4 h-4" />, count: projectsData.filter(p => p.category === "web").length },
    { id: "mobile", label: t("filters.mobile"), icon: <Smartphone className="w-4 h-4" />, count: projectsData.filter(p => p.category === "mobile").length },
    { id: "ecommerce", label: t("filters.ecommerce"), icon: <ShoppingCart className="w-4 h-4" />, count: projectsData.filter(p => p.category === "ecommerce").length },
  ];

  const sortOptions = [
    { id: "newest", label: "Newest First" },
    { id: "oldest", label: "Oldest First" },
    { id: "featured", label: "Featured First" },
    { id: "alphabetical", label: "A-Z" },
  ];

  // Extract unique project locations for the world map
  const projectLocations = useMemo(() => {
    const locations = projectsData.map(project => {
      // Map client locations to coordinates
      const locationCoords: { [key: string]: { lat: number; lng: number } } = {
        "Milan, Italy": { lat: 45.4642, lng: 9.1900 },
        "Rome, Italy": { lat: 41.9028, lng: 12.4964 },
        "Madrid, Spain": { lat: 40.4168, lng: -3.7038 },
        "Vienna, Austria": { lat: 48.2082, lng: 16.3738 },
        "Sydney, Australia": { lat: -33.8688, lng: 151.2093 },
        "New York, USA": { lat: 40.7128, lng: -74.0060 },
        "Dubai, UAE": { lat: 25.2048, lng: 55.2708 },
      };

      const coords = locationCoords[project.client.location];
      return coords ? {
        ...coords,
        label: project.client.location.split(', ')[1] || project.client.location,
        project: project.title,
        client: project.client.name
      } : null;
    }).filter(Boolean);

    // Create connections between locations for the animated lines
    const connections = [];
    for (let i = 0; i < locations.length - 1; i++) {
      connections.push({
        start: locations[i],
        end: locations[i + 1]
      });
    }

    return connections;
  }, []);

  // Filter and search projects
  const filteredAndSortedProjects = useMemo(() => {
    let filtered = projectsData;

    // Apply category filter
    if (activeFilter !== "all") {
      filtered = filtered.filter(project => project.category === activeFilter);
    }

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.technologies.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase())) ||
        project.client.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply sorting
    switch (sortBy) {
      case "newest":
        filtered.sort((a, b) => new Date(b.timeline.end).getTime() - new Date(a.timeline.end).getTime());
        break;
      case "oldest":
        filtered.sort((a, b) => new Date(a.timeline.end).getTime() - new Date(b.timeline.end).getTime());
        break;
      case "featured":
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
      case "alphabetical":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    return filtered;
  }, [activeFilter, searchQuery, sortBy]);

  const categoryColors = {
    web: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    mobile: "bg-green-500/10 text-green-500 border-green-500/20",
    ecommerce: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    });
  };

  return (
    <>
      {/* Header */}
      <Header />
      
      <div className="min-h-screen bg-background dark:bg-black">
      {/* Hero Section */}
      <section className="relative pt-24 pb-12 md:pt-32 md:pb-16 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)]" />
          
          {/* Floating Orbs */}
          <motion.div
            className="absolute top-[20%] left-[10%] w-72 h-72 bg-blue-500/20 dark:bg-blue-500/10 rounded-full blur-3xl"
            animate={{
              x: [0, 50, -25, 0],
              y: [0, -25, 15, 0],
              scale: [1, 1.1, 0.9, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-[20%] right-[15%] w-96 h-96 bg-purple-500/20 dark:bg-purple-500/10 rounded-full blur-3xl"
            animate={{
              x: [0, -40, 20, 0],
              y: [0, 30, -15, 0],
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
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 md:mb-8"
          >
            <Link href={`/${locale}`}>
              <Button variant="ghost" className="gap-2 hover:gap-3 transition-all">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Button>
            </Link>
          </motion.div>

          {/* Header with Map */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-8 md:mb-12">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7 text-center lg:text-left"
            >
              <Badge variant="outline" className="mb-4 bg-background dark:bg-black">
                {t("badge")}
              </Badge>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
                Our Complete Portfolio
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
                Explore our comprehensive collection of projects spanning web development, mobile applications, and e-commerce solutions across Europe, Australia, and beyond.
              </p>
              
              {/* Project Locations List */}
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                {Array.from(new Set(projectsData.map(p => p.client.location.split(', ')[1] || p.client.location))).map((country, index) => (
                  <motion.div
                    key={country}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  >
                    <Badge variant="secondary" className="text-xs">
                      {country}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* World Map */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="lg:col-span-5"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5 rounded-2xl blur-xl" />
                <div className="relative bg-card/30 backdrop-blur-sm rounded-2xl border border-border p-4 md:p-6">
                  <div className="mb-4 text-center lg:text-left">
                    <h3 className="text-lg font-semibold mb-2">Global Reach</h3>
                    <p className="text-sm text-muted-foreground">
                      Projects delivered across {Array.from(new Set(projectsData.map(p => p.client.location.split(', ')[1] || p.client.location))).length} countries
                    </p>
                  </div>
                  <div className="aspect-[2/1] rounded-xl overflow-hidden">
                    <WorldMap
                      dots={projectLocations}
                      lineColor="#3b82f6"
                      showLabels={true}
                      animationDuration={2}
                      loop={true}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* Filters and Controls */}
      <section className="py-8 md:py-12 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* Search */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex-1"
            >
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search projects, technologies, or clients..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-background/50 backdrop-blur-sm"
                />
              </div>
            </motion.div>

            {/* Category Filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="flex flex-wrap gap-2"
            >
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={activeFilter === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveFilter(category.id)}
                  className={cn(
                    "gap-2 transition-all duration-300",
                    activeFilter === category.id 
                      ? "bg-primary text-primary-foreground shadow-lg" 
                      : "hover:bg-muted/50 bg-background/50 backdrop-blur-sm"
                  )}
                >
                  {category.icon}
                  <span className="hidden sm:inline">{category.label}</span>
                  <span className="sm:hidden">{category.label.split(' ')[0]}</span>
                  <Badge variant="secondary" className="ml-1 text-xs">
                    {category.count}
                  </Badge>
                </Button>
              ))}
            </motion.div>

            {/* View Controls */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex items-center gap-2"
            >
              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortBy)}
                className="px-3 py-2 rounded-md border border-border bg-background/50 backdrop-blur-sm text-sm"
              >
                {sortOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>

              {/* View Mode Toggle */}
              <div className="flex border border-border rounded-md bg-background/50 backdrop-blur-sm">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Results Count */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-6 text-sm text-muted-foreground"
          >
            Showing {filteredAndSortedProjects.length} of {projectsData.length} projects
            {searchQuery && ` for "${searchQuery}"`}
            {activeFilter !== "all" && ` in ${categories.find(c => c.id === activeFilter)?.label}`}
          </motion.div>
        </div>
      </section>

      {/* Projects Grid/List */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <AnimatePresence mode="wait">
            {filteredAndSortedProjects.length === 0 ? (
              <motion.div
                key="no-results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center py-12"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted/50 flex items-center justify-center">
                  <Search className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No projects found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search terms or filters
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("");
                    setActiveFilter("all");
                  }}
                >
                  Clear Filters
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key={`${viewMode}-${activeFilter}-${searchQuery}-${sortBy}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className={cn(
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8"
                    : "space-y-6"
                )}
              >
                {filteredAndSortedProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -4 }}
                    className={cn(
                      "group relative rounded-2xl border border-border bg-card/30 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 overflow-hidden",
                      viewMode === "list" && "flex flex-col md:flex-row"
                    )}
                  >
                    <Link href={`/${locale}/work/${project.id}`} className="block">
                      {/* Project Image */}
                      <div className={cn(
                        "relative overflow-hidden",
                        viewMode === "grid" ? "h-56 md:h-64" : "h-48 md:h-full md:w-80 md:flex-shrink-0"
                      )}>
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        {/* Project Links */}
                        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {project.liveUrl && (
                            <Button 
                              size="icon" 
                              variant="secondary" 
                              className="h-8 w-8 bg-white/90 hover:bg-white"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                window.open(project.liveUrl, '_blank');
                              }}
                            >
                              <ExternalLink className="w-4 h-4 text-black" />
                            </Button>
                          )}
                          {project.githubUrl && (
                            <Button 
                              size="icon" 
                              variant="secondary" 
                              className="h-8 w-8 bg-white/90 hover:bg-white"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                window.open(project.githubUrl, '_blank');
                              }}
                            >
                              <Github className="w-4 h-4 text-black" />
                            </Button>
                          )}
                        </div>

                        {/* Featured Badge */}
                        {project.featured && (
                          <div className="absolute top-4 left-4">
                            <Badge className="bg-primary text-primary-foreground border-0 gap-1">
                              <Star className="w-3 h-3" />
                              Featured
                            </Badge>
                          </div>
                        )}

                        {/* Category Badge */}
                        <div className="absolute bottom-4 left-4">
                          <Badge className={cn("gap-1", categoryColors[project.category])}>
                            {project.category === "web" && <Globe className="w-3 h-3" />}
                            {project.category === "mobile" && <Smartphone className="w-3 h-3" />}
                            {project.category === "ecommerce" && <ShoppingCart className="w-3 h-3" />}
                            {project.category === "web" && "Web Development"}
                            {project.category === "mobile" && "Mobile App"}
                            {project.category === "ecommerce" && "E-commerce"}
                          </Badge>
                        </div>
                      </div>

                      {/* Project Content */}
                      <div className="p-4 md:p-6 flex-1 bg-card">
                        <h3 className="text-lg md:text-xl font-bold text-white dark:text-white group-hover:text-primary transition-colors mb-2 line-clamp-2">
                          {project.title}
                        </h3>
                        
                        <p className="text-gray-300 dark:text-gray-300 text-sm md:text-base mb-4 line-clamp-3">
                          {project.description}
                        </p>

                        {/* Client Info */}
                        <div className="mb-4">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-2 h-2 rounded-full bg-primary"></div>
                            <span className="text-sm font-medium text-white dark:text-white">{project.client.name}</span>
                          </div>
                          <div className="flex items-center gap-4 text-xs text-gray-400 dark:text-gray-400">
                            <div className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {project.client.location}
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {formatDate(project.timeline.end)}
                            </div>
                          </div>
                        </div>

                        {/* Technologies */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.technologies.slice(0, viewMode === "list" ? 6 : 4).map((tech) => (
                            <Badge key={tech} variant="secondary" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                          {project.technologies.length > (viewMode === "list" ? 6 : 4) && (
                            <Badge variant="secondary" className="text-xs">
                              +{project.technologies.length - (viewMode === "list" ? 6 : 4)}
                            </Badge>
                          )}
                        </div>

                        {/* View Project Button */}
                        <Button variant="ghost" size="sm" className="group/btn p-0 h-auto text-primary hover:text-primary">
                          View Project Details
                          <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                        </Button>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}
