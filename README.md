# Syntax — Software Solutions Website

Professional landing page for Syntax, a software solutions company serving Europe (Italy, Spain, Austria) and Australia.

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui (New York style)
- **Internationalization**: next-intl (4 locales)
- **Icons**: Lucide React

## 🌍 Supported Languages

- 🇬🇧 English (en) - Default
- 🇮🇹 Italian (it) - Italy
- 🇪🇸 Spanish (es) - Spain
- 🇩🇪 German (de) - Austria/Germany

## 📁 Project Structure

```
src/
├── app/
│   ├── [locale]/           # Localized routes
│   │   ├── layout.tsx      # Locale-specific layout with i18n
│   │   └── page.tsx        # Home page
│   ├── layout.tsx          # Root layout with SEO
│   └── globals.css         # Global styles + Tailwind
├── i18n/
│   ├── messages/           # Translation files (en, it, es, de)
│   └── request.ts          # i18n configuration
├── components/             # React components
│   └── ui/                 # shadcn/ui components
├── lib/
│   └── utils.ts           # Utility functions
└── middleware.ts          # Locale detection & routing
```

## 🔧 Development

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local and add your Google Analytics ID

# Run development server
npm run dev

# Open browser at http://localhost:3000
# The app will redirect to /en (or detected locale)
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
# Required for production
NEXT_PUBLIC_SITE_URL=https://your-domain.com

# Optional: Google Analytics (GA4)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

**How to get Google Analytics ID:**
1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new GA4 property
3. Copy your Measurement ID (format: `G-XXXXXXXXXX`)
4. Add it to `.env.local`

## 🌐 Locale Detection

The middleware automatically detects user locale based on:
1. **Cloudflare** header: `cf-ipcountry`
2. **Vercel** header: `x-vercel-ip-country`
3. Browser `Accept-Language` header
4. Defaults to English if no match

Country-to-locale mapping:
- Italy (IT) → Italian
- Spain (ES) → Spanish
- Austria (AT), Germany (DE), Switzerland (CH) → German
- Australia (AU), UK (GB), US (US) → English

## 📊 SEO Features

✅ **Implemented:**
- Dynamic metadata per locale
- Open Graph tags
- Twitter cards
- Canonical URLs
- Language alternates (hreflang)
- robots.txt
- Semantic HTML structure
- Mobile-first responsive design
- Fast page load (static generation)

🔜 **To Add:**
- Sitemap.xml
- Structured data (JSON-LD for Organization)
- Contact form with validation

## 🎨 Design Principles

- **Modern & Clean**: Professional look suitable for B2B
- **Responsive**: Mobile-first, works on all screen sizes
- **Fast**: Static generation for optimal performance
- **Accessible**: Semantic HTML, proper ARIA labels
- **SEO-Optimized**: Comprehensive metadata, structured data

## 📦 Build & Deploy

```bash
# Build for production
npm run build

# Start production server
npm start

# Recommended deployment: Vercel
# - Automatic locale detection via Edge Network
# - Zero-config deployment
# - Perfect for Next.js
```

## 📝 Adding Content

### Adding a New Section
1. Create component in `src/components/sections/`
2. Import translations in `src/i18n/messages/{locale}.json`
3. Add to `src/app/[locale]/page.tsx`

### Adding New Translations
Update all 4 files:
- `src/i18n/messages/en.json`
- `src/i18n/messages/it.json`
- `src/i18n/messages/es.json`
- `src/i18n/messages/de.json`

### Adding shadcn/ui Components
```bash
npm run add-ui button
npm run add-ui card
npm run add-ui form
# etc.
```

## 🎯 Next Steps

Ready to build sections! Start with:
1. **Header** - Logo, navigation, language switcher, CTA
2. **Hero** - Main headline, description, CTA buttons
3. **Services** - What we offer
4. **Portfolio** - Case studies/work examples
5. **Contact** - Form with validation
6. **Footer** - Links, social media, copyright

---

Built with ❤️ by Syntax Team
