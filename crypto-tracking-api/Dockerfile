# # Stage 1
# FROM node:18-alpine as builder
# WORKDIR /app
# COPY package.json package-lock.json ./
# RUN npm install
# COPY . .
# RUN npm run build

# # Stage 2
# FROM node:18-alpine
# WORKDIR /app
# COPY --from=builder /app ./
# RUN npm uninstall bcrypt
# RUN npm install bcrypt
# EXPOSE 4000
# CMD ["node", "dist/main.js"]
FROM node:18-alpine as builder

# Set working directory
WORKDIR /app

# Install app dependencies
COPY package.json package-lock.json ./

RUN npm install
COPY . .
RUN npm run build

FROM node:18-alpine

WORKDIR /app

# Copy the necessary files from the builder stage
COPY --from=builder /app ./
# COPY --from=builder /app/package.json ./
# COPY --from=builder /app/package-lock.json ./
# COPY --from=builder /app/dist ./dist
# COPY --from=builder /app/node_modules ./node_modules

# Expose the application port
EXPOSE 4000

# Start the application
CMD ["node", "dist/main.js"]