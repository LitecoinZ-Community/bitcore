import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import * as bitcoreLib from 'ltzcore-lib';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { ApiProvider, ChainNetwork } from '../api/api';

@Injectable()
export class SearchProvider {
  private config: ChainNetwork;
  private apiURL: string;

  constructor(private apiProvider: ApiProvider, private http: Http) {}

  public search(input: string, type: string): Observable<any> {
    this.apiURL = this.apiProvider.getUrl();
    switch (type) {
      case 'blockOrTx':
        return Observable.forkJoin(
          this.searchBlock(input).catch(err => Observable.of(err)),
          this.searchTx(input).catch(err => Observable.of(err))
        );
      case 'addr':
        return this.searchAddr(input);
    }
  }

  private searchBlock(block: string): Observable<any> {
    return this.http.get(this.apiURL + '/block/' + block);
  }
  private searchTx(txid: string): Observable<any> {
    return this.http.get(this.apiURL + '/tx/' + txid);
  }
  private searchAddr(addr: string): Observable<any> {
    const address = this.extractAddress(addr);
    return this.http.get(this.apiURL + '/address/' + address);
  }

  public isInputValid(inputValue) {
    if (this.isValidBlockOrTx(inputValue)) {
      return { isValid: true, type: 'blockOrTx' };
    } else if (this.isValidAddress(inputValue)) {
      return { isValid: true, type: 'addr' };
    } else if (this.isValidBlockIndex(inputValue)) {
      return { isValid: true, type: 'blockOrTx' };
    } else {
      return { isValid: false, type: 'invalid' };
    }
  }

  private isValidBlockOrTx(inputValue): boolean {
    const regexp = /^[0-9a-fA-F]{64}$/;
    if (regexp.test(inputValue)) {
      return true;
    } else {
      return false;
    }
  }

  private isValidAddress(inputValue): boolean {
    this.config = this.apiProvider.getConfig();
    const coin = this.config.chain;
    const network = this.config.network;
    const addr = this.extractAddress(inputValue);

    if (coin.toLowerCase() === 'ltz' && network === 'mainnet') {
      return this.isValidBitcoinMainnetAddress(addr);
    } else if (coin.toLowerCase() === 'ltz' && network === 'testnet') {
      return this.isValidBitcoinTestnetAddress(addr);
    }
  }

  private isValidBitcoinMainnetAddress(data: string): boolean {
    return !!bitcoreLib.Address.isValid(data, 'mainnet');
  }
  private isValidBitcoinTestnetAddress(data: string): boolean {
    return !!bitcoreLib.Address.isValid(data, 'testnet');
  }

  private isValidBlockIndex(inputValue): boolean {
    return isFinite(inputValue);
  }

  private extractAddress(address: string): string {
    const extractedAddress = address
      .replace(/^(litecoinz:)/i, '')
      .replace(/\?.*/, '');
    return extractedAddress || address;
  }
}
