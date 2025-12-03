/*
 * @Author: SHUANG
 * @Date: 2022-07-13 11:43:42
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-29 18:09:22
 * @Description:
 */

import { FormColumnsDefine } from '../../../../components/BaseSchemaForm/typings';
import VERIFICATION from '../../../constant/verification';
import { ENUMISSHOW } from '../../../constant/valueEnum';

import { AuthBtnActionItem, MenuActionItem } from './typings';

import ICONMAP from '../../../../common/constant/iconMap';
import React from 'react';
import { throttle } from 'lodash';

const ICONMAPOptions: any = [];
for (const key in ICONMAP) {
  ICONMAPOptions.push({
    label: (
      <span className="SelectIcons">
        {ICONMAP[key]} {key}
      </span>
    ),
    value: key,
  });
}

/** menu schema */
const menuFormColumns: FormColumnsDefine<MenuActionItem> = [
  {
    dataIndex: 'parentId',
    hideInForm: true,
  },
  {
    dataIndex: 'id',
    hideInForm: true,
  },
  {
    title: '菜单名称',
    dataIndex: 'menuName',
    formItemProps: { rules: VERIFICATION.required },
  },
  {
    title: '菜单路径',
    dataIndex: 'menuRoute',
    // formItemProps: { rules: VERIFICATION.required },
  },
  {
    title: '菜单Key',
    dataIndex: 'menuKey',
    formItemProps: { rules: VERIFICATION.required },
  },
  {
    title: '菜单图标',
    valueType: 'select',
    dataIndex: 'menuIcon',
    selectWritingIn: true,
    customFieldProps: {
      options: ICONMAPOptions,
      // showSearch: true,
      // filterOption: throttle((input: string, option?: { label: string; value: string }) => {
      //   const res = (option?.value ?? '').toLowerCase().includes(input.toLowerCase());
      //   return res;
      // }, 800),
    },
  },
  {
    title: '顺序',
    dataIndex: 'billSort',
    valueType: 'digit',
  },
  {
    title: '是否显示',
    dataIndex: 'menuShow',
    valueType: 'select',
    tooltip: '该节点是否显示于系统菜单中',
    valueEnum: ENUMISSHOW,
  },
];

/** menu button schema */
const btnFormColumns: FormColumnsDefine<AuthBtnActionItem> = [
  {
    dataIndex: 'id',
    hideInForm: true,
  },
  {
    dataIndex: 'businessId',
    hideInForm: true,
  },
  {
    title: '权限值',
    dataIndex: 'value',
    formItemProps: { rules: VERIFICATION.required },
  },
  {
    title: '权限名称',
    dataIndex: 'label',
    formItemProps: { rules: VERIFICATION.required },
  },
  {
    title: '顺序',
    dataIndex: 'billSort',
    valueType: 'digit',
  },
];

export default () => {
  return {
    btnFormColumns,
    menuFormColumns,
  };
};
