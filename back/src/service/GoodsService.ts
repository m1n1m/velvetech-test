import dayjs = require('dayjs');
import Goods from '../common/dto/Goods';

const cat1 = {id: '1', name: 'Алкоголь крепкий'};
const cat17 = {id: '17', name: 'Напитки'};
let mockGoods: Goods[] = [
    {id: '1', name: 'абсент', price: 1000.11, expirationDate: dayjs().toDate(), category: cat1},
    {id: '2', name: 'аквавит', price: 555.33, expirationDate: dayjs().toDate(), category: cat17},
    {id: '3', name: 'арак', price: 234.44, expirationDate: dayjs().toDate(), category: cat1},
    {id: '4', name: 'бренди', price: 4666.33, expirationDate: dayjs().toDate(), category: cat1},
    {id: '5', name: 'виски', price: 8765.2, expirationDate: dayjs().toDate(), category: cat1},
    {id: '6', name: 'джин', price: 235.33, expirationDate: dayjs().toDate(), category: cat1},
    {id: '7', name: 'маотай', price: 72352.22, expirationDate: dayjs().toDate(), category: cat1},
];

let maxId = 7;

export default {

    findAll(): Goods[] {
        return mockGoods;
    },

    findById(id: string): Goods {
        return mockGoods.find( g => g.id === id );
    },

    create(goods: Goods): Goods {
        goods.id = String(++maxId);
        mockGoods.push(goods);
        return goods;
    },

    update(goods: Goods): Goods {
        if (!goods.id) {
            throw 'id is empty!';
        }

        const goodsOld = this.findById(goods.id);
        goodsOld.name = goods.name;
        goodsOld.price = goods.price;
        goodsOld.expirationDate = goods.expirationDate;
        goodsOld.category = goods.category;
        return goodsOld;
    },

    deleteById(id: string) {
        mockGoods = mockGoods.filter(g => g.id !== id)
    },
}

