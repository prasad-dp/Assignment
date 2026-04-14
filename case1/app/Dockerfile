# Stage 1: Build Stage
FROM node:22-alpine AS builder

WORKDIR /app

# Only copy what we need for the install
COPY package*.json ./

# Install dependencies using the overrides in package.json
# Note: We skip the global npm install to avoid the error you saw
RUN npm install --production

# Copy the rest of the source code
COPY . .

# Stage 2: Production Stage (Final Secure Image)
# We use standard Alpine to avoid the pre-bundled vulnerable NPM
FROM alpine:3.21

# 1. Update OS packages and install ONLY nodejs (no npm)
RUN apk add --no-cache nodejs && \
    apk upgrade --no-cache

# 2. Create non-root user for security (Requirement met)
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

# 3. Copy ONLY the application and node_modules from the builder
COPY --from=builder /app .

# 4. Final permissions
RUN chown -R appuser:appgroup /app
USER appuser

EXPOSE 8080
CMD ["node", "index.js"]
