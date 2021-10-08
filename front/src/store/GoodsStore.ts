import {action, computed, makeObservable, observable, toJS} from 'mobx';
import Goods from '@models/Goods';
import GoodsService from '@src/services/GoodsService';

export class GoodsStore {

    @observable
    private _goods: Goods[] = [];

    private isLoaded = false;

    constructor() {
        makeObservable(this)
    }

    @computed
    get goods(): Goods[] {
        return toJS(this._goods);
    }

    @action
    public loadAll(useCache = true) {
        if (useCache && this.isLoaded) {
            return;
        }
        GoodsService.findAll().then(resp => {
            this._goods.length = 0;
            if (resp.data) {
                this.isLoaded = true;
                resp.data.forEach(d => {
                    this._goods.push(d);
                });
            }
        });
    }
}
