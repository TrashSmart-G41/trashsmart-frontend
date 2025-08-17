# syntax=docker/dockerfile:1.4

# ---- Build Stage ----
FROM node:20-alpine AS build

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy dependencies manifest and install them
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile

# Copy the rest of the application source code
COPY . .

# Set placeholder environment variables for the build process.
# These will be replaced by the entrypoint script at runtime.
ENV VITE_API_URL=VITE_API_URL_PLACEHOLDER \
    VITE_MAPBOX_ACCESS_TOKEN=VITE_MAPBOX_ACCESS_TOKEN_PLACEHOLDER \
    VITE_CLERK_PUBLISHABLE_KEY=VITE_CLERK_PUBLISHABLE_KEY_PLACEHOLDER \
    VITE_CLERK_SECRET_KEY=VITE_CLERK_SECRET_KEY_PLACEHOLDER \
    VITE_GOOGLEMAP_ACCESS_TOKEN=VITE_GOOGLEMAP_ACCESS_TOKEN_PLACEHOLDER

# Build the application
RUN pnpm run build


# ---- Production Stage ----
FROM nginx:stable-alpine

# Copy built assets from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy and set executable permission for the entrypoint script
COPY --chmod=755 entrypoint.sh /entrypoint.sh

EXPOSE 80

# Run the entrypoint script when the container starts
ENTRYPOINT ["/entrypoint.sh"]
