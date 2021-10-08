import { createContext, useContext } from 'react';
import { RootStore } from '@store/RootStore';

const StoreContext = createContext<null | RootStore>(null);
export const StoreProvider = StoreContext.Provider;

export function useStore(): RootStore {
    const store = useContext(StoreContext);
    if (store === null) {
        throw new Error('Store cannot be null, please add a context provider');
    }
    return store;
}
