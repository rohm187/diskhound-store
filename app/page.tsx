
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { HeroSection } from '@/components/sections/hero-section';
import { PainPointsSection } from '@/components/sections/pain-points-section';
import { ProductShowcase } from '@/components/sections/product-showcase';
import { BenefitsSection } from '@/components/sections/benefits-section';
import { SocialProofSection } from '@/components/sections/social-proof-section';
import { CTASection } from '@/components/sections/cta-section';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background cyber-grid">
      <Navigation />
      
      <main className="flex flex-col">
        <HeroSection />
        <PainPointsSection />
        <ProductShowcase />
        <BenefitsSection />
        <SocialProofSection />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
