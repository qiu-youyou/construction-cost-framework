/*
 * @Author: SHUANG
 * @Date: 2024-04-16 16:53:29
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-24 15:38:11
 * @Description: 工程造价-风水电 供电点信息 柴油发电资料
 */

import { FormColumnsDefine } from 'jd-framework-web/package/components';
import { DbMatItem } from '@/pages/database/DbMain/DatabaseMain/DataBasePane/DbMat/DbMatMainTable/typings';
import MatSelectInput from '@/common/formItems/MatSelectInput';
import { FSDWindItem } from '../typings';
import { ProFormInstance } from '@ant-design/pro-components';

type Props = {
  SBFormRef: React.MutableRefObject<ProFormInstance | undefined>;
  KQYSJFormRef: React.MutableRefObject<ProFormInstance | undefined>;
};

export default ({ SBFormRef, KQYSJFormRef }: Props) => {
  const columns: FormColumnsDefine<FSDWindItem> = [
    {
      title: '供风损耗率(15~20%)',
      dataIndex: 'windRate',
      valueType: 'digit',
      width: 100,
    },
    {
      title: '设备类型',
      dataIndex: 'windDeviceType',
      valueType: 'radio',
      initialValue: '1',
      valueEnum: { '1': { text: '水泵冷却' }, '2': { text: '循环冷却水' } },
    },

    {
      title: '冷却水费(元/m)',
      dataIndex: 'windCoolingWaterPrice',
      dependencies: ['windDeviceType'],
      valueType: 'digit',
      width: 100,
      customFieldProps: (form) => {
        const disabled = form.getFieldValue('windDeviceType') == '1';
        if (disabled) {
          form.setFieldsValue({ windCoolingWaterPrice: 0 });
        }
        if (form.getFieldValue('windDeviceType') != '1') {
          form.setFieldsValue({ windPumpMatPrice: 0 });
        }
        if (form.getFieldValue('windDeviceType') != '2') {
          KQYSJFormRef?.current?.setFieldsValue({ windCompressorMatPrice: 0 });
        }
        return { disabled };
      },
    },

    {
      title: '水泵组(台)时费总费用',
      dataIndex: 'windPumpMatPrice',
      renderFormItem: (s, c, form) => (
        <MatSelectInput disabled={form.getFieldValue('windDeviceType') != '1'} />
      ),
      dependencies: ['windDeviceType'],
      customFieldProps: (form) => ({
        onChange: (matPrice: number, current: DbMatItem) => {
          if (!current) return;
          form.setFieldsValue({
            windPumpMatCode: current?.matCode || '',
            windPumpMatName: current?.matName || '',
          });
        },
      }),
    },
    {
      title: '水泵编号',
      dataIndex: 'windPumpMatCode',
    },
    {
      title: '水泵名称',
      dataIndex: 'windPumpMatName',
    },
    {
      title: '本供风区供风价格(元/m)',
      dataIndex: 'windPrice',
      valueType: 'digit',
      width: 100,
      customFieldProps: { disabled: true },
    },
  ];

  return columns;
};
