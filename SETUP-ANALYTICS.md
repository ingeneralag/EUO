# 📊 Google Analytics Setup Guide

## Step 1: Create Google Analytics Account

1. Go to [Google Analytics](https://analytics.google.com/)
2. Sign in with your Google account
3. Click **"Start measuring"** or **"Admin"** → **"Create Property"**

## Step 2: Set Up GA4 Property

1. **Property Setup:**
   - Property name: `Syntax Website`
   - Reporting time zone: Choose your timezone
   - Currency: EUR or your preferred currency

2. **Business Details:**
   - Industry: Technology / Software
   - Business size: Select appropriate size
   - How you plan to use Google Analytics: Check relevant options

3. **Data Stream Setup:**
   - Platform: **Web**
   - Website URL: `https://syntax.dev` (or your domain)
   - Stream name: `Syntax Website`
   - Click **"Create stream"**

4. **Get Your Measurement ID:**
   - After creating the stream, you'll see: **G-XXXXXXXXXX**
   - Copy this ID

## Step 3: Add to Your Website

1. Create `.env.local` file in project root:
   ```bash
   cd /Users/wael/Europe\ Website/syntax-website
   cp .env.example .env.local
   ```

2. Edit `.env.local` and add:
   ```env
   NEXT_PUBLIC_SITE_URL=https://syntax.dev
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX  # Replace with your ID
   ```

3. Restart the dev server:
   ```bash
   npm run dev
   ```

## Step 4: Verify Installation

### Method 1: Google Analytics Real-Time
1. Go to GA4 → Reports → Realtime
2. Open your website: `http://localhost:3000`
3. You should see yourself as an active user

### Method 2: Browser Console
1. Open your website
2. Press F12 → Console tab
3. Type: `window.gtag`
4. Should show: `ƒ gtag(){dataLayer.push(arguments);}`

### Method 3: Tag Assistant
1. Install [Google Tag Assistant](https://tagassistant.google.com/)
2. Visit your site
3. Click the extension → Should show GA4 tag firing

## Step 5: Configure Enhanced Measurement (Recommended)

In Google Analytics:
1. Go to **Admin** → **Data Streams** → Your stream
2. Click **"Enhanced measurement"**
3. Enable:
   - ✅ Page views (auto-tracked)
   - ✅ Scrolls
   - ✅ Outbound clicks
   - ✅ Site search
   - ✅ Form interactions
   - ✅ Video engagement

## Custom Event Tracking

The website includes helper functions for tracking user interactions:

```typescript
import { trackCTAClick, trackFormSubmit, trackLanguageSwitch } from '@/lib/analytics';

// Track CTA button clicks
trackCTAClick('Get Started', 'Hero');

// Track form submissions
trackFormSubmit('Contact Form');

// Track language changes
trackLanguageSwitch('en', 'it');
```

## Privacy & GDPR Compliance

The implementation includes:
- ✅ `anonymize_ip: true` - IP anonymization
- ✅ No personal data collection without consent
- ✅ Client-side tracking only

### For Full GDPR Compliance (Recommended for EU):

You should add a cookie consent banner. Install:
```bash
npm install @cookieyes/cookie-consent-sdk
```

Or use a service like:
- [CookieYes](https://www.cookieyes.com/)
- [Cookiebot](https://www.cookiebot.com/)
- [OneTrust](https://www.onetrust.com/)

## Useful GA4 Reports

After collecting data, check these reports:

1. **Realtime** - Live users on site
2. **Acquisition** → **Traffic acquisition** - Where users come from
3. **Engagement** → **Pages and screens** - Most visited pages
4. **Engagement** → **Events** - Custom event tracking
5. **Demographics** → **User attributes** - Age, gender, location
6. **Tech** → **Browser** - Browser/device breakdown

## Goals & Conversions

Set up conversions for important actions:

1. Go to **Admin** → **Events**
2. Click **"Create event"** or mark existing events as conversions
3. Common conversions:
   - Contact form submission
   - CTA button clicks
   - Email link clicks
   - Outbound link clicks

## Troubleshooting

### Analytics not working?

1. **Check environment variable:**
   ```bash
   echo $NEXT_PUBLIC_GA_ID
   ```

2. **Check browser console** for errors

3. **Verify GA4 ID format:** Must be `G-XXXXXXXXXX` (not UA-XXXXX)

4. **Ad blockers:** Disable ad blockers when testing

5. **Production only issue?** 
   - Make sure `.env.local` is deployed
   - On Vercel: Add env vars in dashboard

### Data not showing in GA4?

- Wait 24-48 hours for full reports
- Realtime should work immediately
- Check timezone settings

## Security Best Practices

✅ **Already Implemented:**
- Environment variables for sensitive IDs
- `.gitignore` includes `.env.local`
- Client-side only tracking
- IP anonymization

❌ **Don't Do:**
- Don't commit `.env.local` to git
- Don't hardcode GA ID in source code
- Don't track personal information (emails, names, etc.)

---

Need help? Check [GA4 Documentation](https://support.google.com/analytics/answer/9304153)

