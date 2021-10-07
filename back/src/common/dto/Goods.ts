import Category from './Category';

export default class Goods {
    constructor(
        public id?: string,
        public name?: string,
        public price?: number,
        public expirationDate?: Date,
        public category?: Category,
    ) {
    }
}
