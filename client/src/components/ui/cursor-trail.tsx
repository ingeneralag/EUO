"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TrailPoint {
  id: number;
  x: number;
  y: number;
  timestamp: number;
}

interface CursorTrailProps {
  className?: string;
}

export function CursorTrail({ className = "" }: CursorTrailProps) {
  const [trailPoints, setTrailPoints] = useState<TrailPoint[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastUpdateRef = useRef<number>(0);

  useEffect(() => {
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      
      // Throttle updates for better performance
      if (now - lastUpdateRef.current < 16) return; // ~60fps
      lastUpdateRef.current = now;

      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Check if mouse is within the container
      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        setIsVisible(true);
        
        setTrailPoints(prev => {
          const newPoint: TrailPoint = {
            id: now,
            x,
            y,
            timestamp: now,
          };
          
          // Keep only recent points (last 500ms)
          const filtered = prev.filter(point => now - point.timestamp < 500);
          return [...filtered, newPoint].slice(-15); // Max 15 points
        });
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      setTrailPoints([]);
    };

    // Clean up old points periodically
    const cleanup = () => {
      const now = Date.now();
      setTrailPoints(prev => prev.filter(point => now - point.timestamp < 500));
      animationFrameId = requestAnimationFrame(cleanup);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    animationFrameId = requestAnimationFrame(cleanup);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 pointer-events-none z-50 ${className}`}
      style={{ mixBlendMode: 'screen' }}
    >
      <AnimatePresence>
        {isVisible && trailPoints.map((point, index) => {
          const age = Date.now() - point.timestamp;
          const opacity = Math.max(0, 1 - age / 500);
          const scale = Math.max(0.1, 1 - age / 500);
          
          return (
            <motion.div
              key={point.id}
              className="absolute rounded-full"
              style={{
                left: point.x - 6,
                top: point.y - 6,
                width: 12,
                height: 12,
                background: `radial-gradient(circle, 
                  rgba(59, 130, 246, ${opacity * 0.8}) 0%, 
                  rgba(147, 51, 234, ${opacity * 0.6}) 50%, 
                  rgba(236, 72, 153, ${opacity * 0.4}) 100%
                )`,
                transform: `scale(${scale})`,
                filter: 'blur(1px)',
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: opacity,
                scale: scale,
              }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ 
                duration: 0.1,
                ease: "easeOut"
              }}
            />
          );
        })}
      </AnimatePresence>

      {/* Cursor Glow Effect */}
      <AnimatePresence>
        {isVisible && trailPoints.length > 0 && (
          <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{
              left: trailPoints[trailPoints.length - 1]?.x - 20,
              top: trailPoints[trailPoints.length - 1]?.y - 20,
              width: 40,
              height: 40,
              background: `radial-gradient(circle, 
                rgba(59, 130, 246, 0.2) 0%, 
                rgba(147, 51, 234, 0.1) 50%, 
                transparent 100%
              )`,
              filter: 'blur(8px)',
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: 1,
              scale: [1, 1.2, 1],
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ 
              scale: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
