import * as Router from 'koa-router';
import TSVue from '../controller/tsvue';

const router = new Router();

router.get('/tsvue/*', TSVue.index);

export default router;
