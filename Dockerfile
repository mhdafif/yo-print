# Multi-stage build for production optimization
FROM node:22-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN npm run build

# ===== RUN STAGE =====

# Production stage with nginx
FROM nginx:alpine AS production


# Copy built static files from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]