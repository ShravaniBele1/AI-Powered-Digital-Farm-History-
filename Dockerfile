# Multi-stage Dockerfile for All-in-One Full-Stack Deployment

# Stage 1: Build Frontend
FROM node:20-alpine AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Stage 2: Build Backend
FROM node:20-alpine AS backend-builder
WORKDIR /app/Backend
COPY Backend/package*.json ./
COPY Backend/prisma ./prisma/
RUN npm install
COPY Backend/ ./
RUN npm run build

# Stage 3: Production Runner
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=4000

# Copy backend
COPY --from=backend-builder /app/Backend/package*.json ./Backend/
COPY --from=backend-builder /app/Backend/node_modules ./Backend/node_modules
COPY --from=backend-builder /app/Backend/dist ./Backend/dist
COPY --from=backend-builder /app/Backend/prisma ./Backend/prisma

# Copy built frontend
COPY --from=frontend-builder /app/frontend/dist ./frontend/dist

WORKDIR /app/Backend
RUN mkdir -p uploads

EXPOSE 4000

CMD ["node", "dist/server.js"]
