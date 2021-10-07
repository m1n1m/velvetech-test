import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { APP_URL } from '@src/config';
import HttpResponse from '@src/api/HttpResponse';

export class HttpClient {

    private axios: AxiosInstance;

    constructor() {

        this.axios = axios.create({
            baseURL: APP_URL,
            responseType: 'json',
            headers: {
                'content-type': 'application/json',
            },
        });
    }

    get<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<HttpResponse> {
        return this.axios
            .get(url, config)
            .then((response: any) => {
                return new HttpResponse(response.data);
            })
            .catch((error: any) => {
                return new HttpResponse(undefined, error);
            });
    }

    delete<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<HttpResponse> {
        return this.axios
            .delete(url, config)
            .then((response: any) => {
                return new HttpResponse(response.data);
            })
            .catch((error: any) => {
                return new HttpResponse(undefined, error);
            });
    }

    head<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
        return this.axios.head(url, config);
    }

    options<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
        return this.axios.options(url, config);
    }

    post<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<HttpResponse> {
        return this.axios
            .post(url, data, config)
            .then((response: any) => {
                return new HttpResponse(response.data);
            })
            .catch((error: any) => {
                return new HttpResponse(undefined, error);
            });
    }

    put<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<HttpResponse> {
        return this.axios
            .put(url, data, config)
            .then((response: any) => {
                return new HttpResponse(response.data);
            })
            .catch((error: any) => {
                return new HttpResponse(undefined, error);
            });
    }

    patch<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<HttpResponse> {
        return this.axios
            .patch(url, data, config)
            .then((response: any) => {
                return new HttpResponse(response.data);
            })
            .catch((error: any) => {
                return new HttpResponse(undefined, error);
            });
    }
}

const httpClient = new HttpClient();
export default httpClient;
