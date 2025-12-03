/*
 * @Author: SHUANG
 * @Date: 2023-08-01 11:40:53
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-10-13 15:45:40
 * @Description: 目录结构维护 tree
 */
import BaseTree from '../../../../../../components/BaseTree';
import { BaseTreeProps } from '../../../../../../components/BaseTree/typings';
import { TableToolbarDefine } from '../../../../../../components/BaseTable/typings';
import StatusText from '../../../../../textTag/StatusText';

import { FieldClassListItem } from '../../typings';
import useFormColumns from './useFormColumns';

import {
  customClassUpdateStatusByIds,
  customClassQueryPageInfo,
  customClassDeleteByIds,
  customClassSave,
} from '../../services';

type Props = { setClassCurrent: React.Dispatch<React.SetStateAction<FieldClassListItem | undefined>> };

const actionProps = {
  schemaFormProps: { grid: true, colProps: { span: 24 } },
  modalProps: { width: 460 },
};

export default (props: Props) => {
  /** 设置当前目录 */
  const { setClassCurrent } = props;

  /** 自定义查询操作 */
  const toolbar: TableToolbarDefine<FieldClassListItem> = {
    plus: { columns: useFormColumns, ...actionProps, onSubmit: customClassSave },
    edit: { columns: useFormColumns, ...actionProps, onSubmit: customClassSave },
    enable: { onSubmit: customClassUpdateStatusByIds },
    disable: { onSubmit: customClassUpdateStatusByIds },
    deleted: {
      actionControl: { key: 'billStatus', value: '3', message: '启用状态的数据不允许删除!', equal: true },
      onSubmit: customClassDeleteByIds,
    },
  };

  const generateTree: BaseTreeProps<FieldClassListItem> = {
    service: { dataSourceRequest: customClassQueryPageInfo },
    fieldNames: { key: 'id', children: 'chidren', title: 'businessName' },
    titleRender: ({ businessName, billStatus }) => [
      <span key="name">{businessName}</span>,
      <StatusText key="status" type="text" status={billStatus} />,
    ],
    onCurrent: setClassCurrent,
    toolbarAuthority: true,
    defaultExpandAll: true,
    localRetrieval: true,
    checkable: true,
    height: 780,
    toolbar,
  };

  return <BaseTree {...generateTree} />;
};
