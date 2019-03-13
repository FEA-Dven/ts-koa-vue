import path = require('path');

export default {
    env: process.env.NODE_ENV === 'prod' ? 'prod' : 'test',
    port: '3030',
    views: path.join(__dirname, '../views/')
};
