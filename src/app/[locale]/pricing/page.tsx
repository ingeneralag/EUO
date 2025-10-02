"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Check,
  X,
  Star,
  Zap,
  Crown,
  Rocket,
  ArrowRight,
  Users,
  Clock,
  Shield,
  Headphones,
  Code,
  Smartphone,
  Search,
  Palette,
  Globe,
  BarChart3,
} from "lucide-react";

interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: {
    monthly: number;
    yearly: number;
  };
  originalPrice?: {
    monthly: number;
    yearly: number;
  };
  features: {
    name: string;
    included: boolean;
    description?: string;
  }[];
  popular?: boolean;
  recommended?: boolean;
  icon: React.ReactNode;
  color: string;
  buttonText: string;
  buttonVariant: "default" | "outline" | "secondary";
}

const pricingPlans: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    description: "Perfect for small businesses and startups getting started with their digital presence.",
    price: {
      monthly: 299,
      yearly: 2990,
    },
    originalPrice: {
      monthly: 399,
      yearly: 3990,
    },
    features: [
      { name: "Responsive Website Design", included: true, description: "Mobile-first design approach" },
      { name: "Up to 5 Pages", included: true, description: "Home, About, Services, Contact, etc." },
      { name: "Basic SEO Setup", included: true, description: "Meta tags, sitemap, robots.txt" },
      { name: "Contact Form", included: true, description: "Simple contact form with email notifications" },
      { name: "Social Media Integration", included: true, description: "Links to your social profiles" },
      { name: "1 Month Support", included: true, description: "Email support for technical issues" },
      { name: "SSL Certificate", included: true, description: "Secure HTTPS connection" },
      { name: "Google Analytics", included: true, description: "Basic website analytics setup" },
      { name: "E-commerce Functionality", included: false },
      { name: "Advanced SEO", included: false },
      { name: "Custom Integrations", included: false },
      { name: "Priority Support", included: false },
    ],
    icon: <Zap className="w-6 h-6" />,
    color: "from-blue-500 to-cyan-500",
    buttonText: "Get Started",
    buttonVariant: "outline",
  },
  {
    id: "professional",
    name: "Professional",
    description: "Ideal for growing businesses that need advanced features and better performance.",
    price: {
      monthly: 599,
      yearly: 5990,
    },
    originalPrice: {
      monthly: 799,
      yearly: 7990,
    },
    features: [
      { name: "Everything in Starter", included: true },
      { name: "Up to 15 Pages", included: true, description: "More pages for comprehensive content" },
      { name: "Advanced SEO Optimization", included: true, description: "Schema markup, advanced meta tags" },
      { name: "E-commerce Ready", included: true, description: "Online store with payment integration" },
      { name: "Blog System", included: true, description: "Content management system" },
      { name: "Custom Animations", included: true, description: "Interactive elements and transitions" },
      { name: "3 Months Support", included: true, description: "Priority email and chat support" },
      { name: "Performance Optimization", included: true, description: "Fast loading times guaranteed" },
      { name: "Multi-language Support", included: true, description: "Reach global audiences" },
      { name: "Advanced Analytics", included: true, description: "Detailed insights and reporting" },
      { name: "Custom Integrations", included: false },
      { name: "Dedicated Account Manager", included: false },
    ],
    popular: true,
    icon: <Star className="w-6 h-6" />,
    color: "from-purple-500 to-pink-500",
    buttonText: "Most Popular",
    buttonVariant: "default",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "For large organizations requiring custom solutions and dedicated support.",
    price: {
      monthly: 1299,
      yearly: 12990,
    },
    originalPrice: {
      monthly: 1699,
      yearly: 16990,
    },
    features: [
      { name: "Everything in Professional", included: true },
      { name: "Unlimited Pages", included: true, description: "No limits on content" },
      { name: "Custom Development", included: true, description: "Tailored features for your needs" },
      { name: "Advanced Integrations", included: true, description: "CRM, ERP, third-party APIs" },
      { name: "Dedicated Account Manager", included: true, description: "Personal point of contact" },
      { name: "6 Months Support", included: true, description: "24/7 priority support" },
      { name: "Advanced Security", included: true, description: "Enterprise-grade security measures" },
      { name: "Performance Monitoring", included: true, description: "Real-time monitoring and alerts" },
      { name: "Custom Training", included: true, description: "Team training sessions" },
      { name: "White-label Solution", included: true, description: "Your branding throughout" },
      { name: "API Development", included: true, description: "Custom API endpoints" },
      { name: "Scalable Infrastructure", included: true, description: "Handle high traffic volumes" },
    ],
    recommended: true,
    icon: <Crown className="w-6 h-6" />,
    color: "from-amber-500 to-orange-500",
    buttonText: "Contact Sales",
    buttonVariant: "secondary",
  },
];

const additionalServices = [
  {
    name: "Mobile App Development",
    description: "Native iOS and Android applications",
    price: "From €2,999",
    icon: <Smartphone className="w-8 h-8" />,
    color: "from-green-500 to-emerald-500",
  },
  {
    name: "SEO Optimization",
    description: "Comprehensive SEO audit and optimization",
    price: "€299/month",
    icon: <Search className="w-8 h-8" />,
    color: "from-blue-500 to-indigo-500",
  },
  {
    name: "UI/UX Design",
    description: "Professional design and user experience",
    price: "From €1,499",
    icon: <Palette className="w-8 h-8" />,
    color: "from-purple-500 to-violet-500",
  },
  {
    name: "Maintenance & Support",
    description: "Ongoing website maintenance and updates",
    price: "€199/month",
    icon: <Headphones className="w-8 h-8" />,
    color: "from-orange-500 to-red-500",
  },
];

