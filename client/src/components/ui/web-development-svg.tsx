import { cn } from "@/lib/utils";
import React from "react";

export interface WebDevelopmentSvgProps {
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

const WebDevelopment = ({
  className,
  width = "100%",
  height = "100%",
  text = "WEB",
  showConnections = true,
  animateText = true,
  lineMarkerSize = 18,
  animateLines = true,
  animateMarkers = true,
}: WebDevelopmentSvgProps) => {
  return (
    <svg
      className={cn("text-muted", className)}
      width={width}
      height={height}
      viewBox="0 0 200 100"
    >
      {/* Browser Window */}
      <rect
        x="30"
        y="20"
        width="140"
        height="60"
        rx="4"
        fill="#1a1a1a"
        stroke="currentColor"
        strokeWidth="0.5"
      >
        <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" />
      </rect>
      
      {/* Browser Header */}
      <rect
        x="30"
        y="20"
        width="140"
        height="12"
        rx="4"
        fill="#2a2a2a"
      >
        <animate attributeName="fill" values="#2a2a2a;#3a3a3a;#2a2a2a" dur="4s" repeatCount="indefinite" />
      </rect>
      
      {/* Browser Dots */}
      <circle cx="38" cy="26" r="2" fill="#ff5f56">
        <animate attributeName="r" values="2;2.5;2" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="46" cy="26" r="2" fill="#ffbd2e">
        <animate attributeName="r" values="2;2.5;2" dur="2s" repeatCount="indefinite" begin="0.3s" />
        <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" begin="0.3s" />
      </circle>
      <circle cx="54" cy="26" r="2" fill="#27ca3f">
        <animate attributeName="r" values="2;2.5;2" dur="2s" repeatCount="indefinite" begin="0.6s" />
        <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" begin="0.6s" />
      </circle>
      
      {/* URL Bar */}
      <rect
        x="65"
        y="23"
        width="95"
        height="6"
        rx="3"
        fill="#333"
        stroke="#555"
        strokeWidth="0.3"
      >
        <animate attributeName="fill" values="#333;#444;#333" dur="3s" repeatCount="indefinite" />
      </rect>
      
      {/* Loading Bar in URL */}
      <rect
        x="67"
        y="24.5"
        width="0"
        height="3"
        rx="1.5"
        fill="#4285f4"
      >
        <animate attributeName="width" values="0;90;0" dur="5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0;1;0" dur="5s" repeatCount="indefinite" />
      </rect>
      
      {/* Code Lines with Typing Animation */}
      <g stroke="currentColor" fill="none" strokeWidth="0.4">
        <line x1="40" y1="40" x2="40" y2="40" stroke="#61dafb">
          <animate attributeName="x2" values="40;80;40" dur="4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;1;0" dur="4s" repeatCount="indefinite" />
        </line>
        <line x1="40" y1="45" x2="40" y2="45" stroke="#f7df1e">
          <animate attributeName="x2" values="40;120;40" dur="4s" repeatCount="indefinite" begin="0.5s" />
          <animate attributeName="opacity" values="0;1;0" dur="4s" repeatCount="indefinite" begin="0.5s" />
        </line>
        <line x1="40" y1="50" x2="40" y2="50" stroke="#e34c26">
          <animate attributeName="x2" values="40;90;40" dur="4s" repeatCount="indefinite" begin="1s" />
          <animate attributeName="opacity" values="0;1;0" dur="4s" repeatCount="indefinite" begin="1s" />
        </line>
        <line x1="40" y1="55" x2="40" y2="55" stroke="#1572b6">
          <animate attributeName="x2" values="40;110;40" dur="4s" repeatCount="indefinite" begin="1.5s" />
          <animate attributeName="opacity" values="0;1;0" dur="4s" repeatCount="indefinite" begin="1.5s" />
        </line>
        <line x1="40" y1="60" x2="40" y2="60" stroke="#68217a">
          <animate attributeName="x2" values="40;70;40" dur="4s" repeatCount="indefinite" begin="2s" />
          <animate attributeName="opacity" values="0;1;0" dur="4s" repeatCount="indefinite" begin="2s" />
        </line>
        <line x1="40" y1="65" x2="40" y2="65" stroke="#22c55e">
          <animate attributeName="x2" values="40;100;40" dur="4s" repeatCount="indefinite" begin="2.5s" />
          <animate attributeName="opacity" values="0;1;0" dur="4s" repeatCount="indefinite" begin="2.5s" />
        </line>
      </g>
      
      {/* Cursor Blinking */}
      <rect x="100" y="63" width="1" height="4" fill="white">
        <animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite" />
        <animateTransform
          attributeName="transform"
          type="translate"
          values="0,0; 0,-25; 0,0"
          dur="12s"
          repeatCount="indefinite"
        />
      </rect>
      
      {/* Connection Paths */}
      <g
        stroke="currentColor"
        fill="none"
        strokeWidth="0.3"
        strokeDasharray="100 100"
        pathLength="100"
        markerStart="url(#web-circle-marker)"
      >
        {/* HTML Path */}
        <path
          strokeDasharray="100 100"
          pathLength="100"
          d="M 10 35 h 15 q 5 0 5 5"
        />
        {/* CSS Path */}
        <path
          strokeDasharray="100 100"
          pathLength="100"
          d="M 180 25 h -5 q -5 0 -5 5 v 5"
        />
        {/* JS Path */}
        <path
          strokeDasharray="100 100"
          pathLength="100"
          d="M 190 50 h -15 q -5 0 -5 -5 v -10"
        />
        {/* React Path */}
        <path
          strokeDasharray="100 100"
          pathLength="100"
          d="M 10 65 h 15 q 5 0 5 -5 v -15"
        />
        
        {/* Animation For Path Starting */}
        {animateLines && (
          <animate
            attributeName="stroke-dashoffset"
            from="100"
            to="0"
            dur="1.5s"
            fill="freeze"
            calcMode="spline"
            keySplines="0.25,0.1,0.5,1"
            keyTimes="0; 1"
          />
        )}
      </g>

      {/* Animated Lights */}
      {/* HTML Light */}
      <g mask="url(#web-mask-1)">
        <circle
          className="web-development web-line-1"
          cx="0"
          cy="0"
          r="8"
          fill="url(#web-orange-grad)"
        />
      </g>
      {/* CSS Light */}
      <g mask="url(#web-mask-2)">
        <circle
          className="web-development web-line-2"
          cx="0"
          cy="0"
          r="8"
          fill="url(#web-blue-grad)"
        />
      </g>
      {/* JS Light */}
      <g mask="url(#web-mask-3)">
        <circle
          className="web-development web-line-3"
          cx="0"
          cy="0"
          r="8"
          fill="url(#web-yellow-grad)"
        />
      </g>
      {/* React Light */}
      <g mask="url(#web-mask-4)">
        <circle
          className="web-development web-line-4"
          cx="0"
          cy="0"
          r="8"
          fill="url(#web-cyan-grad)"
        />
      </g>

      {/* Central Text */}
      <text
        x="100"
        y="52"
        fontSize="8"
        fill={animateText ? "url(#web-text-gradient)" : "white"}
        fontWeight="600"
        letterSpacing="0.05em"
        textAnchor="middle"
      >
        {text}
      </text>

      {/* Definitions */}
      <defs>
        {/* Masks */}
        <mask id="web-mask-1">
          <path
            d="M 10 35 h 15 q 5 0 5 5"
            strokeWidth="0.5"
            stroke="white"
          />
        </mask>
        <mask id="web-mask-2">
          <path
            d="M 180 25 h -5 q -5 0 -5 5 v 5"
            strokeWidth="0.5"
            stroke="white"
          />
        </mask>
        <mask id="web-mask-3">
          <path
            d="M 190 50 h -15 q -5 0 -5 -5 v -10"
            strokeWidth="0.5"
            stroke="white"
          />
        </mask>
        <mask id="web-mask-4">
          <path
            d="M 10 65 h 15 q 5 0 5 -5 v -15"
            strokeWidth="0.5"
            stroke="white"
          />
        </mask>

        {/* Gradients */}
        <radialGradient id="web-orange-grad" fx="1">
          <stop offset="0%" stopColor="#e34c26" />
          <stop offset="50%" stopColor="#ff6b35" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <radialGradient id="web-blue-grad" fx="1">
          <stop offset="0%" stopColor="#1572b6" />
          <stop offset="50%" stopColor="#2196f3" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <radialGradient id="web-yellow-grad" fx="1">
          <stop offset="0%" stopColor="#f7df1e" />
          <stop offset="50%" stopColor="#ffeb3b" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <radialGradient id="web-cyan-grad" fx="1">
          <stop offset="0%" stopColor="#61dafb" />
          <stop offset="50%" stopColor="#00bcd4" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>

        {/* Marker */}
        <marker
          id="web-circle-marker"
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
        <linearGradient id="web-text-gradient" x1="0" y1="0" x2="1" y2="0">
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

export { WebDevelopment };
