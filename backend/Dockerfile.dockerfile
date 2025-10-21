# Use a lightweight Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json ./
RUN npm install

# Copy the source code
COPY . .

# Expose the port on which the app will run
EXPOSE 5000

# Run the application
CMD ["npm", "start"]