const faqs = [
  {
    question: "What's included in the setup process?",
    answer: "We handle everything from initial consultation to final deployment. This includes design mockups, development, testing, and launch support.",
  },
  {
    question: "Can I upgrade or downgrade my plan later?",
    answer: "Yes, you can change your plan at any time. We'll help you migrate your existing features and ensure a smooth transition.",
  },
  {
    question: "Do you provide ongoing maintenance?",
    answer: "All plans include initial support period. For ongoing maintenance, we offer separate maintenance packages starting at €199/month.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, bank transfers, and PayPal. Payment plans are available for larger projects.",
  },
  {
    question: "How long does it take to complete a project?",
    answer: "Starter projects typically take 2-3 weeks, Professional projects 4-6 weeks, and Enterprise projects 8-12 weeks depending on complexity.",
  },
  {
    question: "Do you offer refunds?",
    answer: "We offer a 30-day satisfaction guarantee. If you're not happy with our work, we'll refund your payment or work to make it right.",
  },
];

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("yearly");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const params = useParams();
  const currentLocale = params.locale as string;

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <>
      {/* Header */}
      <Header />
      
      <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 border-b pt-20">
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Badge className="mb-4">
              <BarChart3 className="w-4 h-4 mr-2" />
              Transparent Pricing
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Simple, Transparent Pricing
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Choose the perfect plan for your business. All plans include our core features 
              with no hidden fees or surprise charges.
            </p>
            
            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className={`text-sm ${billingCycle === 'monthly' ? 'text-foreground' : 'text-muted-foreground'}`}>
                Monthly
              </span>
              <button
                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  billingCycle === 'yearly' ? 'bg-primary' : 'bg-muted'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={`text-sm ${billingCycle === 'yearly' ? 'text-foreground' : 'text-muted-foreground'}`}>
                Yearly
              </span>
              {billingCycle === 'yearly' && (
                <Badge variant="secondary" className="ml-2">
                  Save 20%
                </Badge>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Pricing Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative ${plan.popular ? 'md:-mt-4 md:mb-4' : ''}`}
            >
              <Card className={`h-full ${plan.popular ? 'border-primary shadow-lg scale-105' : ''} ${plan.recommended ? 'border-amber-500' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground">
                      Most Popular
                    </Badge>
                  </div>
                )}
                {plan.recommended && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-amber-500 text-white">
                      Recommended
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-8">
                  <div className={`w-12 h-12 mx-auto mb-4 rounded-lg bg-gradient-to-r ${plan.color} flex items-center justify-center text-white`}>
                    {plan.icon}
                  </div>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription className="text-sm">{plan.description}</CardDescription>
                  
                  <div className="mt-6">
                    <div className="flex items-center justify-center gap-2">
                      {plan.originalPrice && (
                        <span className="text-lg text-muted-foreground line-through">
                          €{billingCycle === 'monthly' ? plan.originalPrice.monthly : plan.originalPrice.yearly}
                        </span>
                      )}
                      <span className="text-4xl font-bold">
                        €{billingCycle === 'monthly' ? plan.price.monthly : plan.price.yearly}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {billingCycle === 'monthly' ? 'per month' : 'per year'}
                    </p>
                    {billingCycle === 'yearly' && (
                      <p className="text-xs text-green-600 mt-1">
                        Save €{((plan.originalPrice?.monthly || plan.price.monthly) * 12) - plan.price.yearly} annually
                      </p>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <div className={`mt-0.5 ${feature.included ? 'text-green-500' : 'text-muted-foreground'}`}>
                          {feature.included ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            <X className="w-4 h-4" />
                          )}
                        </div>
                        <div>
                          <span className={`text-sm ${feature.included ? 'text-foreground' : 'text-muted-foreground'}`}>
                            {feature.name}
                          </span>
                          {feature.description && (
                            <p className="text-xs text-muted-foreground mt-1">
                              {feature.description}
                            </p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>

                  <Link href={`/${currentLocale}#contact`}>
                    <Button 
                      variant={plan.buttonVariant}
                      className="w-full"
                      size="lg"
                    >
                      {plan.buttonText}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Additional Services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Additional Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Enhance your digital presence with our specialized services designed to help your business grow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-lg bg-gradient-to-r ${service.color} flex items-center justify-center text-white`}>
                      {service.icon}
                    </div>
                    <h3 className="font-semibold mb-2">{service.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
                    <p className="font-bold text-primary">{service.price}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Have questions? We've got answers. If you can't find what you're looking for, feel free to contact us.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
              >
                <Card className="mb-4">
                  <CardContent className="p-0">
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full p-6 text-left hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">{faq.question}</h3>
                        <motion.div
                          animate={{ rotate: expandedFaq === index ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ArrowRight className="w-5 h-5 transform rotate-90" />
                        </motion.div>
                      </div>
                    </button>
                    {expandedFaq === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="px-6 pb-6"
                      >
                        <p className="text-muted-foreground">{faq.answer}</p>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <Card className="bg-gradient-to-r from-primary/10 via-background to-secondary/10 border-primary/20">
            <CardContent className="p-12">
              <Rocket className="w-16 h-16 mx-auto mb-6 text-primary" />
              <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join hundreds of satisfied clients who have transformed their digital presence with our solutions. 
                Let's discuss your project and find the perfect plan for your needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={`/${currentLocale}#contact`}>
                  <Button size="lg" className="gap-2">
                    <Users className="w-5 h-5" />
                    Contact Sales
                  </Button>
                </Link>
                <Link href={`/${currentLocale}/work`}>
                  <Button variant="outline" size="lg" className="gap-2">
                    <Globe className="w-5 h-5" />
                    View Our Work
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}
