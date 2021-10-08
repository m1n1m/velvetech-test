import {action, makeObservable, observable} from 'mobx';
import SessionStoreHelper from '@utils/SessionStoreHelper';
import {GoodsStore} from '@store/GoodsStore';
import {CategoriesStore} from '@store/CategoriesStore';

const authStore = new SessionStoreHelper('isAuthorized');

export class RootStore {

    @observable
    isAuthorized: boolean = authStore.read() || false;

    goodsStore = new GoodsStore();
    categoriesStore = new CategoriesStore();
    rootStore: RootStore

    constructor() {
        makeObservable(this)
        this.rootStore = this;
    }

    @action
    public setIsAuthorized(isAuthorized: boolean) {
        this.isAuthorized = isAuthorized;
        authStore.write(isAuthorized);
    }
}

const rootStore = new RootStore();
export default rootStore;
