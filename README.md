
# DiskHound - NFC Disc Golf Tracker E-commerce Store

A production-ready Next.js e-commerce platform for DiskHound NFC disc golf trackers with cyberpunk neon design, Stripe payments, and PostgreSQL database.

## 🚀 Features

- **Modern E-commerce**: Complete checkout funnel with cart, customer forms, and order management
- **Stripe Integration**: Secure payment processing with test and live modes
- **Cyberpunk Design**: Neon-themed UI with responsive mobile-first design
- **Product Catalog**: 5 product tiers from starter packs to professional bundles
- **Database**: PostgreSQL with Prisma ORM for products, orders, and customers
- **Performance**: Optimized with Next.js 14, React 18, and modern web technologies

## 🏗️ Architecture

### Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Database**: PostgreSQL with Prisma ORM  
- **Payments**: Stripe API integration
- **State**: Zustand for cart management
- **UI**: Custom components with Radix UI primitives
- **Animations**: Framer Motion
- **Styling**: Cyberpunk neon theme with CSS custom properties

### Database Schema
- **Products**: 5 tiers with features, pricing, and inventory
- **Customers**: Email, contact info, and order history
- **Orders**: Complete order management with line items
- **Order Items**: Product quantities and pricing per order

## 📋 Product Catalog

1. **3-Pack Starter Kit** - $9.99 (was $14.99) - Perfect for beginners
2. **10-Pack Most Popular** - $24.99 (was $39.99) - Best value option
3. **50-Pack Basic Pro** - $79.99 - NTAG215 waterproof stickers
4. **50-Pack Glow Edition** - $99.99 - Glow-in-dark stickers
5. **Pro Bundle Ultimate** - $149.99 (was $179.99) - 50 stickers + IMU sensor

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 18+ 
- Yarn package manager
- PostgreSQL database
- Stripe account

### Local Development

1. **Clone and Install**
   ```bash
   cd nextjs_space
   yarn install
   ```

2. **Environment Variables**
   Copy `.env.example` to `.env` and update:
   ```bash
   cp .env.example .env
   ```
   
   Update these variables:
   ```env
   DATABASE_URL="your_postgresql_connection_string"
   STRIPE_PUBLISHABLE_KEY="pk_test_your_key"
   STRIPE_SECRET_KEY="sk_test_your_key"  
   STRIPE_WEBHOOK_SECRET="whsec_your_webhook_secret"
   NEXTAUTH_URL="http://localhost:3000"
   ```

3. **Database Setup**
   ```bash
   yarn prisma generate
   yarn prisma db push
   yarn prisma db seed
   ```

