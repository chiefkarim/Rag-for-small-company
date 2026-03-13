import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import IntegrationsSection from "@/components/landing/IntegrationsSection";
import PricingSection from "@/components/landing/PricingSection";
import Footer from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0a1628] text-white font-sans overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <IntegrationsSection />
      <PricingSection />
      <Footer />
    </div>
  );
}
