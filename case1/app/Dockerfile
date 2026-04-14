# Stage 1: Build Stage
FROM node:22-alpine AS builder

# Update OS and fix any OS-level vulnerabilities
RUN apk update && apk upgrade --no-cache

WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install production dependencies only
# We don't need to update global npm here because this stage is discarded
RUN npm install --production

# Copy the rest of the application
COPY . .

# Stage 2: Production Stage (The "Golden" Image)
# We use a clean Alpine image - it DOES NOT have the vulnerable NPM pre-installed
FROM alpine:3.21

# Install only the Node.js runtime (no npm, no extra tools)
RUN apk add --no-cache nodejs && \
    apk upgrade --no-cache

# Requirement: Non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

# Copy only the built application and modules from the builder stage
COPY --from=builder /app .

# Final permissions check
RUN chown -R appuser:appgroup /app
USER appuser

EXPOSE 8080
CMD ["node", "index.js"]
