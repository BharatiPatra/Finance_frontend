# frontend/Dockerfile

# 1) Build stage
FROM node:20-alpine3.19 AS build
WORKDIR /app

# <-- pass the backend URL into the build
ARG NEXT_PUBLIC_BACKEND_URL
ENV NEXT_PUBLIC_BACKEND_URL=${NEXT_PUBLIC_BACKEND_URL}

# copy only package manifests and config for better cache
COPY package*.json ./
COPY tsconfig.json ./
COPY next.config.ts ./

# install deps
RUN npm ci

# copy source & build
COPY . .
RUN npm run build

# 2) Runtime stage
FROM node:20-alpine3.19 AS runtime
WORKDIR /app

# preserve the env var (optional, for any runtime checks)
ARG NEXT_PUBLIC_BACKEND_URL
ENV NEXT_PUBLIC_BACKEND_URL=${NEXT_PUBLIC_BACKEND_URL}
ENV NODE_ENV=production

# install only prod deps
COPY package*.json ./
RUN npm ci --omit=dev

# copy over build artifacts
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public

EXPOSE 3000
CMD ["npm", "run", "start"]