
export default class SessionStorageUtils {

    public static write (key: string, value: any, prefix?: string) {
        sessionStorage.setItem(prefix ? `${prefix}__${key}` : key, JSON.stringify(value));
    }

    public static read (key: string, prefix?: string): string | number | null {
        const val = sessionStorage.getItem(prefix ? `${prefix}__${key}` : key);
        if (val) {
        return JSON.parse(val);
        }
        return null;
    }

    public static remove (key: string, prefix?: string) {
        const val = sessionStorage.getItem(prefix ? `${prefix}__${key}` : key);
        if (val) {
        sessionStorage.removeItem(prefix ? `${prefix}__${key}` : key);
        }
    }
}
