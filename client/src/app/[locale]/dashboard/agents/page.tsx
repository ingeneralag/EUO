"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Users,
  Plus,
  Search,
  Mail,
  MapPin,
  Phone,
  Building2,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
} from "lucide-react";

// Mock data for agents
const mockAgents = [
  {
    id: "1",
    name: "Marco Rossi",
    email: "marco.rossi@sitovia.com",
    phone: "+39 06 1234 5678",
    country: "Italy",
    city: "Rome",
    clientsCount: 12,
    activeBriefs: 5,
    status: "active",
    joinedDate: "2024-01-15",
  },
  {
    id: "2",
    name: "Carmen García",
    email: "carmen.garcia@sitovia.com",
    phone: "+34 91 123 4567",
    country: "Spain",
    city: "Madrid",
    clientsCount: 8,
    activeBriefs: 3,
    status: "active",
    joinedDate: "2024-02-20",
  },
  {
    id: "3",
    name: "Klaus Weber",
    email: "klaus.weber@sitovia.com",
    phone: "+43 1 123 4567",
    country: "Austria",
    city: "Vienna",
    clientsCount: 10,
    activeBriefs: 4,
    status: "active",
    joinedDate: "2024-01-10",
  },
];

export default function AgentsPage() {
  const [agents, setAgents] = useState(mockAgents);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<typeof mockAgents[0] | null>(null);
  const [newAgent, setNewAgent] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    city: "",
  });

  const filteredAgents = agents.filter(agent =>
    agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    agent.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    agent.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddAgent = () => {
    if (newAgent.name && newAgent.email) {
      const agent = {
        id: String(agents.length + 1),
        ...newAgent,
        clientsCount: 0,
        activeBriefs: 0,
        status: "active" as const,
        joinedDate: new Date().toISOString().split('T')[0],
      };
      setAgents([...agents, agent]);
      setNewAgent({ name: "", email: "", phone: "", country: "", city: "" });
      setShowAddModal(false);
      
      // Show success message
      const successMsg = document.createElement('div');
      successMsg.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
      successMsg.textContent = 'Agent added successfully!';
      document.body.appendChild(successMsg);
      setTimeout(() => successMsg.remove(), 3000);
    }
  };

  const handleEditAgent = (agent: typeof mockAgents[0]) => {
    setSelectedAgent(agent);
    setNewAgent({
      name: agent.name,
      email: agent.email,
      phone: agent.phone,
      country: agent.country,
      city: agent.city,
    });
    setShowEditModal(true);
  };

  const handleUpdateAgent = () => {
    if (selectedAgent && newAgent.name && newAgent.email) {
      setAgents(agents.map(agent => 
        agent.id === selectedAgent.id 
          ? { ...agent, ...newAgent }
          : agent
      ));
      setNewAgent({ name: "", email: "", phone: "", country: "", city: "" });
      setSelectedAgent(null);
      setShowEditModal(false);
      
      // Show success message
      const successMsg = document.createElement('div');
      successMsg.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
      successMsg.textContent = 'Agent updated successfully!';
      document.body.appendChild(successMsg);
      setTimeout(() => successMsg.remove(), 3000);
    }
  };

  const handleDeleteAgent = (agent: typeof mockAgents[0]) => {
    setSelectedAgent(agent);
    setShowDeleteModal(true);
  };

  const confirmDeleteAgent = () => {
    if (selectedAgent) {
      setAgents(agents.filter(agent => agent.id !== selectedAgent.id));
      setSelectedAgent(null);
      setShowDeleteModal(false);
      
      // Show success message
      const successMsg = document.createElement('div');
      successMsg.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
      successMsg.textContent = 'Agent deleted successfully!';
      document.body.appendChild(successMsg);
      setTimeout(() => successMsg.remove(), 3000);
    }
  };

  const handleViewDetails = (agent: typeof mockAgents[0]) => {
    setSelectedAgent(agent);
    setShowDetailsModal(true);
  };

  const resetModals = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setShowDeleteModal(false);
    setShowDetailsModal(false);
    setSelectedAgent(null);
    setNewAgent({ name: "", email: "", phone: "", country: "", city: "" });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Agents Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage your agents and their access to the system
          </p>
        </div>
        <Button onClick={() => setShowAddModal(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Agent
        </Button>
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
              <p className="text-2xl font-bold">{agents.length}</p>
              <p className="text-sm text-muted-foreground">Total Agents</p>
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
              <CheckCircle className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">
                {agents.filter(a => a.status === "active").length}
              </p>
              <p className="text-sm text-muted-foreground">Active Agents</p>
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
            <div className="p-3 rounded-lg bg-purple-500/10">
              <Building2 className="w-6 h-6 text-purple-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">
                {agents.reduce((sum, a) => sum + a.clientsCount, 0)}
              </p>
              <p className="text-sm text-muted-foreground">Total Clients</p>
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
            <div className="p-3 rounded-lg bg-orange-500/10">
              <Mail className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">
                {agents.reduce((sum, a) => sum + a.activeBriefs, 0)}
              </p>
              <p className="text-sm text-muted-foreground">Active Briefs</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search agents by name, email, or country..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Agents List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAgents.map((agent, index) => (
          <motion.div
            key={agent.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-all"
          >
            {/* Agent Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-lg font-bold text-primary">
                    {agent.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{agent.name}</h3>
                  <Badge variant={agent.status === "active" ? "default" : "secondary"} className="mt-1">
                    {agent.status}
                  </Badge>
                </div>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8"
                  onClick={() => handleEditAgent(agent)}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 text-destructive"
                  onClick={() => handleDeleteAgent(agent)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Agent Details */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4" />
                {agent.email}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4" />
                {agent.phone}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                {agent.city}, {agent.country}
              </div>
            </div>

            {/* Agent Stats */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
              <div>
                <p className="text-2xl font-bold text-foreground">{agent.clientsCount}</p>
                <p className="text-xs text-muted-foreground">Clients</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{agent.activeBriefs}</p>
                <p className="text-xs text-muted-foreground">Active Briefs</p>
              </div>
            </div>

            {/* View Details Button */}
            <Button 
              variant="outline" 
              className="w-full mt-4 gap-2"
              onClick={() => handleViewDetails(agent)}
            >
              <Eye className="w-4 h-4" />
              View Details
            </Button>
          </motion.div>
        ))}
      </div>

      {/* Add Agent Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card rounded-xl border border-border p-6 max-w-md w-full"
          >
            <h2 className="text-2xl font-bold mb-4">Add New Agent</h2>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={newAgent.name}
                  onChange={(e) => setNewAgent({ ...newAgent, name: e.target.value })}
                  placeholder="John Doe"
                />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newAgent.email}
                  onChange={(e) => setNewAgent({ ...newAgent, email: e.target.value })}
                  placeholder="john@sitovia.com"
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={newAgent.phone}
                  onChange={(e) => setNewAgent({ ...newAgent, phone: e.target.value })}
                  placeholder="+39 06 1234 5678"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    value={newAgent.country}
                    onChange={(e) => setNewAgent({ ...newAgent, country: e.target.value })}
                    placeholder="Italy"
                  />
                </div>
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={newAgent.city}
                    onChange={(e) => setNewAgent({ ...newAgent, city: e.target.value })}
                    placeholder="Rome"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button onClick={handleAddAgent} className="flex-1">
                Add Agent
              </Button>
              <Button
                variant="outline"
                onClick={resetModals}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Edit Agent Modal */}
      {showEditModal && selectedAgent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card rounded-xl border border-border p-6 max-w-md w-full"
          >
            <h2 className="text-2xl font-bold mb-4">Edit Agent</h2>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-name">Full Name</Label>
                <Input
                  id="edit-name"
                  value={newAgent.name}
                  onChange={(e) => setNewAgent({ ...newAgent, name: e.target.value })}
                  placeholder="John Doe"
                />
              </div>

              <div>
                <Label htmlFor="edit-email">Email</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={newAgent.email}
                  onChange={(e) => setNewAgent({ ...newAgent, email: e.target.value })}
                  placeholder="john@sitovia.com"
                />
              </div>

              <div>
                <Label htmlFor="edit-phone">Phone</Label>
                <Input
                  id="edit-phone"
                  value={newAgent.phone}
                  onChange={(e) => setNewAgent({ ...newAgent, phone: e.target.value })}
                  placeholder="+39 06 1234 5678"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-country">Country</Label>
                  <Input
                    id="edit-country"
                    value={newAgent.country}
                    onChange={(e) => setNewAgent({ ...newAgent, country: e.target.value })}
                    placeholder="Italy"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-city">City</Label>
                  <Input
                    id="edit-city"
                    value={newAgent.city}
                    onChange={(e) => setNewAgent({ ...newAgent, city: e.target.value })}
                    placeholder="Rome"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button onClick={handleUpdateAgent} className="flex-1">
                Update Agent
              </Button>
              <Button variant="outline" onClick={resetModals} className="flex-1">
                Cancel
              </Button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedAgent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card rounded-xl border border-border p-6 max-w-md w-full"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-full bg-red-500/10">
                <Trash2 className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Delete Agent</h2>
                <p className="text-sm text-muted-foreground">This action cannot be undone</p>
              </div>
            </div>
            
            <p className="text-muted-foreground mb-6">
              Are you sure you want to delete <strong>{selectedAgent.name}</strong>? 
              This will remove the agent and all associated data.
            </p>

            <div className="flex gap-3">
              <Button 
                variant="destructive" 
                onClick={confirmDeleteAgent} 
                className="flex-1"
              >
                Delete Agent
              </Button>
              <Button variant="outline" onClick={resetModals} className="flex-1">
                Cancel
              </Button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Agent Details Modal */}
      {showDetailsModal && selectedAgent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card rounded-xl border border-border p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Agent Details</h2>
              <Button variant="ghost" size="icon" onClick={resetModals}>
                ✕
              </Button>
            </div>
            
            {/* Agent Profile */}
            <div className="flex items-center gap-4 mb-6 p-4 rounded-lg bg-muted/30">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">
                  {selectedAgent.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <h3 className="text-xl font-semibold">{selectedAgent.name}</h3>
                <Badge variant={selectedAgent.status === "active" ? "default" : "secondary"} className="mt-1">
                  {selectedAgent.status}
                </Badge>
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">Contact Information</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">{selectedAgent.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="font-medium">{selectedAgent.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="font-medium">{selectedAgent.city}, {selectedAgent.country}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-lg">Statistics</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-blue-500/10">
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-blue-500" />
                      <span className="text-sm">Total Clients</span>
                    </div>
                    <span className="text-xl font-bold text-blue-500">{selectedAgent.clientsCount}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-orange-500/10">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-orange-500" />
                      <span className="text-sm">Active Briefs</span>
                    </div>
                    <span className="text-xl font-bold text-orange-500">{selectedAgent.activeBriefs}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-green-500/10">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-sm">Joined Date</span>
                    </div>
                    <span className="text-sm font-medium text-green-500">
                      {new Date(selectedAgent.joinedDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t">
              <Button 
                onClick={() => {
                  resetModals();
                  handleEditAgent(selectedAgent);
                }} 
                className="flex-1 gap-2"
              >
                <Edit className="w-4 h-4" />
                Edit Agent
              </Button>
              <Button 
                variant="outline" 
                onClick={resetModals} 
                className="flex-1"
              >
                Close
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
