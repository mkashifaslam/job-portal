# Frontend Dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Use environment variable for port (default 5173)
ARG FRONTEND_PORT=5173
ENV PORT=$FRONTEND_PORT
EXPOSE $PORT

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "$PORT"]
