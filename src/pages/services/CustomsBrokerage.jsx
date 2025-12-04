import React from "react";
import ServiceHero from "../../components/services/shared/ServiceHero";
import ServiceIntroduction from "../../components/services/shared/ServiceIntroduction";
import ImportClearance from "../../components/services/customs/ImportClearance";
import ExportClearance from "../../components/services/customs/ExportClearance";
import LicensingCompliance from "../../components/services/customs/LicensingCompliance";
import SpecializedClearance from "../../components/services/customs/SpecializedClearance";
import WhyChooseCustoms from "../../components/services/customs/WhyChooseCustoms";
import ClearanceProcess from "../../components/services/customs/ClearanceProcess";
import CustomsIndustries from "../../components/services/customs/CustomsIndustries";
import QuoteRequestSection from "../../components/services/shared/QuoteRequestSection";

const CustomsBrokerage = () => {
  const heroData = {
    title: "Customs Brokerage",
    subtitle: "Licensed Customs House Agent Services",
    description:
      "Expert customs clearance services ensuring smooth, compliant passage of your goods through ports and airports. We handle documentation, duties, and regulatory requirements with precision.",
    backgroundImage: "/images/customs-hero.jpg",
    breadcrumbs: [
      { label: "Home", path: "/" },
      { label: "Services", path: "/services" },
      { label: "Customs Brokerage", path: "/services/customs-brokerage" },
    ],
  };

  const introData = {
    badge: "Trusted CHA",
    title: "Your Gateway to Seamless Customs Clearance",
    description:
      "As a licensed Customs House Agent, Trans Line provides comprehensive customs brokerage services for importers and exporters. Our expert team navigates complex regulations, ensures accurate classification, and facilitates swift clearance at all major ports and airports.",
    highlights: [
      {
        title: "Import Clearance",
        description: "Complete documentation and duty-paid clearance services",
      },
      {
        title: "Export Clearance",
        description: "Shipping bills, DBK claims, and export documentation",
      },
      {
        title: "Licensing Support",
        description: "DGFT licenses, permits, and regulatory approvals",
      },
      {
        title: "Compliance Advisory",
        description: "HS classification, valuation, and FTA consultation",
      },
    ],
  };

  const quoteData = {
    serviceName: "Customs Brokerage",
    serviceType: "customs-brokerage",
  };

  return (
    <main className="min-h-screen bg-white">
      <ServiceHero {...heroData} />
      <ServiceIntroduction {...introData} />
      <ImportClearance />
      <ExportClearance />
      <LicensingCompliance />
      <SpecializedClearance />
      <ClearanceProcess />
      <WhyChooseCustoms />
      <CustomsIndustries />
      <QuoteRequestSection {...quoteData} />
    </main>
  );
};

export default CustomsBrokerage;
