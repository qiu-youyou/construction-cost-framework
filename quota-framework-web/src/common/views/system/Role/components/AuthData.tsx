/*
 * @Author: SHUANG
 * @Date: 2022-08-18 09:07:20
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-09-21 17:26:01
 * @Description: 分配数据权限
 */

import { useState } from 'react';
import useRequest from '@ahooksjs/use-request';
import { Button, message, Radio, RadioChangeEvent } from 'antd';

import BaseTree from '../../../../../components/BaseTree';
import BaseCard from '../../../../../components/BaseCard';
import BaseModal from '../../../../../components/BaseModal';
import ViewContainer from '../../../../../components/ViewContainer';
import { BaseTreeProps } from '../../../../../components/BaseTree/typings';
import SplitPane, { PaneContainer } from '../../../../../components/SplitPane';

import { queryDictItemByClassCode } from '../../../../services/system';
import StatusText from '../../../../textTag/StatusText';

import { menuBtnSave, queryRoleTreeNodeAllAuth } from '../services';
import { MenuListItem } from '../../Menu/typings';

const style = {
  height: 500,
  border: '1px solid #f0f0f0',
};

type PropsDefine = { roleId?: string };

export default ({ roleId }: PropsDefine) => {
  const [currentMenu, setCurrentMenu] = useState<MenuListItem>();
  const [treeData, setTreeData] = useState<MenuListItem[]>();
  const [modifyMenu, setModifyMenu] = useState<{ menuId: string; auth: number }[]>();

  const { loading, data: authList } = useRequest(() => queryDictItemByClassCode(['SJQX']));

  const handleClick = async () => {
    if (!roleId) return;
    const res = await queryRoleTreeNodeAllAuth({ roleId: roleId });
    if (res?.status !== 'SUCCESS') return;
    setTreeData(res?.rows);
    setModifyMenu(undefined);
  };

  /**  生成 Tree */
  const generateTree: BaseTreeProps<MenuListItem> = {
    localRetrieval: true,
    defaultExpandAll: true,
    defaultSelection: false,
    onCurrent: (record) => setCurrentMenu(record),
    titleRender: ({ menuName, billStatus }) => [
      <span key="name">{menuName}</span>,
      !roleId && <StatusText key="status" type="text" status={billStatus} />,
    ],
    fieldNames: { key: 'id', children: 'chidren', title: 'menuName' },
    dataSource: treeData,
  };

  const onSubmit = async () => {
    if (!modifyMenu?.length) {
      message.success('保存成功');
      return;
    }
    return await menuBtnSave({
      'auth.menuId[]': modifyMenu.map((item) => item.menuId),
      'auth.auth[]': modifyMenu.map((item) => item.auth),
      roleId: roleId || '',
    });
  };

  const onChange = (e: RadioChangeEvent) => {
    if (!currentMenu || !treeData?.length) return;
    const modifyCurrent = { ...currentMenu, dataAuthority: e.target.value };
    // treeData?.filter
    const sourceArr = [...treeData];
    sourceArr?.forEach((item) => {
      if (item.id === modifyCurrent.id) {
        item.dataAuthority = modifyCurrent.dataAuthority;
      } else if (!!item?.children?.length) {
        item.children.forEach((child) => {
          if (child.id === modifyCurrent.id) {
            child.dataAuthority = modifyCurrent.dataAuthority;
          }
        });
      }
    });
    setCurrentMenu(modifyCurrent);
    setModifyMenu([...(modifyMenu || []), { menuId: modifyCurrent.id, auth: modifyCurrent.dataAuthority }]);
    setTreeData([...sourceArr]);
  };

  return (
    <BaseModal
      width={1000}
      okText="授权"
      title="分配数据权限"
      onSubmit={onSubmit}
      trigger={
        <Button className="BorderButtonPurple" onClick={handleClick}>
          分配数据权限
        </Button>
      }
      defaultFullScreen
      submiterAsHeader
    >
      <section style={style}>
        <ViewContainer scroll="percent">
          <SplitPane>
            <PaneContainer width={340}>
              <BaseCard title="菜单树">{!!treeData?.length && <BaseTree {...generateTree} />}</BaseCard>
            </PaneContainer>

            <PaneContainer flex>
              <BaseCard title="数据权限">
                <section style={{ padding: 20 }}>
                  <Radio.Group value={currentMenu?.dataAuthority} onChange={onChange}>
                    {!loading &&
                      authList?.rows?.SJQX?.map((item: any) => (
                        <Radio value={+item.value} key={item.value}>
                          {item.label}
                        </Radio>
                      ))}
                  </Radio.Group>
                </section>
              </BaseCard>
            </PaneContainer>
          </SplitPane>
        </ViewContainer>
      </section>
    </BaseModal>
  );
};
