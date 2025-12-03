import { TableColumnsDefine } from '../../../../components/BaseTable/typings';
import { valueEnumsRequest } from './services';
import { WorkListItem } from './typings';
import { useModel } from 'umi';

export default () => {
  const { initialState } = useModel('@@initialState');

  /** 递归处理菜单数据 */
  const handleMenuData = (arr?: any[]) => {
    return arr?.map((item: any) => {
      if (item?.children?.length) {
        const children: any = handleMenuData(item.children);
        return { ...item, disabled: true, children, key: item?.name + item?.path };
      }
      return { ...item, key: item?.name + item?.path };
    });
  };

  const menuDataOptions = handleMenuData(initialState?.menuData);

  const columns: TableColumnsDefine<WorkListItem> = [
    { dataIndex: 'index', width: 35 },
    {
      title: '工单编号',
      dataIndex: 'billNo',
      align: 'center',
      width: 110,
    },
    {
      title: '工单名称',
      dataIndex: 'billName',
      width: 180,
    },
    {
      title: '提报人',
      dataIndex: 'submitter',
      align: 'center',
      width: 110,
    },
    {
      title: '提报部门',
      dataIndex: 'createDeptName',
      width: 120,
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      align: 'center',
      search: false,
      width: 140,
    },
    {
      title: '联系电话',
      dataIndex: 'phone',
      align: 'center',
      search: false,
      width: 140,
    },
    {
      title: '业务类型',
      dataIndex: 'bizTypeCode',
      valueType: 'select',
      request: async () => await valueEnumsRequest('BIZ_TYPE'),
      width: 120,
    },
    {
      title: '系统模块',
      dataIndex: 'systemModule',
      valueType: 'treeSelect',
      customFieldProps: {
        options: menuDataOptions,
        fieldNames: { label: 'name', value: 'key' },
        allowClear: true,
      },
      ellipsis: true,
      width: 240,
    },
    {
      title: '工单状态',
      dataIndex: 'workStatus',
      valueType: 'select',
      request: async () => await valueEnumsRequest('WORK_STATUS'),
    },
    {
      title: '指派人员',
      dataIndex: 'assignPersonnel',
      align: 'center',
      search: false,
      width: 110,
    },
    {
      title: '创建日期',
      dataIndex: 'createDatetime',
      valueType: 'dateRange',
      hideInTable: true,
    },
    {
      title: '创建日期',
      dataIndex: 'createDatetime',
      valueType: 'date',
      search: false,
    },
  ];

  return columns;
};
