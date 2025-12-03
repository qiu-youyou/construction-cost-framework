/*
 * @Author: SHUANG
 * @Date: 2024-04-24 16:55:27
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-26 16:20:27
 * @Description:
 */
import { FormColumnsDefine } from 'jd-framework-web/package/components';
import { DbMatItem } from '@/pages/database/DbMain/DatabaseMain/DataBasePane/DbMat/DbMatMainTable/typings';
import MatSelectInput from '@/common/formItems/MatSelectInput';
import { FSDWaterItem } from '../typings';

const columns: FormColumnsDefine<FSDWaterItem> = [
  {
    title: '供水名称',
    dataIndex: 'waterName',
  },
  {
    title: '水泵组(台)时费总费用(P)',
    dataIndex: 'waterPumpMatPrice',
    renderFormItem: (s, c, form) => <MatSelectInput disabled={false} />,
    dependencies: ['eleDeviceType'],
    customFieldProps: (form) => ({
      onChange: (matPrice: number, current: DbMatItem) => {
        if (!current) return;
        form.setFieldsValue({
          waterPumpMatCode: current?.matCode || '',
          waterPumpMatName: current?.matName || '',
        });
      },
    }),
  },
  {
    title: '水泵编号',
    dataIndex: 'waterPumpMatCode',
  },
  {
    title: '水泵名称',
    dataIndex: 'waterPumpMatName',
  },
  {
    title: '取水基价',
    dataIndex: 'waterBasePrice',
    valueType: 'digit',
    width: 100,
  },
  {
    title: '取水附加费(元/m)(0.7~0.85)',
    dataIndex: 'waterAdditionalPrice',
    valueType: 'digit',
    width: 100,
  },
  {
    title: '水泵额定容里之和(m/组时)(S)',
    dataIndex: 'waterRatedCapacity',
    valueType: 'digit',
    width: 100,
  },
  {
    title: '能量利用系数(G)',
    dataIndex: 'waterUtilizationRate',
    valueType: 'digit',
    width: 100,
  },
  {
    title: '系数(Wi/W)',
    dataIndex: 'waterRate',
    valueType: 'digit',
    width: 100,
  },
  {
    title: '水泵出力系数 K(0.7~0.85)(N2)',
    dataIndex: 'waterOutputRatio',
    valueType: 'digit',
    width: 100,
  },
  {
    title: '本级水价',
    dataIndex: 'waterPrice',
    valueType: 'digit',
    width: 100,
    customFieldProps: { disabled: true },
  },
];

export default columns;
