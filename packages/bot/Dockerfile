FROM ghcr.io/alwatr/node:22.19.0 AS builder

RUN set -ex; \
  apk add --no-cache git; \
  corepack enable;

COPY package.json yarn.lock ./
COPY packages/bot/package.json packages/bot/

RUN yarn install;

COPY . .

ENV NODE_ENV development

RUN set -eux; \
  yarn install --immutable; \
  yarn build; \
  ls -lahF .; \
  ls -RlahF /app/packages/bot;

# ---

FROM ghcr.io/alwatr/node:22.19.0
LABEL org.opencontainers.image.base.name="ghcr.io/alwatr/node:22.19.0"

# RUN apk add --no-cache curl
# HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --start-interval=1s --retries=3 CMD curl -fso /dev/null http://localhost/health || exit 1

COPY --from=builder /app/packages/bot/start.sh .
RUN chmod +x ./start.sh
CMD ["./start.sh"]

ENV host="0.0.0.0" \
    port="80"
EXPOSE 80

# TODO: move untill this line to alwatr/nanotron

RUN set -ex; \
  corepack enable; \
  npm install grammy;

ENV NODE_OPTIONS --enable-source-maps

COPY --from=builder /app/packages/bot/dist/ .
# RUN set -eux; ls -RlahF /app;
