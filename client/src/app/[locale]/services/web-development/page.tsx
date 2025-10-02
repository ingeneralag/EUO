"use client";

import React from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useParams } from "next/navigation";
import Image from "next/image";
import {
  Code,
  Smartphone,
  Globe,
  Zap,
  Shield,
  Users,
  CheckCircle,
  ArrowRight,
  Layers,
  Database,
  Cloud,
  Palette,
  Search,
  BarChart3,
  Clock,
  Award,
  Target,
  Rocket,
} from "lucide-react";

const technologies = [
  {
    name: "React & Next.js",
    description: "Modern frontend frameworks for fast, scalable applications",
    icon: <Code className="w-8 h-8" />,
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "Node.js & Express",
    description: "Powerful backend solutions for robust server-side logic",
    icon: <Database className="w-8 h-8" />,
    color: "from-green-500 to-emerald-500",
  },
  {
    name: "TypeScript",
    description: "Type-safe development for maintainable, error-free code",
    icon: <Shield className="w-8 h-8" />,
    color: "from-purple-500 to-violet-500",
  },
  {
    name: "Cloud Deployment",
    description: "Scalable hosting on AWS, Vercel, and other platforms",
    icon: <Cloud className="w-8 h-8" />,
    color: "from-orange-500 to-red-500",
  },
];

const features = [
  {
    icon: <Smartphone className="w-6 h-6" />,
    title: "Responsive Design",
    description: "Perfect display on all devices - desktop, tablet, and mobile",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Lightning Fast",
    description: "Optimized performance with loading times under 3 seconds",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Secure & Reliable",
    description: "Enterprise-grade security with SSL certificates and data protection",
  },
  {
    icon: <Search className="w-6 h-6" />,
    title: "SEO Optimized",
    description: "Built-in SEO best practices for better search engine rankings",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "User-Friendly",
    description: "Intuitive interfaces designed for the best user experience",
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: "Analytics Ready",
    description: "Integrated analytics to track performance and user behavior",
  },
];

const process = [
  {
    step: "01",
    title: "Discovery & Planning",
    description: "We analyze your requirements, target audience, and business goals to create a comprehensive project roadmap.",
    icon: <Target className="w-8 h-8" />,
    color: "from-blue-500 to-cyan-500",
  },
  {
    step: "02",
    title: "Design & Prototyping",
    description: "Our designers create wireframes and interactive prototypes to visualize your website before development.",
    icon: <Palette className="w-8 h-8" />,
    color: "from-purple-500 to-pink-500",
  },
  {
    step: "03",
    title: "Development & Testing",
    description: "We build your website using modern technologies and conduct thorough testing across all devices.",
    icon: <Code className="w-8 h-8" />,
    color: "from-green-500 to-emerald-500",
  },
  {
    step: "04",
    title: "Launch & Support",
    description: "We deploy your website and provide ongoing support, maintenance, and updates as needed.",
    icon: <Rocket className="w-8 h-8" />,
    color: "from-orange-500 to-red-500",
  },
];

const portfolio = [
  {
    title: "E-Commerce Platform",
    description: "Modern online store with payment integration and inventory management",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2340&auto=format&fit=crop",
    tags: ["React", "Node.js", "Stripe", "MongoDB"],
    category: "E-Commerce",
  },
  {
    title: "Corporate Website",
    description: "Professional business website with CMS and multilingual support",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
    tags: ["Next.js", "TypeScript", "Sanity CMS"],
    category: "Corporate",
  },
  {
    title: "SaaS Dashboard",
    description: "Complex data visualization dashboard with real-time updates",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2340&auto=format&fit=crop",
    tags: ["React", "D3.js", "WebSocket", "PostgreSQL"],
    category: "SaaS",
  },
];

const stats = [
  { number: "150+", label: "Websites Built", icon: <Globe className="w-6 h-6" /> },
  { number: "98%", label: "Client Satisfaction", icon: <Award className="w-6 h-6" /> },
  { number: "24/7", label: "Support Available", icon: <Clock className="w-6 h-6" /> },
  { number: "5+", label: "Years Experience", icon: <Users className="w-6 h-6" /> },
];

