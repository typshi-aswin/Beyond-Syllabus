# --------- Stage 1: Builder ----------
FROM oven/bun:1 AS builder

WORKDIR /app

# Copy root package files for Bun dependency resolution
COPY ../../package.json ../../bun.lock ./

# Copy server package.json
COPY package.json ./

# Install dependencies (root + server)
RUN bun install

# Copy server source code
COPY . .

# --------- Stage 2: Production ----------
FROM oven/bun:1 AS production

WORKDIR /app

# Copy only server code and node_modules from builder
COPY --from=builder /app ./

# Set default port
ARG PORT=3000
EXPOSE ${PORT}

# Run server
CMD ["bun", "run", "start"]
