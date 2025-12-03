/*
 * @Author: SHUANG
 * @Date: 2024-01-17 09:51:12
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-03 14:11:46
 * @Description: 工程造价-项目汇总
 */

import { Checkbox } from 'antd';
import { TableColumnsDefine } from 'jd-framework-web/package/components';
import ChangeLogText from 'jd-framework-web/package/components/ChangeLogText';

import { productSumStageUpdateRow } from './services';
import { ProjectSummaryItem } from './typings';

type Props = { projectSummaryTableReload?: () => void; readonly?: boolean };

export default ({ projectSummaryTableReload, readonly }: Props) => {
  const columns: TableColumnsDefine<ProjectSummaryItem> = [
    {
      title: '序号',
      dataIndex: 'sumIndexCode',
      cellEdit: true,
      search: false,
      width: 90,
    },
    {
      title: '费用编码',
      dataIndex: 'sumCode',
      align: 'center',
      cellEdit: true,
      width: 120,
    },
    {
      title: '费用名称',
      dataIndex: 'sumName',
      cellEdit: true,
      width: 160,
    },
    {
      title: '表达式',
      dataIndex: 'sumExpress',
      cellEdit: true,
      search: false,
      width: 180,
    },
    {
      title: '费率(%)',
      dataIndex: 'sumRate',
      valueType: 'digit',
      cellEdit: true,
      search: false,
      width: 70,
    },
    {
      title: '金额(元)',
      dataIndex: 'sumTotal',
      valueType: 'digit',
      search: false,
    },

    // 合计行标识(使用Y进行标识)
    {
      title: '合计标识',
      dataIndex: 'sumTotalIsRow',
      align: 'center',
      ellipsis: false,
      search: false,
      width: 70,
      customRender: (_, ProjectSummaryItem) => {
        /** 当前明细 */
        const { id, projectId, stageId } = ProjectSummaryItem;
        /** 是否有合计标识 */
        let sumTotalIsRow = ProjectSummaryItem?.sumTotalIsRow === 'Y';

        return (
          <Checkbox
            onClick={async () => {
              if (readonly) return;
              const newValue = ProjectSummaryItem?.sumTotalIsRow === 'Y' ? 'N' : 'Y';
              const res = await productSumStageUpdateRow(
                { filedName: 'sumTotalIsRow', newValue, id },
                { projectId, stageId },
              );
              if (res?.status === 'SUCCESS') projectSummaryTableReload?.();
            }}
            checked={sumTotalIsRow}
          />
        );
      },
    },

    {
      title: '费用描述',
      dataIndex: 'sumInterpretative',
      valueType: 'textarea',
      cellEdit: true,
      search: false,
      width: 240,
    },
    {
      title: '修改记录',
      dataIndex: 'sumLog',
      valueType: 'textarea',
      ellipsis: false,
      search: false,
      customRender: (_, { sumLog }) => {
        return <ChangeLogText changeLog={sumLog} />;
      },
    },
  ];
  return columns;
};
