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

# Accept API URL at build time so Vite can bake it into the bundle
ARG VITE_API_URL=http://localhost:5000/api
ENV VITE_API_URL=$VITE_API_URL

# Build the React app for production
RUN npm run build

# Serve using Nginx
FROM nginx:alpine

# Copy built files from build stage to Nginx html folder
COPY --from=build /app/dist /usr/share/nginx/html

# to change Nginx port from 80 to 3000
RUN sed -i 's/listen       80;/listen       3000;/g' /etc/nginx/conf.d/default.conf

# Expose application port
EXPOSE 3000

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]