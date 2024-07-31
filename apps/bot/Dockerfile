FROM node:18 AS base

# No need for libc6-compat in Debian-based images

FROM base AS builder
    WORKDIR /app

    RUN npm install -g turbo

    COPY . .

    RUN turbo prune --scope=bot --docker

FROM base AS installer
    WORKDIR /app

    # Install build dependencies for canvas package
    RUN apt-get update && apt-get install -y \
        python3 \
        pkg-config \
        make \
        g++ \
        libcairo2-dev \
        libjpeg-dev \
        libpango1.0-dev \
        libgif-dev \
        libpixman-1-dev

    RUN npm install -g pnpm
    RUN npm install -g turbo

    # First install dependencies (as they change less often)
    COPY .gitignore .gitignore
    COPY --from=builder /app/out/json/ .
    COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml

    RUN pnpm install

    # Build the project and its dependencies
    COPY --from=builder /app/out/full/ .
    COPY turbo.json turbo.json

    RUN turbo run build --filter=bot...

FROM base AS runner
    WORKDIR /app

    # Install runtime dependencies for canvas package
    RUN apt-get update && apt-get install -y \
        libcairo2 \
        libpango-1.0-0 \
        libpangomm-1.4-1v5 \
        libpng16-16 \
        libjpeg62-turbo \
        libgif7 \
        librsvg2-2 \
        libpixman-1-0 \
        # Install Myanmar fonts
        fonts-myanmar \
        fonts-sil-padauk 

    RUN npm install -g pnpm

    # Don't run production as root
    RUN addgroup --system --gid 1001 a_tu_tu
    RUN adduser --system --uid 1001 --ingroup a_tu_tu a_tu_tu

    USER a_tu_tu
    COPY --from=installer /app .

    CMD pnpm --filter bot run start
