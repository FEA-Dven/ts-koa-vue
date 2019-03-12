# typescript vue project

通过koa2引入webpack配置文件进行构建，用babel-loader, ts-loader解析ts文件。前端的server用gulp编译。功能包含了router,vuex,axios并且引入iview组件库

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

### 遇到的问题
```
1. 如果遇到iview icon无法加载问题，将iviewfont中的三个文件替换掉node_module/iview/dist/styles/fonts里面的三个文件