export default function WebDevelopmentPage() {
  const params = useParams();
  const currentLocale = params.locale as string;

  return (
    <>
      {/* Header */}
      <Header />
      
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 border-b pt-20">
          <div className="container mx-auto px-4 py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-4xl mx-auto"
            >
              <Badge className="mb-4">
                <Code className="w-4 h-4 mr-2" />
                Web Development
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Custom Web Development Solutions
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                We create modern, responsive, and high-performance websites that drive business growth. 
                From simple landing pages to complex web applications, we've got you covered.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={`/${currentLocale}/contact`}>
                  <Button size="lg" className="gap-2">
                    <Rocket className="w-5 h-5" />
                    Start Your Project
                  </Button>
                </Link>
                <Link href="#portfolio">
                  <Button variant="outline" size="lg" className="gap-2">
                    <Globe className="w-5 h-5" />
                    View Our Work
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="inline-flex p-3 rounded-lg bg-primary/10 mb-4">
                    <div className="text-primary">
                      {stat.icon}
                    </div>
                  </div>
                  <div className="text-3xl font-bold mb-2">{stat.number}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Badge className="mb-4">Features</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Why Choose Our Web Development Services?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We combine cutting-edge technology with proven development practices to deliver 
                exceptional web solutions that exceed expectations.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="inline-flex p-3 rounded-lg bg-primary/10 mb-4">
                        <div className="text-primary">
                          {feature.icon}
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Technologies Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Badge className="mb-4">Technologies</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Modern Tech Stack
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We use the latest and most reliable technologies to ensure your website 
                is fast, secure, and future-proof.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {technologies.map((tech, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="text-center h-full hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className={`w-16 h-16 mx-auto mb-4 rounded-lg bg-gradient-to-r ${tech.color} flex items-center justify-center text-white`}>
                        {tech.icon}
                      </div>
                      <h3 className="font-semibold mb-2">{tech.name}</h3>
                      <p className="text-sm text-muted-foreground">{tech.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Badge className="mb-4">Process</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Our Development Process
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We follow a proven methodology to ensure your project is delivered on time, 
                within budget, and exceeds your expectations.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {process.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <Card className="h-full">
                    <CardContent className="p-6 text-center">
                      <div className="text-6xl font-bold text-primary/20 mb-4">{step.step}</div>
                      <div className={`w-16 h-16 mx-auto mb-4 rounded-lg bg-gradient-to-r ${step.color} flex items-center justify-center text-white`}>
                        {step.icon}
                      </div>
                      <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                      <p className="text-muted-foreground text-sm">{step.description}</p>
                    </CardContent>
                  </Card>
                  {index < process.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                      <ArrowRight className="w-8 h-8 text-muted-foreground" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="portfolio" className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Badge className="mb-4">Portfolio</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Recent Web Development Projects
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Take a look at some of our recent web development projects that showcase 
                our expertise and attention to detail.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {portfolio.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative aspect-video">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge variant="secondary">{project.category}</Badge>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                      <p className="text-muted-foreground mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, tagIndex) => (
                          <Badge key={tagIndex} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <Link href={`/${currentLocale}/work`}>
                <Button variant="outline" size="lg" className="gap-2">
                  <Globe className="w-5 h-5" />
                  View All Projects
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <Card className="bg-gradient-to-r from-primary/10 via-background to-secondary/10 border-primary/20">
                <CardContent className="p-12">
                  <Code className="w-16 h-16 mx-auto mb-6 text-primary" />
                  <h2 className="text-3xl font-bold mb-4">Ready to Build Your Website?</h2>
                  <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                    Let's discuss your project and create a custom web solution that drives results. 
                    Our team is ready to bring your vision to life.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href={`/${currentLocale}/contact`}>
                      <Button size="lg" className="gap-2">
                        <Rocket className="w-5 h-5" />
                        Start Your Project
                      </Button>
                    </Link>
                    <Link href={`/${currentLocale}/pricing`}>
                      <Button variant="outline" size="lg" className="gap-2">
                        <BarChart3 className="w-5 h-5" />
                        View Pricing
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}
