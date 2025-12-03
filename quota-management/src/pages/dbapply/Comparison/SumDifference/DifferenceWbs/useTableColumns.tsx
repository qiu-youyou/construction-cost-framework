/*
 * @Author: SHUANG
 * @Date: 2024-03-21 14:47:00
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-21 16:47:50
 * @Description: 工程造价对比 - WBS汇总对比
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
      title: 'WBS编码',
      dataIndex: 'wbsCode',
      align: 'center',
      width: 100,
    },
    {
      title: 'WBS名称',
      dataIndex: 'wbsName',
    },

    {
      title: `${differenceInfo?.current || ''}`,
      children: [
        {
          title: '主材/设备合价(万元)',
          dataIndex: 'beforeWbsEquipmentTotal',
          valueType: 'digit',
          width: 130,
        },
        {
          title: '施工/安装合价(万元)',
          dataIndex: 'beforeWbsConstructTotal',
          valueType: 'digit',
          width: 130,
        },
        {
          title: '合计(万元)',
          dataIndex: 'beforeWbsTotal',
          valueType: 'digit',
          width: 130,
        },
      ],
    },

    {
      title: `${differenceInfo?.source || ''}`,
      children: [
        {
          title: '主材/设备合价(万元)',
          dataIndex: 'afterWbsEquipmentTotal',
          valueType: 'digit',
          width: 130,
        },
        {
          title: '施工/安装合价(万元)',
          dataIndex: 'afterWbsConstructTotal',
          valueType: 'digit',
          width: 130,
        },
        {
          title: '合计(万元)',
          dataIndex: 'afterWbsTotal',
          valueType: 'digit',
          width: 130,
        },
      ],
    },

    {
      title: '差额合计(万元)',
      dataIndex: 'differenceTotal',
      valueType: 'digit',
      width: 130,
    },
  ];

  return columns;
};
