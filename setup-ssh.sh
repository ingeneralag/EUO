#!/bin/bash

# SSH Key Setup Script for VPS Deployment
echo "🔐 Setting up SSH Key for VPS Access..."

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

# Check if SSH key already exists
if [ -f ~/.ssh/id_rsa ]; then
    print_warning "SSH key already exists at ~/.ssh/id_rsa"
    read -p "Do you want to create a new one? (y/N): " create_new
    if [[ $create_new != "y" && $create_new != "Y" ]]; then
        print_status "Using existing SSH key..."
        cat ~/.ssh/id_rsa.pub
        exit 0
    fi
fi

# Get email for SSH key
read -p "Enter your email address: " email
if [ -z "$email" ]; then
    print_error "Email is required for SSH key generation"
    exit 1
fi

# Generate SSH key
print_status "Generating SSH key..."
ssh-keygen -t rsa -b 4096 -C "$email" -f ~/.ssh/id_rsa -N ""

if [ $? -eq 0 ]; then
    print_success "SSH key generated successfully!"
else
    print_error "Failed to generate SSH key"
    exit 1
fi

# Start SSH agent
print_status "Starting SSH agent..."
eval "$(ssh-agent -s)"

# Add SSH key to agent
print_status "Adding SSH key to SSH agent..."
ssh-add ~/.ssh/id_rsa

# Display public key
print_success "Your public SSH key:"
echo "----------------------------------------"
cat ~/.ssh/id_rsa.pub
echo "----------------------------------------"

print_status "Next steps:"
echo "1. Copy the public key above"
echo "2. Add it to your VPS server:"
echo "   ssh root@your-server-ip"
echo "   mkdir -p ~/.ssh"
echo "   echo 'your-public-key' >> ~/.ssh/authorized_keys"
echo "   chmod 700 ~/.ssh"
echo "   chmod 600 ~/.ssh/authorized_keys"
echo ""
echo "3. Test SSH connection:"
echo "   ssh root@your-server-ip"
echo ""
print_success "SSH key setup completed!"
