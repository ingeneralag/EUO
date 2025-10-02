"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { SparklesCore } from "@/components/ui/sparkles";
import { SparklesText } from "@/components/ui/sparkles-text";
import { InteractiveBackground } from "@/components/ui/interactive-background";
import { CursorTrail } from "@/components/ui/cursor-trail";
import { MagneticElement } from "@/components/ui/magnetic-element";
import { trackCTAClick } from "@/lib/analytics";
import { useIsMobile } from "@/hooks/use-mobile";

export function HeroSection() {
  const t = useTranslations();
  const params = useParams();
  const currentLocale = params.locale as string;
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const isMobile = useIsMobile();

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (isMobile) return; // Skip mouse tracking on mobile
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section 
      className="relative h-screen flex flex-col overflow-hidden bg-background dark:bg-black pt-20"
      onMouseMove={handleMouseMove}
    >
      {/* Cursor Trail Effect - Desktop Only */}
      {!isMobile && <CursorTrail />}
      
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Interactive Background Effects - Desktop Only */}
        {!isMobile && <InteractiveBackground className="z-10" />}
        
        {/* Grid Pattern - Lighter on Mobile */}
        <div className={`absolute inset-0 ${
          isMobile 
            ? "bg-[linear-gradient(rgba(0,0,0,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.01)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.005)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.005)_1px,transparent_1px)] bg-[size:100px_100px]"
            : "bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"
        } [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)]`} />
        
        {/* Floating Orbs - Optimized for Mobile */}
        {!isMobile ? (
          // Desktop Version - Full animations with mouse interaction
          <>
            <motion.div
              className="absolute top-[20%] left-[25%] w-72 h-72 bg-blue-500/30 dark:bg-blue-500/20 rounded-full blur-3xl"
              animate={{
                x: [0, 80, -40, 0],
                y: [0, -40, 25, 0],
                scale: [1, 1.2, 0.8, 1],
              }}
              style={{
                transform: `translate(${(mousePosition.x - 500) * 0.02}px, ${(mousePosition.y - 500) * 0.02}px)`,
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute top-[60%] right-[30%] w-96 h-96 bg-purple-500/30 dark:bg-purple-500/20 rounded-full blur-3xl"
              animate={{
                x: [0, -60, 30, 0],
                y: [0, 40, -20, 0],
                scale: [1, 0.8, 1.3, 1],
              }}
              style={{
                transform: `translate(${(mousePosition.x - 800) * 0.03}px, ${(mousePosition.y - 600) * 0.03}px)`,
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
              }}
            />
            <motion.div
              className="absolute top-[40%] right-[45%] w-64 h-64 bg-cyan-500/30 dark:bg-cyan-500/20 rounded-full blur-3xl"
              animate={{
                x: [0, 50, -30, 0],
                y: [0, -60, 35, 0],
                scale: [1, 1.1, 0.9, 1],
              }}
              style={{
                transform: `translate(${(mousePosition.x - 600) * 0.025}px, ${(mousePosition.y - 400) * 0.025}px)`,
              }}
              transition={{
                duration: 18,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            />
          </>
        ) : (
          // Mobile Version - Simplified, lightweight animations
          <>
            <motion.div
              className="absolute top-[25%] left-[20%] w-32 h-32 bg-blue-500/15 dark:bg-blue-500/10 rounded-full blur-2xl"
              animate={{
                x: [0, 20, -10, 0],
                y: [0, -15, 10, 0],
                scale: [1, 1.05, 0.95, 1],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute top-[55%] right-[25%] w-40 h-40 bg-purple-500/15 dark:bg-purple-500/10 rounded-full blur-2xl"
              animate={{
                x: [0, -15, 8, 0],
                y: [0, 12, -8, 0],
                scale: [1, 0.9, 1.1, 1],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            />
          </>
        )}
      </div>

      {/* Main Content */}
      <div className="relative z-20 flex-1 flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Countries Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6"
          >
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Trusted by companies across Italy, Spain, Austria & Australia
          </motion.div>

          {/* Main Heading with Sparkles */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-6"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <SparklesText 
                text="Sitovia" 
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold"
                sparklesCount={isMobile ? 3 : 8}
                colors={{ first: "#9333EA", second: "#C084FC" }}
              />
              <br />
              <span className="bg-gradient-to-r from-primary via-purple-500 to-secondary bg-clip-text text-transparent">
                Software Solutions
              </span>
            </h1>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-lg sm:text-xl text-muted-foreground dark:text-white/70 mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            We create exceptional digital experiences that drive business growth. 
            From web development to SEO optimization, we're your trusted partner in digital transformation.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <MagneticElement disabled={isMobile}>
              <Link href={`/${currentLocale}/contact`}>
                <RainbowButton
                  onClick={() => trackCTAClick('hero_get_started')}
                  className="px-8 py-4 text-lg font-semibold"
                >
                  Get Started Today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </RainbowButton>
              </Link>
            </MagneticElement>
            
            <MagneticElement disabled={isMobile}>
              <Link href={`/${currentLocale}/work`}>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="px-8 py-4 text-lg font-semibold bg-background/80 backdrop-blur-sm hover:bg-background/90 transition-all duration-300"
                  onClick={() => trackCTAClick('hero_view_work')}
                >
                  <Play className="mr-2 h-5 w-5" />
                  View Our Work
                </Button>
              </Link>
            </MagneticElement>
          </motion.div>
        </motion.div>

        {/* Sparkles under text - Mobile optimized */}
        <div className="absolute inset-0 pointer-events-none">
          <SparklesCore
            id="hero-sparkles"
            background="transparent"
            minSize={isMobile ? 0.3 : 0.4}
            maxSize={isMobile ? 0.8 : 1.2}
            particleDensity={isMobile ? 30 : 80}
            className="w-full h-full"
            particleColor="#FFFFFF"
            speed={isMobile ? 0.5 : 1}
          />
        </div>
      </div>
    </section>
  );
}
