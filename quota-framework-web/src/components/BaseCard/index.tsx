/*
 * @Author: SHUANG
 * @Date: 2023-08-15 14:09:28
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-09-18 15:23:17
 * @Description: BaseCard
 */
import { useState } from 'react';
import { Button, Space, Tooltip } from 'antd';
import { CompressOutlined, ExpandOutlined, RightOutlined } from '@ant-design/icons';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import ProCard from '@ant-design/pro-card';

/** from components */
import styles from './index.less';
import * as TYPES from './typings';
import * as DATA from './data';

const BaseCard = (prop: TYPES.BaseCardProps) => {
  /** 生成默认配置 */
  const props = { ...DATA.defaultProps, ...prop };
  /** use FullScreen */
  const fullScreenHandle = useFullScreenHandle();
  /** 面板否可折叠 */
  const [collapsed, setCollapsed] = useState<boolean>(false);
  /** 面板是否全屏 */
  const [fullScreened, setFullScreened] = useState<boolean>(false);

  /** 全屏幕切换 */
  const fullScreenedToggle = () => {
    fullScreened ? fullScreenHandle.exit() : fullScreenHandle.enter();
    setFullScreened(!fullScreened);
  };

  /** 标题区域额外的
   * 一级标题默认不显示可折叠可全屏面板功能 */
  const {
    type: cardType,
    extraCollapsed: extraCollapsedProps,
    extraFullScreen: extraFullScreenProps,
  } = props;
  let extraCollapsed = cardType === 'H2';
  let extraFullScreen = cardType === 'H2';
  if (extraCollapsedProps === true) extraCollapsed = true;
  if (extraFullScreenProps === true) extraFullScreen = true;
  if (typeof extraCollapsedProps == 'boolean' && extraCollapsedProps === false) extraCollapsed = false;
  if (typeof extraFullScreenProps == 'boolean' && extraFullScreenProps === false) extraFullScreen = false;

  const extraRender = (
    <Space size={3} className="extraBtn">
      {extraFullScreen && (
        <Tooltip title={fullScreened ? '退出全屏' : '全屏显示'} mouseEnterDelay={0.5}>
          <Button onClick={fullScreenedToggle}>
            {fullScreened ? <CompressOutlined /> : <ExpandOutlined />}
          </Button>
        </Tooltip>
      )}

      {extraCollapsed && (
        <Tooltip title={collapsed ? '展开内容' : '收起内容'} mouseEnterDelay={0.5}>
          <Button onClick={() => setCollapsed(!collapsed)}>
            <RightOutlined rotate={!collapsed ? 90 : undefined} />
          </Button>
        </Tooltip>
      )}
    </Space>
  );

  /** 如果没有渲染默认按钮 那么 去掉间隙 */
  const extra = (
    <>
      {props.extraCollapsed || props.extraFullScreen ? (
        <Space size={3}>
          {props.extra} {extraRender}
        </Space>
      ) : (
        <Space size={3}>
          {extraRender} {props.extra}
        </Space>
      )}
    </>
  );

  const tabs = !!props.tabs ? { ...prop.tabs } : props.tabs;
  const classNameCard = !!props.noHeader ? styles.baseCardSectionNoHeader : styles.baseCardSection;
  const classNameProCard = props.type === 'H2' ? 'hasBgc BaseProCard' : 'BaseProCard';
  return (
    <div className={classNameCard + ' jonda-base-card-section'}>
      <FullScreen handle={fullScreenHandle}>
        <ProCard
          title={props.title}
          collapsed={collapsed}
          subTitle={props.subTitle}
          headerBordered={props.headerBordered}
          className={classNameProCard}
          bordered={props.bordered}
          extra={extra}
          tabs={tabs}
        >
          {!!props.tabs ? (
            props.children
          ) : (
            <div className={styles.ProCardChildren + ' spaceview-card-children'}>{props.children}</div>
          )}
        </ProCard>
      </FullScreen>
    </div>
  );
};

BaseCard.TabPane = ProCard.TabPane;

export default BaseCard;
