/*
 * @Author: SHUANG
 * @Date: 2024-01-17 09:51:12
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-03 14:09:22
 * @Description: 工程造价-项目汇总
 */

import { Checkbox } from 'antd';
import { TableColumnsDefine } from 'jd-framework-web/package/components';
import ChangeLogText from 'jd-framework-web/package/components/ChangeLogText';

import { productSumOtherUpdateRow } from './services';
import { OtherSummaryItem } from './typings';

type Props = { otherfeeSummaryTableReload?: () => void; readonly?: boolean };

export default ({ otherfeeSummaryTableReload, readonly }: Props) => {
  const columns: TableColumnsDefine<OtherSummaryItem> = [
    {
      title: '序号',
      dataIndex: 'otherIndexCode',
      cellEdit: true,
      search: false,
      width: 90,
    },
    {
      title: '费用编码',
      dataIndex: 'otherCode',
      align: 'center',
      cellEdit: true,
      width: 120,
    },
    {
      title: '费用名称',
      dataIndex: 'otherName',
      cellEdit: true,
      width: 160,
    },
    {
      title: '表达式',
      dataIndex: 'otherExpress',
      cellEdit: true,
      search: false,
      width: 180,
    },
    {
      title: '费率(%)',
      dataIndex: 'otherRate',
      valueType: 'digit',
      cellEdit: true,
      search: false,
      width: 70,
    },
    {
      title: '金额(元)',
      dataIndex: 'otherTotal',
      valueType: 'digit',
      search: false,
    },

    // 合计行标识(使用Y进行标识)
    {
      title: '合计标识',
      dataIndex: 'otherTotalIsRow',
      align: 'center',
      ellipsis: false,
      search: false,
      width: 70,
      customRender: (_, otherFeeTempDetailItem) => {
        /** 当前明细 */
        const { id, projectId, stageId } = otherFeeTempDetailItem;
        /** 是否有合计标识 */
        let otherTotalIsRow = otherFeeTempDetailItem?.otherTotalIsRow === 'Y';

        return (
          <Checkbox
            onClick={async () => {
              if (readonly) return;
              const newValue = otherFeeTempDetailItem?.otherTotalIsRow === 'Y' ? 'N' : 'Y';
              const res = await productSumOtherUpdateRow(
                { filedName: 'otherTotalIsRow', newValue, id },
                { projectId, stageId },
              );
              if (res?.status === 'SUCCESS') otherfeeSummaryTableReload?.();
            }}
            checked={otherTotalIsRow}
          />
        );
      },
    },

    {
      title: '费用描述',
      dataIndex: 'otherInterpretative',
      valueType: 'textarea',
      cellEdit: true,
      search: false,
      width: 240,
    },
    {
      title: '修改记录',
      dataIndex: 'otherLog',
      valueType: 'textarea',
      ellipsis: false,
      search: false,
      customRender: (_, { otherLog }) => {
        return <ChangeLogText changeLog={otherLog} />;
      },
    },
  ];

  return columns;
};
