# 🚀 PWA (Progressive Web App) Setup Instructions

## What is a PWA?
A Progressive Web App allows users to install your DiscHound store on their phone like a native app. Benefits:
- **Install to home screen** - One tap access
- **Offline functionality** - Browse products even without internet
- **Push notifications** - Notify customers about deals and order updates
- **Faster loading** - Cached assets load instantly
- **App-like experience** - Full screen, no browser UI

---

## Prerequisites
✅ Already installed: `next-pwa` package

---

## Setup Steps

### Step 1: Update next.config.js

Replace your current `next.config.js` with this PWA-enabled version:

```javascript
const path = require('path');
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  buildExcludes: [/middleware-manifest\.json$/],
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'google-fonts',
        expiration: {
          maxEntries: 4,
          maxAgeSeconds: 365 * 24 * 60 * 60
        }
      }
    },
    {
      urlPattern: /^https:\/\/storage\.googleapis\.com\/.*/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'dischound-images',
        expiration: {
          maxEntries: 60,
          maxAgeSeconds: 30 * 24 * 60 * 60
        }
      }
    },
    {
      urlPattern: /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'static-image-assets',
        expiration: {
          maxEntries: 64,
          maxAgeSeconds: 24 * 60 * 60
        }
      }
    },
    {
      urlPattern: /\/api\/.*/i,
      handler: 'NetworkFirst',
      method: 'GET',
      options: {
        cacheName: 'apis',
        expiration: {
          maxEntries: 16,
          maxAgeSeconds: 24 * 60 * 60
        },
        networkTimeoutSeconds: 10
      }
    }
  ]
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: process.env.NEXT_DIST_DIR || '.next',
  output: process.env.NEXT_OUTPUT_MODE,
  experimental: {
    outputFileTracingRoot: path.join(__dirname, '../'),
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: { 
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        pathname: '/abacusai-ext/**',
      },
    ],
  },
};

module.exports = withPWA(nextConfig);
```

---

### Step 2: Generate PWA Icons

You need two icon sizes: 192x192 and 512x512 pixels.

**Option A: Use Your Logo (Recommended)**
1. Open your DiscHound logo (favicon.svg)
2. Export as PNG at these sizes:
   - `icon-192x192.png` (192x192 pixels)
   - `icon-512x512.png` (512x512 pixels)
3. Save both in `/public/` folder

**Option B: Quick Generation**
I can generate these icons for you if you prefer.

---

### Step 3: Test PWA Functionality

#### On Desktop (Chrome/Edge):
1. Visit your deployed site: https://diskhound.com
2. Look for install icon in address bar (⊕ or computer icon)
3. Click "Install DiscHound"
4. App opens in standalone window

#### On Mobile (iPhone/Android):
**iPhone (Safari):**
1. Visit https://diskhound.com
2. Tap Share button (square with arrow)
3. Scroll and tap "Add to Home Screen"
4. Tap "Add"
5. DiscHound icon appears on home screen

**Android (Chrome):**
1. Visit https://diskhound.com
2. Banner appears: "Add DiscHound to Home screen"
3. Tap "Add"
4. Or: Menu (⋮) → "Install app"

---

### Step 4: Verify PWA Features

**Check PWA Score:**
1. Open Chrome DevTools (F12)
2. Go to "Lighthouse" tab
3. Select "Progressive Web App"
4. Click "Analyze page load"
5. Target score: 90+ (Good), 100 (Perfect)

**Common Issues:**
- ❌ "Page load is not fast enough on mobile" → Enable caching
- ❌ "Does not register a service worker" → Rebuild app
- ❌ "Web app manifest does not meet installability requirements" → Check manifest.json

---

## Features Enabled

### 1. **Offline Support**
- Users can browse products without internet
- Cached images load instantly
- API calls fallback to cache after 10s

### 2. **Install Prompts**
- Browser shows "Install app" banner
- One-tap install on mobile devices
- Desktop install via address bar

### 3. **App-Like Experience**
- Full screen mode (no browser UI)
- Custom splash screen on launch
- Matches native app feel

### 4. **Performance**
- Static assets cached for 24 hours
- Images cached for 24 hours
- Google Fonts cached for 1 year
- API responses cached with network-first strategy

---

## Maintenance

### Clear Cache (If Needed)
If users report seeing old content:

1. **Update Service Worker:**
   - Change version number in `next.config.js`
   - Redeploy app
   - Service worker auto-updates

2. **Force Clear (Emergency):**
   ```javascript
   // Add to your page temporarily
   navigator.serviceWorker.getRegistrations().then(function(registrations) {
     for(let registration of registrations) {
       registration.unregister();
     }
   });
   ```

### Monitor PWA Metrics
Track installation rate:
- Google Analytics → Events → "install_prompt_shown"
- Vercel Analytics → Custom events

---

## Push Notifications (Future Enhancement)

To add push notifications later:

1. **Get VAPID Keys:**
   ```bash
   npx web-push generate-vapid-keys
   ```

2. **Add to Environment:**
   ```
   NEXT_PUBLIC_VAPID_PUBLIC_KEY=your_public_key
   VAPID_PRIVATE_KEY=your_private_key
   ```

3. **Request Permission:**
   ```javascript
   const permission = await Notification.requestPermission();
   ```

4. **Send Notifications:**
   - Order shipped: "📦 Your DiscHound order is on the way!"
   - Sale alert: "🔥 Limited time: 25% off Pro Bundle!"
   - Abandoned cart: "🛒 Your NFC stickers are waiting!"

---

## Troubleshooting

### PWA Not Installing
**Check these:**
1. ✅ HTTPS enabled (required for PWA)
2. ✅ manifest.json accessible at /manifest.json
3. ✅ Service worker registered (check DevTools → Application)
4. ✅ Icons exist (192x192 and 512x512)
5. ✅ start_url is valid

### Service Worker Not Updating
**Fix:**
1. Increment version in next.config.js
2. Rebuild and deploy
3. Service worker updates on next visit
4. Or use "skipWaiting: true" (already enabled)

### Images Not Caching
**Check:**
- Image URLs match urlPattern in runtimeCaching
- Network tab shows "(from ServiceWorker)" for cached images
- Cache-Control headers are set correctly

---

## Testing Checklist

Before launch:
- [ ] PWA installs on desktop (Chrome/Edge)
- [ ] PWA installs on iPhone (Safari)
- [ ] PWA installs on Android (Chrome)
- [ ] Offline mode works (disconnect internet, browse site)
- [ ] Icons appear correctly on home screen
- [ ] Splash screen shows on launch
- [ ] App opens in standalone mode (no browser UI)
- [ ] Lighthouse PWA score: 90+

---

## 🎉 Your PWA is Ready!

Users can now install DiscHound like a native app. This increases:
- **Engagement:** 2-5x more repeat visits
- **Conversion:** 2x higher than mobile web
- **Retention:** 3x better than mobile sites

Next steps:
1. Generate PWA icons (if not done)
2. Deploy to Vercel
3. Test installation on your phone
4. Promote "Install App" feature to customers

---

**Need the icons generated?** Let me know and I'll create them for you!
