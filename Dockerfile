# Stage 1: Build the React application using pnpm
FROM node:20-alpine AS build

# Install pnpm
RUN npm install -g pnpm

WORKDIR /app

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml* ./

# Install dependencies using pnpm
RUN pnpm install --frozen-lockfile

# Copy the rest of the application source code
COPY . .

# Build the application for production using pnpm
# Use placeholder values during the build
RUN VITE_API_URL=VITE_API_URL_PLACEHOLDER \
    VITE_MAPBOX_ACCESS_TOKEN=VITE_MAPBOX_ACCESS_TOKEN_PLACEHOLDER \
    VITE_CLERK_PUBLISHABLE_KEY=VITE_CLERK_PUBLISHABLE_KEY_PLACEHOLDER \
    VITE_CLERK_SECRET_KEY=VITE_CLERK_SECRET_KEY_PLACEHOLDER \
    VITE_GOOGLEMAP_ACCESS_TOKEN=VITE_GOOGLEMAP_ACCESS_TOKEN_PLACEHOLDER \
    pnpm run build

# Stage 2: Serve the application using Nginx
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Copy the custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the entrypoint script
COPY entrypoint.sh /entrypoint.sh
# Make the script executable
RUN chmod +x /entrypoint.sh

EXPOSE 80

# Set the entrypoint to our custom script
ENTRYPOINT ["/entrypoint.sh"]
