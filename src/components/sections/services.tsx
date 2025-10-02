"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { 
  Globe, 
  Search,
  Palette
} from "lucide-react";
import { WebDevelopment } from "@/components/ui/web-development-svg";
import { SeoOptimization } from "@/components/ui/seo-optimization-svg";
import { UiUxDesign } from "@/components/ui/uiux-design-svg";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function ServicesSection() {
  const t = useTranslations("services");
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

  const services = [
    {
      value: "web",
      icon: <Globe className="h-auto w-4 shrink-0" />,
      label: "Web Development",
      badge: "Modern & Responsive",
      description: "Build stunning, high-performance websites that captivate your audience. From responsive design to seamless user experience, we create web solutions that drive results and grow your business.",
      svgComponent: <WebDevelopment className="w-full h-full" />,
      imageAlt: "Web Development",
      href: `/${currentLocale}/services/web-development`,
    },
    {
      value: "seo",
      icon: <Search className="h-auto w-4 shrink-0" />,
      label: "SEO Optimisation",
      badge: "Top Rankings",
      description: "Boost your online visibility and drive organic traffic with our comprehensive SEO strategies. We optimize your website to rank higher on search engines and reach your target audience effectively.",
      svgComponent: <SeoOptimization className="w-full h-full" />,
      imageAlt: "SEO Optimisation",
      href: `/${currentLocale}/services/seo-optimization`,
    },
    {
      value: "uiux",
      icon: <Palette className="h-auto w-4 shrink-0" />,
      label: "UI UX Design",
      badge: "User-Centered",
      description: "Create intuitive and engaging user experiences that convert visitors into customers. Our design process focuses on user research, wireframing, and creating beautiful interfaces that users love.",
      svgComponent: <UiUxDesign className="w-full h-full" />,
      imageAlt: "UI UX Design",
      href: `/${currentLocale}/services/ui-ux-design`,
    },
  ];

  return (
    <section 
      className="h-screen flex flex-col justify-center bg-background dark:bg-black relative pt-20"
      onMouseMove={handleMouseMove}
    >
      {/* Continue the animated background from Hero */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)]" />
        
        {/* Floating Orbs - Continuation with Mouse Interaction - Positioned away from edges */}
        <motion.div
          className="absolute top-[30%] left-[25%] w-64 h-64 bg-green-500/20 dark:bg-green-500/15 rounded-full blur-3xl"
          animate={{
            x: [0, 60, -30, 0],
            y: [0, -40, 20, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          style={{
            transform: `translate(${(mousePosition.x - 400) * 0.015}px, ${(mousePosition.y - 300) * 0.015}px)`,
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.div
          className="absolute top-[50%] right-[30%] w-72 h-72 bg-gradient-to-r from-orange-500/20 to-red-500/20 dark:from-orange-500/15 dark:to-red-500/15 rounded-full blur-3xl"
          animate={{
            x: [0, -50, 25, 0],
            y: [0, 30, -15, 0],
            scale: [1, 0.8, 1.2, 1],
          }}
          style={{
            transform: `translate(${(mousePosition.x - 800) * 0.02}px, ${(mousePosition.y - 600) * 0.02}px)`,
          }}
          transition={{
            duration: 26,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
        />
        <motion.div
          className="absolute top-[70%] left-[35%] w-80 h-80 bg-gradient-to-r from-teal-500/20 to-blue-500/20 dark:from-teal-500/15 dark:to-blue-500/15 rounded-full blur-3xl"
          animate={{
            x: [0, 40, -20, 0],
            y: [0, -25, 15, 0],
            scale: [1, 1.2, 0.8, 1],
          }}
          style={{
            transform: `translate(${(mousePosition.x - 600) * 0.018}px, ${(mousePosition.y - 700) * 0.018}px)`,
          }}
          transition={{
            duration: 24,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5,
          }}
        />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-4 text-center"
        >
          <Badge variant="outline" className="text-xs sm:text-sm">{t("badge")}</Badge>
          <h2 className="max-w-2xl text-2xl font-semibold sm:text-3xl md:text-4xl lg:text-5xl px-4">
            {t("heading")}
          </h2>
          <p className="text-muted-foreground dark:text-white/60 max-w-xl text-sm sm:text-base px-4">
            {t("description")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 sm:mt-12"
        >
          <Tabs defaultValue={services[0].value}>
            <TabsList className="container flex flex-col items-center justify-center gap-3 sm:gap-4 sm:flex-row md:gap-10 bg-transparent h-auto p-0 px-4">
              {services.map((service) => (
                <TabsTrigger
                  key={service.value}
                  value={service.value}
                  className="flex items-center gap-2 rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-semibold text-muted-foreground data-[state=active]:bg-muted data-[state=active]:text-primary transition-all w-full sm:w-auto justify-center"
                >
                  {service.icon} <span className="block">{service.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="mx-auto mt-6 sm:mt-8 max-w-screen-xl rounded-2xl bg-muted/70 dark:bg-white/5 p-4 sm:p-6 lg:p-16 backdrop-blur-sm border border-border dark:border-white/10">
              {services.map((service) => (
                <TabsContent
                  key={service.value}
                  value={service.value}
                  className="grid place-items-center gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-10"
                >
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col gap-4 sm:gap-5 text-center lg:text-left"
                  >
                    <Badge variant="outline" className="w-fit bg-background dark:bg-black text-xs sm:text-sm mx-auto lg:mx-0">
                      {service.badge}
                    </Badge>
                    <h3 className="text-2xl sm:text-3xl font-semibold lg:text-5xl">
                      {service.label}
                    </h3>
                    <p className="text-muted-foreground dark:text-white/70 text-sm sm:text-base lg:text-lg">
                      {service.description}
                    </p>
                    <Link href={service.href}>
                      <Button className="mt-2.5 w-full sm:w-fit gap-2 mx-auto lg:mx-0" size="lg">
                        Learn More
                      </Button>
                    </Link>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-[350px] sm:h-[400px] lg:h-[380px] flex items-center justify-center"
                  >
                    <div className="w-full h-full scale-125 sm:scale-150 lg:scale-125">
                      {service.svgComponent}
                    </div>
                  </motion.div>
                </TabsContent>
              ))}
            </div>
          </Tabs>
        </motion.div>
      </div>
    </section>
  );
}

