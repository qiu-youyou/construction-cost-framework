/*
 * @Author: SHUANG
 * @Date: 2024-03-21 14:47:00
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-21 18:06:15
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
      width: 55,
    },
    {
      title: '指标编码',
      dataIndex: 'indexCode',
      align: 'center',
      width: 100,
    },
    {
      title: '指标名称',
      dataIndex: 'indexName',
    },
    {
      title: '单位',
      dataIndex: 'indexUnit',
      valueType: 'select',
    },

    {
      title: `${differenceInfo?.current || ''}`,
      children: [
        {
          title: '数量',
          dataIndex: 'beforeIndexAmount',
          valueType: 'digit',
        },
        {
          title: '单价(万元)',
          dataIndex: 'beforeIndexPrice',
          valueType: 'digit',
        },
        {
          title: '合价(万元)',
          dataIndex: 'beforeIndexTotal',
          valueType: 'digit',
        },
      ],
    },

    {
      title: `${differenceInfo?.source || ''}`,
      children: [
        {
          title: '数量',
          dataIndex: 'afterIndexAmount',
          valueType: 'digit',
        },
        {
          title: '单价(万元)',
          dataIndex: 'afterIndexPrice',
          valueType: 'digit',
        },
        {
          title: '合价(万元)',
          dataIndex: 'afterIndexTotal',
          valueType: 'digit',
        },
      ],
    },

    {
      title: `差额`,
      children: [
        {
          title: '数量',
          dataIndex: 'differenceAmount',
          valueType: 'digit',
        },
        {
          title: '单价(万元)',
          dataIndex: 'differencePrice',
          valueType: 'digit',
        },
        {
          title: '合价(万元)',
          dataIndex: 'differenceTotal',
          valueType: 'digit',
        },
      ],
    },
  ];

  return columns;
};
