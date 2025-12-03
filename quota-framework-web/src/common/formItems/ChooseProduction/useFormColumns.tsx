/*
 * @Author: SHUANG
 * @Date: 2022-07-06 15:49:31
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-10-24 11:48:09
 * @Description:
 */
import { FormColumnsDefine } from '../../../components/BaseSchemaForm/typings';
import { queryDictItemByClassCode } from '../../services/system';
import { UserBaseCodeListItem } from './services';

const DictQuery = ['PRODUCTION_BASE'];

/** menu button schema */
const columns: FormColumnsDefine<UserBaseCodeListItem> = [
  {
    dataIndex: 'productionBaseName',
    formItemProps: { hidden: true },
    customFieldProps: { disabled: true },
    colProps: { span: 0 },
  },
  {
    title: '公司名称',
    dataIndex: 'productionBaseCode',
    valueType: 'select',
    request: async () => (await queryDictItemByClassCode(DictQuery))?.rows?.PRODUCTION_BASE,
    customFieldProps: (form) => ({
      onChange: (_: unknown, item: { label: string }) => {
        form?.setFieldsValue?.({ productionBaseName: item?.label });
        if (!item?.label) {
          form?.setFieldsValue?.({ productionBaseName: '', productionBaseCode: '' });
        }
      },
      showSearch: true,
    }),
  },
];

export default columns;
