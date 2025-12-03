/*
 * @Author: SHUANG
 * @Date: 2022-09-01 15:18:50
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-10-31 09:39:12
 * @Description:
 */
import { TableColumnsDefine } from '../../../../components/BaseTable/typings';
import RadioGroupButton from '../../../../components/RadioGroupButton';
import { ENUUMNEWSTYPE } from '../../../constant/valueEnum';
import { BulletinListItem } from './typings';

const StyleRefuse = {
  display: 'inline-block',
  width: 8,
  height: 8,
  borderRadius: '50%',
  marginRight: 8,
};

const StyleText = { color: '#000000D9' };

const RenderRefuse = ({ color }: { color: string }) => {
  return <span style={{ ...StyleRefuse, backgroundColor: color }} />;
};

const columns: TableColumnsDefine<BulletinListItem> = [
  { dataIndex: 'index', width: 40 },
  {
    title: '公告类型',
    dataIndex: 'newsType',
    valueType: 'radioButton',
    valueEnum: ENUUMNEWSTYPE,
    renderFormItem: ({ valueEnum }) => <RadioGroupButton valueEnum={valueEnum} />,
  },
  {
    title: '公告标题',
    dataIndex: 'title',
    valueType: 'textarea',
  },
  {
    title: '创建人',
    dataIndex: 'createMan',
    align: 'center',

    width: 110,
  },
  {
    title: '创建时间',
    dataIndex: 'createDatetime',
    valueType: 'dateRange',
    hideInTable: true,
  },
  {
    title: '创建时间',
    dataIndex: 'createDatetime',
    align: 'center',
    search: false,
    width: 100,
  },
  {
    title: '修改人',
    dataIndex: 'updateMan',
    align: 'center',
    width: 110,
  },
  {
    title: '修改时间',
    dataIndex: 'updateDatetime',
    valueType: 'dateRange',
    hideInTable: true,
  },
  {
    title: '修改时间',
    dataIndex: 'updateDatetime',
    align: 'center',

    search: false,
    width: 100,
  },
  {
    title: '状态',
    dataIndex: 'billStatus',
    valueType: 'radioButton',
    align: 'center',
    customRender: (_, { billStatus }) => (
      <div style={StyleText}>
        {billStatus == '7' ? (
          <RenderRefuse color="#08979c" />
        ) : billStatus == '8' ? (
          <RenderRefuse color="#d48806" />
        ) : (
          <RenderRefuse color="#1b63ab" />
        )}
        {billStatus == '7' ? '已发布' : billStatus == '8' ? '已撤销' : '已保存'}
      </div>
    ),
    renderFormItem: ({ valueEnum }) => <RadioGroupButton valueEnum={valueEnum} />,
    valueEnum: {
      '7': { text: '已发布' },
      '8': { text: '已撤销' },
      '0': { text: '已保存' },
    },
    width: 70,
  },
];

export default columns;
