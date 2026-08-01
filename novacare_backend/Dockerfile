FROM node:18-alpine

WORKDIR /app

# Install dependencies first (caching layer)
COPY package*.json ./
RUN npm install --production

# Copy application code
COPY . .

# Expose backend port
EXPOSE 5000

# Start server
CMD ["npm", "start"]
