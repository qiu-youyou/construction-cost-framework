/*
 * @Author: SHUANG
 * @Date: 2023-11-10 11:31:25
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-14 16:51:34
 * @Description: 标准库-其他费用模板-明细
 */

import { Checkbox } from 'antd';
import { TableColumnsDefine } from 'jd-framework-web/package/components';
import { otherFeeTempDetailUpdateRow } from './services';
import { OtherFeeTempDetailItem } from './typings';
import useAuthButton from 'jd-framework-web/package/utils/auth/useAuthButton';

type Props = { otherFeeTempDetailTableRelaod?: () => void };

export default ({ otherFeeTempDetailTableRelaod }: Props) => {
  const { auth } = useAuthButton();
  const columns: TableColumnsDefine<OtherFeeTempDetailItem> = [
    {
      title: '序号',
      dataIndex: 'otherIndexCode',
      align: 'left',
      cellEdit: true,
      search: false,
      width: 90,
    },
    {
      title: '费用编码',
      dataIndex: 'otherCode',
      align: 'center',
      cellEdit: true,
      width: 90,
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
      width: 240,
    },
    {
      title: '费率(%)',
      dataIndex: 'otherRate',
      valueType: 'digit',
      cellEdit: true,
      search: false,
      width: 70,
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
        const { id, otherSumDirectoryId, otherSumDirectoryName } = otherFeeTempDetailItem;
        const cellParams = { otherSumDirectoryId, otherSumDirectoryName };

        /** 是否有合计标识 */
        let otherTotalIsRow = otherFeeTempDetailItem?.otherTotalIsRow === 'Y';

        return (
          <Checkbox
            disabled={!auth('edit')}
            onClick={async () => {
              if (!auth('edit')) return;

              const newValue = otherFeeTempDetailItem?.otherTotalIsRow === 'Y' ? 'N' : 'Y';
              const res = await otherFeeTempDetailUpdateRow(
                { filedName: 'otherTotalIsRow', newValue, id },
                undefined,
                cellParams,
                otherFeeTempDetailItem,
              );
              if (res?.status === 'SUCCESS') otherFeeTempDetailTableRelaod?.();
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
      width: 160,
    },
  ];
  return columns;
};
