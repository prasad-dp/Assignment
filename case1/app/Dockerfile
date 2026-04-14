# Step 1: Use Node 22 (Newer base images have fewer legacy vulnerabilities)
FROM node:22-alpine

# Step 2: Patch OS-level vulnerabilities (libcrypto/libssl)
RUN apk update && apk upgrade --no-cache

# Step 3: FIX FOR THE 11 VULNERABILITIES
# We must upgrade the global npm version to 10.9.2 or higher.
# This replaces the vulnerable cross-spawn, glob, and tar inside /usr/local/lib
RUN npm install -g npm@10.9.2

WORKDIR /app

# Step 4: Install app dependencies with a security-first approach
COPY package*.json ./
# 'npm ci' is better for CI/CD as it uses the lockfile exactly
RUN npm ci --only=production && npm audit fix --force

COPY . .

# Step 5: Requirement: Non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup && \
    chown -R appuser:appgroup /app
USER appuser

EXPOSE 8080
CMD ["node", "index.js"]
