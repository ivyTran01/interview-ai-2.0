import FeaturesSection from "@/components/sections/FeaturesSection";
import HeroSection from "@/components/sections/HeroSection";

export default function Home() {
  return (
      <div className="min-h-screen bg-background">
        <HeroSection />
        <FeaturesSection />
      </div>
  );
}