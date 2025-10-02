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
  Search,
  TrendingUp,
  Target,
  BarChart3,
  Globe,
  Users,
  CheckCircle,
  ArrowRight,
  Eye,
  MousePointer,
  Zap,
  Shield,
  Award,
  Clock,
  Rocket,
  FileText,
  Link as LinkIcon,
  Smartphone,
} from "lucide-react";

const seoServices = [
  {
    title: "Keyword Research & Strategy",
    description: "Comprehensive keyword analysis to target the right audience and drive qualified traffic",
    icon: <Search className="w-8 h-8" />,
    color: "from-blue-500 to-cyan-500",
    features: ["Competitor Analysis", "Long-tail Keywords", "Search Intent Mapping", "Keyword Difficulty Assessment"],
  },
  {
    title: "On-Page Optimization",
    description: "Optimize your website's content and structure for better search engine visibility",
    icon: <FileText className="w-8 h-8" />,
    color: "from-green-500 to-emerald-500",
    features: ["Title Tag Optimization", "Meta Descriptions", "Header Structure", "Internal Linking"],
  },
  {
    title: "Technical SEO",
    description: "Improve your website's technical foundation for better crawling and indexing",
    icon: <Zap className="w-8 h-8" />,
    color: "from-purple-500 to-violet-500",
    features: ["Site Speed Optimization", "Mobile Responsiveness", "Schema Markup", "XML Sitemaps"],
  },
  {
    title: "Link Building",
    description: "Build high-quality backlinks to increase your domain authority and rankings",
    icon: <LinkIcon className="w-8 h-8" />,
    color: "from-orange-500 to-red-500",
    features: ["Guest Posting", "Resource Page Links", "Broken Link Building", "Digital PR"],
  },
];

const benefits = [
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: "Increased Organic Traffic",
    description: "Drive more qualified visitors to your website through improved search rankings",
    stat: "150%",
    statLabel: "Average Traffic Increase",
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: "Better Conversion Rates",
    description: "Attract visitors who are actively searching for your products or services",
    stat: "85%",
    statLabel: "Higher Intent Traffic",
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: "Improved ROI",
    description: "SEO provides long-term results with better ROI compared to paid advertising",
    stat: "300%",
    statLabel: "Better ROI than PPC",
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: "Brand Authority",
    description: "Higher search rankings establish your brand as a trusted authority in your industry",
    stat: "70%",
    statLabel: "Trust Increase",
  },
];

const process = [
  {
    step: "01",
    title: "SEO Audit & Analysis",
    description: "We conduct a comprehensive audit of your website to identify opportunities and issues affecting your search performance.",
    icon: <Search className="w-8 h-8" />,
    color: "from-blue-500 to-cyan-500",
  },
  {
    step: "02",
    title: "Strategy Development",
    description: "Based on our findings, we create a customized SEO strategy tailored to your business goals and target audience.",
    icon: <Target className="w-8 h-8" />,
    color: "from-purple-500 to-pink-500",
  },
  {
    step: "03",
    title: "Implementation",
    description: "Our team implements on-page optimizations, technical improvements, and content strategies to boost your rankings.",
    icon: <Zap className="w-8 h-8" />,
    color: "from-green-500 to-emerald-500",
  },
  {
    step: "04",
    title: "Monitoring & Reporting",
    description: "We continuously monitor your progress and provide detailed reports showing improvements in rankings and traffic.",
    icon: <BarChart3 className="w-8 h-8" />,
    color: "from-orange-500 to-red-500",
  },
];

