import GoodsEdit from '@pages/Goods/GoodsEdit';

export interface AppRoute {
    pathPattern: string;
    component: any;
}

export const appRoutes: Array<AppRoute> = [
    {
        pathPattern: '/goods-edit/:id',
        component: GoodsEdit
    }
]
