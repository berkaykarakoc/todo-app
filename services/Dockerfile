FROM node:14 as client

WORKDIR /usr/app/web/
COPY web/package*.json ./
COPY web/ ./
RUN npm run build


# Setup the server

FROM node:14

WORKDIR /usr/app/
COPY --from=web /usr/app/web/build/ ./web/build/

WORKDIR /usr/app/server/
COPY api/package*.json ./
COPY api/ ./

ENV PORT 8000

EXPOSE 8000

CMD ["npm", "start"]