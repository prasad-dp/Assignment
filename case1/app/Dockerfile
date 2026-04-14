# Stage 1: Build Stage
FROM node:22-alpine AS builder

# Update OS and NPM just for the build process
RUN apk update && apk upgrade --no-cache
RUN npm install -g npm@latest

WORKDIR /app
COPY package*.json ./

# Install dependencies including the overrides
RUN npm install --production

COPY . .

# Stage 2: Production Stage (The "Golden" Image)
# We use a clean Alpine image and just add Node, NO NPM.
FROM alpine:3.21

# Install only the nodejs runtime (much smaller attack surface)
RUN apk add --no-cache nodejs && \
    apk upgrade --no-cache

# Create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

# Copy ONLY the app and the installed node_modules from the builder
COPY --from=builder /app .

# Ensure permissions
RUN chown -R appuser:appgroup /app
USER appuser

EXPOSE 8080
CMD ["node", "index.js"]
