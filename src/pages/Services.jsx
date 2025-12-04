import React from "react";
import PageHeader from "../components/PageHeader";
import ServiceIntro from "../components/services/ServiceIntro";
import ServiceOverview from "../components/services/ServiceOverview";
import HowWeWork from "../components/services/HowWeWork";
import IndustriesServed from "../components/services/IndustriesServed";

const Services = () => {
  return (
    <div>
      <PageHeader
        title="Our Services"
        subtitle="Comprehensive End-to-End Logistics Solutions Tailored to Your Business Needs"
        backgroundImage="https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?q=80&w=2070"
      />

      {/* Introduction Section */}
      <ServiceIntro />

      {/* Service Overview Grid */}
      <ServiceOverview />

      {/* How We Work Process */}
      <HowWeWork />

      {/* Industries We Serve */}
      <IndustriesServed />
    </div>
  );
};

export default Services;