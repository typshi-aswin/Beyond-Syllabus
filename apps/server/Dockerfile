FROM oven/bun:1

WORKDIR /app

COPY . .

RUN bun install

ARG PORT=3000
EXPOSE ${PORT}

CMD ["bun", "run", "start"]
