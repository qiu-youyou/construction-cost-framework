/*
 * @Author: SHUANG
 * @Date: 2023-08-15 16:48:33
 * @LastEditors: lmc 1551943635@qq.com
 * @LastEditTime: 2024-04-26 16:17:56
 * @Description: 代理配置
 */

/**
 * 在生产环境 代理是无法生效的
 * target: 'https://xxx',
 * 要代理的地址 Address to proxy
 * changeOrigin: true,
 * 配置了这个可以从 http 代理到 https
 * With this configured, you can proxy from HTTP to HTTPS
 * 依赖 origin 的功能可能需要这个，比如 cookie
 * Functions that rely on origin may need this, such as cookies
 */
// export const DEV_PATH = 'http://192.168.3.213:1001/';
// export const DEV_PATH = 'http://192.168.3.126:1001/'; //· cj
// export const DEV_PATH = 'http://192.168.3.124:1001/'; // lzy
export const DEV_PATH = 'http://192.168.3.128:1001/'; // zs
// export const DEV_PATH = 'http://192.168.3.141:1001/'; // lh

const proxy: any = {
  dev: {
    '/api/': {
      target: DEV_PATH,
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },

    // 流程
    '/resources/workflow/': {
      target: DEV_PATH,
      changeOrigin: true,
    },

    '/workflow/**/*.action': {
      target: DEV_PATH,
      changeOrigin: true,
    },

    // 报表
    '/jonda/report': {
      target: DEV_PATH,
      changeOrigin: true,
    },

    '/ureport-html': {
      target: DEV_PATH,
      changeOrigin: true,
    },

    '/ureport-asserts': {
      target: DEV_PATH,
      changeOrigin: true,
    },

    // 在线客服
    '/jonda/onlineService': {
      target: DEV_PATH,
      changeOrigin: true,
    },

    '/xxl-job-admin': {
      target: DEV_PATH,
      changeOrigin: true,
    },

    // 静态资源
    '/static': {
      target: DEV_PATH,
      changeOrigin: true,
    },

    '/sys/static/attachment/resources/': {
      target: DEV_PATH,
      changeOrigin: true,
    },
  },

  mock: {
    '/api/': {},
  },
};

export default proxy;
