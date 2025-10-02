#!/bin/bash

# Sitovia Website Deployment Script
echo "🚀 Starting Sitovia Website Deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
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

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    print_error "Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    print_error "Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Stop existing containers
print_status "Stopping existing containers..."
docker-compose down

# Remove old images (optional)
print_status "Removing old images..."
docker image prune -f

# Build and start new containers
print_status "Building and starting new containers..."
docker-compose up --build -d

# Check if containers are running
if docker-compose ps | grep -q "Up"; then
    print_success "✅ Deployment successful!"
    print_success "🌐 Website is now running at: http://localhost:3000"
    print_status "📊 To view logs: docker-compose logs -f"
    print_status "🛑 To stop: docker-compose down"
else
    print_error "❌ Deployment failed!"
    print_error "📋 Check logs: docker-compose logs"
    exit 1
fi

echo ""
print_success "🎉 Sitovia Website is now live!"
