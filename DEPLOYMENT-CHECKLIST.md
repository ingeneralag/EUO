# ✅ Deployment Checklist for VPS (PM2 + Nginx)

## 📋 Pre-Deployment Verification

### 1. Local Build Test
```bash
# Clean previous build
rm -rf .next

# Build project
npm run build

# Verify static files exist
ls -la .next/static/
# Should show: chunks/, css/, media/

# Test local server
npm start
# Open: http://localhost:3000
# Verify CSS/JS loads in browser DevTools
```

### 2. Verify Configuration Files

#### ✅ next.config.ts
```typescript
// ❌ Make sure this is NOT present:
// output: 'standalone',

// ✅ Make sure these are present:
compress: true,
generateEtags: true,
async headers() { /* caching headers */ }
```

#### ✅ package.json
```json
{
  "scripts": {
    "build": "next build",
    "start": "next start -p 3000"
  }
}
```

#### ✅ ecosystem.config.js
```javascript
{
  name: 'sitovia-website',
  script: './node_modules/next/dist/bin/next',
  args: 'start -p 3000',
  cwd: '/var/www/sitovia', // Update this!
}
```

---

## 🚀 Server Deployment Steps

### Step 1: Prepare Server Directory
```bash
# SSH into server
ssh user@your-vps-ip

# Create project directory
sudo mkdir -p /var/www/sitovia
sudo chown $USER:$USER /var/www/sitovia

# Create logs directory
mkdir -p /var/www/sitovia/logs
```

### Step 2: Clone/Pull Latest Code
```bash
cd /var/www/sitovia

# First time:
git clone https://github.com/ingeneralag/EUO.git .

# Or update:
git pull origin main
```

### Step 3: Install Dependencies
```bash
# Install production dependencies
npm ci --production=false

# Verify installation
npm list next
# Should show: next@15.5.4
```

### Step 4: Build Project
```bash
# Build for production
npm run build

# ⚠️ CRITICAL: Verify build output
ls -la .next/static/
# Must show: chunks/, css/, media/

# If you see 'standalone/' folder, something is wrong!
# Check next.config.ts for 'output: standalone'
```

### Step 5: Configure PM2
```bash
# Update ecosystem.config.js path
nano ecosystem.config.js
# Change 'cwd' to: /var/www/sitovia

# Start with PM2
pm2 start ecosystem.config.js

# Verify it's running
pm2 status
# Should show: sitovia-website | online

# Check logs
pm2 logs sitovia-website --lines 50
```

### Step 6: Configure Nginx
```bash
# Copy nginx config
sudo cp nginx.conf.example /etc/nginx/sites-available/sitovia

# Update domain name
sudo nano /etc/nginx/sites-available/sitovia
# Replace 'your-domain.com' with actual domain

# Enable site
sudo ln -s /etc/nginx/sites-available/sitovia /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t
# Should show: test is successful

# Restart nginx
sudo systemctl restart nginx
```

---

## 🧪 Post-Deployment Testing

### Test 1: Check Next.js Server
```bash
# Test direct connection to Next.js
curl -I http://localhost:3000
# Should return: HTTP/1.1 200 OK

# Test static asset
curl -I http://localhost:3000/_next/static/chunks/main.js
# Should return: HTTP/1.1 200 OK
```

### Test 2: Check Nginx Proxy
```bash
# Test through nginx
curl -I http://your-domain.com
# Should return: HTTP/1.1 200 OK

# Test static asset through nginx
curl -I http://your-domain.com/_next/static/chunks/main.js
# Should return: HTTP/1.1 200 OK
# Should have: Cache-Control: public, max-age=31536000, immutable
```

### Test 3: Browser Testing
```
1. Open: http://your-domain.com
2. Open DevTools (F12) → Network Tab
3. Reload page (Ctrl+R)
4. Check:
   ✅ All CSS files: Status 200
   ✅ All JS files: Status 200
   ✅ All fonts: Status 200
   ✅ All images: Status 200
```

### Test 4: Check Logs
```bash
# PM2 logs
pm2 logs sitovia-website --lines 100

# Nginx logs
sudo tail -f /var/log/nginx/sitovia-access.log
sudo tail -f /var/log/nginx/sitovia-error.log
```

---

## 🐛 Troubleshooting Guide

