"use client";

import React, { useState, useRef } from "react";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  FileText,
  Volume2,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import Image from "next/image";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  audioUrl: string;
  text: string;
  duration: string;
}

export function ClientFeedbackSection() {
  const t = useTranslations("feedback");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<{ [key: number]: 'audio' | 'text' }>({});
  const [direction, setDirection] = useState(0);
  const audioRefs = useRef<{ [key: number]: HTMLAudioElement | null }>({});

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "CEO & Founder",
      company: "TechVision Inc.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      text: "Working with Sitovia has been transformative for our business. Their expertise in web development and SEO brought our vision to life beyond our expectations. The team's dedication and innovative approach helped us achieve a 300% increase in online engagement.",
      duration: "0:45"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Marketing Director",
      company: "Global Solutions Ltd",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
      text: "The level of professionalism and technical expertise demonstrated by Sitovia is truly exceptional. They delivered a stunning website that not only looks great but performs flawlessly. Our conversion rates have doubled since launch!",
      duration: "1:02"
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      role: "Product Manager",
      company: "Innovation Hub",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
      text: "Outstanding service and innovative solutions from start to finish. Sitovia's team took the time to understand our unique challenges and created a custom solution that exceeded all our goals. Highly recommended for anyone serious about digital excellence!",
      duration: "0:58"
    },
    {
      id: 4,
      name: "James Anderson",
      role: "Operations Director",
      company: "NextGen Systems",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
      text: "Sitovia transformed our outdated website into a modern, high-performing platform. Their attention to detail and commitment to excellence is unmatched. The results speak for themselves - we've seen a 250% increase in qualified leads!",
      duration: "0:52"
    },
    {
      id: 5,
      name: "Sophia Martinez",
      role: "Brand Manager",
      company: "Creative Ventures",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
      text: "The UI/UX design work from Sitovia is absolutely stunning. They created an intuitive, beautiful interface that our users love. Customer satisfaction scores have never been higher. This team truly understands modern web design!",
      duration: "1:05"
    }
  ];

  // Always show 3 testimonials
  const visibleTestimonials = [
    testimonials[currentIndex % testimonials.length],
    testimonials[(currentIndex + 1) % testimonials.length],
    testimonials[(currentIndex + 2) % testimonials.length],
  ];

  const handlePlayPause = (id: number) => {
    const mode = viewMode[id] || 'audio';
    if (mode === 'audio') {
      const audio = audioRefs.current[id];
      if (!audio) return;

      if (isPlaying === id) {
        audio.pause();
        setIsPlaying(null);
      } else {
        Object.values(audioRefs.current).forEach((a) => a?.pause());
        audio.play().catch(e => console.log('Audio play error:', e));
        setIsPlaying(id);
      }
    }
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsPlaying(null);
    Object.values(audioRefs.current).forEach((a) => a?.pause());
  };

  const handlePrevious = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsPlaying(null);
    Object.values(audioRefs.current).forEach((a) => a?.pause());
  };

  const toggleViewMode = (id: number, mode: 'audio' | 'text') => {
    setViewMode(prev => ({ ...prev, [id]: mode }));
    if (isPlaying === id) {
      const audio = audioRefs.current[id];
      audio?.pause();
      setIsPlaying(null);
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 400 : -400,
      opacity: 0,
      scale: 0.8
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 400 : -400,
      opacity: 0,
      scale: 0.8
    })
  };

  return (
    <section className="h-screen flex flex-col justify-center bg-background dark:bg-black relative pt-20 overflow-hidden">
      {/* Background Pattern - Same as other sections */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)]" />

        {/* Floating Orbs */}
        <motion.div
          className="absolute top-[15%] left-[20%] w-72 h-72 bg-blue-500/30 dark:bg-blue-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 70, -35, 0],
            y: [0, -35, 25, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-[20%] right-[25%] w-96 h-96 bg-purple-500/30 dark:bg-purple-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, -60, 30, 0],
            y: [0, 40, -20, 0],
            scale: [1, 0.8, 1.2, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - Static */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 md:mb-12"
        >
          <Badge variant="outline" className="mb-3 md:mb-4 bg-background dark:bg-black text-xs md:text-sm">
            {t("badge")}
          </Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 px-2">
            {t("heading")}
          </h2>
          <p className="text-muted-foreground dark:text-white/70 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4">
            {t("description")}
          </p>
        </motion.div>

        {/* Testimonials Grid - Individual Card Animation */}
        {/* Mobile: Single Card */}
        <div className="block md:hidden mb-8">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={testimonials[currentIndex].id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30
              }}
              className="w-full max-w-md mx-auto"
            >
              {(() => {
                const testimonial = testimonials[currentIndex];
                const mode = viewMode[testimonial.id] || 'audio';
                return (
                  <div className="relative"
                  >
                    <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-6 hover:border-primary/50 transition-all duration-300">
                      {/* Audio element */}
                      <audio
                        ref={(el) => { audioRefs.current[testimonial.id] = el; }}
                        src={testimonial.audioUrl}
                        onEnded={() => setIsPlaying(null)}
                      />

                      {/* Client Info */}
                      <div className="flex flex-col items-center mb-6">
                        <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-primary/50">
                          <Image
                            src={testimonial.image}
                            alt={testimonial.name}
                            width={96}
                            height={96}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h3 className="text-xl font-semibold text-foreground text-center">
                          {testimonial.name}
                        </h3>
                        <p className="text-base text-muted-foreground text-center mt-1">
                          {testimonial.role}
                        </p>
                        <p className="text-sm text-muted-foreground text-center">
                          {testimonial.company}
                        </p>
                      </div>

                      {/* Mode Toggle Buttons */}
                      <div className="flex justify-center gap-2 mb-4">
                        <Button
                          variant={mode === 'audio' ? 'default' : 'outline'}
                          size="sm"
                          className="gap-2"
                          onClick={() => toggleViewMode(testimonial.id, 'audio')}
                        >
                          <Volume2 className="w-4 h-4" />
                          {t("audio")}
                        </Button>
                        <Button
                          variant={mode === 'text' ? 'default' : 'outline'}
                          size="sm"
                          className="gap-2"
                          onClick={() => toggleViewMode(testimonial.id, 'text')}
                        >
                          <FileText className="w-4 h-4" />
                          {t("text")}
                        </Button>
                      </div>

                      {/* Content Area */}
                      <AnimatePresence mode="wait">
                        {mode === 'audio' ? (
                          <motion.div
                            key="audio"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                          >
                            {/* Waveform Visualization */}
                            <div className="mb-4 h-24 flex items-center justify-center bg-muted/30 rounded-lg p-4">
                              <div className="flex items-end justify-center gap-1 w-full h-full">
                                {Array.from({ length: 50 }).map((_, i) => (
                                  <motion.div
                                    key={i}
                                    className="flex-1 bg-primary/40 rounded-full"
                                    animate={isPlaying === testimonial.id ? {
                                      height: [`${20 + Math.random() * 80}%`, `${20 + Math.random() * 80}%`],
                                    } : {}}
                                    transition={{
                                      duration: 0.3 + Math.random() * 0.3,
                                      repeat: isPlaying === testimonial.id ? Infinity : 0,
                                      repeatType: "reverse",
                                    }}
                                    style={{
                                      height: `${20 + Math.random() * 80}%`,
                                      minHeight: '20%',
                                    }}
                                  />
                                ))}
                              </div>
                            </div>

                            {/* Play Controls */}
                            <div className="flex justify-center gap-4">
                              <Button
                                variant="outline"
                                size="lg"
                                className="rounded-full gap-2"
                                onClick={() => handlePlayPause(testimonial.id)}
                              >
                                {isPlaying === testimonial.id ? (
                                  <>
                                    <Pause className="w-5 h-5" />
                                    {t("pauseAudio")}
                                  </>
                                ) : (
                                  <>
                                    <Play className="w-5 h-5" />
                                    {t("playAudio")}
                                  </>
                                )}
                              </Button>
                            </div>
                            <p className="text-xs text-muted-foreground text-center mt-2">
                              Duration: {testimonial.duration}
                            </p>
                          </motion.div>
                        ) : (
                          <motion.div
                            key="text"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="mb-4"
                          >
                            <p className="text-sm text-muted-foreground text-center leading-relaxed">
                              "{testimonial.text}"
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Desktop: 3 Cards */}
        <div className="hidden md:grid md:grid-cols-3 gap-6 mb-8">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            {visibleTestimonials.map((testimonial, index) => {
              const mode = viewMode[testimonial.id] || 'audio';
              return (
                <motion.div
                  key={testimonial.id}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                    delay: index * 0.1
                  }}
                  layout
                  className="relative"
                >
                  <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-6 h-full hover:border-primary/50 transition-all duration-300">
                    {/* Audio element */}
                    <audio
                      ref={(el) => { audioRefs.current[testimonial.id] = el; }}
                      src={testimonial.audioUrl}
                      onEnded={() => setIsPlaying(null)}
                    />

                    {/* Client Info */}
                    <div className="flex flex-col items-center mb-6">
                      <div className="w-20 h-20 rounded-full overflow-hidden mb-4 border-2 border-primary/50">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground text-center">
                        {testimonial.name}
                      </h3>
                      <p className="text-sm text-muted-foreground text-center">
                        {testimonial.role}
                      </p>
                      <p className="text-xs text-muted-foreground text-center">
                        {testimonial.company}
                      </p>
                    </div>

                    {/* Mode Toggle Buttons */}
                    <div className="flex justify-center gap-2 mb-4">
                      <Button
                        variant={mode === 'audio' ? 'default' : 'outline'}
                        size="sm"
                        className="gap-2"
                        onClick={() => toggleViewMode(testimonial.id, 'audio')}
                      >
                        <Volume2 className="w-4 h-4" />
                        Audio
                      </Button>
                      <Button
                        variant={mode === 'text' ? 'default' : 'outline'}
                        size="sm"
                        className="gap-2"
                        onClick={() => toggleViewMode(testimonial.id, 'text')}
                      >
                        <FileText className="w-4 h-4" />
                        Text
                      </Button>
                    </div>

                    {/* Content Area */}
                    <AnimatePresence mode="wait">
                      {mode === 'audio' ? (
                        <motion.div
                          key="audio"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3 }}
                        >
                          {/* Waveform Visualization */}
                          <div className="mb-4 h-24 flex items-center justify-center bg-muted/30 rounded-lg p-4">
                            <div className="flex items-end justify-center gap-1 w-full h-full">
                              {Array.from({ length: 50 }).map((_, i) => (
                                <motion.div
                                  key={i}
                                  className="flex-1 bg-primary/40 rounded-full"
                                  animate={isPlaying === testimonial.id ? {
                                    height: [`${20 + Math.random() * 80}%`, `${20 + Math.random() * 80}%`],
                                  } : {}}
                                  transition={{
                                    duration: 0.3 + Math.random() * 0.3,
                                    repeat: isPlaying === testimonial.id ? Infinity : 0,
                                    repeatType: "reverse",
                                  }}
                                  style={{
                                    height: `${20 + Math.random() * 80}%`,
                                    minHeight: '20%',
                                  }}
                                />
                              ))}
                            </div>
                          </div>

                          {/* Play Controls */}
                          <div className="flex justify-center gap-4">
                            <Button
                              variant="outline"
                              size="lg"
                              className="rounded-full gap-2"
                              onClick={() => handlePlayPause(testimonial.id)}
                            >
                              {isPlaying === testimonial.id ? (
                                <>
                                  <Pause className="w-5 h-5" />
                                  Pause
                                </>
                              ) : (
                                <>
                                  <Play className="w-5 h-5" />
                                  Play
                                </>
                              )}
                            </Button>
                          </div>
                          <p className="text-xs text-muted-foreground text-center mt-2">
                            Duration: {testimonial.duration}
                          </p>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="text"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3 }}
                          className="mb-4"
                        >
                          <p className="text-sm text-muted-foreground text-center leading-relaxed">
                            "{testimonial.text}"
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Navigation - Static */}
        <div className="flex justify-center items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
            onClick={handlePrevious}
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>

          {/* Dots Indicator */}
          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                  setIsPlaying(null);
                  Object.values(audioRefs.current).forEach((a) => a?.pause());
                }}
                className={`h-2 rounded-full transition-all ${index === currentIndex
                  ? "bg-primary w-8"
                  : "bg-muted-foreground/30 w-2 hover:bg-muted-foreground/50"
                  }`}
              />
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            className="rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
            onClick={handleNext}
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
