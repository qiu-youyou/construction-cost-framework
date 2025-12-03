/*
 * @Author: SHUANG
 * @Date: 2023-06-16 16:40:57
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-12-27 14:38:59
 * @Description: 运行时配置非常灵活，但是相应的性能可能比较差，
 * 非必要运行时配置 请到 config/layout 中配置
 */
import { RunTimeLayoutConfig } from 'umi';
import childrenRender from '../render/childrenRender';
import HeaderRightRender from '../render/HeaderRightRender';
import onPageChange from './onPageChange';

const layoutConfig: RunTimeLayoutConfig = ({ initialState }) => {
  const { settings, menuData, currentUser } = initialState || {};

  return {
    logo: settings?.logoImg,
    title: settings?.logoTitle,

    // menuDataRender	menuData的render 方法，用来自定义menuData -	(menuData: MenuDataItem[]) => MenuDataItem[]
    menuDataRender: () => menuData || [],

    // pageTitleRender	自定义页面标题的显示方法 - (props: ProLayoutProps) => string
    pageTitleRender: (props, _, info) => `${info?.pageName} - ${settings?.pageTitle || settings?.systemName}`,

    // headerContentRender 自定义头内容的方法	- (props: ProLayoutProps) => ReactNode
    // headerContentRender: () => `${settings?.headerTitle || settings?.systemName}`,

    rightContentRender: () => <HeaderRightRender />, // 用户头像

    // waterMarkProps	配置水印，水印是 PageContainer 的功能，layout 只是透传给 pagecontainer
    waterMarkProps: {
      content: settings?.waterMark || settings?.systemName,
      fontColor: 'rgba(0,0,0,.05)',
    },

    onPageChange: onPageChange(currentUser, menuData),
    childrenRender,
  };
};

export default layoutConfig;
