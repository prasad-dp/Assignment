# Use the latest stable and most secure Alpine base
FROM node:22-alpine

# 1. Update OS packages to fix libcrypto/libssl vulnerabilities
RUN apk update && apk upgrade --no-cache

# 2. Update NPM globally to fix internal base-image vulnerabilities
RUN npm install -g npm@latest

WORKDIR /app

# 3. Copy and install with the 'overrides' defined in package.json
COPY package*.json ./
RUN npm install --production

COPY . .

# 4. Security: Use non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup && \
    chown -R appuser:appgroup /app
USER appuser

EXPOSE 8080
CMD ["node", "index.js"]
