"use client";
import React, { useId, useMemo } from "react";
import { cn } from "@/lib/utils";

type ParticlesProps = {
  id?: string;
  className?: string;
  background?: string;
  particleSize?: number;
  minSize?: number;
  maxSize?: number;
  speed?: number;
  particleColor?: string;
  particleDensity?: number;
};

export const SparklesCore = React.memo(function SparklesCore(props: ParticlesProps) {
  const {
    id,
    className,
    background = "transparent",
    minSize = 0.4,
    maxSize = 1.2,
    speed = 1,
    particleColor = "#FFFFFF",
    particleDensity = 80,
  } = props;

  const particleId = useId();
  const actualId = id || particleId;

  // Generate particles based on density
  const particles = useMemo(() => {
    const count = Math.floor(particleDensity / 2); // Reduce for performance
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: minSize + Math.random() * (maxSize - minSize),
      delay: Math.random() * 4,
      duration: 2 + Math.random() * 3,
    }));
  }, [particleDensity, minSize, maxSize]);

  return (
    <div
      className={cn("relative w-full h-full overflow-hidden", className)}
      style={{ background }}
    >
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full opacity-70"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particleColor,
            animation: `sparkle-float ${particle.duration}s ease-in-out infinite`,
            animationDelay: `${particle.delay}s`,
            animationDirection: Math.random() > 0.5 ? "normal" : "reverse",
          }}
        />
      ))}
      
      <style jsx>{`
        @keyframes sparkle-float {
          0%, 100% {
            transform: translateY(0px) scale(0.8);
            opacity: 0.4;
          }
          50% {
            transform: translateY(-20px) scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
});
