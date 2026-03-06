# Stage 1: Build React application
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy dependency files 
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the frontend source code
COPY . .

# Build the React app for production
RUN npm run build

# Serve using Nginx
FROM nginx:alpine

# Create a non-root group and user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup


# Create necessary directories and set permissions BEFORE switching user
RUN mkdir -p /var/cache/nginx /var/run && \
    chown -R appuser:appgroup /var/cache/nginx /var/run && \
    chmod -R 755 /var/cache/nginx /var/run

# Copy built files from build stage to Nginx html folder
COPY --from=build /app/dist /usr/share/nginx/html

# SECURITY: Set proper ownership so non-root user can read files
RUN chown -R appuser:appgroup /usr/share/nginx/html

# to change Nginx port from 80 to 3000
RUN sed -i 's/listen       80;/listen       3000;/g' /etc/nginx/conf.d/default.conf

# Switch to non-root user
USER appuser

# Expose application port
EXPOSE 3000

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]