/*
 * @Author: SHUANG
 * @Date: 2024-04-16 16:53:29
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-24 15:49:55
 * @Description: 工程造价-风水电 供电点信息 电网电价资料
 */

import { FormColumnsDefine } from 'jd-framework-web/package/components';
import { DbMatItem } from '@/pages/database/DbMain/DatabaseMain/DataBasePane/DbMat/DbMatMainTable/typings';
import MatSelectInput from '@/common/formItems/MatSelectInput';
import { ProFormInstance } from '@ant-design/pro-components';
import { FSDWindItem } from '../typings';

type Props = {
  SBFormRef: React.MutableRefObject<ProFormInstance | undefined>;
  KQYSJFormRef: React.MutableRefObject<ProFormInstance | undefined>;
};

export default ({ SBFormRef, KQYSJFormRef }: Props) => {
  const columns: FormColumnsDefine<FSDWindItem> = [
    {
      title: '空气压缩机额定容量之和(m/分)',
      dataIndex: 'windRatedCapacity',
      valueType: 'digit',
      width: 100,
    },
    {
      title: '空气压缩机出力系数K(0.7~0.85)(应考虑高成系数)',
      dataIndex: 'windOutputRatio',
      valueType: 'digit',
      width: 100,
    },
    {
      title: '供风设施维修摊销费(0.002/m)',
      dataIndex: 'windAmortizationPrice',
      valueType: 'digit',
      width: 100,
    },
    {
      title: '空气压缩机组(台)时总费用',
      dataIndex: 'windCompressorMatPrice',
      renderFormItem: (s, c, form) => (
        <MatSelectInput disabled={SBFormRef?.current?.getFieldValue('windDeviceType') != '2'} />
      ),
      dependencies: ['windDeviceType'],
      customFieldProps: (form) => ({
        onChange: (matPrice: number, current: DbMatItem) => {
          if (!current) return;
          form.setFieldsValue({
            windCompressorMatCode: current?.matCode || '',
            windCompressorMatName: current?.matName || '',
          });
        },
      }),
    },
    {
      title: '空气压缩机编号',
      dataIndex: 'windCompressorMatCode',
    },
    {
      title: '空气压缩机名称',
      dataIndex: 'windCompressorMatName',
    },
  ];
  return columns;
};
