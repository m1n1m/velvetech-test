import {action, computed, makeObservable, observable, toJS} from 'mobx';
import {IReactComponent} from 'mobx-react/dist/types/IReactComponent';
import {inject, IWrappedComponent} from 'mobx-react';
import Goods from '@models/Goods';
import GoodsService from '@src/services/GoodsService';

export class GoodsStore {

    @observable
    private _goods: Goods[] = [];

    constructor() {
        makeObservable(this)
    }

    @computed
    get goods(): Goods[] {
        return toJS(this._goods);
    }

    @action
    public loadAll() {
        GoodsService.findAll().then(resp => {
            this._goods.length = 0;
            resp.data.forEach(d => {
                this._goods.push(d);
            });
        });
    }
}

export type GoodsStoreInjected = {
    goodsStore?: GoodsStore;
}

export function injectGoodsStore<T extends IReactComponent>(target: T): T & IWrappedComponent<T> {
    return inject('goodsStore')(target);
}

const goodsStore = new GoodsStore();
export default goodsStore;
