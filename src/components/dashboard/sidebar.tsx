"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  Briefcase, 
  FileText, 
  MessageSquare, 
  Users, 
  Settings, 
  BarChart3,
  Globe,
  LogOut,
  ChevronLeft,
  ChevronRight,
  UserCog,
  Building2,
  FormInput
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

const sidebarSections = [
  {
    title: "Main",
    items: [
      {
        title: "Overview",
        href: "/en/dashboard",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    title: "Client Management",
    items: [
      {
        title: "Agents",
        href: "/en/dashboard/agents",
        icon: UserCog,
      },
      {
        title: "Clients",
        href: "/en/dashboard/clients",
        icon: Building2,
      },
    ],
  },
  {
    title: "Content",
    items: [
      {
        title: "Projects",
        href: "/en/dashboard/projects",
        icon: Briefcase,
      },
      {
        title: "Blog Posts",
        href: "/en/dashboard/blog",
        icon: FileText,
      },
      {
        title: "Testimonials",
        href: "/en/dashboard/testimonials",
        icon: MessageSquare,
      },
    ],
  },
  {
    title: "Configuration",
    items: [
      {
        title: "Analytics",
        href: "/en/dashboard/analytics",
        icon: BarChart3,
      },
      {
        title: "Brief Form",
        href: "/en/dashboard/settings/brief-form",
        icon: FormInput,
      },
      {
        title: "Settings",
        href: "/en/dashboard/settings",
        icon: Settings,
      },
    ],
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <motion.div
      initial={{ width: 280 }}
      animate={{ width: isCollapsed ? 80 : 280 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="bg-card border-r border-border flex flex-col h-screen sticky top-0"
    >
      {/* Logo & Toggle */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: isCollapsed ? 0 : 1 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-2"
            >
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Globe className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-lg">Sitovia</span>
            </motion.div>
          )}
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="h-8 w-8"
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-6 overflow-y-auto">
        {sidebarSections.map((section, sectionIndex) => (
          <div key={section.title}>
            {!isCollapsed && (
              <motion.h3
                initial={{ opacity: 1 }}
                animate={{ opacity: isCollapsed ? 0 : 1 }}
                transition={{ duration: 0.2 }}
                className="px-3 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider"
              >
                {section.title}
              </motion.h3>
            )}
            
            <div className="space-y-1">
              {section.items.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                const Icon = item.icon;

                return (
                  <Link key={item.href} href={item.href}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
                        isActive
                          ? "bg-primary text-primary-foreground shadow-md"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      )}
                    >
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      {!isCollapsed && (
                        <motion.span
                          initial={{ opacity: 1 }}
                          animate={{ opacity: isCollapsed ? 0 : 1 }}
                          transition={{ duration: 0.2 }}
                          className="font-medium"
                        >
                          {item.title}
                        </motion.span>
                      )}
                    </motion.div>
                  </Link>
                );
              })}
            </div>
            
            {sectionIndex < sidebarSections.length - 1 && !isCollapsed && (
              <div className="mt-4 border-t border-border" />
            )}
          </div>
        ))}
      </nav>

      {/* Footer Actions */}
      <div className="p-4 border-t border-border space-y-2">
        <Link href="/en">
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start gap-3",
              isCollapsed && "justify-center"
            )}
          >
            <Globe className="w-5 h-5" />
            {!isCollapsed && "View Website"}
          </Button>
        </Link>
        
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start gap-3 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950",
            isCollapsed && "justify-center"
          )}
        >
          <LogOut className="w-5 h-5" />
          {!isCollapsed && "Logout"}
        </Button>
      </div>
    </motion.div>
  );
}
