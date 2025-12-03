/*
 * @Author: SHUANG
 * @Date: 2023-08-15 16:48:33
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-08 14:19:03
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

// const DEV_PATH = 'http://127.0.0.1:99/';
// const DEV_PATH = 'http://192.168.178.214:80';
// export const DEV_PATH = 'http://192.168.3.206:1001/';
export const DEV_PATH = 'http://192.168.3.213:1002/';
// export const DEV_PATH = 'http://192.168.3.220:1888/';

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

    '/sys/attachment/downloadById.action': {
      target: DEV_PATH,
      changeOrigin: true,
    },
  },

  mock: {
    '/api/': {},
  },
};

export default proxy;
