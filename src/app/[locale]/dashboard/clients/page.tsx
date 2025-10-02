"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Users,
  Plus,
  Search,
  Mail,
  Building2,
  Calendar,
  FileText,
  Eye,
  Edit,
  Filter,
} from "lucide-react";
import Link from "next/link";

// Mock data for clients
const mockClients = [
  {
    id: "1",
    name: "Milano Fashion House",
    company: "Fashion Retail",
    email: "contact@milanofashion.it",
    phone: "+39 02 1234 5678",
    country: "Italy",
    agentId: "1",
    agentName: "Marco Rossi",
    briefsCount: 3,
    activeBriefs: 1,
    status: "active",
    addedDate: "2024-03-15",
  },
  {
    id: "2",
    name: "Sabor Español Restaurants",
    company: "Food & Beverage",
    email: "info@saborespanol.es",
    phone: "+34 91 234 5678",
    country: "Spain",
    agentId: "2",
    agentName: "Carmen García",
    briefsCount: 2,
    activeBriefs: 1,
    status: "active",
    addedDate: "2024-03-10",
  },
  {
    id: "3",
    name: "AlpenBank Digital",
    company: "Financial Technology",
    email: "contact@alpenbank.at",
    phone: "+43 1 234 5678",
    country: "Austria",
    agentId: "3",
    agentName: "Klaus Weber",
    briefsCount: 4,
    activeBriefs: 2,
    status: "active",
    addedDate: "2024-02-28",
  },
];

export default function ClientsPage() {
  const [clients, setClients] = useState(mockClients);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterAgent, setFilterAgent] = useState("all");

  // Note: In real app, this would check user role and filter by agentId
  const currentUserRole = "admin"; // or "agent"
  const currentAgentId = "1"; // if user is agent

  const filteredClients = clients.filter(client => {
    const matchesSearch = 
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesAgent = filterAgent === "all" || client.agentId === filterAgent;
    
    // If user is agent, only show their clients
    const matchesRole = currentUserRole === "admin" || client.agentId === currentAgentId;
    
    return matchesSearch && matchesAgent && matchesRole;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Clients Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage your clients and their project briefs
          </p>
        </div>
        <Link href="/dashboard/clients/add">
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Add Client
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-xl border border-border bg-card"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-blue-500/10">
              <Users className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{filteredClients.length}</p>
              <p className="text-sm text-muted-foreground">Total Clients</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 rounded-xl border border-border bg-card"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-green-500/10">
              <FileText className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">
                {filteredClients.reduce((sum, c) => sum + c.briefsCount, 0)}
              </p>
              <p className="text-sm text-muted-foreground">Total Briefs</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 rounded-xl border border-border bg-card"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-orange-500/10">
              <Calendar className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">
                {filteredClients.reduce((sum, c) => sum + c.activeBriefs, 0)}
              </p>
              <p className="text-sm text-muted-foreground">Active Briefs</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-6 rounded-xl border border-border bg-card"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-purple-500/10">
              <Building2 className="w-6 h-6 text-purple-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">
                {new Set(filteredClients.map(c => c.company)).size}
              </p>
              <p className="text-sm text-muted-foreground">Industries</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search clients by name, company, or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        {currentUserRole === "admin" && (
          <div className="flex gap-2">
            <Button
              variant={filterAgent === "all" ? "default" : "outline"}
              onClick={() => setFilterAgent("all")}
              className="gap-2"
            >
              <Filter className="w-4 h-4" />
              All Agents
            </Button>
          </div>
        )}
      </div>

      {/* Clients Table */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-4 font-semibold">Client</th>
                <th className="text-left p-4 font-semibold">Company</th>
                <th className="text-left p-4 font-semibold">Contact</th>
                {currentUserRole === "admin" && (
                  <th className="text-left p-4 font-semibold">Agent</th>
                )}
                <th className="text-left p-4 font-semibold">Briefs</th>
                <th className="text-left p-4 font-semibold">Status</th>
                <th className="text-left p-4 font-semibold">Added</th>
                <th className="text-left p-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.map((client, index) => (
                <motion.tr
                  key={client.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-t border-border hover:bg-muted/50 transition-colors"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-sm font-bold text-primary">
                          {client.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{client.name}</p>
                        <p className="text-sm text-muted-foreground">{client.country}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="text-sm text-foreground">{client.company}</p>
                  </td>
                  <td className="p-4">
                    <div className="space-y-1">
                      <p className="text-sm text-foreground flex items-center gap-2">
                        <Mail className="w-3 h-3" />
                        {client.email}
                      </p>
                    </div>
                  </td>
                  {currentUserRole === "admin" && (
                    <td className="p-4">
                      <Badge variant="outline">{client.agentName}</Badge>
                    </td>
                  )}
                  <td className="p-4">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-foreground">{client.briefsCount} Total</p>
                      <p className="text-xs text-muted-foreground">{client.activeBriefs} Active</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <Badge variant={client.status === "active" ? "default" : "secondary"}>
                      {client.status}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <p className="text-sm text-muted-foreground">
                      {new Date(client.addedDate).toLocaleDateString()}
                    </p>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <Link href={`/dashboard/clients/${client.id}`}>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Link href={`/dashboard/clients/${client.id}/edit`}>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </Link>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredClients.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No clients found</h3>
          <p className="text-muted-foreground mb-4">
            {searchQuery ? "Try adjusting your search" : "Get started by adding your first client"}
          </p>
          <Link href="/dashboard/clients/add">
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Add Client
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
