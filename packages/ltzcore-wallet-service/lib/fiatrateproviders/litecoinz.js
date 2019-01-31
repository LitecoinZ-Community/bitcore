var _ = require('lodash');

var provider = {
  name: 'LitecoinZ',
  url: 'https://rates.litecoinz.org/',
  parseFn: function(raw) {
    var rates = _.compact(_.map(raw, function(d) {
      if (!d.code || !d.rate) return null;
      return {
        code: d.code,
        value: d.rate,
      };
    }));
    return rates;
  },
};

module.exports = provider;
