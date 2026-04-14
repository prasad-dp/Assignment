# Use a newer, more secure base
FROM node:22-alpine

# 1. Update OS packages to fix libcrypto/libssl
RUN apk update && apk upgrade --no-cache

# 2. Update NPM globally to fix the internal 'cross-spawn' and 'tar' issues
RUN npm install -g npm@latest

WORKDIR /app

# 3. Copy and Install with the overrides
COPY package*.json ./
RUN npm install --production

COPY . .

# 4. Security: Non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup && \
    chown -R appuser:appgroup /app
USER appuser

EXPOSE 8080
CMD ["node", "index.js"]