const caseStudies = [
  {
    title: "E-Commerce Store",
    description: "Increased organic traffic by 250% and revenue by 180% in 6 months",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2340&auto=format&fit=crop",
    results: [
      { metric: "Organic Traffic", improvement: "+250%" },
      { metric: "Revenue", improvement: "+180%" },
      { metric: "Keywords Ranking", improvement: "+400%" },
    ],
    industry: "E-Commerce",
  },
  {
    title: "Local Service Business",
    description: "Dominated local search results with 95% increase in local leads",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=2426&auto=format&fit=crop",
    results: [
      { metric: "Local Leads", improvement: "+95%" },
      { metric: "Google My Business Views", improvement: "+300%" },
      { metric: "Phone Calls", improvement: "+150%" },
    ],
    industry: "Local Services",
  },
  {
    title: "SaaS Platform",
    description: "Achieved first page rankings for competitive keywords in tech industry",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2340&auto=format&fit=crop",
    results: [
      { metric: "Keyword Rankings", improvement: "+500%" },
      { metric: "Organic Conversions", improvement: "+220%" },
      { metric: "Brand Visibility", improvement: "+180%" },
    ],
    industry: "SaaS",
  },
];

const stats = [
  { number: "500+", label: "Keywords Ranked", icon: <Search className="w-6 h-6" /> },
  { number: "200%", label: "Average Traffic Increase", icon: <TrendingUp className="w-6 h-6" /> },
  { number: "50+", label: "Successful Campaigns", icon: <Award className="w-6 h-6" /> },
  { number: "24/7", label: "Monitoring & Support", icon: <Clock className="w-6 h-6" /> },
];

export default function SEOOptimizationPage() {
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
                <Search className="w-4 h-4 mr-2" />
                SEO Optimization
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Dominate Search Results & Drive Organic Growth
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Boost your online visibility with our proven SEO strategies. We help businesses 
                rank higher, attract more qualified traffic, and increase conversions through 
                comprehensive search engine optimization.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={`/${currentLocale}/contact`}>
                  <Button size="lg" className="gap-2">
                    <Rocket className="w-5 h-5" />
                    Get SEO Audit
                  </Button>
                </Link>
                <Link href="#case-studies">
                  <Button variant="outline" size="lg" className="gap-2">
                    <BarChart3 className="w-5 h-5" />
                    View Results
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
                Comprehensive SEO Services
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our full-service SEO approach covers every aspect of search engine optimization 
                to maximize your online visibility and drive sustainable growth.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {seoServices.map((service, index) => (
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

        {/* Benefits Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Badge className="mb-4">Benefits</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Why Invest in SEO?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                SEO is one of the most cost-effective marketing strategies that delivers 
                long-term results and sustainable business growth.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="text-center h-full hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="inline-flex p-3 rounded-lg bg-primary/10 mb-4">
                        <div className="text-primary">
                          {benefit.icon}
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-primary mb-1">{benefit.stat}</div>
                      <div className="text-xs text-muted-foreground mb-3">{benefit.statLabel}</div>
                      <h3 className="font-semibold mb-2">{benefit.title}</h3>
                      <p className="text-sm text-muted-foreground">{benefit.description}</p>
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
                Our SEO Process
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We follow a data-driven approach to SEO that ensures measurable results 
                and continuous improvement of your search performance.
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

        {/* Case Studies Section */}
        <section id="case-studies" className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Badge className="mb-4">Case Studies</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Proven SEO Results
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                See how we've helped businesses across different industries achieve 
                remarkable growth through strategic SEO optimization.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {caseStudies.map((study, index) => (
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
                        src={study.image}
                        alt={study.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge variant="secondary">{study.industry}</Badge>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-2">{study.title}</h3>
                      <p className="text-muted-foreground mb-4">{study.description}</p>
                      <div className="space-y-2">
                        {study.results.map((result, resultIndex) => (
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
                  <Search className="w-16 h-16 mx-auto mb-6 text-primary" />
                  <h2 className="text-3xl font-bold mb-4">Ready to Dominate Search Results?</h2>
                  <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                    Get a free SEO audit and discover how we can help you outrank your competitors 
                    and drive more qualified traffic to your website.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href={`/${currentLocale}/contact`}>
                      <Button size="lg" className="gap-2">
                        <Rocket className="w-5 h-5" />
                        Get Free SEO Audit
                      </Button>
                    </Link>
                    <Link href={`/${currentLocale}/pricing`}>
                      <Button variant="outline" size="lg" className="gap-2">
                        <BarChart3 className="w-5 h-5" />
                        View SEO Packages
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
