# Use a small Node image
FROM node:20-alpine

# Create app directory
WORKDIR /app

# Copy files
COPY . .

# Install ws only (since it's the only dependency)
RUN npm install ws

# Expose the port
EXPOSE 8080

# Start the server
CMD ["node", "server.js"]
