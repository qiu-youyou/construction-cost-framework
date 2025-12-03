/*
 * @Author: SHUANG
 * @Date: 2023-11-10 11:31:25
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-01-17 11:02:45
 * @Description: 标准库-项目汇总表-明细
 */

import { Checkbox } from 'antd';
import { TableColumnsDefine } from 'jd-framework-web/package/components';
import useAuthButton from 'jd-framework-web/package/utils/auth/useAuthButton';
import { OtherFeeTempDetailItem } from '../../StdOtherFeeTemp/OtherFeeTempDetailTable/typings';
import { otherSumTempDetailUpdateRow } from './services';

type Props = { otherSumTempDetailTableRelaod?: () => void };

export default ({ otherSumTempDetailTableRelaod }: Props) => {
  const { auth } = useAuthButton();

  const columns: TableColumnsDefine<OtherFeeTempDetailItem> = [
    {
      title: '序号',
      dataIndex: 'sumIndexCode',
      align: 'center',
      cellEdit: true,
      search: false,
      width: 60,
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

    // 合计行标识(使用Y进行标识)
    {
      title: '合计标识',
      dataIndex: 'sumTotalIsRow',
      align: 'center',
      ellipsis: false,
      search: false,
      width: 70,
      customRender: (_, otherFeeTempDetailItem: OtherFeeTempDetailItem & { sumTotalIsRow?: string }) => {
        /** 当前明细 */
        const { id, otherSumDirectoryId, otherSumDirectoryName } = otherFeeTempDetailItem;
        const cellParams = { otherSumDirectoryId, otherSumDirectoryName };

        /** 是否有合计标识 */
        let sumTotalIsRow = otherFeeTempDetailItem?.sumTotalIsRow === 'Y';

        return (
          <Checkbox
            disabled={!auth('edit')}
            onClick={async () => {
              if (!auth('edit')) return;
              const newValue = otherFeeTempDetailItem?.sumTotalIsRow === 'Y' ? 'N' : 'Y';
              const res = await otherSumTempDetailUpdateRow(
                { filedName: 'sumTotalIsRow', newValue, id },
                undefined,
                cellParams,
                otherFeeTempDetailItem,
              );
              if (res?.status === 'SUCCESS') otherSumTempDetailTableRelaod?.();
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
      width: 160,
    },
  ];
  return columns;
};
