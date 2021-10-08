import {action, computed, makeObservable, observable, toJS} from 'mobx';
import Category from '@models/Category';
import {CategoriesService} from '@services';

export class CategoriesStore {

    @observable
    private _categories: Category[] = [];

    private isLoaded = false;

    constructor() {
        makeObservable(this)
    }

    @computed
    get categories(): Category[] {
        return toJS(this._categories);
    }

    @action
    public loadAll(useCache = true) {
        if (useCache && this.isLoaded) {
            return;
        }
        CategoriesService.findAll().then(resp => {
            this.isLoaded = true;
            this._categories.length = 0;
            if (resp.data) {
                resp.data.forEach(d => {
                    this._categories.push(d);
                });
            }
        });
    }
}
