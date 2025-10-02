"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Mail, 
  Phone, 
  MapPin, 
  ArrowUp,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Github,
  Heart,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  const t = useTranslations("footer");
  const params = useParams();
  const currentLocale = params.locale as string;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerSections = [
    {
      title: "Services",
      links: [
        { name: "Web Development", href: `/${currentLocale}/services/web-development` },
        { name: "SEO Optimization", href: `/${currentLocale}/services/seo` },
        { name: "UI/UX Design", href: `/${currentLocale}/services/design` },
        { name: "Mobile Apps", href: `/${currentLocale}/services/mobile` },
        { name: "E-commerce", href: `/${currentLocale}/services/ecommerce` },
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: `/${currentLocale}/about` },
        { name: "Our Team", href: `/${currentLocale}/about/team` },
        { name: "Careers", href: `/${currentLocale}/careers` },
        { name: "Blog", href: `/${currentLocale}/blog` },
        { name: "Contact", href: `/${currentLocale}/contact` },
      ]
    },
    {
      title: "Resources",
      links: [
        { name: "Case Studies", href: `/${currentLocale}/work` },
        { name: "Documentation", href: `/${currentLocale}/docs` },
        { name: "Support", href: `/${currentLocale}/support` },
        { name: "Privacy Policy", href: `/${currentLocale}/privacy` },
        { name: "Terms of Service", href: `/${currentLocale}/terms` },
      ]
    }
  ];

  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "https://facebook.com/sitovia", color: "hover:text-blue-500" },
    { name: "Twitter", icon: Twitter, href: "https://twitter.com/sitovia", color: "hover:text-sky-500" },
    { name: "Instagram", icon: Instagram, href: "https://instagram.com/sitovia", color: "hover:text-pink-500" },
    { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/company/sitovia", color: "hover:text-blue-600" },
    { name: "GitHub", icon: Github, href: "https://github.com/sitovia", color: "hover:text-gray-600 dark:hover:text-gray-400" },
  ];

  const contactInfo = [
    { icon: Mail, text: "hello@sitovia.com", href: "mailto:hello@sitovia.com" },
    { icon: Phone, text: "+39 06 1234 5678", href: "tel:+390612345678" },
    { name: "Rome, Italy", icon: MapPin, text: "Via del Corso, 123", href: "https://maps.google.com" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <footer className="relative bg-background dark:bg-black border-t border-border overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:50px_50px]" />
        
        {/* Subtle Floating Orbs */}
        <motion.div
          className="absolute top-[20%] left-[10%] w-32 h-32 bg-primary/10 rounded-full blur-2xl"
          animate={{
            x: [0, 30, -15, 0],
            y: [0, -20, 10, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-[30%] right-[15%] w-24 h-24 bg-purple-500/10 rounded-full blur-2xl"
          animate={{
            x: [0, -25, 15, 0],
            y: [0, 15, -10, 0],
            scale: [1, 0.8, 1.2, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-12 md:py-16 lg:py-20"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Company Info */}
            <motion.div variants={itemVariants} className="lg:col-span-4">
              <div className="mb-6">
                <Link href={`/${currentLocale}`} className="inline-block">
                  <motion.h3 
                    className="text-2xl font-bold text-foreground"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    Sitovia
                  </motion.h3>
                </Link>
                <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                  We create exceptional digital experiences that drive business growth. 
                  From web development to SEO optimization, we're your trusted partner 
                  in digital transformation.
                </p>
              </div>

              {/* Contact Info */}
              <div className="space-y-3">
                {contactInfo.map((item, index) => (
                  <motion.a
                    key={index}
                    href={item.href}
                    className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <item.icon className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                    <span>{item.text}</span>
                  </motion.a>
                ))}
              </div>

              {/* Social Links */}
              <div className="mt-6">
                <p className="text-sm font-medium text-foreground mb-3">Follow Us</p>
                <div className="flex items-center gap-3">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-2 rounded-lg bg-muted/50 text-muted-foreground transition-all duration-300 ${social.color} hover:bg-muted hover:scale-110`}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <social.icon className="w-4 h-4" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Footer Links */}
            {footerSections.map((section, sectionIndex) => (
              <motion.div 
                key={section.title} 
                variants={itemVariants}
                className="lg:col-span-2"
              >
                <h4 className="text-sm font-semibold text-foreground mb-4">
                  {section.title}
                </h4>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <motion.li 
                      key={link.name}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ 
                        delay: sectionIndex * 0.1 + linkIndex * 0.05,
                        duration: 0.4 
                      }}
                      viewport={{ once: true }}
                    >
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors group flex items-center gap-1"
                      >
                        <motion.span
                          whileHover={{ x: 3 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                          {link.name}
                        </motion.span>
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}

            {/* Newsletter */}
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <h4 className="text-sm font-semibold text-foreground mb-4">
                Stay Updated
              </h4>
              <p className="text-sm text-muted-foreground mb-4">
                Subscribe to our newsletter for the latest updates and insights.
              </p>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-3 py-2 text-sm rounded-lg border border-input bg-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  />
                  <Button size="sm" className="px-4">
                    Subscribe
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-border bg-muted/30"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <span>© 2024 Sitovia. Made with</span>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
                >
                  <Heart className="w-4 h-4 text-red-500 fill-current" />
                </motion.div>
                <span>in Italy, Spain & Austria.</span>
              </div>

              <div className="flex items-center gap-6">
                <Link 
                  href={`/${currentLocale}/privacy`}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link 
                  href={`/${currentLocale}/terms`}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Terms of Service
                </Link>
                
                {/* Back to Top Button */}
                <motion.button
                  onClick={scrollToTop}
                  className="p-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  title="Back to top"
                >
                  <ArrowUp className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
