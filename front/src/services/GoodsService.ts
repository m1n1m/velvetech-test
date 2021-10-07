import { httpClient, HttpResponse } from '@api';
import Goods from '@src/models/Goods';
import dayjs from 'dayjs';

export default {
    findAll(): Promise<HttpResponse> {
        return httpClient.get('/api/v1/goods');
    },

    findById(id: string): Promise<HttpResponse> {
        return httpClient.get(`/api/v1/goods/${id}`);
    },

    create(goods: Goods): Promise<HttpResponse> {
        return httpClient.post(`/api/v1/goods`, goods);
    },

    update(goods: Goods): Promise<HttpResponse> {
        return httpClient.put(`/api/v1/goods`, goods);
    },
};
