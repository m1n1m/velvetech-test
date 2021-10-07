import SessionStorageUtils from '@utils/SessionStorageUtils';

export default class SessionStoreHelper {
    constructor(private prefix: string) {}

    read(key?: string): any {
        return SessionStorageUtils.read(this.keyName(key));
    }

    write(value: any, key?: string) {
        SessionStorageUtils.write(this.keyName(key), value);
    }

    keyName(key?: string): string {
        return key ? `${this.prefix}__${key}` : this.prefix;
    }
}
