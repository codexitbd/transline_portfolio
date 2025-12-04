import React from "react";
import PageHeader from "../components/PageHeader";
import OfficeLocations from "../components/network/OfficeLocations";
import RegionalCoverage from "../components/network/RegionalCoverage";
import PartnerNetwork from "../components/network/PartnerNetwork";
import ShippingPartners from "../components/network/ShippingPartners";
import AirlinePartners from "../components/network/AirlinePartners";
import NetworkBenefits from "../components/network/NetworkBenefits";
import GlobalNetworkMap from "../components/GlobalNetworkMap";

const NetworkOffices = () => {
  return (
    <main className="overflow-hidden">
      {/* Page Header */}
      <PageHeader
        title="Network & Offices"
        subtitle="Our global network spans across continents, connecting you to over 100 countries through trusted partnerships and strategic office locations."
        backgroundImage="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
      />

      {/* Global Presence Map */}
      <GlobalNetworkMap />

      {/* Office Locations */}
      <OfficeLocations />

      {/* Regional Coverage in Bangladesh */}
      <RegionalCoverage />

      {/* International Agent Partners */}
      <PartnerNetwork />

      {/* Shipping Line Partners */}
      <ShippingPartners />

      {/* Airline Cargo Partners */}
      <AirlinePartners />

      {/* Network Benefits */}
      <NetworkBenefits />
    </main>
  );
};

export default NetworkOffices;
