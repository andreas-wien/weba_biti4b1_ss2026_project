#!/bin/bash

set -e

echo "Starting deployment..."

PROJECT_DIR="/var/www/static.148.211.62.46.clients.your-server.de_project"
NGINX_CONF="/etc/nginx/sites-available/static.148.211.62.46.clients.your-server.de"
NGINX_ENABLED="/etc/nginx/sites-enabled/static.148.211.62.46.clients.your-server.de"

# -----------------------------
# 1. Create folders
# -----------------------------
echo "Creating directories..."
sudo mkdir -p $PROJECT_DIR/frontend

# -----------------------------
# 2. Deploy frontend
# -----------------------------
echo "Copying frontend..."
sudo cp -r ../frontend/* $PROJECT_DIR/frontend/
sudo chown -R www-data:www-data $PROJECT_DIR

# -----------------------------
# 3. Build & restart backend (Docker)
# -----------------------------
echo "Building backend Docker image..."
cd ../backend
sudo docker build -t project-backend .

echo "Stopping old container (if exists)..."
sudo docker stop project-backend || true
sudo docker rm project-backend || true

echo "Starting backend container..."
sudo docker run -d \
    --name project-backend \
    -p 127.0.0.1:5000:5000 \
    project-backend

cd -

# -----------------------------
# 4. Install Nginx config
# -----------------------------
echo "Installing Nginx config..."

sudo cp ../nginx/project.conf $NGINX_CONF

if [ ! -L $NGINX_ENABLED ]; then
    sudo ln -s $NGINX_CONF $NGINX_ENABLED
fi

# -----------------------------
# 5. Test & reload Nginx
# -----------------------------
echo "Testing Nginx config..."
sudo nginx -t

echo "Reloading Nginx..."
sudo systemctl reload nginx

# -----------------------------
# Done
# -----------------------------
echo "Deployment complete!"
echo "Open: http://static.148.211.62.46.clients.your-server.de_project/project/"