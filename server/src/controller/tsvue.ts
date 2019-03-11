import * as Util from '../utils/util';
import { Context } from 'koa';

export default class TSVue {
    public static async index(ctx: Context) {
        await ctx.render('tsvue', {
            modules: [ctx.assets.tsvue],
        });
    }
}
