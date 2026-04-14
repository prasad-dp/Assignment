
FROM node:18-alpine
WORKDIR /app
RUN apk update && apk upgrade
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
COPY package*.json ./
RUN npm install --production
COPY . .
RUN chown -R appuser:appgroup /app
USER appuser
EXPOSE 8080
CMD ["node", "index.js"]
