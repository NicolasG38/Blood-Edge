# Server Dockerfile (Node.js + Express)
# Build a slim production image

FROM node:20-alpine AS base
WORKDIR /app
ENV NODE_ENV=production

# Install dependencies (no lockfile to avoid mismatch in workspace)
COPY package.json ./
RUN npm install --omit=dev

# Copy application source
COPY . .

# Expose app port
EXPOSE 3310

# Run the server
CMD ["node", "app.js"]
