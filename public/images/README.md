# 📁 Images Directory Structure

## 📋 Folder Organization

### 🏢 `/logos/`
- Company logos (Sitovia logo variations)
- Client company logos
- Partner logos
- **Recommended formats:** SVG, PNG (transparent background)
- **Naming:** `sitovia-logo.svg`, `sitovia-logo-white.svg`, `client-name-logo.png`

### 🎨 `/icons/`
- UI icons and symbols
- Service icons
- Social media icons
- **Recommended formats:** SVG, PNG
- **Naming:** `service-web-dev.svg`, `icon-email.svg`, `social-linkedin.svg`

### 🌄 `/backgrounds/`
- Hero section backgrounds
- Section background images
- Pattern images
- **Recommended formats:** JPG, PNG, WebP
- **Naming:** `hero-bg.jpg`, `section-pattern.png`, `mobile-bg.webp`

### 👥 `/team/`
- Team member photos
- Staff portraits
- About us images
- **Recommended formats:** JPG, PNG, WebP
- **Naming:** `team-john-doe.jpg`, `ceo-portrait.png`

### 🚀 `/projects/`
- Project screenshots
- Portfolio images
- Case study visuals
- **Recommended formats:** JPG, PNG, WebP
- **Naming:** `project-ecommerce-1.jpg`, `portfolio-mobile-app.png`

### 🤝 `/clients/`
- Client testimonial photos
- Client company images
- Success story visuals
- **Recommended formats:** JPG, PNG, WebP
- **Naming:** `client-testimonial-1.jpg`, `success-story-company.png`

## 📐 Image Guidelines

### 🎯 Recommended Sizes:
- **Logos:** 200x200px (square), 300x100px (horizontal)
- **Icons:** 24x24px, 32x32px, 48x48px
- **Backgrounds:** 1920x1080px (desktop), 768x1024px (mobile)
- **Team Photos:** 400x400px (square), 300x400px (portrait)
- **Project Images:** 800x600px, 1200x800px
- **Client Photos:** 150x150px (testimonials), 400x400px (detailed)

### 🎨 Format Guidelines:
- **SVG:** For logos, icons, simple graphics
- **PNG:** For images with transparency
- **JPG:** For photos and complex images
- **WebP:** For optimized web delivery

### 📱 Mobile Optimization:
- Always provide @2x versions for retina displays
- Use WebP format when possible
- Keep file sizes under 500KB for mobile

## 🔧 Usage in Code

```tsx
// Logo usage
import Image from 'next/image'
<Image src="/images/logos/sitovia-logo.svg" alt="Sitovia Logo" width={200} height={50} />

// Background usage
<div style={{ backgroundImage: 'url(/images/backgrounds/hero-bg.jpg)' }}>

// Icon usage
<Image src="/images/icons/service-web-dev.svg" alt="Web Development" width={24} height={24} />
```

## 📝 Naming Conventions

- Use lowercase with hyphens: `sitovia-logo.svg`
- Be descriptive: `team-john-doe-ceo.jpg`
- Include size if multiple versions: `logo-small.svg`, `logo-large.svg`
- Use version numbers if needed: `hero-bg-v2.jpg`

## 🚀 Performance Tips

1. **Optimize images** before uploading (use tools like TinyPNG)
2. **Use appropriate formats** (SVG for logos, WebP for photos)
3. **Provide multiple sizes** for responsive design
4. **Use Next.js Image component** for automatic optimization
5. **Consider lazy loading** for images below the fold

---

**📧 Need help?** Contact the development team for image optimization assistance.
