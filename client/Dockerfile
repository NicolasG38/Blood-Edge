# Client Dockerfile (Next.js 15)
# Based on the official Next.js multi-stage pattern

# 1) Install deps (with caching)
FROM node:20-alpine AS deps
WORKDIR /app

# Install dependencies based on lockfile
COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./
RUN \
  if [ -f package-lock.json ]; then npm ci; \
  elif [ -f yarn.lock ]; then yarn install --frozen-lockfile; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable && pnpm i --frozen-lockfile; \
  else npm i; fi

# 2) Build
FROM node:20-alpine AS builder
WORKDIR /app

ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the Next app
RUN npm run build

# 3) Runner (serve with "next start")
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Create non-root user for security (optional)
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001

# Copy only necessary files
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public

# Ensure Next.js can write its image cache as non-root
RUN mkdir -p ./.next/cache/images && chown -R nextjs:nodejs ./.next

EXPOSE 3000
USER nextjs

CMD ["npm", "run", "start"]
