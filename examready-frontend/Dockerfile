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

# Copy built files from build stage to Nginx html folder
COPY --from=build /app/dist /usr/share/nginx/html

# SECURITY: Set proper ownership so non-root user can read files
RUN chown -R appuser:appgroup /usr/share/nginx/html

# Switch to non-root user
USER appuser

# Expose application port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]