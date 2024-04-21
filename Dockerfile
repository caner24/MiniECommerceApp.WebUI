# Use Node.js Alpine image as base image for development
FROM node:alpine AS development

# Set working directory in the container
WORKDIR /src

# Copy package.json and package-lock.json to container
COPY ./package*.json ./ ./tailwind.config.js ./

# Install dependencies
RUN npm install

# Copy all files to container
COPY . .

# Set environment variable for PORT
ENV PORT=5000

# Expose port 5000
EXPOSE 5000

# Start the application
CMD ["npm", "start"]