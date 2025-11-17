
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { FAQSection } from '@/components/faq-section';

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-background cyber-grid">
      <Navigation />
      
      <main className="container mx-auto max-w-4xl px-4 py-20">
        <div className="text-center space-y-4 mb-16">
          <h1 className="text-4xl md:text-5xl font-cyber font-bold">
            <span className="neon-text">FREQUENTLY ASKED</span>
            <br />
            <span className="secondary-neon">QUESTIONS</span>
          </h1>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
            Everything you need to know about DiskHound NFC trackers
          </p>
        </div>

        <FAQSection />
      </main>

      <Footer />
    </div>
  );
}
