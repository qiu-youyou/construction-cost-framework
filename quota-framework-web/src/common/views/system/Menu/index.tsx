/*
 * @Author: SHUANG
 * @Date: 2023-07-21 13:37:41
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-01-15 15:58:52
 * @Description: 菜单管理
 */
import { Button, Modal } from 'antd';
import BaseTree from '../../../../components/BaseTree';
import BaseCard from '../../../../components/BaseCard';
import BaseTable from '../../../../components/BaseTable';
import ViewContainer from '../../../../components/ViewContainer';
import { BaseTreeProps } from '../../../../components/BaseTree/typings';

import SplitPane, { PaneContainer } from '../../../../components/SplitPane';
import { useImperativeHandle, useRef, useState } from 'react';
import {
  BaseTableProps,
  TableToolbarDefine,
  TableActionType,
} from '../../../../components/BaseTable/typings';

import useAuthButton from '../../../../utils/auth/useAuthButton';

import StatusText from '../../../textTag/StatusText';

import { menuBtnSave } from '../Role/services';
import useTableColumns from './useTableColumns';
import useFormColumns from './useFormColumns';
import * as TYPES from './typings';
import * as API from './services';

/** 对外报漏 Action 方法 */
export type MenuActionType = {
  getMenuAndBtnParams?: () => { addMenuId: string[]; addMenuBtnId: string[]; del: string[] };
  current: any;
};

type PropsDefine = { roleId?: string; actionRef?: MenuActionType };

const { menuFormColumns, btnFormColumns } = useFormColumns();
const { tableColumns, tableRoleColumns } = useTableColumns();

