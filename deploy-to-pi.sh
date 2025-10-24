#!/bin/bash

# Deploy Battle Screen to Raspberry Pi
# Usage: ./deploy-to-pi.sh [hostname] [port] [user]
# Example: ./deploy-to-pi.sh raspberrypi.local 8080 pi

set -e

# Configuration
PI_HOST="${1:-raspberrypi.local}"
PORT="${2:-${PORT:-80}}"
PI_USER="${3:-${PI_USER:-pi}}"
IMAGE_NAME="battle-screen"
PLATFORM="${PLATFORM:-linux/arm64}"  # Use linux/arm/v7 for older Pi 3 with 32-bit OS
CONTAINER_NAME="battle-screen"

echo "🚀 Deploying Battle Screen to Raspberry Pi"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Target: ${PI_USER}@${PI_HOST}"
echo "Port: ${PORT}"
echo "Platform: ${PLATFORM}"
echo ""

# Check if podman is available
if ! podman version &> /dev/null; then
    echo "❌ Podman not found. Please install Podman."
    exit 1
fi

# Build the image for ARM
echo "🔨 Building image for ${PLATFORM}..."
podman build --platform ${PLATFORM} -t ${IMAGE_NAME}:arm64 .

# Save the image to a tar file
echo "💾 Saving image to tar file..."
podman save ${IMAGE_NAME}:arm64 -o ${IMAGE_NAME}-arm64.tar

# Get file size
FILE_SIZE=$(du -h ${IMAGE_NAME}-arm64.tar | cut -f1)
echo "📦 Image size: ${FILE_SIZE}"

# Transfer to Raspberry Pi
echo "📤 Transferring image to Raspberry Pi..."
scp ${IMAGE_NAME}-arm64.tar ${PI_USER}@${PI_HOST}:~/

# Deploy on Raspberry Pi
echo "🚢 Deploying on Raspberry Pi..."
ssh ${PI_USER}@${PI_HOST} << EOF
    set -e
    echo "Loading Docker image..."
    docker load -i ${IMAGE_NAME}-arm64.tar
    
    echo "Stopping existing container (if any)..."
    docker stop ${CONTAINER_NAME} 2>/dev/null || true
    docker rm ${CONTAINER_NAME} 2>/dev/null || true
    
    echo "Starting new container..."
    docker run -d \
        -p ${PORT}:80 \
        --name ${CONTAINER_NAME} \
        --restart unless-stopped \
        localhost/${IMAGE_NAME}:arm64
    
    echo "Cleaning up tar file..."
    rm ${IMAGE_NAME}-arm64.tar
    
    echo "✅ Deployment complete!"
    docker ps | grep ${CONTAINER_NAME}
EOF

# Clean up local tar file
echo "🧹 Cleaning up local files..."
rm ${IMAGE_NAME}-arm64.tar

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✨ Deployment successful!"
if [ "${PORT}" = "80" ]; then
    echo "🌐 Application available at: http://${PI_HOST}"
else
    echo "🌐 Application available at: http://${PI_HOST}:${PORT}"
fi
echo ""
echo "Useful commands:"
echo "  View logs:    ssh ${PI_USER}@${PI_HOST} 'docker logs ${CONTAINER_NAME}'"
echo "  Stop app:     ssh ${PI_USER}@${PI_HOST} 'docker stop ${CONTAINER_NAME}'"
echo "  Restart app:  ssh ${PI_USER}@${PI_HOST} 'docker restart ${CONTAINER_NAME}'"
