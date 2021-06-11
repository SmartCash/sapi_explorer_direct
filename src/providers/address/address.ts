import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiProvider } from '../../providers/api/api';
import { CurrencyProvider } from '../../providers/currency/currency';
import { BlocksProvider } from '../blocks/blocks';
import { TxsProvider } from '../transactions/transactions';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { from } from 'rxjs/observable/from';

export interface ApiAddr {
    received: number;
    sent: number;
    confirmed: number;
    unconfirmed: number;
    balance: number;
}

@Injectable()
export class AddressProvider {
    constructor(
        public httpClient: HttpClient,
        public currency: CurrencyProvider,
        public blocks: BlocksProvider,
        public txsProvider: TxsProvider,
        public apiProvider: ApiProvider) { }    
    
    public async getAddressBalance(addrStr?: string): Promise<any> {
        return this.httpClient.get<ApiAddr>(await this.apiProvider.getRandomSapiUrl() + '/v1/address/balance/' + addrStr).toPromise<ApiAddr>();
    }

    public getAddressReward(addrStr?: string): Observable<any> {
        return from(this.getAddressRewardAsync(addrStr));
    }

    public async getAddressRewardAsync(addrStr) {        
        return this.httpClient.get<any>(await this.apiProvider.getRandomSapiUrl() + '/v1/smartrewards/check/' + addrStr).toPromise<any>();
    }

    public getAddressActivity(addrStr?: string): Observable<any> {
        return fromPromise(this.txsProvider.getUnmappedTxByAddress(addrStr).then(data => {
            return this.txsProvider.mapToTx(data);
        }));
    }

    /*public getAddressActivityCoins(addrStr?: string, chainNetwork?: ChainNetwork
    ): Observable<any> {
      return this.httpClient.get<any>(
        `${this.apiProvider.getUrl(chainNetwork)}/address/${addrStr}/coins`
      );
    }*/
}
