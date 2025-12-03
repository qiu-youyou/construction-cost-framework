## 环境准备
先确保电脑已经安装了 Node.js 且版本 16.19 或以上
```bash
$ node -v
v16.19.1
```

## 推荐使用 nvm 管理 Node.js 版本(已安装请跳过)
```bash
# 可自行搜索并手动安装nvm包
$ brew install nvm
# 使用 nvm 安装需要的 Nodejs 版本
$ nvm install 16.19.1
# 安装完成后将 node 版本切换至 16.19.1
$ nvm use 16.19.1
# 检查 node 版本
$ node -v
v16.19.1
```

## 使用 yarn 来进行依赖管理（强制）(已安装请跳过)
```bash
# 使用 npm 安装 yarn 到全局
$ npm install -g yarn
# 检查 yarn 版本
$ yarn -v
v1.22.19
```

## npm | yarn 配置镜像加速 (下载速度问题 可选择配置)
```bash
# 配置 npm 镜像
$ npm config set registry https://registry.npmmirror.com
# 配置 yarn 镜像
$ yarn config set registry https://registry.npmmirror.com
```

## 使用yarn安装项目依赖
```bash
# 进入项目目录
$ cd yourapp
# 安装依赖
$ yarn
# 等待安装完成...
```

## 使用yarn安装平台包
``` bash
# 安装内部依赖 jd-framework-web
$ yarn add jd-framework-web --save --registry http://192.168.3.210:8081/repository/jonda-npm-group/
```

## 启动项目
```bash
# 以 mock 模式启动，该项目中接口请求，将请求到本项目的 mockJs 服务
$ yarn mock | npm run mock

# 以 dev 模式启动， 该项目中接口请求，会请求到 proxy.ts 中 DEV_PATH 的服务
$ yarn dev | npm run dev
```

## 构建项目
```bash
# 构建产物默认生成到 ./dist 下
$ yarn build | npm run build
```