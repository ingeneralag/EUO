"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { SparklesCore } from "@/components/ui/sparkles-simple";
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
      className={`relative h-screen flex flex-col overflow-hidden pt-20 ${
        isMobile 
          ? "bg-gradient-to-br from-background via-background to-primary/5 dark:from-black dark:via-black dark:to-primary/10"
          : "bg-background dark:bg-black"
      }`}
      onMouseMove={handleMouseMove}
    >
      {/* Cursor Trail Effect - Desktop Only */}
      {!isMobile && <CursorTrail />}
      
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Interactive Background Effects - Desktop Only */}
        {!isMobile && <InteractiveBackground className="z-10" />}
        
        {/* Grid Pattern - Enhanced for Mobile */}
        <div className={`absolute inset-0 ${
          isMobile 
            ? "bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]"
            : "bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"
        } [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)]`} />
        
        {/* Mobile Background Enhancement */}
        {isMobile && (
          <>
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
            
            {/* Animated dots pattern */}
            <div className="absolute inset-0 opacity-40">
              <div className="absolute top-[20%] left-[10%] w-2 h-2 bg-primary/50 rounded-full mobile-pulse-animation" style={{ animationDelay: '0s' }} />
              <div className="absolute top-[30%] right-[15%] w-1.5 h-1.5 bg-secondary/50 rounded-full mobile-pulse-animation" style={{ animationDelay: '1s' }} />
              <div className="absolute top-[60%] left-[20%] w-1 h-1 bg-primary/40 rounded-full mobile-pulse-animation" style={{ animationDelay: '2s' }} />
              <div className="absolute top-[70%] right-[25%] w-2 h-2 bg-secondary/40 rounded-full mobile-pulse-animation" style={{ animationDelay: '0.5s' }} />
              <div className="absolute top-[40%] left-[80%] w-1.5 h-1.5 bg-primary/45 rounded-full mobile-pulse-animation" style={{ animationDelay: '1.5s' }} />
              <div className="absolute top-[80%] left-[60%] w-1 h-1 bg-secondary/35 rounded-full mobile-pulse-animation" style={{ animationDelay: '2.5s' }} />
              <div className="absolute top-[50%] right-[40%] w-1.5 h-1.5 bg-primary/30 rounded-full mobile-pulse-animation" style={{ animationDelay: '3s' }} />
              <div className="absolute top-[85%] right-[10%] w-1 h-1 bg-secondary/40 rounded-full mobile-pulse-animation" style={{ animationDelay: '3.5s' }} />
            </div>
            
            {/* Subtle geometric shapes */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-[15%] right-[10%] w-8 h-8 border border-primary/20 rotate-45 animate-spin" style={{ animationDuration: '20s' }} />
              <div className="absolute top-[75%] left-[15%] w-6 h-6 border border-secondary/20 rotate-12 animate-spin" style={{ animationDuration: '25s', animationDirection: 'reverse' }} />
            </div>
          </>
        )}
        
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
                  className="absolute top-[60%] right-[30%] w-96 h-96 bg-green-500/30 dark:bg-green-500/20 rounded-full blur-3xl"
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
                  className="absolute top-[55%] right-[25%] w-40 h-40 bg-green-500/15 dark:bg-green-500/10 rounded-full blur-2xl"
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

      {/* Main Content - Optimized mobile layout */}
      <div className={`relative z-20 flex-1 flex flex-col justify-center items-center text-center ${
        isMobile 
          ? "px-4 py-12 min-h-screen" // Better mobile spacing and full height
          : "px-4 sm:px-6 lg:px-8"
      }`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={`${isMobile ? "w-full space-y-6" : "max-w-4xl mx-auto"}`}
        >
          {/* Main Heading with Sparkles - Much larger on mobile */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className={isMobile ? "mb-4" : "mb-8"}
          >
            <h1 className={`font-bold leading-tight ${
              isMobile 
                ? "text-7xl sm:text-8xl" // Even larger on mobile - dominant element
                : "text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
            }`}>
                  <SparklesText 
                    text="Sitovia" 
                    className={`font-bold ${
                      isMobile 
                        ? "text-7xl sm:text-8xl" // Even larger on mobile - hero element
                        : "text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
                    }`}
                    sparklesCount={isMobile ? 3 : 8}
                    colors={{ first: "#70be43", second: "#86ce59" }}
                  />
              <br />
              <span className={`bg-gradient-to-r from-primary via-green-600 to-green-400 bg-clip-text text-transparent ${
                isMobile 
                  ? "text-2xl sm:text-3xl" // Proportionally smaller subtitle
                  : "text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
              }`}>
                Software Solutions
              </span>
            </h1>
          </motion.div>

          {/* Description - Better spacing on mobile */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className={`text-muted-foreground dark:text-white/70 max-w-2xl mx-auto leading-relaxed ${
              isMobile 
                ? "text-sm mb-6 px-2" // Smaller and tighter on mobile
                : "text-lg sm:text-xl mb-10"
            }`}
          >
            We create exceptional digital experiences that drive business growth. 
            From web development to SEO optimization, we're your trusted partner in digital transformation.
          </motion.p>

          {/* CTA Buttons - Better mobile layout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className={`flex justify-center items-center ${
              isMobile 
                ? "flex-col gap-4 px-2" // Better spacing on mobile
                : "flex-col sm:flex-row gap-4"
            }`}
          >
            <MagneticElement disabled={isMobile}>
              <Link href={`/${currentLocale}/contact`}>
                <RainbowButton
                  onClick={() => trackCTAClick('hero_get_started')}
                  className={isMobile 
                    ? "px-6 py-3 text-base font-semibold w-full max-w-xs" // Full width on mobile
                    : "px-8 py-4 text-lg font-semibold"
                  }
                >
                  Get Started Today
                  <ArrowRight className={`ml-2 ${isMobile ? "h-4 w-4" : "h-5 w-5"}`} />
                </RainbowButton>
              </Link>
            </MagneticElement>
            
            <MagneticElement disabled={isMobile}>
              <Link href={`/${currentLocale}/work`}>
                <Button 
                  variant="outline" 
                  size={isMobile ? "default" : "lg"}
                  className={`font-semibold bg-background/80 backdrop-blur-sm hover:bg-background/90 transition-all duration-300 ${
                    isMobile 
                      ? "px-6 py-3 text-base w-full max-w-xs" // Full width on mobile
                      : "px-8 py-4 text-lg"
                  }`}
                  onClick={() => trackCTAClick('hero_view_work')}
                >
                  <Play className={`mr-2 ${isMobile ? "h-4 w-4" : "h-5 w-5"}`} />
                  View Our Work
                </Button>
              </Link>
            </MagneticElement>
          </motion.div>

          {/* Countries Badge - Below buttons on mobile, after buttons on desktop */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className={`inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-medium ${
              isMobile 
                ? "mt-6 px-3 py-1.5 text-xs" 
                : "mt-8 px-4 py-2 text-sm"
            }`}
          >
            <span className={`bg-green-500 rounded-full animate-pulse ${
              isMobile ? "w-1.5 h-1.5" : "w-2 h-2"
            }`}></span>
            <span className={isMobile ? "text-xs" : "text-sm"}>
              Trusted by companies across Italy, Spain, Austria & Australia
            </span>
          </motion.div>
        </motion.div>

         {/* Sparkles under company name only - Mobile optimized */}
         <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
           <div className={`${
             isMobile 
               ? "w-[200px] h-[60px] -mt-8" 
               : "w-[400px] h-[80px] -mt-12"
           }`}>
             <SparklesCore
               id="hero-sparkles"
               background="transparent"
               minSize={isMobile ? 0.3 : 0.4}
               maxSize={isMobile ? 0.6 : 0.8}
               particleDensity={isMobile ? 40 : 60}
               className="w-full h-full"
               particleColor="#FFFFFF"
               speed={isMobile ? 0.3 : 0.5}
             />
           </div>
         </div>
      </div>
    </section>
  );
}
