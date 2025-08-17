# syntax=docker/dockerfile:1
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
# Mount secrets and export them as environment variables for the build command
RUN --mount=type=secret,id=VITE_API_URL \
    --mount=type=secret,id=VITE_MAPBOX_ACCESS_TOKEN \
    --mount=type=secret,id=VITE_CLERK_PUBLISHABLE_KEY \
    --mount=type=secret,id=VITE_CLERK_SECRET_KEY \
    --mount=type=secret,id=VITE_GOOGLEMAP_ACCESS_TOKEN \
    export VITE_API_URL=$(cat /run/secrets/VITE_API_URL) && \
    export VITE_MAPBOX_ACCESS_TOKEN=$(cat /run/secrets/VITE_MAPBOX_ACCESS_TOKEN) && \
    export VITE_CLERK_PUBLISHABLE_KEY=$(cat /run/secrets/VITE_CLERK_PUBLISHABLE_KEY) && \
    export VITE_CLERK_SECRET_KEY=$(cat /run/secrets/VITE_CLERK_SECRET_KEY) && \
    export VITE_GOOGLEMAP_ACCESS_TOKEN=$(cat /run/secrets/VITE_GOOGLEMAP_ACCESS_TOKEN) && \
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
