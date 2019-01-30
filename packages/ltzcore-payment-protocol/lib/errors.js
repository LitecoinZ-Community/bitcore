'use strict';

var spec = {
  name: 'PaymentProtocol',
  message: 'Internal Error on ltzcore-payment-protocol Module: {0}'
};

module.exports = require('ltzcore-lib').errors.extend(spec);
