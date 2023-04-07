FROM node:16

RUN npm install -g pnpm

WORKDIR /app
COPY . .
RUN pnpm install
RUN cd client; pnpm install
RUN pnpm run build

ENV HOST=0.0.0.0

CMD [ "node", "dist/index.js" ]