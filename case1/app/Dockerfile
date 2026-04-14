FROM node:18-alpine


RUN apk update && apk upgrade --no-cache

WORKDIR /app


COPY package*.json ./
RUN npm install --production && npm audit fix --force

COPY . .


RUN addgroup -S appgroup && adduser -S appuser -G appgroup
RUN chown -R appuser:appgroup /app
USER appuser

EXPOSE 8080
CMD ["node", "index.js"]
