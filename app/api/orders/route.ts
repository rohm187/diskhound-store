
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { customer, items, total, subtotal, tax, shipping, shippingAddress, billingAddress } = body;

    // Validate required fields
    if (!customer?.email || !customer?.firstName || !customer?.lastName || !items?.length) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create or get customer
    let customerRecord = await prisma.customer.findUnique({
      where: { email: customer.email }
    });

    if (!customerRecord) {
      customerRecord = await prisma.customer.create({
        data: {
          email: customer.email,
          firstName: customer.firstName,
          lastName: customer.lastName,
          phone: customer.phone || null
        }
      });
    }

    // Create order
    const order = await prisma.order.create({
      data: {
        customerId: customerRecord.id,
        total: parseFloat(total.toString()),
        subtotal: parseFloat(subtotal.toString()),
        tax: parseFloat(tax.toString()),
        shipping: parseFloat(shipping.toString()),
        shippingAddress: shippingAddress,
        billingAddress: billingAddress,
        status: 'PENDING',
        orderItems: {
          create: items.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: parseFloat(item.price.toString())
          }))
        }
      },
      include: {
        orderItems: {
          include: {
            product: true
          }
        },
        customer: true
      }
    });

    return NextResponse.json(
      { 
        orderId: order.id, 
        message: 'Order created successfully',
        order: {
          id: order.id,
          total: order.total,
          status: order.status,
          createdAt: order.createdAt
        }
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('orderId');

    if (orderId) {
      // Get specific order
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

      if (!order) {
        return NextResponse.json(
          { error: 'Order not found' },
          { status: 404 }
        );
      }

      return NextResponse.json({ order });
    } else {
      // Get all orders (admin functionality)
      const orders = await prisma.order.findMany({
        include: {
          orderItems: {
            include: {
              product: true
            }
          },
          customer: true
        },
        orderBy: { createdAt: 'desc' },
        take: 50 // Limit to 50 most recent orders
      });

      return NextResponse.json({ orders });
    }

  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}
