import * as Koa from 'koa';
import { Context } from 'koa';
import * as xtpl from 'koa-xtpl';
import * as bodyParser from 'koa-bodyparser';
import Router from './router';
import config from './config/config';
const app = new Koa();
import path = require('path');
import * as koaWebpack from 'koa-webpack-middleware';
import * as webpack from 'webpack';
import webpackConfig from './webpack.config';
const env: string = config.env;
const port: string = config.port;
const isDev: boolean = env === 'dev';

interface Assets {
    tsvue: any;
}

if ( !env ) {
    throw new Error('检测不到config.env 请运维人员检查是否有server/config/config.js');
}

if ( !port ) {
    throw new Error('检测不到config.port 请运维人员检查是否有server/config/config.js');
}
app.use(bodyParser()); // 在ctx中加body

if (isDev) {
    const clientCompiler = webpack(webpackConfig);
    const devMiddleware = koaWebpack.devMiddleware;
    const hotMiddleware = koaWebpack.hotMiddleware;
    app.use(devMiddleware(clientCompiler, {
        stats: {
            colors: true,
        },
        publicPath: webpackConfig.output.publicPath,
    }));
    app.use(hotMiddleware(clientCompiler));
}

app.use(async function(ctx: Context, next: any) { // 设置环境和打包资源路径
    if (isDev) {
        const assets: Assets = {
            tsvue: {},
        };
        const publicPath: string = webpackConfig.output.publicPath;
        assets.tsvue = { js : publicPath + 'tsvue.js' };
        ctx.assets = assets;
    } else {
        ctx.assets = require('../../build/assets.json');
    }
    await next();
});

// 解析xtpl
app.use(
    xtpl({
        root: path.join(__dirname, './views/'),
        cache: !isDev,
    }),
);

// 初始化路由
app.use(Router.routes()).use(Router.allowedMethods());

app.listen(port, () => {
    console.log(`port at ${port}`);
});
