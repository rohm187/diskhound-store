
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.product.deleteMany();

  // Create products with provided brand assets
  const products = await prisma.product.createMany({
    data: [
      {
        id: 'pack-3',
        name: '3-Pack Starter Kit',
        description: 'Perfect for beginners or trying DiskHound for the first time. Includes 3 waterproof NFC stickers that work with iPhone 7+ and Android 4.0+.',
        price: 9.99,
        originalPrice: 14.99,
        image: 'https://static.abacusaicdn.net/images/606de510-2d17-463a-99b0-d1fed5cf07e7.jpg',
        features: [
          '3 waterproof NFC stickers',
          'iPhone 7+ & Android 4.0+ compatible',
          'Under 3g weight per sticker',
          'Easy smartphone setup',
          '5+ year battery life'
        ],
        category: 'starter',
        quantity: 3,
        weight: '< 3g per sticker',
        compatibility: 'iPhone 7+ & Android 4.0+',
        batteryLife: '5+ years',
        waterproof: true,
      },
      {
        id: 'pack-10',
        name: '10-Pack Most Popular',
        description: 'Our most popular choice! Perfect for serious disc golfers who want to track their entire bag without breaking the bank.',
        price: 24.99,
        originalPrice: 39.99,
        image: 'https://static.abacusaicdn.net/images/bdffabb2-cbeb-4f06-84d2-d27968d336b5.jpg',
        features: [
          '10 waterproof NFC stickers',
          'Best value per sticker',
          'Perfect for a full disc bag',
          'Instant phone alerts when found',
          'Zero flight impact'
        ],
        category: 'popular',
        isPopular: true,
        quantity: 10,
        weight: '< 3g per sticker',
        compatibility: 'iPhone 7+ & Android 4.0+',
        batteryLife: '5+ years',
        waterproof: true,
      },
      {
        id: 'pack-50-basic',
        name: '50-Pack Basic Pro',
        description: 'NTAG215 waterproof NFC stickers for serious players, tournaments, or disc golf communities. Maximum value pack.',
        price: 79.99,
        image: 'https://static.abacusaicdn.net/images/606de510-2d17-463a-99b0-d1fed5cf07e7.jpg',
        features: [
          '50 NTAG215 waterproof stickers',
          'Tournament-grade quality',
          'Perfect for clubs & communities',
          'Ultra-durable construction',
          'Bulk pricing advantage'
        ],
        category: 'pro',
        quantity: 50,
        weight: '< 3g per sticker',
        compatibility: 'iPhone 7+ & Android 4.0+',
        batteryLife: '5+ years',
        waterproof: true,
      },
      {
        id: 'pack-50-glow',
        name: '50-Pack Glow Edition',
        description: 'Glow-in-the-dark NFC stickers perfect for night rounds and easy visibility. Never lose track of your disc even in the dark.',
        price: 99.99,
        image: 'https://static.abacusaicdn.net/images/bdffabb2-cbeb-4f06-84d2-d27968d336b5.jpg',
        features: [
          '50 glow-in-dark NFC stickers',
          'Perfect for night disc golf',
          'High visibility in low light',
          'Same NFC functionality',
          'Premium glow coating'
        ],
        category: 'premium',
        isGlow: true,
        quantity: 50,
        weight: '< 3g per sticker',
        compatibility: 'iPhone 7+ & Android 4.0+',
        batteryLife: '5+ years',
        waterproof: true,
      },
      {
        id: 'pro-bundle',
        name: 'Pro Bundle Ultimate',
        description: 'The ultimate package for serious disc golfers. Includes 50 stickers PLUS an IMU sensor for detailed throw statistics and performance analytics.',
        price: 149.99,
        originalPrice: 179.99,
        image: 'https://static.abacusaicdn.net/images/f862e5d3-845a-4bc6-b6da-036d91a6794f.jpg',
        features: [
          '50 premium NFC stickers',
          'IMU sensor for throw stats',
          'Performance analytics',
          'Speed, spin & angle tracking',
          'Complete pro setup'
        ],
        category: 'ultimate',
        quantity: 50,
        weight: 'Stickers: < 3g, IMU: 15g',
        compatibility: 'iPhone 7+ & Android 4.0+',
        batteryLife: 'Stickers: 5+ years, IMU: 6 months',
        waterproof: true,
      },
    ],
  });

  console.log('✅ Database seeded successfully!');
  console.log(`Created ${products.count} products`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
