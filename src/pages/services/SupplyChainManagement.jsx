import React from "react";
import ServiceHero from "../../components/services/shared/ServiceHero";
import SupplyChainIntro from "../../components/services/supplychain/SupplyChainIntro";
import PlanningDesign from "../../components/services/supplychain/PlanningDesign";
import ProcurementLogistics from "../../components/services/supplychain/ProcurementLogistics";
import InventoryManagement from "../../components/services/supplychain/InventoryManagement";
import DistributionManagement from "../../components/services/supplychain/DistributionManagement";
import LLPServices from "../../components/services/supplychain/LLPServices";
import TechnologyPlatform from "../../components/services/supplychain/TechnologyPlatform";
import ValueAddedServices from "../../components/services/supplychain/ValueAddedServices";
import SCMConsulting from "../../components/services/supplychain/SCMConsulting";
import SCMBenefits from "../../components/services/supplychain/SCMBenefits";
import SCMIndustries from "../../components/services/supplychain/SCMIndustries";
import SCMCaseStudy from "../../components/services/supplychain/SCMCaseStudy";
import QuoteRequestSection from "../../components/services/shared/QuoteRequestSection";

const SupplyChainManagement = () => {
  const heroData = {
    title: "Supply Chain Management",
    subtitle: "End-to-End Logistics Solutions",
    description:
      "Optimize your supply chain with intelligent logistics solutions. From planning to delivery, we provide technology-driven visibility and seamless integration across your entire supply chain.",
    backgroundImage: "/images/scm-hero.jpg",
    breadcrumbs: [
      { label: "Home", path: "/" },
      { label: "Services", path: "/services" },
      { label: "Supply Chain Management", path: "/services/supply-chain" },
    ],
  };

  const quoteData = {
    serviceName: "Supply Chain Management",
    serviceType: "supply-chain-management",
    ctaTitle: "Transform Your Supply Chain Today",
    ctaDescription: "Schedule a free consultation with our supply chain experts and discover how we can optimize your logistics operations.",
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <ServiceHero {...heroData} />

      {/* What is Supply Chain Management */}
      <SupplyChainIntro />

      {/* Solution 1: Supply Chain Planning & Design */}
      <PlanningDesign />

      {/* Solution 2: Procurement Logistics (Inbound) */}
      <ProcurementLogistics />

      {/* Solution 3: Warehousing & Inventory Management */}
      <InventoryManagement />

      {/* Solution 4: Distribution Management (Outbound) */}
      <DistributionManagement />

      {/* Solution 5: Lead Logistics Provider (LLP) Services */}
      <LLPServices />

      {/* Solution 6: Technology-Driven Visibility */}
      <TechnologyPlatform />

      {/* Solution 7: Value-Added Services */}
      <ValueAddedServices />

      {/* Solution 8: Supply Chain Consulting */}
      <SCMConsulting />

      {/* Benefits of Integrated SCM */}
      <SCMBenefits />

      {/* Industries We Serve */}
      <SCMIndustries />

      {/* Case Study */}
      <SCMCaseStudy />

      {/* CTA / Quote Request Section */}
      <QuoteRequestSection {...quoteData} />
    </main>
  );
};

export default SupplyChainManagement;
