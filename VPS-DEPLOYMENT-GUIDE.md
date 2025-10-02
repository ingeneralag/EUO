# 🚀 VPS Deployment Guide for Next.js 15 (Without Docker)

## 📋 Prerequisites

- Node.js 18+ installed
- PM2 installed globally (`npm install -g pm2`)
- Nginx installed and configured
- Git access to the repository

## 🔧 Server Setup

### 1. Install Dependencies
```bash
# Install Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 globally
sudo npm install -g pm2

# Install Nginx
sudo apt update
sudo apt install nginx
```

### 2. Clone Repository
```bash
# Create project directory
sudo mkdir -p /var/www/sitovia
sudo chown $USER:$USER /var/www/sitovia

# Clone the repository
cd /var/www/sitovia
git clone https://github.com/ingeneralag/EUO.git .
```

### 3. Install Project Dependencies
```bash
cd /var/www/sitovia
npm ci --production=false
```

## 🏗️ Build and Deploy

### 1. Build the Project
```bash
npm run build:prod
```

### 2. Configure Environment
```bash
# Copy environment template
cp env.production.template .env.production

# Edit environment variables
nano .env.production
```

### 3. Configure PM2
```bash
# Update ecosystem.config.js with correct paths
nano ecosystem.config.js

# Start with PM2
npm run pm2:start
```

### 4. Configure Nginx
```bash
# Copy nginx configuration
sudo cp nginx.conf.example /etc/nginx/sites-available/sitovia

# Update domain name in the config
sudo nano /etc/nginx/sites-available/sitovia

# Enable the site
sudo ln -s /etc/nginx/sites-available/sitovia /etc/nginx/sites-enabled/

# Test nginx configuration
sudo nginx -t

# Restart nginx
sudo systemctl restart nginx
```

## 🔄 Deployment Commands

### Quick Deployment
```bash
# Run the deployment script
./deploy-vps.sh
```

### Manual Deployment
```bash
# Pull latest changes
git pull origin main

# Install dependencies
npm ci --production=false

# Build project
npm run build:prod

# Restart PM2
npm run pm2:restart
```

## 📊 Monitoring

### PM2 Commands
```bash
# Check status
pm2 status

# View logs
npm run pm2:logs

# Restart application
npm run pm2:restart

# Stop application
npm run pm2:stop
```

### Check Application
```bash
# Test local server
curl http://localhost:3000

# Check if static assets are served
curl -I http://localhost:3000/_next/static/css/app.css
```

## 🐛 Troubleshooting

### CSS/JS Not Loading

1. **Check Next.js Build Output**
   ```bash
   ls -la .next/static/
   ```

2. **Verify PM2 Process**
   ```bash
   pm2 status
   pm2 logs sitovia-website
   ```

3. **Check Nginx Configuration**
   ```bash
   sudo nginx -t
   sudo systemctl status nginx
   ```

4. **Test Static Asset Serving**
   ```bash
   curl -I http://localhost:3000/_next/static/chunks/main.js
   ```

### Common Issues

- **Port 3000 not accessible**: Check firewall settings
- **PM2 process crashes**: Check logs with `pm2 logs`
- **Nginx 502 errors**: Verify Next.js is running on port 3000
- **Static assets 404**: Ensure nginx proxy configuration is correct

## 🔒 Security Considerations

1. **Firewall Configuration**
   ```bash
   sudo ufw allow 22    # SSH
   sudo ufw allow 80    # HTTP
   sudo ufw allow 443   # HTTPS
   sudo ufw enable
   ```

2. **SSL Certificate (Optional)**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com
   ```

## 📈 Performance Optimization

1. **Enable Gzip in Nginx** (already configured in nginx.conf.example)
2. **Set up proper caching headers** (already configured)
3. **Monitor with PM2 Plus** (optional)
4. **Set up log rotation**

## 🎯 Key Differences from Docker Deployment

1. **No `output: 'standalone'`** - Removed for standard Next.js deployment
2. **Direct PM2 management** - Instead of Docker containers
3. **Nginx reverse proxy** - Direct proxy to Node.js process
4. **Standard Next.js build** - No Docker-specific optimizations

This configuration ensures that CSS/JS assets are properly served through the Next.js server and proxied correctly by Nginx.
