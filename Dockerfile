FROM node:carbon
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY lerna.json ./

COPY ./packages/ltzcore-mnemonic/package.json ./packages/ltzcore-mnemonic/package.json
COPY ./packages/ltzcore-lib/package.json ./packages/ltzcore-lib/package.json
COPY ./packages/bitcore-lib-cash/package.json ./packages/bitcore-lib-cash/package.json
COPY ./packages/ltzcore-p2p/package.json ./packages/ltzcore-p2p/package.json
COPY ./packages/bitcore-p2p-cash/package.json ./packages/bitcore-p2p-cash/package.json
COPY ./packages/ltzcore-wallet-client/package.json ./packages/ltzcore-wallet-client/package.json
COPY ./packages/ltzcore-client/package.json ./packages/ltzcore-client/package.json
COPY ./packages/ltzcore-wallet/package.json ./packages/ltzcore-wallet/package.json
COPY ./packages/ltzcore-node/package.json ./packages/ltzcore-node/package.json
COPY ./packages/insight/package.json ./packages/insight/package.json

RUN ./node_modules/.bin/lerna bootstrap

COPY . .
EXPOSE 3000
EXPOSE 8100
CMD ["./node_modules/.bin/lerna", "run", "start"]
#CMD ["npm", "--prefix=./packages/ltzcore-node", "start"]
#CMD ["npm", "--prefix=./packages/insight", "start"]
