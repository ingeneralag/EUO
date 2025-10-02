import { cn } from "@/lib/utils";
import React from "react";

export interface UiUxDesignSvgProps {
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

const UiUxDesign = ({
  className,
  width = "100%",
  height = "100%",
  text = "UI/UX",
  showConnections = true,
  animateText = true,
  lineMarkerSize = 18,
  animateLines = true,
  animateMarkers = true,
}: UiUxDesignSvgProps) => {
  return (
    <svg
      className={cn("text-muted", className)}
      width={width}
      height={height}
      viewBox="0 0 200 100"
    >
      {/* Design Canvas */}
      <g>
        {/* Main Canvas */}
        <rect
          x="50"
          y="20"
          width="100"
          height="60"
          rx="4"
          fill="#1a1a1a"
          stroke="currentColor"
          strokeWidth="0.5"
        >
          <animate attributeName="opacity" values="0.8;1;0.8" dur="4s" repeatCount="indefinite" />
        </rect>
        
        {/* Design Elements */}
        <g>
          {/* Header with Loading Animation */}
          <rect x="60" y="30" width="0" height="8" rx="2" fill="#4f46e5">
            <animate attributeName="width" values="0;80;80" dur="2s" repeatCount="indefinite" />
            <animate attributeName="fill" values="#4f46e5;#6366f1;#4f46e5" dur="3s" repeatCount="indefinite" />
          </rect>
          
          {/* Navigation with Staggered Animation */}
          <rect x="60" y="42" width="0" height="4" rx="2" fill="#06b6d4">
            <animate attributeName="width" values="0;20;20" dur="1s" begin="0.5s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
          </rect>
          <rect x="85" y="42" width="0" height="4" rx="2" fill="#06b6d4">
            <animate attributeName="width" values="0;20;20" dur="1s" begin="1s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" begin="0.5s" repeatCount="indefinite" />
          </rect>
          <rect x="110" y="42" width="0" height="4" rx="2" fill="#06b6d4">
            <animate attributeName="width" values="0;20;20" dur="1s" begin="1.5s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" begin="1s" repeatCount="indefinite" />
          </rect>
          
          {/* Content Blocks with Bounce Animation */}
          <rect x="60" y="50" width="35" height="20" rx="2" fill="#10b981">
            <animateTransform
              attributeName="transform"
              type="scale"
              values="1;1.05;1"
              dur="3s"
              repeatCount="indefinite"
            />
            <animate attributeName="fill" values="#10b981;#22c55e;#10b981" dur="4s" repeatCount="indefinite" />
          </rect>
          <rect x="100" y="50" width="35" height="20" rx="2" fill="#f59e0b">
            <animateTransform
              attributeName="transform"
              type="scale"
              values="1;1.05;1"
              dur="3s"
              begin="1s"
              repeatCount="indefinite"
            />
            <animate attributeName="fill" values="#f59e0b;#fbbf24;#f59e0b" dur="4s" begin="1s" repeatCount="indefinite" />
          </rect>
          
          {/* Design Grid with Pulse Animation */}
          <g stroke="#333" strokeWidth="0.2">
            <line x1="75" y1="25" x2="75" y2="75">
              <animate attributeName="opacity" values="0.2;0.6;0.2" dur="2s" repeatCount="indefinite" />
            </line>
            <line x1="100" y1="25" x2="100" y2="75">
              <animate attributeName="opacity" values="0.2;0.6;0.2" dur="2s" begin="0.5s" repeatCount="indefinite" />
            </line>
            <line x1="125" y1="25" x2="125" y2="75">
              <animate attributeName="opacity" values="0.2;0.6;0.2" dur="2s" begin="1s" repeatCount="indefinite" />
            </line>
            <line x1="55" y1="40" x2="145" y2="40">
              <animate attributeName="opacity" values="0.2;0.6;0.2" dur="2s" begin="0.3s" repeatCount="indefinite" />
            </line>
            <line x1="55" y1="60" x2="145" y2="60">
              <animate attributeName="opacity" values="0.2;0.6;0.2" dur="2s" begin="0.8s" repeatCount="indefinite" />
            </line>
          </g>
        </g>
        
        {/* Design Tools */}
        <g>
          {/* Cursor */}
          <g>
            <path d="M 65 35 L 65 45 L 68 42 L 70 44 L 72 42 L 68 38 Z" fill="white">
              <animateTransform
                attributeName="transform"
                type="translate"
                values="0,0; 20,10; 40,0; 20,-10; 0,0"
                dur="8s"
                repeatCount="indefinite"
              />
            </path>
          </g>
          
          {/* Selection Box */}
          <rect x="95" y="52" width="30" height="15" rx="1" fill="none" stroke="#3b82f6" strokeWidth="1" strokeDasharray="2,2" opacity="0">
            <animate attributeName="opacity" values="0;1;0" dur="3s" begin="2s" repeatCount="indefinite" />
            <animateTransform
              attributeName="transform"
              type="scale"
              values="0.8;1.1;0.8"
              dur="3s"
              begin="2s"
              repeatCount="indefinite"
            />
          </rect>
          
          {/* Color Palette */}
          <g transform="translate(155, 25)">
            <circle cx="0" cy="0" r="3" fill="#ef4444">
              <animate attributeName="r" values="3;3.5;3" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="0" cy="8" r="3" fill="#22c55e">
              <animate attributeName="r" values="3;3.5;3" dur="2s" begin="0.3s" repeatCount="indefinite" />
            </circle>
            <circle cx="0" cy="16" r="3" fill="#3b82f6">
              <animate attributeName="r" values="3;3.5;3" dur="2s" begin="0.6s" repeatCount="indefinite" />
            </circle>
            <circle cx="0" cy="24" r="3" fill="#f59e0b">
              <animate attributeName="r" values="3;3.5;3" dur="2s" begin="0.9s" repeatCount="indefinite" />
            </circle>
          </g>
        </g>
      </g>
      
      {/* Connection Paths */}
      <g
        stroke="currentColor"
        fill="none"
        strokeWidth="0.3"
        strokeDasharray="100 100"
        pathLength="100"
        markerStart="url(#uiux-circle-marker)"
      >
        {/* User Research Path */}
        <path
          strokeDasharray="100 100"
          pathLength="100"
          d="M 10 25 h 35 q 5 0 5 5 v 10"
        />
        {/* Wireframing Path */}
        <path
          strokeDasharray="100 100"
          pathLength="100"
          d="M 180 20 h -25 q -5 0 -5 5 v 15"
        />
        {/* Prototyping Path */}
        <path
          strokeDasharray="100 100"
          pathLength="100"
          d="M 190 50 h -35 q -5 0 -5 -5 v -5"
        />
        {/* User Testing Path */}
        <path
          strokeDasharray="100 100"
          pathLength="100"
          d="M 15 75 h 30 q 5 0 5 -5 v -25"
        />
        {/* Design Systems Path */}
        <path
          strokeDasharray="100 100"
          pathLength="100"
          d="M 100 90 v -5 q 0 -5 5 -5 h 20"
        />
        {/* Accessibility Path */}
        <path
          strokeDasharray="100 100"
          pathLength="100"
          d="M 170 80 h -15 q -5 0 -5 -5 v -15"
        />
        
        {/* Animation For Path Starting */}
        {animateLines && (
          <animate
            attributeName="stroke-dashoffset"
            from="100"
            to="0"
            dur="1.8s"
            fill="freeze"
            calcMode="spline"
            keySplines="0.25,0.1,0.5,1"
            keyTimes="0; 1"
          />
        )}
      </g>

      {/* Animated Lights */}
      {/* User Research Light */}
      <g mask="url(#uiux-mask-1)">
        <circle
          className="uiux-design uiux-line-1"
          cx="0"
          cy="0"
          r="8"
          fill="url(#uiux-pink-grad)"
        />
      </g>
      {/* Wireframing Light */}
      <g mask="url(#uiux-mask-2)">
        <circle
          className="uiux-design uiux-line-2"
          cx="0"
          cy="0"
          r="8"
          fill="url(#uiux-blue-grad)"
        />
      </g>
      {/* Prototyping Light */}
      <g mask="url(#uiux-mask-3)">
        <circle
          className="uiux-design uiux-line-3"
          cx="0"
          cy="0"
          r="8"
          fill="url(#uiux-purple-grad)"
        />
      </g>
      {/* User Testing Light */}
      <g mask="url(#uiux-mask-4)">
        <circle
          className="uiux-design uiux-line-4"
          cx="0"
          cy="0"
          r="8"
          fill="url(#uiux-green-grad)"
        />
      </g>
      {/* Design Systems Light */}
      <g mask="url(#uiux-mask-5)">
        <circle
          className="uiux-design uiux-line-5"
          cx="0"
          cy="0"
          r="8"
          fill="url(#uiux-yellow-grad)"
        />
      </g>
      {/* Accessibility Light */}
      <g mask="url(#uiux-mask-6)">
        <circle
          className="uiux-design uiux-line-6"
          cx="0"
          cy="0"
          r="8"
          fill="url(#uiux-orange-grad)"
        />
      </g>

      {/* Central Text */}
      <text
        x="100"
        y="52"
        fontSize="7"
        fill={animateText ? "url(#uiux-text-gradient)" : "white"}
        fontWeight="600"
        letterSpacing="0.05em"
        textAnchor="middle"
      >
        {text}
      </text>

      {/* Definitions */}
      <defs>
        {/* Masks */}
        <mask id="uiux-mask-1">
          <path
            d="M 10 25 h 35 q 5 0 5 5 v 10"
            strokeWidth="0.5"
            stroke="white"
          />
        </mask>
        <mask id="uiux-mask-2">
          <path
            d="M 180 20 h -25 q -5 0 -5 5 v 15"
            strokeWidth="0.5"
            stroke="white"
          />
        </mask>
        <mask id="uiux-mask-3">
          <path
            d="M 190 50 h -35 q -5 0 -5 -5 v -5"
            strokeWidth="0.5"
            stroke="white"
          />
        </mask>
        <mask id="uiux-mask-4">
          <path
            d="M 15 75 h 30 q 5 0 5 -5 v -25"
            strokeWidth="0.5"
            stroke="white"
          />
        </mask>
        <mask id="uiux-mask-5">
          <path
            d="M 100 90 v -5 q 0 -5 5 -5 h 20"
            strokeWidth="0.5"
            stroke="white"
          />
        </mask>
        <mask id="uiux-mask-6">
          <path
            d="M 170 80 h -15 q -5 0 -5 -5 v -15"
            strokeWidth="0.5"
            stroke="white"
          />
        </mask>

        {/* Gradients */}
        <radialGradient id="uiux-pink-grad" fx="1">
          <stop offset="0%" stopColor="#ec4899" />
          <stop offset="50%" stopColor="#db2777" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <radialGradient id="uiux-blue-grad" fx="1">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="50%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <radialGradient id="uiux-purple-grad" fx="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="50%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <radialGradient id="uiux-green-grad" fx="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="50%" stopColor="#059669" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <radialGradient id="uiux-yellow-grad" fx="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="50%" stopColor="#d97706" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <radialGradient id="uiux-orange-grad" fx="1">
          <stop offset="0%" stopColor="#f97316" />
          <stop offset="50%" stopColor="#ea580c" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>

        {/* Marker */}
        <marker
          id="uiux-circle-marker"
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
        <linearGradient id="uiux-text-gradient" x1="0" y1="0" x2="1" y2="0">
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

export { UiUxDesign };
