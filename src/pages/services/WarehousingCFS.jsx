import React from "react";
import { TbBuildingWarehouse } from "react-icons/tb";
import ServiceHero from "../../components/services/shared/ServiceHero";
import ServiceIntroduction from "../../components/services/shared/ServiceIntroduction";
import WarehouseFacilities from "../../components/services/warehouse/WarehouseFacilities";
import WarehouseFeatures from "../../components/services/warehouse/WarehouseFeatures";
import WarehouseServices from "../../components/services/warehouse/WarehouseServices";
import CFSOperations from "../../components/services/warehouse/CFSOperations";
import CargoHandling from "../../components/services/warehouse/CargoHandling";
import WhyChooseWarehouse from "../../components/services/warehouse/WhyChooseWarehouse";
import QuoteRequestSection from "../../components/services/shared/QuoteRequestSection";

const WarehousingCFS = () => {
  const breadcrumbs = [
    { label: "Services", href: "/services" },
    { label: "Warehousing & CFS" },
  ];

  const highlights = [
    { value: "105K+", label: "Sq Ft Storage" },
    { value: "5,000+", label: "Pallet Positions" },
    { value: "24/7", label: "Operations" },
    { value: "500+", label: "TEU Capacity" },
  ];

  return (
    <main className="relative min-h-screen bg-white">
      {/* Hero Section */}
      <ServiceHero
        title="Warehousing & CFS"
        subtitle="Secure Storage & Efficient Container Operations for Your Cargo"
        backgroundImage="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070"
        icon={TbBuildingWarehouse}
        breadcrumbs={breadcrumbs}
      />

      {/* Service Introduction */}
      <ServiceIntroduction
        title="Modern Warehousing & Container Solutions"
        description="Our state-of-the-art warehousing facilities in Dhaka and Chittagong offer comprehensive storage solutions and professional Container Freight Station (CFS) operations. From secure ambient storage to temperature-controlled environments, bonded warehousing to hazmat handling, we provide flexible solutions tailored to your cargo requirements. Our integrated WMS ensures real-time visibility, while our trained team guarantees careful handling of your valuable goods."
        highlights={highlights}
      />

      {/* Warehouse Facilities */}
      <WarehouseFacilities />

      {/* Warehouse Features */}
      <WarehouseFeatures />

      {/* Warehouse Services */}
      <WarehouseServices />

      {/* CFS Operations */}
      <CFSOperations />

      {/* Cargo Handling */}
      <CargoHandling />

      {/* Why Choose Us */}
      <WhyChooseWarehouse />

      {/* Quote Request CTA */}
      <QuoteRequestSection
        title="Need Warehousing or CFS Services?"
        subtitle="Contact us today for a customized storage solution. Our team will assess your requirements and provide a competitive quote within 24 hours."
        serviceName="Warehousing & CFS"
      />
    </main>
  );
};

export default WarehousingCFS;
