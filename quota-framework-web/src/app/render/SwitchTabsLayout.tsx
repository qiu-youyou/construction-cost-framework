/*
 * @Author: SHUANG
 * @Date: 2023-07-07 11:57:49
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-09-25 16:22:50
 * @Description: 渲染系统级别标签页
 */
import { useLocation } from 'umi';
import _isArray from 'lodash/isArray';
import type * as H from 'history-with-query';
import { PageLoading } from '@ant-design/pro-layout';
import type { Route } from '@ant-design/pro-layout/lib/typings';
import type { Mode, RouteConfig } from 'use-switch-tabs';
import { isSwitchTab } from 'use-switch-tabs';

import type { BaseSwitchTabsProps } from '../../components/BaseSwitchTabs';
import BaseSwitchTabs from '../../components/BaseSwitchTabs';

export interface MakeUpRoute extends Route, Pick<RouteConfig, 'follow' | 'redirect'> {}

export interface RouteTabsLayoutProps
  extends Pick<BaseSwitchTabsProps, 'persistent' | 'fixed' | 'setTabName' | 'footerRender'> {
  mode?: Mode | false;
  loading?: boolean;
  routes?: MakeUpRoute[];
  children: React.ReactElement;
}

export default function BaseSwitchTabsLayout(props: RouteTabsLayoutProps): JSX.Element {
  const { mode, loading, routes, children, ...rest } = props;

  const location = useLocation() as H.Location;
  const originalTabsRoutes = routes!;

  if (mode && isSwitchTab(location as any, originalTabsRoutes)) {
    if (loading) return <PageLoading />;
    if (routes)
      return (
        <BaseSwitchTabs {...rest} mode={mode} originalRoutes={originalTabsRoutes}>
          {children}
        </BaseSwitchTabs>
      );
  }
  return children;
}
