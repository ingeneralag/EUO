"use client";

import React, { useState } from "react";
import { notFound } from "next/navigation";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  ExternalLink, 
  Github, 
  Calendar, 
  MapPin, 
  Users, 
  Clock,
  CheckCircle,
  TrendingUp,
  Lightbulb,
  Target,
  Quote
} from "lucide-react";
import { getProjectById, getRelatedProjects, ProjectData } from "@/data/projects";
import { cn } from "@/lib/utils";

interface ProjectDetailsPageProps {
  params: Promise<{
    locale: string;
    id: string;
  }>;
}

export default async function ProjectDetailsPage({ params }: ProjectDetailsPageProps) {
  const { locale, id } = await params;
  
  const project = getProjectById(id);
  
  if (!project) {
    notFound();
  }

  const relatedProjects = getRelatedProjects(project.id, project.category);

  return <ProjectDetailsClient project={project} relatedProjects={relatedProjects} locale={locale} />;
}

function ProjectDetailsClient({ 
  project, 
  relatedProjects, 
  locale 
}: { 
  project: ProjectData; 
  relatedProjects: ProjectData[]; 
  locale: string; 
}) {
  const t = useTranslations("work");
  const [selectedImage, setSelectedImage] = useState(0);

  const categoryColors = {
    web: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    mobile: "bg-green-500/10 text-green-500 border-green-500/20",
    ecommerce: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
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
            <Link href={`/${locale}/#work`}>
              <Button variant="ghost" className="gap-2 hover:gap-3 transition-all">
                <ArrowLeft className="w-4 h-4" />
                Back to Our Work
              </Button>
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Project Info */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Badge className={cn("mb-4", categoryColors[project.category])}>
                  {project.category === "web" && "Web Development"}
                  {project.category === "mobile" && "Mobile App"}
                  {project.category === "ecommerce" && "E-commerce"}
                </Badge>
                
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
                  {project.title}
                </h1>
                
                <p className="text-lg md:text-xl text-muted-foreground mb-6 md:mb-8 leading-relaxed">
                  {project.longDescription}
                </p>

                {/* Project Meta */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  <div className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card/30">
                    <MapPin className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Client</p>
                      <p className="font-semibold">{project.client.name}</p>
                      <p className="text-sm text-muted-foreground">{project.client.location}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card/30">
                    <Clock className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Timeline</p>
                      <p className="font-semibold">{project.timeline.duration}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(project.timeline.start)} - {formatDate(project.timeline.end)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4">
                  {project.liveUrl && (
                    <Button asChild size="lg" className="gap-2">
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4" />
                        View Live Project
                      </a>
                    </Button>
                  )}
                  {project.githubUrl && (
                    <Button asChild variant="outline" size="lg" className="gap-2">
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4" />
                        View Code
                      </a>
                    </Button>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Project Image */}
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl"
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Project Gallery</h2>
            <p className="text-muted-foreground">
              Explore different aspects and features of this project
            </p>
          </motion.div>

          {/* Main Gallery Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-6 shadow-xl"
          >
            <Image
              src={project.gallery[selectedImage]}
              alt={`${project.title} - Image ${selectedImage + 1}`}
              fill
              className="object-cover"
            />
          </motion.div>

          {/* Gallery Thumbnails */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {project.gallery.map((image, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setSelectedImage(index)}
                className={cn(
                  "relative aspect-[4/3] rounded-xl overflow-hidden transition-all duration-300",
                  selectedImage === index 
                    ? "ring-2 ring-primary ring-offset-2 ring-offset-background" 
                    : "hover:scale-105"
                )}
              >
                <Image
                  src={image}
                  alt={`${project.title} - Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Technologies Used</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The cutting-edge technologies and tools that powered this project
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {project.technologies.map((tech, index) => (
              <Badge
                key={index}
                variant="outline"
                className="px-4 py-2 text-sm font-medium bg-background/50 hover:bg-primary/10 transition-colors"
              >
                {tech}
              </Badge>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features & Challenges Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Features */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-green-500/10">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold">Key Features</h3>
              </div>
              
              <div className="space-y-4">
                {project.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start gap-3 p-4 rounded-xl border border-border bg-card/30"
                  >
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm md:text-base">{feature}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Challenges & Solutions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-orange-500/10">
                  <Lightbulb className="w-6 h-6 text-orange-500" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold">Challenges & Solutions</h3>
              </div>
              
              <div className="space-y-6">
                {project.challenges.map((challenge, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="p-4 rounded-xl border border-border bg-card/30"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <Target className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm md:text-base font-medium">{challenge}</p>
                    </div>
                    {project.solutions[index] && (
                      <div className="flex items-start gap-3 ml-8 pt-2 border-t border-border/50">
                        <Lightbulb className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-muted-foreground">{project.solutions[index]}</p>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <TrendingUp className="w-6 h-6 text-blue-500" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold">Project Results</h2>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Measurable outcomes and impact achieved through this project
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {project.results.map((result, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6 rounded-2xl border border-border bg-background/50 backdrop-blur-sm"
              >
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {result.value}
                </div>
                <div className="font-semibold mb-2">{result.metric}</div>
                <div className="text-sm text-muted-foreground">{result.description}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      {project.testimonial && (
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <div className="flex items-center justify-center gap-3 mb-8">
                <div className="p-2 rounded-lg bg-purple-500/10">
                  <Quote className="w-6 h-6 text-purple-500" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold">Client Testimonial</h2>
              </div>
              
              <blockquote className="text-lg md:text-xl italic text-muted-foreground mb-6 leading-relaxed">
                "{project.testimonial.quote}"
              </blockquote>
              
              <div className="flex items-center justify-center gap-4">
                <div className="text-center">
                  <div className="font-semibold text-lg">{project.testimonial.author}</div>
                  <div className="text-sm text-muted-foreground">{project.testimonial.position}</div>
                  <div className="text-sm text-muted-foreground">{project.client.name}</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Related Projects Section */}
      {relatedProjects.length > 0 && (
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Related Projects</h2>
              <p className="text-muted-foreground">
                Explore more of our work in similar categories
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProjects.map((relatedProject, index) => (
                <motion.div
                  key={relatedProject.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                    <Link href={`/${locale}/work/${relatedProject.id}`}>
                    <div className="group relative rounded-2xl border border-border bg-background/50 backdrop-blur-sm overflow-hidden hover:border-primary/50 transition-all duration-300">
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                          src={relatedProject.image}
                          alt={relatedProject.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      
                      <div className="p-6">
                        <Badge className={cn("mb-3", categoryColors[relatedProject.category])}>
                          {relatedProject.category === "web" && "Web Development"}
                          {relatedProject.category === "mobile" && "Mobile App"}
                          {relatedProject.category === "ecommerce" && "E-commerce"}
                        </Badge>
                        
                        <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
                          {relatedProject.title}
                        </h3>
                        
                        <p className="text-muted-foreground text-sm line-clamp-3">
                          {relatedProject.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
