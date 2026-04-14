FROM node:20-alpine

# 1. Update OS packages
RUN apk update && apk upgrade --no-cache

# 2. Update NPM globally to the latest version (This fixes the scan errors)
RUN npm install -g npm@latest

WORKDIR /app

# 3. Copy dependencies
COPY package*.json ./

# 4. Install production deps and run a security fix
RUN npm install --production && npm audit fix --force

COPY . .

# 5. Non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
RUN chown -R appuser:appgroup /app
USER appuser

EXPOSE 8080
CMD ["node", "index.js"]
