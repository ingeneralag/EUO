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
  Palette,
  Users,
  Eye,
  MousePointer,
  Smartphone,
  Monitor,
  Layers,
  Zap,
  Target,
  BarChart3,
  CheckCircle,
  ArrowRight,
  Heart,
  Award,
  Clock,
  Rocket,
  Figma,
  Lightbulb,
  UserCheck,
  TrendingUp,
} from "lucide-react";

const designServices = [
  {
    title: "User Experience (UX) Design",
    description: "Create intuitive and user-friendly experiences that convert visitors into customers",
    icon: <Users className="w-8 h-8" />,
    color: "from-blue-500 to-cyan-500",
    features: ["User Research", "Wireframing", "User Journey Mapping", "Usability Testing"],
  },
  {
    title: "User Interface (UI) Design",
    description: "Design beautiful and functional interfaces that align with your brand identity",
    icon: <Palette className="w-8 h-8" />,
    color: "from-purple-500 to-pink-500",
    features: ["Visual Design", "Design Systems", "Responsive Design", "Brand Integration"],
  },
  {
    title: "Mobile App Design",
    description: "Create engaging mobile experiences optimized for iOS and Android platforms",
    icon: <Smartphone className="w-8 h-8" />,
    color: "from-green-500 to-emerald-500",
    features: ["Native App Design", "Cross-platform Design", "App Store Optimization", "Touch Interactions"],
  },
  {
    title: "Web Application Design",
    description: "Design complex web applications with focus on usability and performance",
    icon: <Monitor className="w-8 h-8" />,
    color: "from-orange-500 to-red-500",
    features: ["Dashboard Design", "SaaS Interfaces", "Admin Panels", "Data Visualization"],
  },
];

const designProcess = [
  {
    step: "01",
    title: "Research & Discovery",
    description: "We start by understanding your users, business goals, and market landscape to inform our design decisions.",
    icon: <Lightbulb className="w-8 h-8" />,
    color: "from-blue-500 to-cyan-500",
  },
  {
    step: "02",
    title: "Wireframing & Prototyping",
    description: "Create low-fidelity wireframes and interactive prototypes to test concepts and user flows.",
    icon: <Layers className="w-8 h-8" />,
    color: "from-purple-500 to-pink-500",
  },
  {
    step: "03",
    title: "Visual Design",
    description: "Develop high-fidelity designs with your brand colors, typography, and visual elements.",
    icon: <Palette className="w-8 h-8" />,
    color: "from-green-500 to-emerald-500",
  },
  {
    step: "04",
    title: "Testing & Iteration",
    description: "Test designs with real users and iterate based on feedback to ensure optimal user experience.",
    icon: <UserCheck className="w-8 h-8" />,
    color: "from-orange-500 to-red-500",
  },
];

const designPrinciples = [
  {
    icon: <Users className="w-6 h-6" />,
    title: "User-Centered Design",
    description: "Every design decision is made with your users' needs and behaviors in mind",
  },
  {
    icon: <Eye className="w-6 h-6" />,
    title: "Visual Hierarchy",
    description: "Clear information architecture that guides users naturally through your content",
  },
  {
    icon: <Smartphone className="w-6 h-6" />,
    title: "Responsive Design",
    description: "Seamless experiences across all devices and screen sizes",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Performance Focused",
    description: "Designs optimized for fast loading and smooth interactions",
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: "Accessibility First",
    description: "Inclusive designs that work for users of all abilities",
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: "Conversion Optimized",
    description: "Strategic design elements that drive user actions and business goals",
  },
];

const portfolio = [
  {
    title: "FinTech Mobile App",
    description: "Modern banking app with intuitive UX and secure transaction flows",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2340&auto=format&fit=crop",
    category: "Mobile App",
    results: [
      { metric: "User Engagement", improvement: "+180%" },
      { metric: "Task Completion", improvement: "+95%" },
      { metric: "User Satisfaction", improvement: "4.8/5" },
    ],
  },
  {
    title: "E-Learning Platform",
    description: "Educational platform designed for optimal learning experiences",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2340&auto=format&fit=crop",
    category: "Web Application",
    results: [
      { metric: "Course Completion", improvement: "+150%" },
      { metric: "User Retention", improvement: "+200%" },
      { metric: "Learning Efficiency", improvement: "+75%" },
    ],
  },
  {
    title: "Healthcare Dashboard",
    description: "Complex data visualization for healthcare professionals",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?q=80&w=2340&auto=format&fit=crop",
    category: "Dashboard",
    results: [
      { metric: "Decision Speed", improvement: "+120%" },
      { metric: "Error Reduction", improvement: "-85%" },
      { metric: "User Productivity", improvement: "+160%" },
    ],
  },
];

