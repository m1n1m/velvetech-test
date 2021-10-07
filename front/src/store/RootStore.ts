import {action, makeObservable, observable} from 'mobx';
import {IReactComponent} from 'mobx-react/dist/types/IReactComponent';
import {inject, IWrappedComponent} from 'mobx-react';
import SessionStoreHelper from '@utils/SessionStoreHelper';

const authStore = new SessionStoreHelper('isAuthorized');

export class RootStore {

    @observable
    isAuthorized = authStore.read() || false;

    constructor() {
        makeObservable(this)
    }

    @action
    public setIsAuthorized(isAuthorized: boolean) {
        this.isAuthorized = isAuthorized;
        authStore.write(isAuthorized);
    }
}

export type RootStoreInjected = {
    rootStore?: RootStore;
}

export function injectRootStore<T extends IReactComponent>(target: T): T & IWrappedComponent<T> {
    return inject('rootStore')(target);
}

const rootStore = new RootStore();
export default rootStore;
