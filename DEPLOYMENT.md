# 🚀 Sitovia Website Deployment Guide

## Prerequisites

Before deploying, make sure you have:

- ✅ **VPS Server** with Ubuntu 20.04+ or CentOS 7+
- ✅ **SSH Access** to your server
- ✅ **Domain Name** pointed to your server IP
- ✅ **Docker & Docker Compose** installed on server

## 📋 Step-by-Step Deployment

### 1️⃣ Connect to Your VPS

```bash
# Replace with your server details
ssh root@your-server-ip
# or
ssh username@your-server-ip
```

### 2️⃣ Install Docker (if not installed)

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Add user to docker group (optional)
sudo usermod -aG docker $USER
```

### 3️⃣ Clone Project to Server

```bash
# Clone the repository
git clone https://github.com/your-username/sitovia-website.git
cd sitovia-website

# Or upload files via SCP
scp -r ./syntax-website username@your-server-ip:/home/username/
```

### 4️⃣ Configure Environment

```bash
# Copy environment file
cp env.production.example .env.production

# Edit environment variables
nano .env.production
```

### 5️⃣ Deploy the Website

```bash
# Make deployment script executable
chmod +x deploy.sh

# Run deployment
./deploy.sh
```

### 6️⃣ Setup Nginx (Recommended)

```bash
# Install Nginx
sudo apt install nginx -y

# Create Nginx configuration
sudo nano /etc/nginx/sites-available/sitovia.com
```

Add this configuration:

```nginx
server {
    listen 80;
    server_name sitovia.com www.sitovia.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Enable the site
sudo ln -s /etc/nginx/sites-available/sitovia.com /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 7️⃣ Setup SSL with Let's Encrypt

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Get SSL certificate
sudo certbot --nginx -d sitovia.com -d www.sitovia.com

# Auto-renewal (optional)
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

## 🔧 Useful Commands

### Docker Commands
```bash
# View running containers
docker-compose ps

# View logs
docker-compose logs -f

# Restart services
docker-compose restart

# Stop services
docker-compose down

# Update and redeploy
git pull origin main
./deploy.sh
```

### Server Management
```bash
# Check server resources
htop
df -h
free -m

# Check Nginx status
sudo systemctl status nginx

# Check Docker status
sudo systemctl status docker
```

## 🌐 Domain Configuration

1. **Point your domain to server IP:**
   - A Record: `sitovia.com` → `your-server-ip`
   - A Record: `www.sitovia.com` → `your-server-ip`

2. **Wait for DNS propagation** (up to 24 hours)

3. **Test your website:**
   - http://sitovia.com
   - https://sitovia.com (after SSL setup)

## 🔒 Security Recommendations

```bash
# Setup firewall
sudo ufw allow ssh
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable

# Update system regularly
sudo apt update && sudo apt upgrade -y

# Monitor logs
tail -f /var/log/nginx/access.log
docker-compose logs -f
```

## 📊 Monitoring & Maintenance

### Health Checks
```bash
# Check if website is running
curl -I http://localhost:3000

# Check Docker containers
docker-compose ps

# Check system resources
docker stats
```

### Backup Strategy
```bash
# Backup important files
tar -czf backup-$(date +%Y%m%d).tar.gz /path/to/website

# Backup database (if applicable)
# mysqldump -u user -p database > backup.sql
```

## 🆘 Troubleshooting

### Common Issues

1. **Port 3000 already in use:**
   ```bash
   sudo lsof -i :3000
   sudo kill -9 PID
   ```

2. **Docker permission denied:**
   ```bash
   sudo usermod -aG docker $USER
   newgrp docker
   ```

3. **Nginx configuration error:**
   ```bash
   sudo nginx -t
   sudo systemctl reload nginx
   ```

4. **SSL certificate issues:**
   ```bash
   sudo certbot certificates
   sudo certbot renew --dry-run
   ```

## 📞 Support

If you encounter issues:
- Check logs: `docker-compose logs`
- Verify configuration files
- Ensure all ports are open
- Contact system administrator

---

**🎉 Congratulations! Your Sitovia website is now live!**
