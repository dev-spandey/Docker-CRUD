# Use the official Node.js image for building the React app
FROM node:16-alpine as build

RUN npm config set registry https://registry.npmjs.org/
# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# Copy the React app source code
COPY . .

# Build the React app for production
RUN npm run build

# Use Nginx to serve the built React app
FROM nginx:alpine

# Copy the built React app to the Nginx public folder
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Command to run the Nginx server
CMD ["nginx", "-g", "daemon off;"]
