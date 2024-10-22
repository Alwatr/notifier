FROM ghcr.io/alwatr/node:22.9.0 AS builder

RUN set -ex; \
  apk add --no-cache git; \
  corepack enable;

COPY package.json yarn.lock ./
COPY packages/telegram/package.json packages/telegram/

RUN yarn install;

COPY . .

RUN set -eux; \
  yarn install --immutable; \
  yarn build; \
  ls -lahF .; \
  ls -RlahF /app/packages/api;

# ---

FROM ghcr.io/alwatr/node:22.9.0
LABEL org.opencontainers.image.base.name="ghcr.io/alwatr/node:22.9.0"

RUN apk add --no-cache curl
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --start-interval=1s --retries=3 CMD curl -fso /dev/null http://localhost/health || exit 1

COPY --from=builder /app/packages/api/dist/ .
# RUN set -ex; \
#   corepack enable; \
#   npm install sharp;
# RUN set -eux; ls -RlahF /app;

# ENV NODE_OPTIONS --enable-source-maps
ENV host="0.0.0.0" \
    port="80"

EXPOSE 80

CMD ["node", "main.mjs"]
