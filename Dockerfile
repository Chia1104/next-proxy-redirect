ARG NODE_TAG=20-alpine

FROM node:${NODE_TAG} AS base

WORKDIR /app

RUN apk add --no-cache libc6-compat &&  \
    corepack enable

FROM base AS deps

COPY package.json pnpm-lock.yaml ./

RUN pnpm i

FROM base AS builder

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG TURBO_TEAM \
    TURBO_TOKEN \
    VERCEL_URL

ENV TURBO_TEAM=${TURBO_TEAM} \
    TURBO_TOKEN=${TURBO_TOKEN} \
    VERCEL_URL=${VERCEL_URL}

RUN pnpm build

FROM base AS runner

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json
COPY --from=builder --chown=nextjs:nodejs /app/next.config.mjs ./next.config.mjs
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

ENV PORT=8080 \
    NODE_ENV=production

EXPOSE 8080

CMD ["node", "server.js"]
