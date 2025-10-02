import { cn } from "@/lib/utils";
import React from "react";

export interface SeoOptimizationSvgProps {
  className?: string;
  width?: string;
  height?: string;
  text?: string;
  showConnections?: boolean;
  lineMarkerSize?: number;
  animateText?: boolean;
  animateLines?: boolean;
  animateMarkers?: boolean;
}

const SeoOptimization = ({
  className,
  width = "100%",
  height = "100%",
  text = "SEO",
  showConnections = true,
  animateText = true,
  lineMarkerSize = 18,
  animateLines = true,
  animateMarkers = true,
}: SeoOptimizationSvgProps) => {
  return (
    <svg
      className={cn("text-muted", className)}
      width={width}
      height={height}
      viewBox="0 0 200 100"
    >
      {/* Search Engine Results */}
      <g>
        {/* Search Bar */}
        <rect
          x="40"
          y="15"
          width="120"
          height="12"
          rx="6"
          fill="#2a2a2a"
          stroke="currentColor"
          strokeWidth="0.5"
        >
          <animate attributeName="fill" values="#2a2a2a;#3a3a3a;#2a2a2a" dur="3s" repeatCount="indefinite" />
        </rect>
        
        {/* Search Icon */}
        <circle cx="145" cy="21" r="4" fill="#4285f4">
          <animate attributeName="r" values="4;4.5;4" dur="2s" repeatCount="indefinite" />
          <animate attributeName="fill" values="#4285f4;#5a95f5;#4285f4" dur="2s" repeatCount="indefinite" />
        </circle>
        <path d="M 143 19 L 147 23" stroke="white" strokeWidth="1.5" strokeLinecap="round">
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="0 145 21;15 145 21;0 145 21"
            dur="3s"
            repeatCount="indefinite"
          />
        </path>
        
        {/* Typing Indicator */}
        <rect x="45" y="19" width="0" height="4" rx="2" fill="#666">
          <animate attributeName="width" values="0;90;0" dur="4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;1;0" dur="4s" repeatCount="indefinite" />
        </rect>
        
        {/* Search Results with Loading Animation */}
        <g fill="#333" stroke="currentColor" strokeWidth="0.3">
          <rect x="50" y="35" width="0" height="8" rx="2" fill="#1a1a1a">
            <animate attributeName="width" values="0;100;100" dur="1s" begin="1s" fill="freeze" />
            <animate attributeName="opacity" values="0;0;1" dur="1s" begin="1s" fill="freeze" />
          </rect>
          <rect x="50" y="47" width="0" height="6" rx="2" fill="#1a1a1a">
            <animate attributeName="width" values="0;80;80" dur="1s" begin="1.5s" fill="freeze" />
            <animate attributeName="opacity" values="0;0;1" dur="1s" begin="1.5s" fill="freeze" />
          </rect>
          <rect x="50" y="57" width="0" height="6" rx="2" fill="#1a1a1a">
            <animate attributeName="width" values="0;90;90" dur="1s" begin="2s" fill="freeze" />
            <animate attributeName="opacity" values="0;0;1" dur="1s" begin="2s" fill="freeze" />
          </rect>
          <rect x="50" y="67" width="0" height="6" rx="2" fill="#1a1a1a">
            <animate attributeName="width" values="0;70;70" dur="1s" begin="2.5s" fill="freeze" />
            <animate attributeName="opacity" values="0;0;1" dur="1s" begin="2.5s" fill="freeze" />
          </rect>
        </g>
        
        {/* Ranking Numbers with Pop Animation */}
        <g fill="#22c55e" fontSize="6" fontWeight="bold">
          <text x="45" y="40" opacity="0">1
            <animate attributeName="opacity" values="0;1" dur="0.5s" begin="1s" fill="freeze" />
            <animateTransform
              attributeName="transform"
              type="scale"
              values="0;1.2;1"
              dur="0.5s"
              begin="1s"
              fill="freeze"
            />
          </text>
          <text x="45" y="51" opacity="0">2
            <animate attributeName="opacity" values="0;1" dur="0.5s" begin="1.5s" fill="freeze" />
            <animateTransform
              attributeName="transform"
              type="scale"
              values="0;1.2;1"
              dur="0.5s"
              begin="1.5s"
              fill="freeze"
            />
          </text>
          <text x="45" y="61" opacity="0">3
            <animate attributeName="opacity" values="0;1" dur="0.5s" begin="2s" fill="freeze" />
            <animateTransform
              attributeName="transform"
              type="scale"
              values="0;1.2;1"
              dur="0.5s"
              begin="2s"
              fill="freeze"
            />
          </text>
          <text x="45" y="71" opacity="0">4
            <animate attributeName="opacity" values="0;1" dur="0.5s" begin="2.5s" fill="freeze" />
            <animateTransform
              attributeName="transform"
              type="scale"
              values="0;1.2;1"
              dur="0.5s"
              begin="2.5s"
              fill="freeze"
            />
          </text>
        </g>
        
        {/* Ranking Up Arrow Animation */}
        <g opacity="0">
          <path d="M 155 40 L 160 35 L 165 40" stroke="#22c55e" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <animate attributeName="opacity" values="0;1;0" dur="2s" begin="3s" repeatCount="indefinite" />
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0,0; 0,-5; 0,0"
            dur="2s"
            begin="3s"
            repeatCount="indefinite"
          />
        </g>
      </g>
      
      {/* Connection Paths */}
      <g
        stroke="currentColor"
        fill="none"
        strokeWidth="0.3"
        strokeDasharray="100 100"
        pathLength="100"
        markerStart="url(#seo-circle-marker)"
      >
        {/* Keywords Path */}
        <path
          strokeDasharray="100 100"
          pathLength="100"
          d="M 10 20 h 25 q 5 0 5 5 v 5"
        />
        {/* Analytics Path */}
        <path
          strokeDasharray="100 100"
          pathLength="100"
          d="M 180 30 h -15 q -5 0 -5 5 v 10"
        />
        {/* Backlinks Path */}
        <path
          strokeDasharray="100 100"
          pathLength="100"
          d="M 190 60 h -25 q -5 0 -5 -5 v -15"
        />
        {/* Content Path */}
        <path
          strokeDasharray="100 100"
          pathLength="100"
          d="M 15 80 h 20 q 5 0 5 -5 v -20"
        />
        {/* Technical SEO Path */}
        <path
          strokeDasharray="100 100"
          pathLength="100"
          d="M 100 85 v -10 q 0 -5 5 -5 h 15"
        />
        
        {/* Animation For Path Starting */}
        {animateLines && (
          <animate
            attributeName="stroke-dashoffset"
            from="100"
            to="0"
            dur="2s"
            fill="freeze"
            calcMode="spline"
            keySplines="0.25,0.1,0.5,1"
            keyTimes="0; 1"
          />
        )}
      </g>

      {/* Animated Lights */}
      {/* Keywords Light */}
      <g mask="url(#seo-mask-1)">
        <circle
          className="seo-optimization seo-line-1"
          cx="0"
          cy="0"
          r="8"
          fill="url(#seo-green-grad)"
        />
      </g>
      {/* Analytics Light */}
      <g mask="url(#seo-mask-2)">
        <circle
          className="seo-optimization seo-line-2"
          cx="0"
          cy="0"
          r="8"
          fill="url(#seo-blue-grad)"
        />
      </g>
      {/* Backlinks Light */}
      <g mask="url(#seo-mask-3)">
        <circle
          className="seo-optimization seo-line-3"
          cx="0"
          cy="0"
          r="8"
          fill="url(#seo-purple-grad)"
        />
      </g>
      {/* Content Light */}
      <g mask="url(#seo-mask-4)">
        <circle
          className="seo-optimization seo-line-4"
          cx="0"
          cy="0"
          r="8"
          fill="url(#seo-orange-grad)"
        />
      </g>
      {/* Technical SEO Light */}
      <g mask="url(#seo-mask-5)">
        <circle
          className="seo-optimization seo-line-5"
          cx="0"
          cy="0"
          r="8"
          fill="url(#seo-yellow-grad)"
        />
      </g>

      {/* Central Text */}
      <text
        x="100"
        y="52"
        fontSize="8"
        fill={animateText ? "url(#seo-text-gradient)" : "white"}
        fontWeight="600"
        letterSpacing="0.05em"
        textAnchor="middle"
      >
        {text}
      </text>

      {/* Definitions */}
      <defs>
        {/* Masks */}
        <mask id="seo-mask-1">
          <path
            d="M 10 20 h 25 q 5 0 5 5 v 5"
            strokeWidth="0.5"
            stroke="white"
          />
        </mask>
        <mask id="seo-mask-2">
          <path
            d="M 180 30 h -15 q -5 0 -5 5 v 10"
            strokeWidth="0.5"
            stroke="white"
          />
        </mask>
        <mask id="seo-mask-3">
          <path
            d="M 190 60 h -25 q -5 0 -5 -5 v -15"
            strokeWidth="0.5"
            stroke="white"
          />
        </mask>
        <mask id="seo-mask-4">
          <path
            d="M 15 80 h 20 q 5 0 5 -5 v -20"
            strokeWidth="0.5"
            stroke="white"
          />
        </mask>
        <mask id="seo-mask-5">
          <path
            d="M 100 85 v -10 q 0 -5 5 -5 h 15"
            strokeWidth="0.5"
            stroke="white"
          />
        </mask>

        {/* Gradients */}
        <radialGradient id="seo-green-grad" fx="1">
          <stop offset="0%" stopColor="#22c55e" />
          <stop offset="50%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <radialGradient id="seo-blue-grad" fx="1">
          <stop offset="0%" stopColor="#4285f4" />
          <stop offset="50%" stopColor="#1976d2" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <radialGradient id="seo-purple-grad" fx="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="50%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <radialGradient id="seo-orange-grad" fx="1">
          <stop offset="0%" stopColor="#f97316" />
          <stop offset="50%" stopColor="#ea580c" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <radialGradient id="seo-yellow-grad" fx="1">
          <stop offset="0%" stopColor="#eab308" />
          <stop offset="50%" stopColor="#ca8a04" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>

        {/* Marker */}
        <marker
          id="seo-circle-marker"
          viewBox="0 0 10 10"
          refX="5"
          refY="5"
          markerWidth={lineMarkerSize}
          markerHeight={lineMarkerSize}
        >
          <circle
            cx="5"
            cy="5"
            r="2"
            fill="black"
            stroke="#232323"
            strokeWidth="0.5"
          >
            {animateMarkers && (
              <animate attributeName="r" values="0; 3; 2" dur="0.5s" />
            )}
          </circle>
        </marker>

        {/* Text Gradient */}
        <linearGradient id="seo-text-gradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#666666">
            <animate
              attributeName="offset"
              values="-2; -1; 0"
              dur="5s"
              repeatCount="indefinite"
              calcMode="spline"
              keyTimes="0; 0.5; 1"
              keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
            />
          </stop>
          <stop offset="25%" stopColor="white">
            <animate
              attributeName="offset"
              values="-1; 0; 1"
              dur="5s"
              repeatCount="indefinite"
              calcMode="spline"
              keyTimes="0; 0.5; 1"
              keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
            />
          </stop>
          <stop offset="50%" stopColor="#666666">
            <animate
              attributeName="offset"
              values="0; 1; 2;"
              dur="5s"
              repeatCount="indefinite"
              calcMode="spline"
              keyTimes="0; 0.5; 1"
              keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
            />
          </stop>
        </linearGradient>
      </defs>
    </svg>
  );
};

export { SeoOptimization };
