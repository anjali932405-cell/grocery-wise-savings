import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import HowItWorks from "@/components/HowItWorks";
import FeaturesSection from "@/components/FeaturesSection";
import ComparisonTable from "@/components/ComparisonTable";
import SavingsDashboard from "@/components/SavingsDashboard";
import LocalStoresSection from "@/components/LocalStoresSection";
import TrustSection from "@/components/TrustSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import GroceryInput from "@/components/GroceryInput";

const Index = () => {
  const [compareOpen, setCompareOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection onStartComparing={() => setCompareOpen(true)} />
      <ProblemSection />
      <SolutionSection />
      <HowItWorks />
      <FeaturesSection />
      <ComparisonTable />
      <SavingsDashboard />
      <LocalStoresSection />
      <TrustSection />
      <FAQSection />
      <Footer />
      <GroceryInput open={compareOpen} onOpenChange={setCompareOpen} />
    </div>
  );
};

export default Index;
