import { LTZTxProvider } from './ltz';
const providers = {
  LTZ: new LTZTxProvider()
};

export class TxProvider {
  get({ chain }) {
    return providers[chain];
  }

  create(params) {
    return this.get(params).create(params);
  }

  sign(params) {
    return this.get(params).sign(params);
  }

  getSigningAddresses(params) {
    return this.get(params).getSigningAddresses(params);
  }
}

export default new TxProvider();
