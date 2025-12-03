---
title:  Info
sidemenu: true
order: 0
---



### yarn 私服
```
http://192.168.3.210:8081/repository/jonda-npm-group/
```

### svn 脚手架仓库
```
svn://121.42.239.165/jonda-rigger/jd-web-rigger
```

### 设计规范
```
https://js.design/f/P2BK0Q
```

### 平台包
```bash
$ yarn add jd-framework-web --save
```

### 预算3.0包
```bash
# 等待ing...
```

### 工程量清单包
```bash
# 等待ing...
```


### 脚手架概览
当我们 checkout 完项目之后会看到如下的目录结构
```
- config              * 项目的相关配置，路由、代理、主题等
- mock                * 在Mock模式下启动依赖的测试数据
- public              * 部署官网所用的静态文件
- src                 * 项目源码目录
  - app               * 布局 渲染 网络等配置
  - common            * 存放公共的业务组件
  - components        * 存放公共组件
  - pages             * 具体业务模块
  - styles            * 样式文件
  - utils             * 自定义工具函数
  - app.tsx           * app配置
- .prettierrc        * prettier 的相关配置
- package.json       * 项目信息及依赖信息
- tsconfig.json      * typescript 的配置
- yarn.lock          * 依赖的 lock 文件
- README.md          * 主要介绍
```