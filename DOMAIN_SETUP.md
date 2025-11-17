
# DiskHound Domain Configuration Guide

## Your Domain: diskhound.com

Great news! You don't need to give me control of your domain. You can configure everything yourself by following these simple steps.

---

## Step 1: Deploy to Vercel (First Time)

### 1.1 Connect Your GitHub Repository (Recommended)

1. **Push your code to GitHub:**
   ```bash
   cd /home/ubuntu/dischound_store/nextjs_space
   git init
   git add .
   git commit -m "Initial DiskHound store"
   git remote add origin https://github.com/YOUR_USERNAME/diskhound-store.git
   git push -u origin main
   ```

2. **Go to Vercel:**
   - Visit: https://vercel.com/signup
   - Sign up with GitHub
   - Click "Add New Project"
   - Import your `diskhound-store` repository

3. **Configure Environment Variables in Vercel:**
   During import, add these environment variables:
   ```
   DATABASE_URL=your_postgresql_url
   STRIPE_PUBLISHABLE_KEY=pk_live_your_publishable_key
   STRIPE_SECRET_KEY=sk_live_your_secret_key
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
   NEXTAUTH_URL=https://diskhound.com
   NEXTAUTH_SECRET=your_nextauth_secret
   ```

4. **Deploy:**
   - Click "Deploy"
   - Wait for deployment to complete (~2-3 minutes)
   - You'll get a Vercel URL like: `diskhound-store.vercel.app`

---

## Step 2: Configure Your Domain in Vercel

### 2.1 Add Custom Domain

1. **In Vercel Dashboard:**
   - Go to your project settings
   - Click "Domains"
   - Add domain: `diskhound.com`
   - Also add: `www.diskhound.com` (optional but recommended)

2. **Vercel will show you the DNS records needed:**
   - You'll see something like:
     ```
     Type: A
     Name: @
     Value: 76.76.21.21
     
     Type: CNAME
     Name: www
     Value: cname.vercel-dns.com
     ```

---

## Step 3: Configure DNS in Your Domain Registrar

### Where did you buy diskhound.com? Choose your provider:

### Option A: Namecheap

1. **Log into Namecheap:**
   - Go to: https://www.namecheap.com/myaccount/login/
   - Navigate to "Domain List"
   - Click "Manage" next to diskhound.com

2. **Advanced DNS Settings:**
   - Click "Advanced DNS" tab
   - Delete any existing A records and CNAME records (except mail records if you have email)

3. **Add New Records:**
   
   **For Root Domain (@):**
   ```
   Type: A Record
   Host: @
   Value: 76.76.21.21
   TTL: Automatic (or 300)
   ```

   **For WWW Subdomain:**
   ```
   Type: CNAME Record
   Host: www
   Value: cname.vercel-dns.com
   TTL: Automatic (or 300)
   ```

4. **Save Changes**

### Option B: GoDaddy

1. **Log into GoDaddy:**
   - Go to: https://dcc.godaddy.com/
   - Click "DNS" for diskhound.com

