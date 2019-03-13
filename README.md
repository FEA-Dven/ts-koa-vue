# typescript vue project

通过koa2引入webpack配置文件进行构建，用babel-loader, ts-loader解析ts文件。前端的server用gulp编译。功能包含了router,vuex,axios。

# 开始项目

### 安装
```shell
npm install
```

### 运行开发环境
```shell
npm run dev
```

### 打开项目地址
```
http://localhost:3030/tsvue/home
```

### 构建线上环境
```
npm run package
```
```
node prodserver.js
```
```
pm2 start pm2.prod.json
```
* 注意：prodserver只是用来获取静态文件如js，图片之类，请放在自己的服务器或者配合nginx使用

### 遇到的问题
```
1. 如果遇到iview icon无法加载问题，将iviewfont中的三个文件替换掉node_module/iview/dist/styles/fonts里面的三个文件