const Menu = ({ roleId, actionRef }: PropsDefine) => {
  const { auth } = useAuthButton();
  const [modal, contextHolder] = Modal.useModal();

  /** states */
  const [currentMenu, setCurrentMenu] = useState<TYPES.MenuListItem>();

  /** 获取按钮 */
  let sourceCheckedList: TYPES.AuthBtnListItem[] = [];
  const menuBtnQueryRolePageInfo = async (data?: FETCH.Req<TYPES.AuthBtnListParams>) => {
    const res = await API.MenuBtnQueryRolePageInfo(data);
    /** 获取数据源中选中 做对比 */
    if (!!res?.rows) {
      sourceCheckedList = res?.rows?.filter((item) => item.checked);
    }
    return res;
  };

  /** 菜单选中发生变化 */
  const [addMenuData, setAddMenuData] = useState<string[]>([]);
  const [delMenuData, setDelMenuData] = useState<string[]>([]);
  const menuOnSelections: BaseTreeProps['onCheck'] = (_, { checked, node }) => {
    //验证勾选状态
    if (checked) {
      // 查看菜单是历史是否存在勾选情况，如果没有则向addMenuData 添加
      if (!node?.roleMenuId) setAddMenuData([...addMenuData, node.id]);
      else setDelMenuData(delMenuData?.filter((item) => item !== node.roleMenuId));
    } else {
      // 查看菜单是历史是否存在勾选情况，如果没有则向delMenuData 添加
      if (node?.roleMenuId) setDelMenuData([...delMenuData, node.roleMenuId]);
      else setAddMenuData(addMenuData?.filter((item) => item !== node.roleMenuId));
    }
  };

  /** 按钮选中发生变化 */
  let addBtnData: string[] = [];
  const menuBtnCheckIds: { [index: string]: any } = {};
  const menuBtnDeleteIds: { [index: string]: any } = {};
  const menuBtnOnSelections = (records?: TYPES.AuthBtnListItem[]) => {
    if (!records) return;
    /** 数据中已经选中 */
    const checkedId = records.filter((item) => item.checked).map((item) => item.id);
    // 选中数据中check为true的数组 在返回已勾选数组中找不到的 为删除数据
    const removeIds = sourceCheckedList
      .filter((item) => checkedId.indexOf(item.id) === -1)
      .map((item) => item.roleMenuBtnId);
    // checked 属性为false 但是选中的 为新增数据
    const addIds = records.filter((item) => !item.checked).map((item) => item.id);
    // 存储当前菜单下的已经勾选的 数据
    menuBtnCheckIds[currentMenu?.id || ''] = records;
    menuBtnDeleteIds[currentMenu?.id || ''] = removeIds;
    addBtnData = [...addIds];
  };

  /** 获取当前完整的 菜单以及对应 按钮的 保存参数 */
  const getMenuAndBtnParams = () => {
    const btnDelIds = [];
    for (const key in menuBtnDeleteIds) {
      btnDelIds.push(...menuBtnDeleteIds[key]);
    }
    const del: string[] = [...delMenuData, ...btnDelIds];
    return { addMenuId: addMenuData, addMenuBtnId: addBtnData, del };
  };

  /** 保存更改 */
  const saveMenuAndBtnAuth = async () => {
    if (!roleId) return;
    const { addMenuId, addMenuBtnId, del } = getMenuAndBtnParams();
    if (!addMenuId?.length && !addMenuBtnId?.length && !del?.length) return;
    return await menuBtnSave({
      'add.menuId[]': addMenuId,
      'add.menuBtnId[]': addMenuBtnId,
      'del[]': del,
      roleId: roleId || '',
    });
  };

  /** ActionRef */
  const initUseImperativeHandle = () => ({
    getMenuAndBtnParams,
  });
  useImperativeHandle(actionRef, initUseImperativeHandle);

  /** 生成操作 */
  const treeToolbar: TableToolbarDefine<TYPES.MenuActionItem> = {
    enable: { onSubmit: API.menuUpdateStatusByIds },
    disable: { onSubmit: API.menuUpdateStatusByIds },
    plusLevel: { authKey: 'plus', modalTitle: '新增菜单', columns: menuFormColumns, onSubmit: API.menuSave },
    edit: { modalTitle: '编辑菜单', columns: menuFormColumns, onSubmit: API.menuSave },
    deleted: {
      actionControl: { key: 'billStatus', value: '3', message: '启用状态的数据不允许删除!', equal: true },
      onSubmit: API.menuDeleteByIds,
    },
  };

  /**  生成 Tree */
  const generateTree: BaseTreeProps<TYPES.MenuListItem> = {
    checkable: true,
    localRetrieval: true,
    toolbarAuthority: true,
    defaultExpandAll: true,
    toolbar: !roleId && treeToolbar,
    onCurrent: (record) => {
      setCurrentMenu(record);
      saveMenuAndBtnAuth();
    },
    onCheck: menuOnSelections,
    titleRender: ({ menuName, billStatus }) => [
      <span key="name">{menuName}</span>,
      !roleId && <StatusText key="status" type="text" status={billStatus} />,
    ],
    fieldNames: { key: 'id', children: 'chidren', title: 'menuName' },
    service: {
      dataSourceRequest: !roleId ? API.menuQueryTreeNodeAll : API.menuQueryRoleTreeNodeAll,
      params: { roleId },
    },
  };
  const tableAction = useRef<TableActionType>();

  /** 生成操作 */
  const toolbar: TableToolbarDefine<TYPES.AuthBtnActionItem> = {
    disable: { onSubmit: API.menuBtnUpdateStatusByIds },
    enable: { onSubmit: API.menuBtnUpdateStatusByIds },
    plus: { modalTitle: '新增权限按钮', columns: btnFormColumns, onSubmit: API.menuBtnSave },
    edit: { modalTitle: '新增权限按钮', columns: btnFormColumns, onSubmit: API.menuBtnSave },
    deleted: {
      actionControl: { key: 'billStatus', value: '3', message: '启用状态的数据不允许删除!', equal: true },
      onSubmit: API.menuBtnDeleteByIds,
    },
  };

  const handleInserDefaultButton = () => {
    modal.confirm({
      title: '继续操作',
      content: `生成默认权限，将产生一些数据在该列表中，是否继续？`,
      async onOk() {
        const res = await API.menuBtnInsertDefaultBtn({ businessId: currentMenu?.id });
        if (res?.status !== 'SUCCESS') return;
        tableAction.current?.reload?.();
      },
    });
  };

  /** 默认权限 */
  const toolbarAfter = (
    <Button className="BorderButtonBlue" onClick={handleInserDefaultButton}>
      生成默认权限
    </Button>
  );

  /** 生成 Table */
  const generateTable: BaseTableProps<TYPES.AuthBtnListItem, TYPES.AuthBtnListParams> = {
    persistenceKey: 'COMMONVIEWSSYSTEMMENUBTNTABLE',
    service: {
      dataSourceRequest: !roleId ? API.MenuBtnQueryPageInfo : menuBtnQueryRolePageInfo,
      params: { businessId: currentMenu?.id, roleId },
      manualRequest: !currentMenu?.id,
    },
    rowSelection: { columnWidth: !!roleId ? 20 : 40 },
    columns: !roleId ? tableColumns : tableRoleColumns,
    toolbarAfter: !roleId && auth('generate') && toolbarAfter,
    onSelections: menuBtnOnSelections,
    toolbar: !roleId && toolbar,
    actionRef: tableAction,
    toolbarAuthority: true,
    defaultSelection: true,
    virtual: false,
  };

  const MenuTitle = !!roleId ? '菜单授权' : '菜单管理';

  const MenuBtnTitle = !!roleId ? '按钮授权' : '按钮管理';

  return (
    <>
      <ViewContainer scroll={!!roleId ? 'percent' : 'vh'}>
        <SplitPane>
          <PaneContainer width={400}>
            <BaseCard title={MenuTitle}>
              <BaseTree {...generateTree} />
            </BaseCard>
          </PaneContainer>

          <PaneContainer flex>
            <BaseCard title={MenuBtnTitle}>
              <BaseTable {...generateTable} />
            </BaseCard>
          </PaneContainer>
        </SplitPane>
      </ViewContainer>
      {contextHolder}
    </>
  );
};

export default Menu;
