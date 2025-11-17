
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { ProductGrid } from '@/components/product-grid';
import { prisma } from '@/lib/db';

export const dynamic = "force-dynamic";

async function getProducts() {
  try {
    const products = await prisma.product.findMany({
      orderBy: [
        { isPopular: 'desc' },
        { price: 'asc' }
      ]
    });
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-background cyber-grid">
      <Navigation />
      
      <main className="container mx-auto max-w-6xl px-4 py-20">
        <div className="text-center space-y-4 mb-16">
          <h1 className="text-4xl md:text-6xl font-cyber font-bold">
            <span className="neon-text">DISC TRACKING</span>
            <br />
            <span className="secondary-neon">SOLUTIONS</span>
          </h1>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
            Choose the perfect tracking solution for your disc golf needs. From beginner starter packs to professional bundles.
          </p>
        </div>

        <ProductGrid products={products} />
      </main>

      <Footer />
    </div>
  );
}