4. **Start Development Server**
   ```bash
   yarn dev
   ```
   
   Open [http://localhost:3000](http://localhost:3000)

## 🚀 Deployment Guide

### Vercel Deployment (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial DiskHound store"
   git remote add origin YOUR_REPO_URL
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will auto-detect Next.js settings

3. **Environment Variables in Vercel**
   In your Vercel project dashboard:
   - Go to Settings → Environment Variables
   - Add all variables from your `.env` file
   - Update `NEXTAUTH_URL` to your production domain

4. **Database Connection**
   - Ensure your PostgreSQL database is accessible from Vercel
   - Update `DATABASE_URL` with production credentials
   - Run migrations: `npx prisma db push` in Vercel console

### Custom Domain Setup

1. **Add Domain in Vercel**
   - Go to your project Settings → Domains
   - Add your custom domain (e.g., diskhound.com)

2. **DNS Configuration**
   Add these DNS records at your domain registrar:
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   
   Type: A  
   Name: @
   Value: 76.76.19.61
   ```

3. **Update Environment Variables**
   ```env
   NEXTAUTH_URL="https://yourdomain.com"
   ```

## 💳 Stripe Configuration

### Test Mode Setup
1. **Get Test Keys**
   - Visit [Stripe Dashboard](https://dashboard.stripe.com/test/apikeys)
   - Copy "Publishable key" (pk_test_...)
   - Copy "Secret key" (sk_test_...)

2. **Webhook Endpoint**
   - Go to Stripe Dashboard → Developers → Webhooks
   - Add endpoint: `https://yourdomain.com/api/stripe/webhook`
   - Select events: `payment_intent.succeeded`, `payment_intent.payment_failed`
   - Copy webhook signing secret (whsec_...)

### Production Setup
1. **Activate Live Mode**
   - Complete Stripe account verification
   - Get live keys (pk_live_..., sk_live_...)
   - Update webhook endpoint to production URL
   - Test with real payments

### Where to Paste Stripe Keys

**In Local Development (.env file):**
```env
STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

**In Vercel (Environment Variables):**
1. Go to your Vercel project
2. Click Settings → Environment Variables
3. Add each key-value pair:
   - `STRIPE_PUBLISHABLE_KEY` → `pk_test_your_key`
   - `STRIPE_SECRET_KEY` → `sk_test_your_key`
   - `STRIPE_WEBHOOK_SECRET` → `whsec_your_secret`

## 📱 Features Overview

### Customer Experience
- **Landing Page**: Conversion-optimized with pain points and benefits
- **Product Catalog**: Detailed product pages with specifications
- **Shopping Cart**: Quantity management and upsell suggestions
- **Checkout Flow**: 3-step process with customer forms and payment
- **Order Confirmation**: Complete order details and next steps
- **FAQ Section**: Comprehensive NFC technology and support info

### Admin Features
- **Order Management**: View and track all orders via API
- **Product Management**: Database-driven product catalog
- **Payment Processing**: Secure Stripe integration with webhooks
- **Customer Data**: Complete customer profiles and order history

### Technical Features
- **Mobile-First**: Responsive design for all devices
- **Performance**: Optimized images, lazy loading, and caching
- **SEO Optimized**: Meta tags, structured data, and sitemap
- **Security**: Secure payment processing and data protection
- **Analytics Ready**: Built for Google Analytics integration

## 🎨 Design System

### Cyberpunk Theme
- **Primary**: Cyan (#00FFFF) - Main brand color
- **Secondary**: Magenta (#FF00FF) - Accent color  
- **Accent**: Purple (#8B00FF) - Highlight color
- **Background**: Near-black with subtle grid pattern
- **Typography**: Orbitron (headings), Rajdhani (body)

### Component Library
- Custom UI components built on Radix UI primitives
- Consistent spacing and typography scales
- Neon glow effects and hover animations
- Mobile-first responsive breakpoints

## 📊 Business Metrics

### Pricing Strategy
- Entry-level accessible pricing ($9.99 starter)
- Value-driven middle tier ($24.99 most popular)
- Professional options up to $149.99
- Free shipping threshold at $50

### Target Metrics
- Conversion rate: 2-5%
- Average order value: $35-50
- Customer acquisition cost: <$25
- Customer lifetime value: $75-100

## 🔧 Development

### Project Structure
```
nextjs_space/
├── app/                    # Next.js app directory
│   ├── (pages)/           # Route pages
│   ├── api/               # API endpoints
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── sections/          # Page sections
│   ├── ui/               # UI primitives
│   └── [components]      # Feature components
├── lib/                   # Utilities and config
├── prisma/               # Database schema
└── public/               # Static assets
```

### Key Commands
```bash
yarn dev          # Start development server
yarn build        # Build for production
yarn start        # Start production server
yarn lint         # Run ESLint
yarn prisma       # Database commands
```

## 🚨 Important Notes

### Security Considerations
- Never commit real Stripe keys to version control
- Use environment variables for all secrets
- Validate all user inputs on both client and server
- Implement rate limiting for API endpoints

### Performance Optimization
- Images are optimized with Next.js Image component
- Database queries use proper indexing
- Cart state is persisted to localStorage
- Static pages are pre-generated where possible

### Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- NFC support required for tracker functionality

## 📞 Support

For setup assistance or technical questions:
- Email: support@diskhound.com
- Hours: Monday-Friday, 9AM-6PM PST

## 📄 License

This project is proprietary software for DiskHound brand. All rights reserved.
