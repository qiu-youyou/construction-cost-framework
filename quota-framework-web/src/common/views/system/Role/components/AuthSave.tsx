/*
 * @Author: SHUANG
 * @Date: 2022-07-12 10:15:10
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2022-08-18 10:19:06
 * @Description:
 */
import { Button } from 'antd';
import { useRef } from 'react';

import BaseModal from '../../../../../components/BaseModal';

import Menu, { MenuActionType } from '../../Menu';
import { menuBtnSave } from '../services';

const style = {
  height: 500,
  border: '1px solid #f0f0f0',
};

type PropsDefine = { roleId?: string };

export default (props: PropsDefine) => {
  const actionRef = useRef<MenuActionType>();

  const onSubmit = async () => {
    if (!actionRef?.current?.getMenuAndBtnParams) return Promise.reject();
    const { addMenuId, addMenuBtnId, del } = actionRef?.current?.getMenuAndBtnParams?.();
    return await menuBtnSave({
      'add.menuId[]': addMenuId,
      'add.menuBtnId[]': addMenuBtnId,
      'del[]': del,
      roleId: props.roleId || '',
    });
  };

  return (
    <BaseModal
      width={1000}
      okText="授权"
      title="分配菜单权限"
      onSubmit={onSubmit}
      trigger={<Button className="BorderButtonBlue">分配菜单权限</Button>}
      defaultFullScreen
      submiterAsHeader
    >
      <section style={style}>
        <Menu actionRef={actionRef} roleId={props.roleId || ''} />
      </section>
    </BaseModal>
  );
};
