/*
 * @Author: SHUANG
 * @Date: 2023-06-26 13:48:08
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-01-04 11:35:55
 * @Description:
 */

import { Mode } from 'use-switch-tabs';
import { BasicLayoutProps, GridContent, PageContainer } from '@ant-design/pro-layout';
import { ConfigProvider } from 'antd';
import { loginPath, changeForcePath } from '@/common/constant/path';

import SwitchTabsLayout from './SwitchTabsLayout';

const noPageContainerArr = [loginPath, changeForcePath];

export default function childrenRender(dom: JSX.Element, layoutProps: BasicLayoutProps) {
  const { route }: any = layoutProps;
  // login等用户模块 模块不包含 pageContainer
  const pathname = layoutProps.location?.pathname || '';
  const noPageContainer = noPageContainerArr.includes(pathname);
  const isDocs = pathname.includes('/~docs');

  // pagecontainer
  const pageContainer = (
    <GridContent>
      <div id="root-page">
        <ConfigProvider
          getPopupContainer={() => document.querySelector('.fullscreen-enabled') || document.body}
        >
          <PageContainer ghost header={{ title: false, breadcrumb: {} }}>
            <SwitchTabsLayout fixed={true} mode={Mode.Route} persistent={false} routes={route!.routes}>
              <div className="page-children">{dom}</div>
            </SwitchTabsLayout>
          </PageContainer>
        </ConfigProvider>
      </div>
    </GridContent>
  );

  return isDocs ? dom : noPageContainer ? <div id="root-page">{dom}</div> : pageContainer;
}
