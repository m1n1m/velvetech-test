import dayjs = require('dayjs');
import Category from '../common/dto/Category';

const mockCategories = [
    {id: '1', name: 'Алкоголь крепкий'},
    {id: '2', name: 'Бакалея'},
    {id: '3', name: 'Вино и шампанское'},
    {id: '4', name: 'Горячие напитки'},
    {id: '5', name: 'Диетическое и здоровое питание'},
    {id: '6', name: 'Замороженные продукты'},
    {id: '7', name: 'Икра и рыбная гастрономия'},
    {id: '8', name: 'Колбасные изделия и мясные деликатесы'},
    {id: '9', name: 'Кондитерские изделия длительного хранения'},
    {id: '10', name: 'Кондитерские изделия короткого срока хранения'},
    {id: '11', name: 'Консервация'},
    {id: '12', name: 'Масла растительные, кетчупы, соусы'},
    {id: '13', name: 'Масло, майонез'},
    {id: '14', name: 'Молочные продукты'},
    {id: '15', name: 'Мороженое'},
    {id: '16', name: 'Мясо'},
    {id: '17', name: 'Напитки'},
    {id: '18', name: 'Овощи'},
    {id: '19', name: 'Овощи и плоды приготовленные'},
    {id: '20', name: 'Орехи, сухофрукты'},
];

let maxId = 20;

export default {

    findAll(): Category[] {
        return mockCategories;
    },

    create(category: Category): Category {
        category.id = String(++maxId);
        mockCategories.push(category);
        return category;
    }
}

