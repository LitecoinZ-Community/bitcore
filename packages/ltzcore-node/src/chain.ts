module.exports = {
  BTC: {
    lib: require('ltzcore-lib'),
    p2p: require('ltzcore-p2p'),
  },
  BCH: {
    lib: require('bitcore-lib-cash'),
    p2p: require('bitcore-p2p-cash'),
  },
}
