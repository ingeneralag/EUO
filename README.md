# 🌐 Sitovia - Software Solutions Website

> Modern, multilingual website for Sitovia software solutions company, serving clients across Europe and Australia.

## ✨ Features

- 🌍 **Multilingual Support** - English, Italian, Spanish, German
- 📱 **Fully Responsive** - Optimized for all devices
- ⚡ **High Performance** - Built with Next.js 15
- 🎨 **Modern UI/UX** - Beautiful animations and interactions
- 🔍 **SEO Optimized** - Best practices for search engines
- 🐳 **Docker Ready** - Easy deployment with containers
- 🚀 **Production Ready** - Optimized builds and deployment scripts

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS v4
- **Language:** TypeScript
- **UI Components:** shadcn/ui
- **Animations:** Framer Motion
- **Internationalization:** next-intl
- **Deployment:** Docker + Docker Compose

## 🚀 Quick Start

### Development

```bash
# Clone the repository
git clone https://github.com/ingeneralag/EUO.git
cd EUO

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the website.

### Production Deployment

#### Option 1: Docker (Recommended)

```bash
# Build and run with Docker
./deploy.sh
```

#### Option 2: Manual Deployment

```bash
# Build the project
npm run build

# Start production server
npm start
```

## 🌍 Supported Languages

- 🇬🇧 **English** - `/en`
- 🇮🇹 **Italian** - `/it`
- 🇪🇸 **Spanish** - `/es`
- 🇩🇪 **German** - `/de`

## 📁 Project Structure

```
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── [locale]/       # Internationalized routes
│   │   └── globals.css     # Global styles
│   ├── components/         # Reusable components
│   │   ├── ui/            # UI components
│   │   ├── sections/      # Page sections
│   │   └── layout/        # Layout components
│   ├── i18n/              # Internationalization
│   └── lib/               # Utilities
├── public/                # Static assets
├── Dockerfile            # Docker configuration
├── docker-compose.yml    # Docker Compose setup
└── deploy.sh            # Deployment script
```

## 🎨 Key Sections

- **Hero Section** - Animated landing with company branding
- **Services** - Web Development, SEO, UI/UX Design
- **Our Work** - Portfolio showcase
- **Why Choose Us** - Interactive feature highlights
- **Client Feedback** - Testimonials with audio support
- **Global Presence** - Interactive world map
- **Blog** - Latest insights and articles
- **Contact** - Multi-channel contact options

## 🔧 Configuration

### Environment Variables

Create `.env.production` for production:

```env
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://sitovia.com
NEXT_TELEMETRY_DISABLED=1
```

### Deployment Scripts

- `deploy.sh` - Complete Docker deployment
- `install-server.sh` - Server setup and installation
- `setup-ssh.sh` - SSH key configuration

## 📊 Performance

- ⚡ **Lighthouse Score:** 95+ across all metrics
- 🚀 **First Load JS:** ~102KB (shared)
- 📱 **Mobile Optimized:** Perfect responsive design
- 🔍 **SEO Ready:** Structured data and meta tags

## 🌐 Live Demo

- **Production:** [https://sitovia.com](https://sitovia.com)
- **Staging:** Available on request

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is proprietary software owned by Sitovia.

## 📞 Support

- **Email:** hello@sitovia.com
- **Website:** [sitovia.com](https://sitovia.com)
- **Location:** Rome, Italy | Madrid, Spain | Vienna, Austria

---

**Made with ❤️ by Sitovia Team**
