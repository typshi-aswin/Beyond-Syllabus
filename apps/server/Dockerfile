FROM oven/bun:1 AS builder

WORKDIR /app

COPY package.json bun.lock ./

COPY apps/server/package.json ./apps/server/

RUN bun install

COPY apps/server/src ./apps/server/src

COPY apps/server/.env .env

COPY apps/server/universities ./universities

FROM oven/bun:1 AS production

WORKDIR /app

COPY --from=builder /app ./

ARG PORT=3000
EXPOSE ${PORT}

CMD ["bun", "run", "apps/server/src/index.ts"]
