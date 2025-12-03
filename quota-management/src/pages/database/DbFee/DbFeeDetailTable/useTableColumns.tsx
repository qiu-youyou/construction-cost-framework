/*
 * @Author: SHUANG
 * @Date: 2023-10-30 14:31:37
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-14 16:50:10
 * @Description: 取费明细表 列配置
 */
import { Checkbox } from 'antd';
import { TableColumnsDefine } from 'jd-framework-web/package/components';
import ChangeLogText from 'jd-framework-web/package/components/ChangeLogText';

import { dbFeeDetailUpdateRow } from './services';
import { DbFeeDetailItem } from './typings';

type Props = {
  dbFeeDetailItem?: DbFeeDetailItem;
  dbFeeDetailTableReload?: () => void /** 是否只读 */;
  cellEditSaveRequest?: any; // 行编辑方法
  readonly?: boolean;
};

export default ({ dbFeeDetailTableReload, readonly, cellEditSaveRequest }: Props) => {
  const columns: TableColumnsDefine<DbFeeDetailItem> = [
    {
      title: '序号',
      dataIndex: 'showNumber',
      align: 'left',
      cellEdit: true,
      search: false,
      width: 80,
    },
    {
      title: '费用编码',
      dataIndex: 'feeCode',
      align: 'center',
      cellEdit: true,
      width: 90,
    },
    {
      title: '费用名称',
      dataIndex: 'feeName',
      cellEdit: true,
      width: 140,
    },
    {
      title: '表达式',
      dataIndex: 'feeExpress',
      cellEdit: true,
      search: false,
      width: 200,
    },
    {
      title: '标准费率(%)',
      dataIndex: 'baseFeeRate',
      valueType: 'digit',
      cellEdit: true,
      search: false,
      width: 90,
    },
    {
      title: '调整系数',
      dataIndex: 'feeRateQ',
      valueType: 'digit',
      cellEdit: true,
      search: false,
      width: 90,
    },
    {
      title: '企业费率(%)',
      dataIndex: 'feeRate',
      cellEdit: readonly,
      valueType: 'digit',
      search: false,
      width: 90,
    },
    {
      title: '取费值',
      dataIndex: 'feeValue',
      valueType: 'digit',
      hideInTable: !readonly,
      search: false,
    },

    // 合计行标识(使用Y进行标识)
    {
      title: '合计标识',
      dataIndex: 'feeTotalIsRow',
      align: 'center',
      ellipsis: false,
      search: false,
      width: 70,
      customRender: (_, dbFeeDetailItem) => {
        /** 当前取费明细 */
        const id = dbFeeDetailItem?.id || '';
        const dbId = dbFeeDetailItem?.dbId || '';
        const feeDirectoryId = dbFeeDetailItem?.feeDirectoryId || '';
        const cellParams = { feeDirectoryId, dbId };

        /** 是否有合计标识 */
        let feeTotalIsRow = dbFeeDetailItem?.feeTotalIsRow === 'Y';

        return (
          <Checkbox
            disabled={readonly}
            onClick={async () => {
              if (readonly) return;
              const newValue = dbFeeDetailItem?.feeTotalIsRow === 'Y' ? 'N' : 'Y';
              if (typeof cellEditSaveRequest === 'function') {
                const res = await cellEditSaveRequest(
                  { filedName: 'feeTotalIsRow', newValue, id },
                  undefined,
                  cellParams,
                  dbFeeDetailItem,
                );
                if (res?.status === 'SUCCESS') dbFeeDetailTableReload?.();
                return;
              }
              const res = await dbFeeDetailUpdateRow(
                { filedName: 'feeTotalIsRow', newValue, id },
                undefined,
                cellParams,
                dbFeeDetailItem,
              );
              if (res?.status === 'SUCCESS') dbFeeDetailTableReload?.();
            }}
            checked={feeTotalIsRow}
          />
        );
      },
    },
    {
      title: '关联费用类型',
      dataIndex: 'feeRelational',
      cellEdit: !readonly,
      align: 'center',
      search: false,
      width: 100,
    },
    {
      title: '费用描述',
      dataIndex: 'feeInterpretative',
      valueType: 'textarea',
      cellEdit: true,
      search: false,
    },
    {
      title: '修改记录',
      dataIndex: 'feeLog',
      valueType: 'textarea',
      ellipsis: false,
      hideInTable: readonly,
      customRender: (_, { feeLog }) => {
        return <ChangeLogText changeLog={feeLog} />;
      },
      search: false,
    },
  ];
  return columns;
};
