
import { notFound } from 'next/navigation';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { ProductDetails } from '@/components/product-details';
import { prisma } from '@/lib/db';

export const dynamic = "force-dynamic";

async function getProduct(id: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { id }
    });
    return product;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

async function getRelatedProducts(currentId: string, category: string) {
  try {
    const products = await prisma.product.findMany({
      where: {
        AND: [
          { id: { not: currentId } },
          { category }
        ]
      },
      take: 3,
      orderBy: { isPopular: 'desc' }
    });
    return products;
  } catch (error) {
    console.error('Error fetching related products:', error);
    return [];
  }
}

export async function generateStaticParams() {
  try {
    const products = await prisma.product.findMany({
      select: { id: true }
    });
    
    return products.map((product) => ({
      id: product.id
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

interface ProductPageProps {
  params: { id: string };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProduct(params.id);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(product.id, product.category);

  return (
    <div className="min-h-screen bg-background cyber-grid">
      <Navigation />
      
      <main className="flex-1">
        <ProductDetails product={product} relatedProducts={relatedProducts} />
      </main>

      <Footer />
    </div>
  );
}
