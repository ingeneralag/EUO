"use client";

import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  Filter
} from "lucide-react";
import { cn } from "@/lib/utils";
import { listProjects } from "@/lib/services/projects";

export function OurWorkSection() {
  const t = useTranslations("work");
  const params = useParams();
  const locale = params.locale as string;
  const [activeFilter, setActiveFilter] = useState("all");
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const categories = [
    { id: "all", label: t("filters.all"), icon: <Briefcase className="w-4 h-4" /> },
    { id: "web", label: t("filters.web"), icon: <Globe className="w-4 h-4" /> },
    { id: "mobile", label: t("filters.mobile"), icon: <Smartphone className="w-4 h-4" /> },
    { id: "ecommerce", label: t("filters.ecommerce"), icon: <ShoppingCart className="w-4 h-4" /> },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await listProjects({ limit: 12, category: activeFilter !== "all" ? activeFilter : undefined });
        setItems(data.projects || []);
      } catch (e: any) {
        const message = Array.isArray(e?.response?.data?.message)
          ? e.response.data.message.join("\n")
          : e?.response?.data?.message || e?.message || "Failed to load projects";
        setError(message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [activeFilter]);

  const projects = items;
  const filteredProjects = projects;

  return (
    <section className="w-full bg-background dark:bg-black relative pt-12 md:pt-16 lg:pt-20 pb-16 md:pb-20 lg:pb-24 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)]" />

        {/* Floating Orbs */}
        <motion.div
          className="absolute top-[20%] left-[15%] w-80 h-80 bg-green-500/30 dark:bg-green-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 80, -40, 0],
            y: [0, -40, 30, 0],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-[15%] right-[20%] w-96 h-96 bg-orange-500/30 dark:bg-orange-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, -70, 35, 0],
            y: [0, 50, -25, 0],
            scale: [1, 0.9, 1.3, 1],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-6 md:mb-8 lg:mb-10"
        >
          <Badge variant="outline" className="mb-3 md:mb-4 bg-background dark:bg-black text-xs md:text-sm">
            {t("badge")}
          </Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 px-2">
            {t("heading")}
          </h2>
          <p className="text-muted-foreground dark:text-white/70 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-2">
            {t("description")}
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 md:mb-12 lg:mb-16"
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
                  ? "bg-primary text-primary-foreground shadow-lg scale-105"
                  : "hover:bg-muted/50"
              )}
            >
              {category.icon}
              <span className="hidden sm:inline">{category.label}</span>
              <span className="sm:hidden">{category.label.split(' ')[0]}</span>
            </Button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12 lg:mb-16"
          >
            {filteredProjects.map((project: any, index) => (
              <motion.div
                key={project._id || project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className={cn(
                  "group relative rounded-2xl border border-border bg-card/30 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 overflow-hidden",
                  project.featured && "md:col-span-2 lg:col-span-2"
                )}
              >
                <Link href={`/${locale}/work/${project._id || project.id}`} className="block">
                  {/* Project Image */}
                  <div className={cn(
                    "relative overflow-hidden",
                    project.featured ? "h-64 md:h-80" : "h-48 md:h-56"
                  )}>
                    <Image
                      src={project.image || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=300&auto=format&fit=crop"}
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
                        <Badge className="bg-primary text-primary-foreground border-0">
                          {t("featured")}
                        </Badge>
                      </div>
                    )}
                  </div>

                  {/* Project Content */}
                  <div className="p-4 md:p-6">
                    <h3 className="text-lg md:text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm md:text-base mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {(project.technologies || []).slice(0, 3).map((tech: string) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {(project.technologies || []).length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{(project.technologies || []).length - 3}
                        </Badge>
                      )}
                    </div>

                    {/* View Project Button */}
                    <Button variant="ghost" size="sm" className="group/btn p-0 h-auto text-primary hover:text-primary">
                      {t("viewProject")}
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                    </Button>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* View All Projects Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          <Button size="lg" className="gap-2 shadow-lg">
            {t("viewAll")}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
