export const getDataUrl = (data: any): string => {
    let url: string = '';
    for (const key of Object.keys(data)) {
        if (typeof data[key] === 'boolean' || !isEmpty(data[key]) && data[key] !== '') {
            const symbol: string = url === '' ? '?' : '&';
            url += `${symbol}${key}=${data[key]}`;
        }
    }
    return url;
};

export const isEmpty = (val: any) => val === undefined || val === null || (typeof val === 'number' && isNaN(val));
