#!/bin/bash

# Deploy Sitovia Website from GitHub to VPS
echo "🚀 Deploying Sitovia Website from GitHub..."

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

# Install Git if not installed
if ! command -v git &> /dev/null; then
    print_status "Installing Git..."
    apt install -y git
fi

# Install Docker if not installed
if ! command -v docker &> /dev/null; then
    print_status "Installing Docker..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
    rm get-docker.sh
    print_success "Docker installed successfully!"
fi

# Install Docker Compose if not installed
if ! command -v docker-compose &> /dev/null; then
    print_status "Installing Docker Compose..."
    curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    chmod +x /usr/local/bin/docker-compose
    print_success "Docker Compose installed successfully!"
fi

# Create project directory
PROJECT_DIR="/var/www/sitovia"
print_status "Setting up project directory: $PROJECT_DIR"
mkdir -p $PROJECT_DIR
cd $PROJECT_DIR

# Clone or update repository
if [ -d ".git" ]; then
    print_status "Updating existing repository..."
    git pull origin main
else
    print_status "Cloning repository from GitHub..."
    git clone https://github.com/ingeneralag/EUO.git .
fi

# Set permissions
print_status "Setting permissions..."
chmod +x deploy.sh
chmod +x setup-ssh.sh
chmod +x install-server.sh

# Create environment file
print_status "Setting up environment..."
if [ ! -f ".env.production" ]; then
    cp env.production.example .env.production
    # Update with server IP
    SERVER_IP=$(curl -s ifconfig.me)
    sed -i "s|https://sitovia.com|http://$SERVER_IP:3000|g" .env.production
    print_warning "Environment file created. Please review .env.production"
fi

# Stop existing containers
print_status "Stopping existing containers..."
docker-compose down 2>/dev/null || true

# Build and start new containers
print_status "Building and starting containers..."
./deploy.sh

# Setup firewall
print_status "Configuring firewall..."
ufw allow ssh
ufw allow 80
ufw allow 443
ufw allow 3000
ufw --force enable

# Install Nginx
print_status "Installing Nginx..."
apt install -y nginx

# Create Nginx configuration
print_status "Configuring Nginx..."
cat > /etc/nginx/sites-available/sitovia << 'EOF'
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name _;

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
ln -sf /etc/nginx/sites-available/sitovia /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl restart nginx

# Get server IP
SERVER_IP=$(curl -s ifconfig.me)

print_success "🎉 Deployment completed!"
print_status "📋 Website Information:"
echo "🌐 Website URL: http://$SERVER_IP"
echo "🐳 Docker Status: $(docker-compose ps --services | wc -l) services running"
echo "📁 Project Location: $PROJECT_DIR"
echo ""
print_status "🔧 Useful Commands:"
echo "- Check status: docker-compose ps"
echo "- View logs: docker-compose logs -f"
echo "- Restart: docker-compose restart"
echo "- Update: cd $PROJECT_DIR && git pull && ./deploy.sh"
echo ""
print_status "🔒 Next Steps:"
echo "1. Point your domain to: $SERVER_IP"
echo "2. Setup SSL: certbot --nginx -d yourdomain.com"
echo "3. Update .env.production with your domain"
