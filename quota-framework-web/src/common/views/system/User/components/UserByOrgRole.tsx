/*
 * @Author: SHUANG
 * @Date: 2023-09-14 15:01:04
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-10-13 11:07:48
 * @Description: 用户查看所属组织机构及角色
 */

import {
  NodeIndexOutlined,
  LoadingOutlined,
  DeploymentUnitOutlined,
  UserSwitchOutlined,
} from '@ant-design/icons';
import { Button, Tag } from 'antd';
import { CSSProperties, useState } from 'react';

import ModalButton from '../../../../../components/ActionButton/ModalButton';
import SpaceView from '../../../../../components/ViewContainer/SpaceView';
import BaseCard from '../../../../../components/BaseCard';

import { useMount } from '../../../../../utils/util/uses';
import { queryOrgInfoByUserId, queryRoleInfoByUserId } from '../services';
import { UserListItem } from '../typings';

type Props = { tableActionCurrent?: UserListItem };

const tabConentStyle: CSSProperties = { padding: '5px 0px' };

/** 用户所属组织机构 */
const UserOrgInfo = ({ props }: { props: Props }) => {
  if (!props?.tableActionCurrent?.id) return <></>;

  const { tableActionCurrent } = props;
  const [loading, setLoading] = useState<boolean>();
  const [userOrgInfo, setUserOrgInfo] = useState<string[]>();

  const { id } = tableActionCurrent;
  const fetchInfoByUserId = async () => {
    setLoading(true);
    const res = await queryOrgInfoByUserId({ id });
    setLoading(false);
    setUserOrgInfo(res?.rows);
  };

  useMount(fetchInfoByUserId);

  return (
    <div style={tabConentStyle}>
      {loading ? (
        <LoadingOutlined />
      ) : (
        userOrgInfo?.map((item, dx) => (
          <Tag key={dx} style={{ width: '100%', marginBottom: 5 }}>
            <span style={{ display: 'inline-block', fontSize: 13, padding: 4, color: '#00489d' }}>
              <DeploymentUnitOutlined style={{ marginRight: 5 }} /> {item}
            </span>
          </Tag>
        ))
      )}
    </div>
  );
};

/** 用户所属组织机构 */
const UserRoleInfo = ({ props }: { props: Props }) => {
  if (!props?.tableActionCurrent?.id) return <></>;

  const { tableActionCurrent } = props;
  const [loading, setLoading] = useState<boolean>();
  const [userRoleInfo, setUserRoleInfo] = useState<string[]>();

  const { id } = tableActionCurrent;
  const fetchInfoByUserId = async () => {
    setLoading(true);
    const res = await queryRoleInfoByUserId({ id });
    setLoading(false);
    setUserRoleInfo(res?.rows);
  };

  useMount(fetchInfoByUserId);

  return (
    <div style={tabConentStyle}>
      {loading ? (
        <LoadingOutlined />
      ) : (
        userRoleInfo?.map((item, dx) => (
          <Tag key={dx} style={{ width: '100%', marginBottom: 5 }}>
            <span style={{ display: 'inline-block', fontSize: 13, padding: 4, color: '#00489d' }}>
              <UserSwitchOutlined style={{ marginRight: 5 }} /> {item}
            </span>
          </Tag>
        ))
      )}
    </div>
  );
};

export default (props: Props) => {
  // 弹窗内容
  const modalRender = (
    <section style={{ height: 360 }}>
      <BaseCard
        title={false}
        headerBordered={false}
        extraFullScreen={false}
        tabs={{ type: 'line', animated: true }}
      >
        <BaseCard.TabPane tab="组织机构" key="1">
          <SpaceView>
            <UserOrgInfo props={props} />
          </SpaceView>
        </BaseCard.TabPane>

        <BaseCard.TabPane tab="用户角色" key="2">
          <SpaceView>
            <UserRoleInfo props={props} />
          </SpaceView>
        </BaseCard.TabPane>
      </BaseCard>
    </section>
  );

  const buttonTrigger = (
    <Button className="BorderButtonBlue">
      <NodeIndexOutlined /> 查看组织及角色
    </Button>
  );

  const Render = (
    <ModalButton
      trigger={buttonTrigger}
      current={props?.tableActionCurrent}
      modalProps={{ width: 600, defaultFullScreen: false }}
      modalTitle="查看组织及角色"
      render={modalRender}
    />
  );

  return Render;
};
