/*
 * @Author: SHUANG
 * @Date: 2023-07-07 11:59:09
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-12-28 15:00:45
 * @Description: 系统级别标签页
 */
import _get from 'lodash/get';
import classNames from 'classnames';
import { history, useLocation } from 'umi';
import type * as H from 'history-with-query';
import { useEffect, useMemo, useRef } from 'react';

import { useMemoizedFn } from 'ahooks';
import { Dropdown, Tabs } from 'antd';
import useSwitchTabs from 'use-switch-tabs';
import type { MenuProps } from 'antd/lib/menu';
import type { TabsProps } from 'antd/lib/tabs';
import type { ActionType, UseSwitchTabsOptions } from 'use-switch-tabs';

const homePathDefault = '/';

/** from components */
import styles from './index.less';

enum CloseTabKey {
  Current = 'current',
  Others = 'others',
  ToRight = 'toRight',
}

interface RouteTab {
  /** tab's title */
  tab: React.ReactNode;
  key: string;
  content: JSX.Element;
  closable?: boolean;
  /** used to extends tab's properties */
  location: Omit<H.Location, 'key'>;
}

export interface BaseSwitchTabsProps
  extends Omit<UseSwitchTabsOptions, 'location' | 'history'>,
    Omit<TabsProps, 'hideAdd' | 'activeKey' | 'onEdit' | 'onChange' | 'children'> {
  footerRender?: (() => React.ReactNode) | false;
  /** 指定首页 他将不会呗关闭 */
  homePath?: string;
  fixed?: boolean;
}

export default function BaseSwitchTabs(props: BaseSwitchTabsProps): JSX.Element {
  const { mode, fixed, setTabName, originalRoutes, footerRender, persistent, children, ...rest } = props;
  const homePath = props?.homePath || homePathDefault;
  const location = useLocation() as any;
  const actionRef = useRef<ActionType>();

  const {
    tabs: tabsList,
    activeKey,
    handleSwitch,
    handleRemove,
    handleRemoveOthers,
    handleRemoveRightTabs,
  } = useSwitchTabs({
    mode,
    setTabName,
    originalRoutes,
    persistent,
    children,
    location,
    history,
    actionRef,
  });

  const tabs = tabsList.filter((item) => !!item?.title);

  const remove = useMemoizedFn((key: string) => {
    handleRemove(key);
  });

  const handleTabEdit = useMemoizedFn((targetKey: string, action: 'add' | 'remove') => {
    if (action === 'remove') {
      remove(targetKey);
    }
  });

  const handleTabsMenuClick = useMemoizedFn((tabKey: string): MenuProps['onClick'] => (event) => {
    const { key, domEvent } = event;
    domEvent.stopPropagation();
    if (key === CloseTabKey.Current) {
      handleRemove(tabKey);
    } else if (key === CloseTabKey.Others) {
      handleRemoveOthers(tabKey);
    } else if (key === CloseTabKey.ToRight) {
      handleRemoveRightTabs(tabKey);
    }
  });

  const setMenu: any = useMemoizedFn((key: string, index: number) => [
    {
      disabled: key === homePath,
      key: CloseTabKey.Current,
      label: '关闭当前标签页',
    },
    {
      disabled: tabs.length === 1,
      key: CloseTabKey.Others,
      label: '关闭其他标签页',
    },
    {
      disabled: tabs.length === index + 1,
      key: CloseTabKey.ToRight,
      label: '关闭右侧标签页',
    },
  ]);

  const setTab = useMemoizedFn((tab: React.ReactNode, key: string, index: number) => (
    <span onContextMenu={(event) => event.preventDefault()}>
      <Dropdown
        trigger={['contextMenu']}
        menu={{
          onClick: handleTabsMenuClick(key),
          items: setMenu(key, index),
        }}
      >
        <span className={styles.tabTitle}>{tab}</span>
      </Dropdown>
    </span>
  ));

  useEffect(() => {
    window.tabsAction = actionRef.current!;
  }, []);

  const footer = useMemo(() => {
    if (typeof footerRender === 'function') {
      return footerRender();
    }
    return footerRender;
  }, [footerRender]);

  return (
    <Tabs
      tabPosition="top"
      type="editable-card"
      // animated
      className={classNames('switch-tabs', { 'switch-tabs-fixed': fixed })}
      onEdit={handleTabEdit as TabsProps['onEdit']}
      tabBarStyle={{ margin: 0 }}
      onChange={handleSwitch}
      activeKey={activeKey}
      tabBarGutter={0}
      {...rest}
      hideAdd
      items={tabs.map((item, index) => ({
        key: item.key,
        closable: item.key !== homePath && item.closable,
        forceRender: _get(persistent, 'force', false),
        label: setTab(item.title, item.key, index),
        children: [
          <main key="main" className={styles.content}>
            {item.content}
          </main>,
          footer,
        ],
      }))}
    />
  );
}