### Problem: CSS/JS Not Loading (404 errors)

#### Check 1: Verify Build Output
```bash
cd /var/www/sitovia
ls -la .next/static/
# Must have: chunks/, css/, media/

# If empty or missing:
npm run build
```

#### Check 2: Verify Next.js Config
```bash
grep "output:" next.config.ts
# Should be commented out or not present
# ❌ BAD: output: 'standalone',
# ✅ GOOD: // output: 'standalone',
```

#### Check 3: Verify PM2 Process
```bash
pm2 status
# Should show: sitovia-website | online

# If stopped or errored:
pm2 restart sitovia-website
pm2 logs sitovia-website
```

#### Check 4: Verify Nginx Configuration
```bash
sudo nginx -t
# Should show: test is successful

# Check nginx is running:
sudo systemctl status nginx

# Restart nginx:
sudo systemctl restart nginx
```

#### Check 5: Test Direct Connection
```bash
# Bypass nginx, test Next.js directly:
curl http://localhost:3000/_next/static/chunks/main.js

# If this works but domain doesn't:
# → Problem is in nginx config

# If this doesn't work:
# → Problem is in Next.js build or PM2
```

---

### Problem: Nginx 502 Bad Gateway

```bash
# Check if Next.js is running:
pm2 status
curl http://localhost:3000

# Check nginx error log:
sudo tail -50 /var/log/nginx/sitovia-error.log

# Check firewall:
sudo ufw status
# Port 3000 should NOT be open externally (only localhost)
```

---

### Problem: Static Files Have Wrong MIME Type

```bash
# Check nginx configuration:
sudo nginx -t

# Verify gzip is enabled:
grep "gzip on" /etc/nginx/sites-available/sitovia

# Check response headers:
curl -I http://your-domain.com/_next/static/css/main.css
# Should show: Content-Type: text/css
```

---

## 🔄 Update Procedure

### For Code Changes:
```bash
cd /var/www/sitovia
git pull origin main
npm ci --production=false
npm run build
pm2 restart sitovia-website
```

### For Nginx Changes:
```bash
sudo nano /etc/nginx/sites-available/sitovia
sudo nginx -t
sudo systemctl restart nginx
```

### For PM2 Changes:
```bash
nano ecosystem.config.js
pm2 delete sitovia-website
pm2 start ecosystem.config.js
pm2 save
```

---

## 🔐 Security Checklist

- [ ] Firewall configured (only 22, 80, 443 open)
- [ ] PM2 startup script enabled: `pm2 startup && pm2 save`
- [ ] Nginx user permissions correct
- [ ] SSL certificate installed (Let's Encrypt)
- [ ] Security headers enabled in nginx
- [ ] Unnecessary ports closed (3000 not publicly accessible)

---

## 📊 Monitoring

### Check Application Health:
```bash
# PM2 status
pm2 status

# PM2 monitoring
pm2 monit

# Check memory usage
pm2 list --sort memory

# Check logs
pm2 logs sitovia-website --lines 100
```

### Check Server Resources:
```bash
# Disk space
df -h

# Memory usage
free -h

# CPU usage
top
```

---

## ✅ Success Criteria

Your deployment is successful when:

1. ✅ `npm run build` completes without errors
2. ✅ `.next/static/` directory contains chunks/, css/, media/
3. ✅ PM2 shows process as "online"
4. ✅ `curl http://localhost:3000` returns HTML
5. ✅ `curl http://localhost:3000/_next/static/chunks/main.js` returns JavaScript
6. ✅ Browser loads website with all CSS/JS
7. ✅ Browser DevTools shows all assets with 200 status
8. ✅ No console errors in browser
9. ✅ Website functions correctly (navigation, interactions, etc.)
10. ✅ Mobile view works correctly

---

## 📚 Quick Reference Commands

```bash
# Build & Deploy
npm run build && pm2 restart sitovia-website

# Check Status
pm2 status && sudo systemctl status nginx

# View Logs
pm2 logs sitovia-website && sudo tail -f /var/log/nginx/sitovia-error.log

# Restart Everything
pm2 restart sitovia-website && sudo systemctl restart nginx

# Stop Everything
pm2 stop sitovia-website && sudo systemctl stop nginx
```

---

This checklist ensures your deployment is correct and static assets load properly.
