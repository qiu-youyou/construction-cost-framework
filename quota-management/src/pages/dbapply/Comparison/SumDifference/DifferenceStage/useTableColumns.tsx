/*
 * @Author: SHUANG
 * @Date: 2024-03-21 14:47:00
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-21 18:31:21
 * @Description: 工程造价对比 - 指标汇总对比
 */
import { TableColumnsDefine } from 'jd-framework-web/package/components';

type Props = { differenceInfo?: { current?: string; source?: string } };

export default ({ differenceInfo }: Props) => {
  const columns: TableColumnsDefine<any> = [
    {
      title: '序号',
      dataIndex: 'index',
      align: 'center',
      width: 30,
    },
    {
      title: '编码',
      dataIndex: 'sumCode',
      align: 'center',
      width: 40,
    },
    {
      title: '名称',
      dataIndex: 'sumName',
    },

    {
      title: `${differenceInfo?.current || ''}`,
      children: [
        {
          title: '金额(万元)',
          dataIndex: 'beforeSumValue',
          valueType: 'digit',
          width: 160,
        },
      ],
    },
    {
      title: `${differenceInfo?.source || ''}`,
      children: [
        {
          title: '金额(万元)',
          dataIndex: 'afterSumValue',
          valueType: 'digit',
          width: 160,
        },
      ],
    },

    {
      title: '差额金额(万元)',
      dataIndex: 'differenceTotal',
      valueType: 'digit',
      width: 60,
    },
  ];

  return columns;
};
