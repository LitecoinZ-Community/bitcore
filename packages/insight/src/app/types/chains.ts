export type Protocol = 'LTZ';
export type Code = 'LTZ' | 'tLTZ';
export type Network = 'mainnet' | 'testnet' | 'regtest';

export interface Chain {
  code: Code;
  name: string;
  network: Network;
  protocol: Protocol;
}

export const LTZ: Chain = {
  code: 'LTZ',
  name: 'LitecoinZ',
  network: 'mainnet',
  protocol: 'LTZ'
};

export const tLTZ: Chain = {
  code: 'tLTZ',
  name: 'LitecoinZ Testnet',
  network: 'testnet',
  protocol: 'LTZ'
};

export const Chains = {
  LTZ,
  tLTZ
};
