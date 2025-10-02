#!/bin/bash

# Deployment script for Next.js 15 on VPS without Docker
# Usage: ./deploy-vps.sh

set -e

echo "🚀 Starting deployment for Sitovia Website..."

# Configuration
PROJECT_DIR="/var/www/sitovia"
BACKUP_DIR="/var/backups/sitovia"
NODE_VERSION="18"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if running as root or with sudo
if [[ $EUID -eq 0 ]]; then
   print_error "This script should not be run as root for security reasons"
   exit 1
fi

# Create backup
print_status "Creating backup..."
sudo mkdir -p $BACKUP_DIR
if [ -d "$PROJECT_DIR" ]; then
    sudo cp -r $PROJECT_DIR $BACKUP_DIR/sitovia-$(date +%Y%m%d-%H%M%S)
    print_status "Backup created successfully"
fi

# Navigate to project directory
print_status "Navigating to project directory..."
cd $PROJECT_DIR

# Pull latest changes from GitHub
print_status "Pulling latest changes from GitHub..."
git pull origin main

# Install/update dependencies
print_status "Installing dependencies..."
npm ci --production=false

# Build the project
print_status "Building the project..."
npm run build:prod

# Stop PM2 process if running
print_status "Stopping existing PM2 process..."
npm run pm2:stop || print_warning "No existing PM2 process found"

# Start with PM2
print_status "Starting application with PM2..."
npm run pm2:start

# Check if application is running
sleep 5
if curl -f -s http://localhost:3000 > /dev/null; then
    print_status "✅ Application is running successfully!"
    print_status "🌐 Website should be accessible via your domain"
else
    print_error "❌ Application failed to start"
    print_status "📋 Checking PM2 logs..."
    npm run pm2:logs
    exit 1
fi

# Show PM2 status
print_status "PM2 Status:"
pm2 status

print_status "🎉 Deployment completed successfully!"
print_status "📊 Monitor logs with: npm run pm2:logs"
print_status "🔄 Restart with: npm run pm2:restart"
