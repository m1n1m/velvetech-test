import { httpClient, HttpResponse } from '@api';
import dayjs from 'dayjs';

export default {
    findAll(): Promise<HttpResponse> {
        return new Promise<HttpResponse>(resolve => {
            const cat1 = {id: 1, name: 'Алкоголь крепкий'};
            const cat17 = {id: 17, name: 'Напитки'};
            resolve(new HttpResponse([
                {id: 1, name: 'абсент', price: 1000.11, expirationDate: dayjs().toDate(), category: cat1},
                {id: 2, name: 'аквавит', price: 555.33, expirationDate: dayjs().toDate(), category: cat17},
                {id: 3, name: 'арак', price: 234.44, expirationDate: dayjs().toDate(), category: cat1},
                {id: 4, name: 'бренди', price: 4666.33, expirationDate: dayjs().toDate(), category: cat1},
                {id: 5, name: 'виски', price: 8765.2, expirationDate: dayjs().toDate(), category: cat1},
                {id: 6, name: 'джин', price: 235.33, expirationDate: dayjs().toDate(), category: cat1},
                {id: 7, name: 'маотай', price: 72352.22, expirationDate: dayjs().toDate(), category: cat1},
            ]))
        })
        // return httpClient.get('/api/v1/categories');
    },
};
