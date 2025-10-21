# Use a lightweight Node.js image
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json ./
RUN npm install

# Copy the source code
COPY . .

# Build the app (optional, if you have a build step)
RUN npm run build

# Use Nginx for serving the app
FROM nginx:alpine

# Install Node.js and npm in the Nginx image (to run npm commands in production)
RUN apk add --no-cache nodejs npm

# Copy the build output to Nginx's html directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Run Nginx
CMD ["nginx", "-g", "daemon off;"]