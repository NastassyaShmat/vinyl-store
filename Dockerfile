FROM node:22.14.0-alpine AS base
# Create app directory
WORKDIR /home/node/app
COPY package*.json ./

# -dependencies
FROM base AS dependencies
ARG NPM_VERSION
ENV NPM_VERSION=${NPM_VERSION:-10.9.2}
RUN corepack enable && corepack prepare npm@$NPM_VERSION --activate

RUN npm ci --prefer-offline --no-audit --no-optional --silent --production=false

# - builder
FROM dependencies AS builder
COPY . .
RUN npm run build

# - release
FROM base AS release

COPY --from=builder /home/node/app/node_modules ./node_modules

COPY --from=builder /home/node/app/dist ./dist

EXPOSE 3000
CMD [ "node", "dist/main" ]
