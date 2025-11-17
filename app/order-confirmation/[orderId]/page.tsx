
import { notFound } from 'next/navigation';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { OrderConfirmation } from '@/components/order-confirmation';
import { prisma } from '@/lib/db';

export const dynamic = "force-dynamic";

async function getOrder(orderId: string) {
  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        orderItems: {
          include: {
            product: true
          }
        },
        customer: true
      }
    });
    return order;
  } catch (error) {
    console.error('Error fetching order:', error);
    return null;
  }
}

interface OrderConfirmationPageProps {
  params: { orderId: string };
}

export default async function OrderConfirmationPage({ params }: OrderConfirmationPageProps) {
  const order = await getOrder(params.orderId);

  if (!order) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background cyber-grid">
      <Navigation />
      
      <main className="flex-1">
        <OrderConfirmation order={order} />
      </main>

      <Footer />
    </div>
  );
}
