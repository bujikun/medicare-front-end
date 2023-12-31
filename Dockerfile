# Install dependencies only when needed
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Rebuild the source code only when needed
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn build

# Production image, copy all the files and run next
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
#create non user with which to run the app
RUN addgroup --system --gid 1001 medicaregroup
RUN adduser --system --uid 1001 medicareuser
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY .env.local /app/.env.local
COPY next.config.js /app/next.config.js
# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=medicareuser:medicaregroup /app/.next/standalone ./
COPY --from=builder --chown=medicareuser:medicaregroup /app/.next/static ./.next/static
USER medicareuser
EXPOSE 3000
ENV PORT 3000
CMD ["node", "server.js"]