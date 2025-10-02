"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";

interface MousePosition {
  x: number;
  y: number;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  size: number;
  opacity: number;
  color: string;
  speed: number;
}

interface RippleEffect {
  id: number;
  x: number;
  y: number;
  timestamp: number;
}

interface InteractiveBackgroundProps {
  className?: string;
}

export function InteractiveBackground({ className = "" }: InteractiveBackgroundProps) {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Particle[]>([]);
  const [ripples, setRipples] = useState<RippleEffect[]>([]);
  const [isMouseInside, setIsMouseInside] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();

  // Initialize particles
  useEffect(() => {
    const initialParticles: Particle[] = [];
    const colors = [
      "rgba(59, 130, 246, 0.6)", // blue
      "rgba(112, 190, 67, 0.6)", // green
      "rgba(236, 72, 153, 0.6)", // pink
      "rgba(34, 197, 94, 0.6)",  // green
      "rgba(251, 191, 36, 0.6)", // yellow
      "rgba(239, 68, 68, 0.6)",  // red
    ];

    for (let i = 0; i < 25; i++) {
      initialParticles.push({
        id: i,
        x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
        y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
        targetX: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
        targetY: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
        size: Math.random() * 4 + 2,
        opacity: Math.random() * 0.5 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: Math.random() * 0.02 + 0.01,
      });
    }
    setParticles(initialParticles);
  }, []);

  // Handle mouse movement
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const newPosition = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    setMousePosition(newPosition);
  }, []);

  // Handle mouse enter/leave
  const handleMouseEnter = useCallback(() => {
    setIsMouseInside(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsMouseInside(false);
  }, []);

  // Handle click for ripple effect
  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const newRipple: RippleEffect = {
      id: Date.now(),
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      timestamp: Date.now(),
    };
    
    setRipples(prev => [...prev, newRipple]);
    
    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 2000);
  }, []);

  // Animate particles
  useEffect(() => {
    const animateParticles = () => {
      setParticles(prevParticles => 
        prevParticles.map(particle => {
          let { x, y, targetX, targetY } = particle;
          
          if (isMouseInside) {
            // Attract particles to mouse
            const dx = mousePosition.x - x;
            const dy = mousePosition.y - y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 150) {
              // Magnetic effect - attract to mouse
              targetX = mousePosition.x + (dx * 0.1);
              targetY = mousePosition.y + (dy * 0.1);
            } else {
              // Return to random position
              if (Math.abs(x - targetX) < 5 && Math.abs(y - targetY) < 5) {
                targetX = Math.random() * (containerRef.current?.clientWidth || 1200);
                targetY = Math.random() * (containerRef.current?.clientHeight || 800);
              }
            }
          } else {
            // Random movement when mouse is not inside
            if (Math.abs(x - targetX) < 5 && Math.abs(y - targetY) < 5) {
              targetX = Math.random() * (containerRef.current?.clientWidth || 1200);
              targetY = Math.random() * (containerRef.current?.clientHeight || 800);
            }
          }
          
          // Smooth movement towards target
          x += (targetX - x) * particle.speed;
          y += (targetY - y) * particle.speed;
          
          return {
            ...particle,
            x,
            y,
            targetX,
            targetY,
          };
        })
      );
      
      animationFrameRef.current = requestAnimationFrame(animateParticles);
    };

    animationFrameRef.current = requestAnimationFrame(animateParticles);
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [mousePosition, isMouseInside]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{ pointerEvents: 'auto' }}
    >
      {/* Interactive Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            opacity: particle.opacity,
            filter: 'blur(1px)',
          }}
          animate={{
            scale: isMouseInside ? [1, 1.2, 1] : [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Floating Geometric Shapes */}
      <motion.div
        className="absolute w-20 h-20 border border-blue-500/30 rounded-lg pointer-events-none"
        style={{
          left: '20%',
          top: '30%',
          transform: `translate(${(mousePosition.x - 200) * 0.05}px, ${(mousePosition.y - 200) * 0.05}px)`,
        }}
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
        }}
      />

      <motion.div
        className="absolute w-16 h-16 bg-gradient-to-r from-green-500/20 to-green-400/20 rounded-full pointer-events-none"
        style={{
          right: '25%',
          top: '20%',
          transform: `translate(${(mousePosition.x - 800) * 0.03}px, ${(mousePosition.y - 150) * 0.03}px)`,
        }}
        animate={{
          y: [0, -20, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute w-12 h-12 border-2 border-green-500/40 rotate-45 pointer-events-none"
        style={{
          left: '70%',
          bottom: '40%',
          transform: `translate(${(mousePosition.x - 900) * 0.04}px, ${(mousePosition.y - 400) * 0.04}px)`,
        }}
        animate={{
          rotate: [45, 405],
          borderColor: ['rgba(34, 197, 94, 0.4)', 'rgba(59, 130, 246, 0.4)', 'rgba(34, 197, 94, 0.4)'],
        }}
        transition={{
          rotate: { duration: 15, repeat: Infinity, ease: "linear" },
          borderColor: { duration: 8, repeat: Infinity, ease: "easeInOut" },
        }}
      />

      <motion.div
        className="absolute w-24 h-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent pointer-events-none"
        style={{
          left: '15%',
          bottom: '25%',
          transform: `translate(${(mousePosition.x - 150) * 0.06}px, ${(mousePosition.y - 600) * 0.06}px)`,
        }}
        animate={{
          scaleX: [1, 1.5, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Mouse Follower */}
      {isMouseInside && (
        <motion.div
          className="absolute w-8 h-8 border border-white/30 rounded-full pointer-events-none"
          style={{
            left: mousePosition.x - 16,
            top: mousePosition.y - 16,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}

      {/* Ripple Effects */}
      {ripples.map((ripple) => (
        <motion.div
          key={ripple.id}
          className="absolute border border-white/20 rounded-full pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
          }}
          initial={{
            width: 0,
            height: 0,
            opacity: 0.8,
            x: 0,
            y: 0,
          }}
          animate={{
            width: 200,
            height: 200,
            opacity: 0,
            x: -100,
            y: -100,
          }}
          transition={{
            duration: 2,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Connection Lines */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 1 }}
      >
        {particles.map((particle, index) => {
          if (index === 0) return null;
          const prevParticle = particles[index - 1];
          const distance = Math.sqrt(
            Math.pow(particle.x - prevParticle.x, 2) + Math.pow(particle.y - prevParticle.y, 2)
          );
          
          if (distance < 100) {
            return (
              <motion.line
                key={`line-${particle.id}-${prevParticle.id}`}
                x1={prevParticle.x}
                y1={prevParticle.y}
                x2={particle.x}
                y2={particle.y}
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                transition={{ duration: 0.5 }}
              />
            );
          }
          return null;
        })}
        
        {/* Mouse connection lines */}
        {isMouseInside && particles.map((particle) => {
          const distance = Math.sqrt(
            Math.pow(particle.x - mousePosition.x, 2) + Math.pow(particle.y - mousePosition.y, 2)
          );
          
          if (distance < 80) {
            return (
              <motion.line
                key={`mouse-line-${particle.id}`}
                x1={mousePosition.x}
                y1={mousePosition.y}
                x2={particle.x}
                y2={particle.y}
                stroke="rgba(59, 130, 246, 0.3)"
                strokeWidth="1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ duration: 0.2 }}
              />
            );
          }
          return null;
        })}
      </svg>

      {/* Ambient Light Effect */}
      {isMouseInside && (
        <motion.div
          className="absolute w-32 h-32 bg-gradient-radial from-blue-500/20 via-green-500/10 to-transparent rounded-full pointer-events-none blur-xl"
          style={{
            left: mousePosition.x - 64,
            top: mousePosition.y - 64,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}
    </div>
  );
}
