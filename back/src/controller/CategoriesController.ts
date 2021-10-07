import {Context} from "koa";
import CategoriesService from "../service/CategoriesService";

export async function getAll(context: Context) {
    context.body = await CategoriesService.findAll();
}

export async function create(context: Context) {
    context.body = await CategoriesService.create(context.request.body);
}

export function initRoutes(appRoutes: any[]) {
    appRoutes.push({path: "/api/v1/categories", method: "get", action: getAll});
    appRoutes.push({path: "/api/v1/categories", method: "post", action: create});
}
