import React from "react";
import { TbPlane } from "react-icons/tb";
import ServiceHero from "../../components/services/shared/ServiceHero";
import ServiceIntroduction from "../../components/services/shared/ServiceIntroduction";
import AirFreightSection from "../../components/services/freight/AirFreightSection";
import OceanFreightSection from "../../components/services/freight/OceanFreightSection";
import MultimodalSection from "../../components/services/freight/MultimodalSection";
import WhyChooseFreight from "../../components/services/freight/WhyChooseFreight";
import QuoteRequestSection from "../../components/services/shared/QuoteRequestSection";

const FreightForwarding = () => {
  const breadcrumbs = [
    { label: "Services", href: "/services" },
    { label: "International Freight Forwarding" },
  ];

  const highlights = [
    { value: "150+", label: "Countries Served" },
    { value: "25+", label: "Years Experience" },
    { value: "50K+", label: "Shipments Annually" },
    { value: "98%", label: "On-Time Delivery" },
  ];

  return (
    <main className="relative min-h-screen bg-white">
      {/* Hero Section */}
      <ServiceHero
        title="International Freight Forwarding"
        subtitle="Connecting Bangladesh to the World with Reliable Freight Solutions"
        backgroundImage="https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=2070"
        icon={TbPlane}
        breadcrumbs={breadcrumbs}
      />

      {/* Service Introduction */}
      <ServiceIntroduction
        title="Comprehensive Global Shipping Solutions"
        description="We offer end-to-end international freight forwarding services, connecting Bangladesh to over 150 countries worldwide. Our team of experts handles all aspects of your shipment—from documentation and customs clearance to final delivery—ensuring your cargo reaches its destination safely and on time. With strategic partnerships with leading carriers and a commitment to excellence, we deliver competitive rates without compromising on service quality."
        highlights={highlights}
      />

      {/* Air Freight Section */}
      <AirFreightSection />

      {/* Ocean Freight Section */}
      <OceanFreightSection />

      {/* Multimodal Transport Section */}
      <MultimodalSection />

      {/* Why Choose Us Section */}
      <WhyChooseFreight />

      {/* Quote Request CTA */}
      <QuoteRequestSection
        title="Get a Competitive Freight Quote Today"
        subtitle="Fill out the form below and our team will get back to you within 24 hours with a customized quote tailored to your shipping needs."
        serviceName="International Freight Forwarding"
      />
    </main>
  );
};

export default FreightForwarding;
