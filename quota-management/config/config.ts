/*
 * @Author: SHUANG
 * @Date: 2023-06-15 16:38:33
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-10-07 17:19:40
 * @Description: umi 配置文件
 */
import proxy from './proxy';
import routes from './routes';
import { defineConfig } from 'umi';
import layout from './layout';
import theme from './theme';

const { APP_ENV } = process.env;

export default defineConfig({
  antd: { compact: false },
  alias: {}, // 配置别名，对引用路径进行映射
  cssLoader: { localsConvention: 'camelCase' }, // ClassName 类名变成驼峰命名形式
  locale: { default: 'zh-CN', antd: true, baseNavigator: false },

  devServer: { host: '0.0.0.0', port: 8000 }, // 配置开发服务器。
  // dynamicImport: { loading: '@/common/views/result/Loading' }, // 是否启用按需加载，即是否把构建产物进行拆分，在需要的时候下载额外的 JS 再执行。
  exportStatic: {}, // 配置 html 的输出形式

  esbuild: {}, // esbuild是构建工具之父

  forkTSChecker: false, // 开启 TypeScript 编译时类型检查，默认关闭。
  fastRefresh: {}, // 快速刷新（Fast Refresh），开发时可以保持组件状态，同时编辑提供即时反馈。

  hash: true, // 配置是否让生成的文件包含 hash 后缀，通常用于增量发布和避免浏览器加载缓存。

  ignoreMomentLocale: true, // 忽略 moment 的 locale 文件，用于减少尺寸。
  inlineLimit: 10000, // 配置图片文件是否走 base64 编译的阈值。默认是 10000 字节

  // mfsu: {}, // 热更新有点慢，试试新出的 MFSU 方案 开启该功能将会自动开启 webpack5 和 dynamicImport. 控制台有警告
  nodeModulesTransform: { type: 'none' }, // 设置 node_modules 目录下依赖文件的编译方式。

  webpack5: {}, // 使用 webpack 5 代替 webpack 4 进行构建。

  // outputPath: '/dist', //  指定输出路径。
  // publicPath: '/dist/',
  // base: '/dist/',
  proxy: proxy[APP_ENV || 'dev'], // 配置代理'
  request: { dataField: 'rows' },
  layout, // 布局配置
  routes, // 路由配置
  theme, // 配置主题
});
