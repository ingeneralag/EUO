"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { WorldMap } from "@/components/ui/world-map";
import { MapPin, Users, Building2, Globe } from "lucide-react";

export function OurLocationsSection() {
  const t = useTranslations("locations");

  // Client locations - Italy, Spain, Vienna (Austria), USA, Australia
  const clientLocations = [
    {
      start: { lat: 41.9028, lng: 12.4964, label: "Rome" }, // Italy clients
      end: { lat: 40.4168, lng: -3.7038, label: "Madrid" }, // Spain clients
    },
    {
      start: { lat: 40.4168, lng: -3.7038, label: "Madrid" }, // Spain clients
      end: { lat: 48.2082, lng: 16.3738, label: "Vienna" }, // Austria clients
    },
    {
      start: { lat: 48.2082, lng: 16.3738, label: "Vienna" }, // Austria clients
      end: { lat: 40.7128, lng: -74.006, label: "New York" }, // USA clients
    },
    {
      start: { lat: 40.7128, lng: -74.006, label: "New York" }, // USA clients
      end: { lat: -33.8688, lng: 151.2093, label: "Sydney" }, // Australia clients
    },

    // New routes/markers requested
    // Paris (France) ↔ Rome (Italy)
    {
      start: { lat: 48.8566, lng: 2.3522, label: "Paris" }, // France
      end: { lat: 41.9028, lng: 12.4964, label: "Rome" }, // Italy
    },
    // Paris (France) ↔ Vienna (Austria)
    {
      start: { lat: 48.8566, lng: 2.3522, label: "Paris" },
      end: { lat: 48.2082, lng: 16.3738, label: "Vienna" },
    },
    // Rome (Italy) ↔ Dubai (UAE)
    {
      start: { lat: 41.9028, lng: 12.4964, label: "Rome" },
      end: { lat: 25.2048, lng: 55.2708, label: "Dubai" },
    },
    // Paris (France) ↔ Dubai (UAE)
    {
      start: { lat: 48.8566, lng: 2.3522, label: "Paris" },
      end: { lat: 25.2048, lng: 55.2708, label: "Dubai" },
    },
  ];

  const stats = [
    {
      icon: <MapPin className="w-6 h-6" />,
      value: "5",
      label: "Countries",
      description: "Client Base"
    },
    {
      icon: <Building2 className="w-6 h-6" />,
      value: "100+",
      label: "Projects",
      description: "Delivered"
    },
    {
      icon: <Users className="w-6 h-6" />,
      value: "50+",
      label: "Happy Clients",
      description: "Worldwide"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      value: "3",
      label: "Continents",
      description: "We Serve"
    }
  ];

  return (
    <section className="w-full bg-background dark:bg-black relative py-12 md:py-16 lg:py-20 pb-safe overflow-hidden">

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
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

        {/* World Map */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6 md:mb-8 lg:mb-10 px-2 md:px-0"
        >
          <div className="bg-card/50 dark:bg-card/30 rounded-2xl p-4 md:p-6 border border-border shadow-lg">
            <WorldMap
              dots={clientLocations}
              lineColor="#ffffff"
              showLabels={true}
              animationDuration={2}
              loop={true}
            />
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 px-2 md:px-0"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="relative group"
            >
              <div className="relative p-4 md:p-6 rounded-xl md:rounded-2xl border border-border bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 text-center">
                <div className="inline-flex p-2 md:p-3 rounded-lg md:rounded-xl bg-primary/10 mb-3 md:mb-4 group-hover:bg-primary/20 transition-colors">
                  <div className="text-primary">
                    {stat.icon}
                  </div>
                </div>
                <h3 className="text-xl md:text-3xl font-bold text-foreground mb-1">
                  {stat.value}
                </h3>
                <p className="text-xs md:text-sm font-semibold text-foreground mb-1">
                  {stat.label}
                </p>
                <p className="text-xs text-muted-foreground hidden md:block">
                  {stat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
