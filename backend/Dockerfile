# Backend Dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Use environment variable for port (default 3000)
ARG BACKEND_PORT=3000
ENV PORT=$BACKEND_PORT
EXPOSE $PORT

CMD ["npm", "run", "start:dev"]
