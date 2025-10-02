"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Shield,
  Zap,
  Users,
  Award,
  Clock,
  Globe,
  HeartHandshake,
  TrendingUp
} from "lucide-react";

export function WhyChooseUsSection() {
  const t = useTranslations("whyChooseUs");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const reasons = [
    {
      icon: <Shield className="h-4 w-4" />,
      title: "Trusted & Secure",
      description: "Your data and projects are safe with our enterprise-grade security measures.",
      area: "md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
    },
    {
      icon: <Zap className="h-4 w-4" />,
      title: "Lightning Fast",
      description: "High-performance solutions optimized for speed across all platforms.",
      area: "md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
    },
    {
      icon: <Users className="h-4 w-4" />,
      title: "Expert Team",
      description: "Skilled developers and designers with years of experience.",
      area: "md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
    },
    {
      icon: <Award className="h-4 w-4" />,
      title: "Award Winning",
      description: "Recognized for excellence by industry leaders and clients.",
      area: "md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
    },
    {
      icon: <Clock className="h-4 w-4" />,
      title: "24/7 Support",
      description: "Round-the-clock assistance for all your needs.",
      area: "md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
    }
  ];

  return (
    <section
      className="h-screen flex flex-col justify-center bg-background dark:bg-black relative pt-20 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Background Orbs - Same as other sections */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)]" />

        {/* Floating Orbs */}
        <motion.div
          className="absolute top-[20%] left-[15%] w-72 h-72 bg-blue-500/30 dark:bg-blue-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 70, -35, 0],
            y: [0, -35, 25, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          style={{
            transform: `translate(${(mousePosition.x - 300) * 0.02}px, ${(mousePosition.y - 300) * 0.02}px)`,
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-[50%] right-[20%] w-96 h-96 bg-purple-500/30 dark:bg-purple-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, -60, 30, 0],
            y: [0, 40, -20, 0],
            scale: [1, 0.8, 1.2, 1],
          }}
          style={{
            transform: `translate(${(mousePosition.x - 800) * 0.025}px, ${(mousePosition.y - 400) * 0.025}px)`,
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        <motion.div
          className="absolute bottom-[30%] left-[25%] w-80 h-80 bg-gradient-to-r from-green-500/30 to-teal-500/30 dark:from-green-500/20 dark:to-teal-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 50, -25, 0],
            y: [0, -30, 15, 0],
            scale: [1, 1.1, 0.9, 1],
            rotate: [0, 180, 360],
          }}
          style={{
            transform: `translate(${(mousePosition.x - 400) * 0.02}px, ${(mousePosition.y - 600) * 0.02}px)`,
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 bg-background dark:bg-black">
            {t("badge")}
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            {t("heading")}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t("description")}
          </p>
        </div>

        {/* Reasons Grid */}
        <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">
          {reasons.map((reason, index) => (
            <li key={index} className={cn("min-h-[14rem] list-none", reason.area)}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative h-full rounded-[1.25rem] border-[0.75px] border-border p-2 md:rounded-[1.5rem] md:p-3"
              >
                <GlowingEffect
                  spread={40}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                  borderWidth={3}
                />
                <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-[0.75px] bg-background p-6 shadow-sm dark:shadow-[0px_0px_27px_0px_rgba(45,45,45,0.3)] md:p-6">
                  <div className="relative flex flex-1 flex-col justify-between gap-3">
                    <div className="w-fit rounded-lg border-[0.75px] border-border bg-muted p-2">
                      {reason.icon}
                    </div>
                    <div className="space-y-3">
                      <h3 className="pt-0.5 text-xl leading-[1.375rem] font-semibold font-sans tracking-[-0.04em] md:text-2xl md:leading-[1.875rem] text-balance text-foreground">
                        {reason.title}
                      </h3>
                      <p className="font-sans text-sm leading-[1.125rem] md:text-base md:leading-[1.375rem] text-muted-foreground">
                        {reason.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}
