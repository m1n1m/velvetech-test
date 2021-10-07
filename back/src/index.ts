import "reflect-metadata";
import * as Koa from "koa";
import * as Router from "koa-router";
import * as bodyParser from "koa-bodyparser";
import {AppRoutes} from "./routes";
const cors = require('koa-cors');

// create koa app
const app = new Koa();
const router = new Router();

// register all application routes
AppRoutes.forEach(route => router[route.method](route.path, route.action));

// CORS
const corsOptions = {
    origin: '*'
};
app.use(cors(corsOptions));

// run app
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());
app.listen(5000);

