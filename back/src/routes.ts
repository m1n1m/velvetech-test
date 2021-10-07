import { initRoutes as initCategoriesRoutes} from "./controller/CategoriesController";
import { initRoutes as initGoodsRoutes} from "./controller/GoodsController";

/**
 * All application routes.
 */
export const AppRoutes = [];

initCategoriesRoutes(AppRoutes);
initGoodsRoutes(AppRoutes);
