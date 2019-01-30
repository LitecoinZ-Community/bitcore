Ltzcore Node
============
_Requirements_:
- Trusted P2P Peer
- MongoDB Server >= v3.4

Checkout the repo

```
git clone git@github.com:LitecoinZ-Community/ltzcore.git
git checkout master
npm install
```

Set up your ltzcore.config.json file in ./ltzcore

## Example ltzcore.config.json

ltzcore.config.json file in ./ltzcore

```
{
  "bitcoreNode": {
    "chains": {
      "LTZ": {
        "mainnet": {
          "chainSource": "p2p",
          "trustedPeers": [
            {
              "host": "127.0.0.1",
              "port": 29333
            }
          ],
          "rpc": {
            "host": "127.0.0.1",
            "port": 29332,
            "username": "username",
            "password": "password"
          }
        },
        "regtest": {
          "chainSource": "p2p",
          "trustedPeers": [
            {
              "host": "127.0.0.1",
              "port": 49444
            }
          ],
          "rpc": {
            "host": "127.0.0.1",
            "port": 49443,
            "username": "username",
            "password": "password"
          }
        }
      }
    }
  }
}
```

Then start the node
```
npm run node
```

# API Documentation

[REST API parameters and example responses](./docs/api-documentation.md)

[Websockets API namespaces, event names, and parameters](./docs/sockets-api.md)

[Testing ltzcore-node in RegTest](./docs/wallet-guide.md)

## Contributing

See [CONTRIBUTING.md](https://github.com/LitecoinZ-Community/ltzcore) on the main ltzcore repo for information about how to contribute.

## License

Code released under [the MIT license](https://github.com/LitecoinZ-Community/ltzcore/blob/master/LICENSE).

Copyright 2015-2019 BitPay, Inc. Bitcore is a trademark maintained by BitPay, Inc.
