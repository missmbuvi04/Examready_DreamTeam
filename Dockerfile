#Node.js base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy dependency files 
COPY examready-backend/package*.json ./

# Install dependencies
RUN npm install

# Copy the backend source code
COPY examready-backend/ ./

# Create a non-root group and user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Switch to non-root user
USER appuser

# Expose application port
EXPOSE 3000

# Command to start the backend server
CMD ["node", "server.js"]