import {Context} from "koa";
import GoodsService from "../service/GoodsService";

export async function getAll(context: Context) {
    context.body = await GoodsService.findAll();
}

export async function getById(context: Context) {
    const { id } = context.params;
    context.body = await GoodsService.findById(id);
}

export async function create(context: Context) {
    context.body = await GoodsService.create(context.request.body);
}

export async function update(context: Context) {
    context.body = await GoodsService.update(context.request.body);
}

export function initRoutes(appRoutes: any[]) {
    appRoutes.push(
        {
            path: "/api/v1/goods",
            method: "get",
            action: getAll
        }
    );
    appRoutes.push(
        {
            path: "/api/v1/goods/:id",
            method: "get",
            action: getById
        }
    );
    appRoutes.push(
        {
            path: "/api/v1/goods",
            method: "post",
            action: create
        }
    );
    appRoutes.push(
        {
            path: "/api/v1/goods",
            method: "put",
            action: update
        }
    );
}
