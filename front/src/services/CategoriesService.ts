import { httpClient, HttpResponse } from '@api';

export default {
    findAll(): Promise<HttpResponse> {
        return httpClient.get('/api/v1/categories');
    },
};
