import axios from '@libs/api_request';
import * as UTIL from '@libs/util';

export interface GetMenuListOptions {
    fid: number;
    page_number: number;
    per_page: number;
}

export const getMenuList = ({ fid, page_number = 1, per_page = 100 }: GetMenuListOptions): Promise<any> => {
    return axios.request({
        url: `/api/menus${UTIL.getDataUrl({ fid, page_number, per_page })}`,
        method: 'GET'
    });
};
