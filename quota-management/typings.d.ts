/*
 * @Author: SHUANG
 * @Date: 2023-06-15 16:00:29
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-07-19 16:55:48
 * @Description:
 */
declare module '*.css';
declare module '*.less';
declare module '*.png';
declare module '*.svg' {
  export function ReactComponent(props: React.SVGProps<SVGSVGElement>): React.ReactElement;
  const url: string;
  export default url;
}

interface Window {
  JSEncrypt: any;
  tabsAction: {};
}
