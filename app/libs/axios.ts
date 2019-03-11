import Axios from 'axios';
import { API_HOST } from './../config';
console.log(API_HOST);

class HttpRequest {
    private queue: any;
    private options: any;
    constructor () {
        this.options = {
            method: '',
            url: ''
        };
        // 存储请求队列
        this.queue = {};
    }

    // 销毁请求实例
    private destroy (url: string) {
        delete this.queue[url];
        const queue = Object.keys(this.queue);
        return queue.length;
    }

    // 请求拦截
    private interceptors (instance: any, url: string) {
        // 添加响应拦截器
        instance.interceptors.response.use((res: any) => {
            const { data } = res;
            if (data.err !== 0 ) {
                data.msg && console.error(data.msg);
                return Promise.reject(data);
            } else {
                return Promise.resolve(data.data);
            }
        }, (error: any) => {
            const res = error.response || { data: { msg: 'no response' } };
            res.data.msg && console.error(res.data.msg);
            // 用户权限失效，重新登录
            return Promise.reject(res.data);
        });
    }

    // 创建实例
    private create () {
        const conf = {
            baseURL: API_HOST,
            // timeout: 2000,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'X-URL-PATH': (window as any).location.pathname,
                'fid': 1,
                'token': '4c7e0f30-43cc-11e9-9fa6-3ddd14466cfb'
            }
        };
        return Axios.create(conf);
    }

    // 请求实例
    private request (options: any) {
        const instance = this.create();
        this.interceptors(instance, options.url);
        options = Object.assign({}, options);
        this.queue[options.url] = instance;
        return instance(options);
    }
}
export default HttpRequest;
