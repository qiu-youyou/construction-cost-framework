/*
 * @Author: SHUANG
 * @Date: 2024-04-16 16:53:29
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-24 11:59:25
 * @Description: 工程造价-风水电 供电点信息 柴油发电资料
 */

import { FormColumnsDefine } from 'jd-framework-web/package/components';
import { DbMatItem } from '@/pages/database/DbMain/DatabaseMain/DataBasePane/DbMat/DbMatMainTable/typings';
import MatSelectInput from '@/common/formItems/MatSelectInput';
import { FSDElectricityItem } from '../typings';

const columns: FormColumnsDefine<FSDElectricityItem> = [
  {
    title: '柴油发电机额定容量之和(kw)',
    dataIndex: 'eleRatedCapacity',
    valueType: 'digit',
    width: 100,
  },
  {
    title: '柴油发电机出力系数K(0.8~0.85)(应考虑高成系数)',
    dataIndex: 'eleOutputRatio',
    valueType: 'digit',
    width: 100,
  },
  {
    title: '变配电设备及配电线路损耗率(6~10%)',
    dataIndex: 'eleScrapRate',
    valueType: 'digit',
    width: 100,
  },
  {
    title: '供电设施维修摊销费(0.02~0.035元/kW)',
    dataIndex: 'eleAmortizationPrice',
    valueType: 'digit',
    width: 100,
  },
  {
    title: '设备类型',
    dataIndex: 'eleDeviceType',
    valueType: 'radio',
    initialValue: '1',
    valueEnum: { '1': { text: '水泵冷却' }, '2': { text: '循环冷却水' } },
  },
  {
    title: '厂用电率(%)',
    dataIndex: 'eleFactoryRate',
    valueType: 'digit',
    width: 100,
  },

  {
    title: '冷却水费(元/m)',
    dataIndex: 'eleCoolWaterPrice',
    dependencies: ['eleDeviceType'],
    valueType: 'digit',
    width: 100,
    customFieldProps: (form) => {
      const disabled = form.getFieldValue('eleDeviceType') == '1';
      if (disabled) {
        form.setFieldsValue({ eleCoolWaterPrice: 0 });
      }
      if (form.getFieldValue('eleDeviceType') != '1') {
        form.setFieldsValue({ elePumpMatPrice: 0 });
      }
      if (form.getFieldValue('eleDeviceType') != '2') {
        form.setFieldsValue({ eleGeneratorMatPrice: 0 });
      }
      return { disabled };
    },
  },

  {
    title: '水泵组(台)时费总费用',
    dataIndex: 'elePumpMatPrice',
    renderFormItem: (s, c, form) => <MatSelectInput disabled={form.getFieldValue('eleDeviceType') != '1'} />,
    dependencies: ['eleDeviceType'],
    customFieldProps: (form) => ({
      onChange: (matPrice: number, current: DbMatItem) => {
        if (!current) return;
        form.setFieldsValue({
          elePumpMatCode: current?.matCode || '',
          elePumpMatName: current?.matName || '',
        });
      },
    }),
  },
  {
    title: '水泵-编号',
    dataIndex: 'elePumpMatCode',
  },
  {
    title: '水泵-名称',
    dataIndex: 'elePumpMatName',
  },
  {
    title: '柴油发电机组(台)时总费用',
    dataIndex: 'eleGeneratorMatPrice',
    renderFormItem: (s, c, form) => <MatSelectInput disabled={form.getFieldValue('eleDeviceType') != '2'} />,
    dependencies: ['eleDeviceType'],
    customFieldProps: (form) => ({
      onChange: (matPrice: number, current: DbMatItem) => {
        if (!current) return;
        form.setFieldsValue({
          eleGeneratorMatCode: current?.matCode || '',
          eleGeneratorMatName: current?.matName || '',
        });
      },
    }),
  },
  {
    title: '柴油发电机编号',
    dataIndex: 'eleGeneratorMatCode',
  },
  {
    title: '柴油发电机名称',
    dataIndex: 'eleGeneratorMatName',
  },
];

export default columns;
