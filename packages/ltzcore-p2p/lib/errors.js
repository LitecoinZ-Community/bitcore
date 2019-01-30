'use strict';

var spec = {
  name: 'P2P',
  message: 'Internal Error on ltzcore-p2p Module {0}'
};

module.exports = require('ltzcore-lib').errors.extend(spec);
