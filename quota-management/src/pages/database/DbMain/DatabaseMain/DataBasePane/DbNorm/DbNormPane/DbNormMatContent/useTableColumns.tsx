/*
 * @Author: SHUANG
 * @Date: 2023-10-21 11:58:59
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-28 15:39:49
 * @Description: 定额库(人材机 机械台班 混凝土配合比)明细表对应含量表列配置
 */
import { Checkbox } from 'antd';
import { CheckSquareOutlined } from '@ant-design/icons';
import { TableActionType, TableColumnsDefine } from 'jd-framework-web/package/components';
import ChangeLogText from 'jd-framework-web/package/components/ChangeLogText';
import { DbNormMatContentItem } from './typings';
import { valueEnumsRequest } from '../../../../valueEnums';

type Props = {
  /** 定额表 */
  dbNormTableRef?: TableActionType;
  /** 人材机含量表 */
  dbNormMatContentTableRef?: TableActionType;
  /** 权限 */
  normAccess?: boolean;
  /** 行编辑方法 */
  cellEditSaveRequest?: any;
  dbNormMatContentUpdateRow?: any;
};

export default ({
  dbNormTableRef,
  dbNormMatContentTableRef,
  normAccess,
  cellEditSaveRequest,
  dbNormMatContentUpdateRow,
}: Props) => {
  const columns: TableColumnsDefine<DbNormMatContentItem> = [
    {
      title: '序号',
      dataIndex: 'index',
      width: 95,
    },
    {
      title: '类型',
      dataIndex: 'matRcjType',
      valueType: 'select',
      valueEnum: {
        1: { text: '人工' },
        2: { text: '材料' },
        3: { text: '机械' },
        4: { text: '机械台班' },
        5: { text: '混凝土' },
      },
      width: 80,
    },
    {
      title: '材料编码',
      dataIndex: 'matCode',
      align: 'center',
      width: 120,
    },
    {
      title: '材料名称',
      dataIndex: 'matName',
      valueType: 'textarea',
    },
    {
      title: '单位',
      dataIndex: 'matUnit',
      valueType: 'select',
      selectWritingIn: true,
      request: () => valueEnumsRequest('UNIT'),
      customFieldProps: { fieldNames: { label: 'label', value: 'label' } },
      search: false,
      valueEnum: {},
    },
    {
      title: '单价(元)',
      dataIndex: 'matPrice',
      valueType: 'digit',
      search: false,
    },

    {
      title: '标准含量',
      dataIndex: 'matAmountSrc',
      valueType: 'digit',
      cellEdit: ({ parentId }) => parentId == '0',
      search: false,
      width: 85,
    },
    {
      title: '企业含量',
      dataIndex: 'matAmount',
      valueType: 'digit',
      search: false,
      width: 85,
    },
    {
      title: '来源含量',
      dataIndex: 'matAmountSrcOld',
      valueType: 'digit',
      search: false,
      width: 85,
    },

    {
      title: '主材标识',
      dataIndex: 'matIsMain',
      align: 'center',
      ellipsis: false,
      search: false,
      width: 70,
      customRender: (_, dbNormMatContentItem) => {
        // /** 当前明细 */
        const id = dbNormMatContentItem?.id || '';
        const dbId = dbNormMatContentItem?.dbId || '';
        const normId = dbNormMatContentItem?.normId || '';
        const chapterId = dbNormMatContentItem?.chapterId || '';

        const matRcjType = dbNormMatContentItem?.matRcjType || '';

        const serviceParams: any = { matRcjType, dbId, normId, chapterId };

        // /** 是否有合计标识 */
        let matIsMain = dbNormMatContentItem?.matIsMain === 'Y';

        return (
          <Checkbox
            onClick={async () => {
              const newValue = dbNormMatContentItem?.matIsMain === 'Y' ? 'N' : 'Y';
              const params: any = { filedName: 'matIsMain', newValue, id, ...serviceParams };

              if (typeof cellEditSaveRequest === 'function') {
                cellEditSaveRequest(params);
                return;
              }
              if (!normAccess) return;
              const res = await dbNormMatContentUpdateRow(params);

              if (res?.status === 'SUCCESS') {
                dbNormTableRef?.current?.reload?.();
                dbNormMatContentTableRef?.current?.reload?.();
              }
            }}
            checked={matIsMain}
          />
        );
      },
    },
    {
      title: '配合比',
      dataIndex: 'hasChildren',
      align: 'center',
      search: false,
      width: 70,
      customRender: (_, dbNormMatContentItem) => {
        return dbNormMatContentItem?.hasChildren == true ? (
          <CheckSquareOutlined style={{ fontSize: 15 }} />
        ) : (
          ''
        );
      },
    },
    {
      title: '修改记录',
      dataIndex: 'matLog',
      valueType: 'textarea',
      ellipsis: false,
      customRender: (_, { matLog }) => <ChangeLogText changeLog={matLog} />,
      search: false,
    },
  ];

  return columns;
};
