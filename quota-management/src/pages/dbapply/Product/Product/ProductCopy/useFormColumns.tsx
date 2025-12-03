/*
 * @Author: SHUANG
 * @Date: 2024-02-04 17:18:24
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-25 15:19:21
 * @Description: 工程造价产品-产品信息 复制产品
 */
import { FormColumnsDefine } from 'jd-framework-web/package/components';
import VERIFICATION from 'jd-framework-web/package/common/constant/verification';

import { ProductItem } from '../typings';
import { valueEnumsRequest } from '../../valueEnums';

type Props = {
  productNameSource: string;
  productPhaseSource: string;
  productTypeSource: string;
  dbapplyType?: any[];
};

export default ({ productNameSource, productPhaseSource, productTypeSource, dbapplyType }: Props) => {
  const columns: FormColumnsDefine<ProductItem> = [
    {
      title: '源产品名称',
      customFieldProps: { disabled: true, value: productNameSource },
    },
    {
      title: '源产品阶段',
      customFieldProps: { disabled: true, value: productPhaseSource },
      request: async () => valueEnumsRequest('dbapply_phase'),
      valueType: 'select',
    },
    {
      title: '源产品类型',
      customFieldProps: { disabled: true, value: productTypeSource, options: dbapplyType },
      valueType: 'select',
    },
    {
      dataIndex: 'projectId',
      formItemProps: { hidden: true },
      fieldProps: { disabled: true },
      colProps: { span: 0 },
    },
    {
      dataIndex: 'sourceProductId',
      formItemProps: { hidden: true },
      fieldProps: { disabled: true },
      colProps: { span: 0 },
    },

    {
      title: '复制后产品名称',
      dataIndex: 'productName',
      initialValue: productNameSource,
      formItemProps: { rules: VERIFICATION.required },
    },
    {
      title: '复制后产品阶段',
      dataIndex: 'productPhase',
      valueType: 'select',
      initialValue: productPhaseSource,
      request: async () => valueEnumsRequest('dbapply_phase'),
      formItemProps: { rules: VERIFICATION.required },
    },
    {
      title: '复制后产品类型',
      dataIndex: 'productType',
      valueType: 'select',
      dependencies: ['productPhase'],
      initialValue: productTypeSource,
      formItemProps: { rules: VERIFICATION.required },
      customFieldProps: (form) => {
        const productPhase = form.getFieldValue('productPhase');
        const productType = form.getFieldValue('productType') || productTypeSource;
        let options;
        // if (productPhase === '招标设计') {
        if (productPhase === '01') {
          options = dbapplyType?.filter((item: { value: string }) => ['01', '02', '03'].includes(item.value));
        }
        // if (productPhase === '施工详图设计') {
        if (productPhase === '02') {
          options = dbapplyType?.filter((item: { value: string }) => ['04', '05', '06'].includes(item.value));
        }
        // if (productPhase === '完工') {
        if (productPhase === '03') {
          options = dbapplyType?.filter((item: { value: string }) => ['07'].includes(item.value));
        }
        if (!options?.find((item) => item.value == productType)) {
          form.setFieldValue('productType', '');
        }
        return { options };
      },
    },
  ];

  return columns;
};