2. **Add Records:**
   
   **For Root Domain:**
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   TTL: 600 seconds
   ```

   **For WWW:**
   ```
   Type: CNAME
   Name: www
   Points to: cname.vercel-dns.com
   TTL: 1 Hour
   ```

3. **Save**

### Option C: Cloudflare

1. **Log into Cloudflare:**
   - Go to: https://dash.cloudflare.com/
   - Select diskhound.com

2. **DNS Settings:**
   - Click "DNS" in the left menu
   - Delete existing A and CNAME records for @ and www

3. **Add Records:**
   
   **For Root:**
   ```
   Type: A
   Name: @
   IPv4 address: 76.76.21.21
   Proxy status: DNS only (grey cloud)
   TTL: Auto
   ```

   **For WWW:**
   ```
   Type: CNAME
   Name: www
   Target: cname.vercel-dns.com
   Proxy status: DNS only (grey cloud)
   TTL: Auto
   ```

4. **Save**

   **Important for Cloudflare:** Keep the proxy status as "DNS only" (grey cloud) for the initial setup. You can enable the proxy (orange cloud) after the domain is verified.

### Option D: Other Registrars (Generic Instructions)

For any other registrar (Hover, Google Domains, Domain.com, etc.):

1. **Find DNS Settings:**
   - Look for "DNS Settings", "DNS Management", or "Nameservers"

2. **Add These Records:**
   ```
   A Record:
   - Host/Name: @ (or leave blank)
   - Value/Points to: 76.76.21.21
   - TTL: 300 (or Automatic)

   CNAME Record:
   - Host/Name: www
   - Value/Points to: cname.vercel-dns.com
   - TTL: 300 (or Automatic)
   ```

---

## Step 4: Verify Domain Configuration

### 4.1 Wait for DNS Propagation

- DNS changes take 5 minutes to 48 hours (usually 10-30 minutes)
- Check status at: https://dnschecker.org/#A/diskhound.com

### 4.2 Verify in Vercel

1. **Go back to Vercel Dashboard**
   - Project Settings → Domains
   - Wait for the green checkmark next to diskhound.com
   - Vercel will automatically provision an SSL certificate

### 4.3 Test Your Site

Once verified, visit:
- https://diskhound.com ✓
- https://www.diskhound.com ✓

Both should show your DiskHound store!

---

## Step 5: Configure Stripe Webhook for Production

### 5.1 Update Webhook Endpoint

1. **Go to Stripe Dashboard:**
   - Visit: https://dashboard.stripe.com/webhooks
   - Click "Add endpoint"

2. **Add Your Production Endpoint:**
   ```
   Endpoint URL: https://diskhound.com/api/stripe/webhook
   ```

3. **Select Events:**
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`

4. **Copy Webhook Secret:**
   - After creating, copy the webhook signing secret (starts with `whsec_`)
   - Update in Vercel: Settings → Environment Variables → `STRIPE_WEBHOOK_SECRET`

---

## Troubleshooting

### Domain Not Working?

**Check DNS Records:**
```bash
# Check A record
dig diskhound.com +short
# Should return: 76.76.21.21

# Check CNAME record
dig www.diskhound.com +short
# Should return: cname.vercel-dns.com
```

**Common Issues:**

1. **"ERR_SSL_PROTOCOL_ERROR"**
   - Wait 10-15 more minutes for SSL provisioning
   - Vercel needs to verify domain ownership first

2. **"404 - This page could not be found"**
   - Check that NEXTAUTH_URL in Vercel is set to `https://diskhound.com`
   - Redeploy the project

3. **DNS not propagating**
   - Clear your browser cache
   - Try a different browser or incognito mode
   - Use https://dnschecker.org to check global DNS status

4. **Still showing Vercel subdomain**
   - Check if you added the domain in Vercel correctly
   - Verify DNS records in your registrar
   - Wait for DNS propagation (up to 48 hours, usually 30 minutes)

---

## Email Configuration (Optional)

If you want to use support@diskhound.com:

### Option 1: Forward to Existing Email (Free)

Most registrars offer email forwarding:
- Forward `support@diskhound.com` → your personal email
- Check your registrar's email forwarding settings

### Option 2: Google Workspace ($6/month)

1. **Sign up:** https://workspace.google.com/
2. **Verify domain ownership**
3. **Add MX records** (Google will provide them)
4. **Create:** support@diskhound.com

---

## Summary Checklist

- [ ] Code deployed to Vercel
- [ ] Environment variables configured in Vercel
- [ ] Domain added in Vercel dashboard (diskhound.com)
- [ ] A record added in DNS (@) → 76.76.21.21
- [ ] CNAME record added in DNS (www) → cname.vercel-dns.com
- [ ] Waited 30+ minutes for DNS propagation
- [ ] SSL certificate provisioned (green lock in browser)
- [ ] https://diskhound.com loads correctly
- [ ] Stripe webhook updated to production endpoint
- [ ] Test order placed successfully

---

## Need Help?

If you get stuck:

1. **Check Vercel Logs:**
   - Go to your project in Vercel
   - Click "Deployments" → Latest deployment → "Logs"

2. **Verify DNS:**
   - https://dnschecker.org/#A/diskhound.com
   - Should show 76.76.21.21 globally

3. **Vercel Support:**
   - https://vercel.com/support

4. **Domain Registrar Support:**
   - Contact your registrar's support if DNS changes aren't saving

---

**🎉 That's it! You now have full control of diskhound.com pointing to your DiskHound store!**

No need to share credentials with anyone. You're in complete control.
