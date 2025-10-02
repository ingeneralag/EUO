export interface ProjectData {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  category: "web" | "mobile" | "ecommerce";
  technologies: string[];
  features: string[];
  challenges: string[];
  solutions: string[];
  results: {
    metric: string;
    value: string;
    description: string;
  }[];
  gallery: string[];
  client: {
    name: string;
    industry: string;
    location: string;
  };
  timeline: {
    start: string;
    end: string;
    duration: string;
  };
  team: string[];
  testimonial?: {
    quote: string;
    author: string;
    position: string;
  };
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export const projectsData: ProjectData[] = [
  {
    id: "ecommerce-platform-italy",
    title: "E-commerce Platform for Italian Fashion Brand",
    description: "Modern e-commerce solution with advanced inventory management and multi-language support for a luxury Italian fashion brand.",
    longDescription: "We developed a comprehensive e-commerce platform for a prestigious Italian fashion brand, featuring advanced inventory management, real-time analytics, and seamless multi-language support. The platform handles high-volume transactions and provides an exceptional user experience across all devices.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2340&auto=format&fit=crop",
    category: "ecommerce",
    technologies: ["Next.js", "TypeScript", "Stripe", "PostgreSQL", "Redis", "AWS"],
    features: [
      "Multi-language support (Italian, English, Spanish)",
      "Advanced inventory management system",
      "Real-time analytics dashboard",
      "Secure payment processing with Stripe",
      "Mobile-first responsive design",
      "SEO optimization for European markets",
      "Admin panel for content management",
      "Customer reviews and ratings system"
    ],
    challenges: [
      "Complex inventory management across multiple warehouses",
      "High-performance requirements for peak shopping seasons",
      "Multi-currency and tax calculations for EU markets",
      "Integration with existing ERP systems"
    ],
    solutions: [
      "Implemented microservices architecture for scalability",
      "Used Redis for caching and session management",
      "Built custom inventory sync with real-time updates",
      "Integrated with EU tax calculation APIs"
    ],
    results: [
      {
        metric: "Sales Increase",
        value: "340%",
        description: "Increase in online sales within 6 months"
      },
      {
        metric: "Page Load Speed",
        value: "1.2s",
        description: "Average page load time improvement"
      },
      {
        metric: "Conversion Rate",
        value: "4.8%",
        description: "Improved conversion rate from visitors to customers"
      },
      {
        metric: "Mobile Traffic",
        value: "78%",
        description: "Percentage of traffic from mobile devices"
      }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2340&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2340&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2340&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=2340&auto=format&fit=crop"
    ],
    client: {
      name: "Milano Fashion House",
      industry: "Fashion & Luxury Goods",
      location: "Milan, Italy"
    },
    timeline: {
      start: "2024-01-15",
      end: "2024-06-30",
      duration: "5.5 months"
    },
    team: ["Frontend Developer", "Backend Developer", "UI/UX Designer", "Project Manager"],
    testimonial: {
      quote: "Sitovia transformed our online presence completely. The new platform not only looks stunning but also performs exceptionally well. Our sales have tripled since the launch!",
      author: "Marco Rossi",
      position: "CEO, Milano Fashion House"
    },
    liveUrl: "https://example-fashion.com",
    featured: true
  },
  {
    id: "restaurant-management-spain",
    title: "Restaurant Chain Management System",
    description: "Comprehensive management system for a Spanish restaurant chain with POS integration and real-time analytics.",
    longDescription: "A complete restaurant management solution built for a growing Spanish restaurant chain. The system includes POS integration, inventory management, staff scheduling, and comprehensive analytics to help optimize operations across multiple locations.",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2340&auto=format&fit=crop",
    category: "web",
    technologies: ["React", "Node.js", "MongoDB", "Socket.io", "Express", "Docker"],
    features: [
      "Multi-location management dashboard",
      "Real-time POS integration",
      "Inventory tracking and alerts",
      "Staff scheduling and payroll",
      "Customer loyalty program",
      "Analytics and reporting",
      "Mobile app for managers",
      "Online reservation system"
    ],
    challenges: [
      "Real-time synchronization across multiple locations",
      "Integration with existing POS systems",
      "Complex inventory management with perishable items",
      "Staff scheduling optimization"
    ],
    solutions: [
      "Implemented WebSocket connections for real-time updates",
      "Built custom API adapters for POS integration",
      "Created smart inventory alerts with expiration tracking",
      "Developed AI-powered scheduling optimization"
    ],
    results: [
      {
        metric: "Operational Efficiency",
        value: "45%",
        description: "Improvement in overall operational efficiency"
      },
      {
        metric: "Food Waste Reduction",
        value: "30%",
        description: "Reduction in food waste through better inventory management"
      },
      {
        metric: "Staff Productivity",
        value: "25%",
        description: "Increase in staff productivity"
      },
      {
        metric: "Customer Satisfaction",
        value: "4.9/5",
        description: "Average customer satisfaction rating"
      }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2340&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2340&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?q=80&w=2340&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=2340&auto=format&fit=crop"
    ],
    client: {
      name: "Sabor Español Restaurants",
      industry: "Food & Beverage",
      location: "Madrid, Spain"
    },
    timeline: {
      start: "2024-03-01",
      end: "2024-08-15",
      duration: "5.5 months"
    },
    team: ["Full-Stack Developer", "Mobile Developer", "UI/UX Designer", "DevOps Engineer"],
    testimonial: {
      quote: "The management system has revolutionized how we operate our restaurants. We can now manage all locations efficiently from a single dashboard, and our staff loves the intuitive interface.",
      author: "Carmen García",
      position: "Operations Director, Sabor Español"
    },
    featured: false
  },
  {
    id: "fintech-mobile-app-austria",
    title: "FinTech Mobile Banking App",
    description: "Secure mobile banking application for an Austrian fintech startup with advanced security features and intuitive UX.",
    longDescription: "A cutting-edge mobile banking application developed for an innovative Austrian fintech startup. The app features bank-level security, biometric authentication, real-time transactions, and a user-friendly interface that makes banking accessible to all age groups.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2340&auto=format&fit=crop",
    category: "mobile",
    technologies: ["React Native", "TypeScript", "Node.js", "PostgreSQL", "AWS", "Blockchain"],
    features: [
      "Biometric authentication (Face ID, Fingerprint)",
      "Real-time transaction processing",
      "Multi-currency support",
      "Investment portfolio management",
      "Budgeting and expense tracking",
      "P2P money transfers",
      "Card management and controls",
      "24/7 customer support chat"
    ],
    challenges: [
      "Implementing bank-level security standards",
      "Real-time transaction processing",
      "Regulatory compliance with EU banking laws",
      "Cross-platform performance optimization"
    ],
    solutions: [
      "Implemented end-to-end encryption and tokenization",
      "Built microservices architecture for scalability",
      "Integrated with regulatory compliance APIs",
      "Optimized React Native performance with native modules"
    ],
    results: [
      {
        metric: "User Adoption",
        value: "50K+",
        description: "Active users within first 3 months"
      },
      {
        metric: "App Store Rating",
        value: "4.8/5",
        description: "Average rating across iOS and Android"
      },
      {
        metric: "Transaction Volume",
        value: "€10M+",
        description: "Monthly transaction volume processed"
      },
      {
        metric: "Security Score",
        value: "100%",
        description: "Compliance with EU banking security standards"
      }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2340&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2340&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=2340&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2340&auto=format&fit=crop"
    ],
    client: {
      name: "AlpenBank Digital",
      industry: "Financial Technology",
      location: "Vienna, Austria"
    },
    timeline: {
      start: "2023-09-01",
      end: "2024-02-28",
      duration: "6 months"
    },
    team: ["Mobile Developer", "Backend Developer", "Security Specialist", "UI/UX Designer"],
    testimonial: {
      quote: "Sitovia delivered an exceptional mobile banking app that exceeded our expectations. The security features are top-notch, and our users love the intuitive interface.",
      author: "Klaus Weber",
      position: "CTO, AlpenBank Digital"
    },
    liveUrl: "https://apps.apple.com/app/alpenbank",
    featured: true
  },
  {
    id: "healthcare-platform-australia",
    title: "Telemedicine Platform for Australian Clinics",
    description: "Comprehensive telemedicine platform connecting patients with healthcare providers across Australia.",
    longDescription: "A comprehensive telemedicine platform designed to connect patients with healthcare providers across Australia. The platform includes video consultations, prescription management, appointment scheduling, and secure medical record storage, all compliant with Australian healthcare regulations.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?q=80&w=2340&auto=format&fit=crop",
    category: "web",
    technologies: ["Next.js", "TypeScript", "WebRTC", "PostgreSQL", "AWS", "Stripe"],
    features: [
      "HD video consultations with WebRTC",
      "Secure medical record storage",
      "Prescription management system",
      "Appointment scheduling and reminders",
      "Insurance claim integration",
      "Multi-provider network support",
      "Mobile-responsive design",
      "HIPAA-compliant security"
    ],
    challenges: [
      "Ensuring HIPAA compliance and data security",
      "High-quality video streaming across Australia",
      "Integration with existing healthcare systems",
      "Managing complex appointment scheduling"
    ],
    solutions: [
      "Implemented end-to-end encryption for all communications",
      "Used CDN and edge computing for video optimization",
      "Built custom APIs for healthcare system integration",
      "Developed intelligent scheduling algorithm"
    ],
    results: [
      {
        metric: "Patient Satisfaction",
        value: "96%",
        description: "Patient satisfaction rate with video consultations"
      },
      {
        metric: "Consultation Time",
        value: "15min",
        description: "Average consultation time reduction"
      },
      {
        metric: "Provider Network",
        value: "500+",
        description: "Healthcare providers on the platform"
      },
      {
        metric: "Monthly Consultations",
        value: "10K+",
        description: "Video consultations conducted monthly"
      }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?q=80&w=2340&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=2340&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?q=80&w=2340&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2340&auto=format&fit=crop"
    ],
    client: {
      name: "MediConnect Australia",
      industry: "Healthcare Technology",
      location: "Sydney, Australia"
    },
    timeline: {
      start: "2024-02-01",
      end: "2024-07-31",
      duration: "6 months"
    },
    team: ["Full-Stack Developer", "WebRTC Specialist", "Security Engineer", "Healthcare Consultant"],
    testimonial: {
      quote: "The telemedicine platform has transformed how we deliver healthcare services. Our patients love the convenience, and we've been able to reach more people than ever before.",
      author: "Dr. Sarah Mitchell",
      position: "Medical Director, MediConnect Australia"
    },
    featured: false
  },
  {
    id: "logistics-tracking-usa",
    title: "Smart Logistics Tracking System",
    description: "AI-powered logistics and supply chain management system for a US-based shipping company.",
    longDescription: "An intelligent logistics and supply chain management system built for a major US shipping company. The platform uses AI and machine learning to optimize routes, predict delivery times, and provide real-time tracking for customers and businesses.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2340&auto=format&fit=crop",
    category: "web",
    technologies: ["React", "Python", "TensorFlow", "PostgreSQL", "Docker", "Kubernetes"],
    features: [
      "Real-time package tracking",
      "AI-powered route optimization",
      "Predictive delivery analytics",
      "Customer notification system",
      "Fleet management dashboard",
      "Warehouse inventory integration",
      "Mobile driver app",
      "API for third-party integrations"
    ],
    challenges: [
      "Processing millions of tracking events daily",
      "Complex route optimization algorithms",
      "Real-time data synchronization across systems",
      "Scalability for peak shipping seasons"
    ],
    solutions: [
      "Implemented event-driven microservices architecture",
      "Used machine learning for route optimization",
      "Built real-time data pipeline with Apache Kafka",
      "Deployed on Kubernetes for auto-scaling"
    ],
    results: [
      {
        metric: "Delivery Efficiency",
        value: "35%",
        description: "Improvement in delivery time accuracy"
      },
      {
        metric: "Fuel Savings",
        value: "22%",
        description: "Reduction in fuel costs through route optimization"
      },
      {
        metric: "Customer Satisfaction",
        value: "4.7/5",
        description: "Average customer satisfaction rating"
      },
      {
        metric: "System Uptime",
        value: "99.9%",
        description: "Platform availability and reliability"
      }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2340&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?q=80&w=2340&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=2340&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?q=80&w=2340&auto=format&fit=crop"
    ],
    client: {
      name: "FastTrack Logistics",
      industry: "Logistics & Transportation",
      location: "New York, USA"
    },
    timeline: {
      start: "2023-11-01",
      end: "2024-05-15",
      duration: "6.5 months"
    },
    team: ["Full-Stack Developer", "AI/ML Engineer", "DevOps Engineer", "Data Scientist"],
    testimonial: {
      quote: "The AI-powered logistics system has revolutionized our operations. We've seen significant improvements in efficiency and our customers are happier than ever with accurate delivery predictions.",
      author: "Michael Johnson",
      position: "VP of Operations, FastTrack Logistics"
    },
    featured: false
  },
  {
    id: "real-estate-platform-dubai",
    title: "Luxury Real Estate Platform",
    description: "Premium real estate platform for Dubai's luxury property market with VR tours and advanced search.",
    longDescription: "A sophisticated real estate platform designed specifically for Dubai's luxury property market. The platform features virtual reality property tours, advanced search and filtering, investment analytics, and seamless integration with property management systems.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2340&auto=format&fit=crop",
    category: "web",
    technologies: ["Next.js", "TypeScript", "Three.js", "MongoDB", "AWS", "WebRTC"],
    features: [
      "360° VR property tours",
      "Advanced property search and filtering",
      "Investment ROI calculator",
      "Multi-language support (Arabic, English)",
      "Property comparison tools",
      "Mortgage calculator integration",
      "Agent booking system",
      "Market analytics dashboard"
    ],
    challenges: [
      "High-resolution VR content delivery",
      "Complex property search algorithms",
      "Multi-currency and legal compliance",
      "Performance optimization for mobile devices"
    ],
    solutions: [
      "Implemented progressive loading for VR content",
      "Built Elasticsearch-powered search engine",
      "Integrated with UAE property regulation APIs",
      "Optimized 3D rendering for mobile browsers"
    ],
    results: [
      {
        metric: "User Engagement",
        value: "85%",
        description: "Increase in time spent on property listings"
      },
      {
        metric: "Lead Generation",
        value: "120%",
        description: "Improvement in qualified leads for agents"
      },
      {
        metric: "VR Tour Usage",
        value: "70%",
        description: "Of users engage with VR property tours"
      },
      {
        metric: "Mobile Traffic",
        value: "65%",
        description: "Percentage of traffic from mobile devices"
      }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2340&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2340&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=2340&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2340&auto=format&fit=crop"
    ],
    client: {
      name: "Emirates Luxury Properties",
      industry: "Real Estate",
      location: "Dubai, UAE"
    },
    timeline: {
      start: "2024-04-01",
      end: "2024-09-30",
      duration: "6 months"
    },
    team: ["Frontend Developer", "3D/VR Developer", "Backend Developer", "UI/UX Designer"],
    testimonial: {
      quote: "The VR property tours have completely changed how we showcase luxury properties. Our clients can now experience properties remotely, which has significantly increased our international sales.",
      author: "Ahmed Al-Rashid",
      position: "CEO, Emirates Luxury Properties"
    },
    liveUrl: "https://example-realestate.ae",
    featured: true
  }
];

// Helper function to get project by ID
export function getProjectById(id: string): ProjectData | undefined {
  return projectsData.find(project => project.id === id);
}

// Helper function to get related projects
export function getRelatedProjects(currentId: string, category?: string, limit: number = 3): ProjectData[] {
  return projectsData
    .filter(project => 
      project.id !== currentId && 
      (category ? project.category === category : true)
    )
    .slice(0, limit);
}

// Helper function to get featured projects
export function getFeaturedProjects(limit: number = 3): ProjectData[] {
  return projectsData.filter(project => project.featured).slice(0, limit);
}
