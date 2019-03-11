export interface APIHOST {
    [index: string]: string;
}

const ENV = process.env.NODE_ENV || 'my';
const API_HOSTS: APIHOST = {
    my: 'https://yourweb.com'
};

export const API_HOST = API_HOSTS.my;
