import {action, computed, makeObservable, observable, toJS} from 'mobx';
import {IReactComponent} from 'mobx-react/dist/types/IReactComponent';
import {inject, IWrappedComponent} from 'mobx-react';
import Category from '@models/Category';
import {CategoriesService} from '@services';

export class CategoriesStore {

    @observable
    private _categories: Category[] = [];

    constructor() {
        makeObservable(this)
    }

    @computed
    get categories(): Category[] {
        return toJS(this._categories);
    }

    @action
    public loadAll() {
        CategoriesService.findAll().then(resp => {
            this._categories.length = 0;
            resp.data.forEach(d => {
                this._categories.push(d);
            });
        });
    }
}

export type CategoriesStoreInjected = {
    categoriesStore?: CategoriesStore;
}

export function injectCategoriesStore<T extends IReactComponent>(target: T): T & IWrappedComponent<T> {
    return inject('categoriesStore')(target);
}

const categoriesStore = new CategoriesStore();
export default categoriesStore;
