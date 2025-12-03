/*
 * @Author: SHUANG
 * @Date: 2024-03-21 14:47:00
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-21 15:07:17
 * @Description:
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
      title: '编码',
      dataIndex: 'subitemCode',
      align: 'center',
      width: 100,
    },
    {
      title: '分部分项名称',
      dataIndex: 'subitemName',
    },

    {
      title: `${differenceInfo?.current || ''}`,
      children: [
        {
          title: '主材/设备合价(万元)',
          dataIndex: 'beforeSubitemEquipmentTotal',
          valueType: 'digit',
          width: 130,
        },
        {
          title: '施工/安装合价(万元)',
          dataIndex: 'beforeSubitemConstructTotal',
          valueType: 'digit',
          width: 130,
        },
        {
          title: '合计(万元)',
          dataIndex: 'beforeSubitemTotal',
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
          dataIndex: 'afterSubitemEquipmentTotal',
          valueType: 'digit',
          width: 130,
        },
        {
          title: '施工/安装合价(万元)',
          dataIndex: 'afterSubitemConstructTotal',
          valueType: 'digit',
          width: 130,
        },
        {
          title: '合计(万元)',
          dataIndex: 'afterSubitemTotal',
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
