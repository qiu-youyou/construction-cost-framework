/*
 * @Author: SHUANG
 * @Date: 2023-06-15 21:46:01
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-12-27 14:40:18
 * @Description: layout 构建时配置
 */
import { Settings } from '@ant-design/pro-layout';
import { WaterMarkProps } from '@ant-design/pro-layout/lib/components/WaterMark';

export type LayoutSettings = Settings & {
  siderWidth?: number;
  breakpoint?: string;
  waterMarkProps?: WaterMarkProps;
};

const layout: LayoutSettings = {
  layout: 'mix', // layout的菜单模式 - side|top|mix
  splitMenus: true, //layout 为 mix 需打开
  contentWidth: 'Fluid', // layout的内容模式,自适应|定宽1200px - Fluid|Fixed
  fixedHeader: false, // 是否固定 header 到顶部 -	boolean
  fixSiderbar: true, // 是否固定导航 - boolean
  breakpoint: 'xl', // 触发响应式布局的断点
  siderWidth: 240, // 侧边菜单宽度 - number
  headerHeight: 50, // 顶栏高度 - number
  navTheme: 'dark', // realDark light dark
};

export default layout;