const tools = [
  { name: "Figma", icon: "🎨", description: "Design & Prototyping" },
  { name: "Adobe XD", icon: "🔷", description: "UI/UX Design" },
  { name: "Sketch", icon: "💎", description: "Interface Design" },
  { name: "InVision", icon: "🔮", description: "Prototyping" },
  { name: "Principle", icon: "⚡", description: "Animation" },
  { name: "Framer", icon: "🚀", description: "Interactive Design" },
];

const stats = [
  { number: "200+", label: "Designs Created", icon: <Palette className="w-6 h-6" /> },
  { number: "95%", label: "Client Satisfaction", icon: <Award className="w-6 h-6" /> },
  { number: "150%", label: "Average Conversion Increase", icon: <TrendingUp className="w-6 h-6" /> },
  { number: "48h", label: "Average Response Time", icon: <Clock className="w-6 h-6" /> },
];

export default function UIUXDesignPage() {
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
                <Palette className="w-4 h-4 mr-2" />
                UI/UX Design
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Design Experiences That Convert & Delight
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                We create user-centered designs that not only look beautiful but also drive business results. 
                From mobile apps to web platforms, we craft experiences that users love and businesses thrive on.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={`/${currentLocale}/contact`}>
                  <Button size="lg" className="gap-2">
                    <Rocket className="w-5 h-5" />
                    Start Design Project
                  </Button>
                </Link>
                <Link href="#portfolio">
                  <Button variant="outline" size="lg" className="gap-2">
                    <Eye className="w-5 h-5" />
                    View Our Designs
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

        {/* Services Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Badge className="mb-4">Services</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Complete UI/UX Design Services
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                From initial concept to final implementation, we provide comprehensive design services 
                that cover every aspect of user experience and interface design.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {designServices.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className={`w-16 h-16 mb-4 rounded-lg bg-gradient-to-r ${service.color} flex items-center justify-center text-white`}>
                        {service.icon}
                      </div>
                      <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                      <p className="text-muted-foreground mb-4">{service.description}</p>
                      <ul className="space-y-2">
                        {service.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Design Principles Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Badge className="mb-4">Principles</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Our Design Philosophy
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We follow proven design principles that ensure every interface we create 
                is not only beautiful but also functional and user-friendly.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {designPrinciples.map((principle, index) => (
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
                          {principle.icon}
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold mb-3">{principle.title}</h3>
                      <p className="text-muted-foreground">{principle.description}</p>
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
                Our Design Process
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We follow a structured design process that ensures every project delivers 
                exceptional results through careful planning, testing, and iteration.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {designProcess.map((step, index) => (
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
                  {index < designProcess.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                      <ArrowRight className="w-8 h-8 text-muted-foreground" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Tools Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Badge className="mb-4">Tools</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Professional Design Tools
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We use industry-leading design tools to create, prototype, and deliver 
                high-quality designs that meet modern standards.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {tools.map((tool, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="text-center hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="text-4xl mb-3">{tool.icon}</div>
                      <h3 className="font-semibold mb-1">{tool.name}</h3>
                      <p className="text-xs text-muted-foreground">{tool.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="portfolio" className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Badge className="mb-4">Portfolio</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Design Projects That Deliver Results
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Explore our recent design projects and see how we've helped businesses 
                improve user experience and achieve their goals through strategic design.
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
                      <div className="space-y-2">
                        {project.results.map((result, resultIndex) => (
                          <div key={resultIndex} className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">{result.metric}</span>
                            <span className="font-semibold text-green-600">{result.improvement}</span>
                          </div>
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
                  <Eye className="w-5 h-5" />
                  View All Projects
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <Card className="bg-gradient-to-r from-primary/10 via-background to-secondary/10 border-primary/20">
                <CardContent className="p-12">
                  <Palette className="w-16 h-16 mx-auto mb-6 text-primary" />
                  <h2 className="text-3xl font-bold mb-4">Ready to Transform Your User Experience?</h2>
                  <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                    Let's create designs that not only look amazing but also drive real business results. 
                    Our team is ready to bring your vision to life with user-centered design.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href={`/${currentLocale}/contact`}>
                      <Button size="lg" className="gap-2">
                        <Rocket className="w-5 h-5" />
                        Start Design Project
                      </Button>
                    </Link>
                    <Link href={`/${currentLocale}/pricing`}>
                      <Button variant="outline" size="lg" className="gap-2">
                        <BarChart3 className="w-5 h-5" />
                        View Design Packages
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
