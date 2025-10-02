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

export function HeroSection() {
  const t = useTranslations();
  const params = useParams();
  const currentLocale = params.locale as string;
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
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
      {/* Cursor Trail Effect */}
      <CursorTrail />
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Interactive Background Effects */}
        <InteractiveBackground className="z-10" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)]" />
        
            {/* Floating Orbs with Mouse Interaction - Positioned away from edges */}
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
                delay: 4,
              }}
            />
        
        {/* More Gradient Orbs - Positioned away from edges */}
        <motion.div
          className="absolute bottom-[45%] left-[35%] w-80 h-80 bg-gradient-to-r from-pink-500/30 to-orange-500/30 dark:from-pink-500/20 dark:to-orange-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 70, -35, 0],
            y: [0, -50, 25, 0],
            scale: [1, 0.7, 1.2, 1],
            rotate: [0, 90, 180, 270, 360],
          }}
          style={{
            transform: `translate(${(mousePosition.x - 400) * 0.02}px, ${(mousePosition.y - 700) * 0.02}px)`,
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.div
          className="absolute top-[25%] right-[25%] w-72 h-72 bg-gradient-to-r from-green-500/30 to-teal-500/30 dark:from-green-500/20 dark:to-teal-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, -50, 25, 0],
            y: [0, 60, -30, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          style={{
            transform: `translate(${(mousePosition.x - 900) * 0.025}px, ${(mousePosition.y - 200) * 0.025}px)`,
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
        />
        <motion.div
          className="absolute bottom-[35%] right-[45%] w-64 h-64 bg-gradient-to-r from-yellow-500/30 to-red-500/30 dark:from-yellow-500/20 dark:to-red-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 40, -20, 0],
            y: [0, -45, 25, 0],
            scale: [1, 0.9, 1.1, 1],
          }}
          style={{
            transform: `translate(${(mousePosition.x - 700) * 0.03}px, ${(mousePosition.y - 800) * 0.03}px)`,
          }}
          transition={{
            duration: 24,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5,
          }}
        />
        <motion.div
          className="absolute top-[35%] left-[20%] w-80 h-80 bg-gradient-to-r from-indigo-500/30 to-purple-500/30 dark:from-indigo-500/20 dark:to-purple-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 60, -30, 0],
            y: [0, -35, 20, 0],
            scale: [1, 1.3, 0.8, 1],
          }}
          style={{
            transform: `translate(${(mousePosition.x - 300) * 0.02}px, ${(mousePosition.y - 350) * 0.02}px)`,
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 6,
          }}
        />
        <motion.div
          className="absolute bottom-[55%] right-[25%] w-72 h-72 bg-gradient-to-r from-rose-500/30 to-pink-500/30 dark:from-rose-500/20 dark:to-pink-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, -60, 30, 0],
            y: [0, 70, -35, 0],
            scale: [1, 0.85, 1.15, 1],
          }}
          style={{
            transform: `translate(${(mousePosition.x - 1000) * 0.025}px, ${(mousePosition.y - 450) * 0.025}px)`,
          }}
          transition={{
            duration: 26,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 7,
          }}
        />
        
        {/* Animated Lines */}
        <motion.div
          className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"
          animate={{
            scaleX: [0, 1, 0],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.div
          className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent"
          animate={{
            scaleX: [0, 1, 0],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-20 mx-auto flex flex-1 items-center justify-center max-w-7xl px-4 py-16 sm:py-24 md:py-32 text-center md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6 sm:space-y-8"
        >
          {/* Main Heading - Sitovia with Sparkles */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <SparklesText
              text="Sitovia"
              className="text-7xl font-bold tracking-tight text-foreground dark:text-white sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[12rem]"
              colors={{ first: "#9E7AFF", second: "#FE8BBB" }}
              sparklesCount={15}
            />
            
            {/* Particles under the text */}
            <div className="pointer-events-none absolute left-1/2 top-full -translate-x-1/2 w-[450px] sm:w-[500px] md:w-[650px] h-28 sm:h-32 md:h-36 -mt-7 sm:-mt-8 md:-mt-10">
              <SparklesCore
                id="hero-sparkles"
                background="transparent"
                minSize={0.4}
                maxSize={1}
                particleDensity={100}
                className="w-full h-full pointer-events-none"
                particleColor="#FFFFFF"
              />
            </div>
          </motion.div>

          {/* Gradient Lines */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="relative mx-auto mt-8 max-w-[40rem] h-2"
          >
            {/* Gradients */}
            <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
            <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
            <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
            <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />
          </motion.div>

          {/* Badge - Trusted by */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="inline-flex items-center rounded-full border border-border dark:border-white/20 bg-muted dark:bg-white/5 px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs backdrop-blur-sm mx-4"
          >
            <span className="text-muted-foreground dark:text-white/70">{t("hero.trusted_by")}</span>
            <span className="ml-1 sm:ml-2 font-medium text-foreground dark:text-white">{t("hero.countries")}</span>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="mx-auto max-w-2xl text-sm text-muted-foreground dark:text-white/60 md:text-base px-4"
          >
            {t("hero.description")}
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="mt-4 sm:mt-6 px-4"
          >
            <MagneticElement strength={0.2} distance={80}>
              <Link href={`/${currentLocale}/contact`}>
                <RainbowButton
                  onClick={() => trackCTAClick(t("common.cta"), "Hero Section")}
                  className="text-sm sm:text-base w-full sm:w-auto px-6 sm:px-8 py-3"
                >
                  <span className="flex items-center justify-center gap-2">
                    {t("common.cta")}
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      →
                    </motion.span>
                  </span>
                </RainbowButton>
              </Link>
            </MagneticElement>
          </motion.div>

        </motion.div>
      </div>

    </section>
  );
}
