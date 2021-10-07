import AccountTreeIcon from '@mui/icons-material/AccountTree';
import ListIcon from '@mui/icons-material/List';
import Categories from '@pages/Categories';
import GoodsList from './pages/Goods/GoodsList';

export const mainRoute = 'goods'

export const mainMenuIcons = {
    AccountTreeIcon,
    ListIcon
}

export interface MenuItem {
    pathPattern: string;
    menuLink: string;
    component: any;
    caption: string;
    icon?: string;
    className?: string;
}

export const mainMenuItems: Array<MenuItem> = [
    {
        pathPattern: '/categories',
        menuLink: '/categories',
        component: Categories,
        caption: 'Категории товаров',
        icon: 'AccountTreeIcon',
    },
    {
        pathPattern: '/goods',
        menuLink: '/goods',
        component: GoodsList,
        caption: 'Список товаров',
        icon: 'ListIcon',
    }
]
