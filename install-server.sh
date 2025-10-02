#!/bin/bash

# Sitovia Website Installation Script for VPS
echo "🚀 Installing Sitovia Website..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Update system
print_status "Updating system packages..."
apt update && apt upgrade -y

# Install required packages
print_status "Installing required packages..."
apt install -y curl wget git unzip

# Install Docker
print_status "Installing Docker..."
if ! command -v docker &> /dev/null; then
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
    rm get-docker.sh
    print_success "Docker installed successfully!"
else
    print_warning "Docker is already installed"
fi

# Install Docker Compose
print_status "Installing Docker Compose..."
if ! command -v docker-compose &> /dev/null; then
    curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    chmod +x /usr/local/bin/docker-compose
    print_success "Docker Compose installed successfully!"
else
    print_warning "Docker Compose is already installed"
fi

# Create project directory
print_status "Creating project directory..."
mkdir -p /var/www/sitovia
cd /var/www/sitovia

# Extract project files (assuming the tar.gz file is uploaded)
if [ -f "sitovia-website.tar.gz" ]; then
    print_status "Extracting project files..."
    tar -xzf sitovia-website.tar.gz
    print_success "Project files extracted!"
else
    print_error "Project file sitovia-website.tar.gz not found!"
    print_status "Please upload the sitovia-website.tar.gz file to /var/www/sitovia/"
    exit 1
fi

# Set permissions
print_status "Setting permissions..."
chmod +x deploy.sh
chmod +x setup-ssh.sh

# Create environment file
print_status "Creating environment file..."
if [ ! -f ".env.production" ]; then
    cp env.production.example .env.production
    print_warning "Please edit .env.production with your settings"
fi

# Build and start the application
print_status "Building and starting the application..."
./deploy.sh

# Setup firewall
print_status "Configuring firewall..."
ufw allow ssh
ufw allow 80
ufw allow 443
ufw allow 3000
ufw --force enable

# Install and configure Nginx
print_status "Installing and configuring Nginx..."
apt install -y nginx

# Create Nginx configuration
cat > /etc/nginx/sites-available/sitovia.com << 'EOF'
server {
    listen 80;
    server_name sitovia.com www.sitovia.com _;

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
EOF

# Enable the site
ln -sf /etc/nginx/sites-available/sitovia.com /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl restart nginx

# Install SSL certificate
print_status "Installing SSL certificate..."
apt install -y certbot python3-certbot-nginx
# Note: SSL setup requires domain to be pointed to server first

print_success "🎉 Installation completed!"
print_status "📋 Next steps:"
echo "1. Point your domain to this server IP: $(curl -s ifconfig.me)"
echo "2. Edit /var/www/sitovia/.env.production with your settings"
echo "3. Run: certbot --nginx -d sitovia.com -d www.sitovia.com"
echo "4. Your website should be accessible at: http://$(curl -s ifconfig.me):3000"
echo ""
print_status "🔧 Useful commands:"
echo "- Check status: docker-compose ps"
echo "- View logs: docker-compose logs -f"
echo "- Restart: docker-compose restart"
echo "- Update: cd /var/www/sitovia && git pull && ./deploy.sh"
