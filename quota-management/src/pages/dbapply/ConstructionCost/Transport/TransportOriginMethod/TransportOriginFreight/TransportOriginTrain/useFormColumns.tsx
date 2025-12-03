/*
 * @Author: SHUANG
 * @Date: 2024-04-19 14:28:55
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-22 11:16:49
 * @Description: 工程造价-运保杂费计算 铁路综合运费
 */
import { FormColumnsDefine } from 'jd-framework-web/package/components';

const columns: FormColumnsDefine<any> = [
  {
    title: '火车运距(km)',
    dataIndex: 'trainDistance',
    valueType: 'digit',
  },
  {
    title: '整车比例(%)',
    dataIndex: 'trainWhoRate',
    valueType: 'digit',
  },
  {
    title: '零担比例(%)',
    dataIndex: 'trainScaRate',
    valueType: 'digit',
  },
  { valueType: 'divider' },

  {
    valueType: 'group',
    colProps: { xs: 24 },
    columns: [
      {
        title: <div style={{ textAlign: 'center', color: '#00489d' }}>除税</div>,
        valueType: 'group',
        colProps: { xs: 12 },
        columns: [
          {
            valueType: 'group',
            colProps: { xs: 24 },
            fieldProps: { style: { paddingRight: 10, borderRight: '1px solid rgba(0, 0, 0, 0.06)' } },
            columns: [
              { valueType: 'divider' },
              {
                title: '基本运价(元/t)',
                valueType: 'group',
                colProps: { xs: 24 },
                columns: [
                  {
                    title: '整车',
                    dataIndex: 'trainWhoPrice',
                    valueType: 'digit',
                    colProps: { xs: 12 },
                  },
                  {
                    title: '零担',
                    dataIndex: 'trainScaPrice',
                    valueType: 'digit',
                    colProps: { xs: 12 },
                  },
                ],
              },

              {
                title: '加价(元/t.km)',
                valueType: 'group',
                colProps: { xs: 24 },
                columns: [
                  {
                    title: '整车',
                    dataIndex: 'trainWhoShippingPrice',
                    valueType: 'digit',
                    colProps: { xs: 12 },
                  },
                  {
                    title: '零担',
                    dataIndex: 'trainScaShippingPrice',
                    valueType: 'digit',
                    colProps: { xs: 12 },
                  },
                ],
              },

              {
                title: '运费(元)',
                valueType: 'group',
                colProps: { xs: 24 },
                columns: [
                  {
                    title: '整车',
                    dataIndex: 'trainWhoPriceTot',
                    valueType: 'digit',
                    colProps: { xs: 12 },
                  },
                  {
                    title: '零担',
                    dataIndex: 'trainScaPriceTot',
                    valueType: 'digit',
                    colProps: { xs: 12 },
                  },
                ],
              },

              { valueType: 'divider' },
              {
                valueType: 'group',
                colProps: { xs: 24 },

                columns: [
                  {
                    title: '综合运费(除税)',
                    dataIndex: 'trainTransportPrice',
                    valueType: 'digit',
                    colProps: { xs: 12 },
                  },
                ],
              },
            ],
          },
        ],
      },

      {
        title: <div style={{ textAlign: 'center', color: '#00489d' }}>含税</div>,
        valueType: 'group',
        colProps: { xs: 12 },
        columns: [
          { valueType: 'divider' },
          {
            title: '-',
            valueType: 'group',
            colProps: { xs: 24 },
            columns: [
              {
                title: '整车',
                dataIndex: 'trainWhoPriceTax',
                valueType: 'digit',
                colProps: { xs: 12 },
                fieldProps: { disabled: true },
              },
              {
                title: '零担',
                dataIndex: 'trainScaPriceTax',
                valueType: 'digit',
                colProps: { xs: 12 },
                fieldProps: { disabled: true },
              },
            ],
          },

          {
            title: '-',
            valueType: 'group',
            colProps: { xs: 24 },
            columns: [
              {
                title: '整车',
                dataIndex: 'trainWhoShippingPriceTax',
                valueType: 'digit',
                colProps: { xs: 12 },
                fieldProps: { disabled: true },
              },
              {
                title: '零担',
                dataIndex: 'trainScaShippingPriceTax',
                valueType: 'digit',
                colProps: { xs: 12 },
                fieldProps: { disabled: true },
              },
            ],
          },

          {
            title: '-',
            valueType: 'group',
            colProps: { xs: 24 },
            columns: [
              {
                title: '整车',
                dataIndex: 'trainWhoPriceTotTax',
                valueType: 'digit',
                colProps: { xs: 12 },
                fieldProps: { disabled: true },
              },
              {
                title: '零担',
                dataIndex: 'trainScaPriceTotTax',
                valueType: 'digit',
                colProps: { xs: 12 },
                fieldProps: { disabled: true },
              },
            ],
          },

          { valueType: 'divider' },
          {
            valueType: 'group',
            colProps: { xs: 24 },
            columns: [
              {
                title: '综合运费(含税)',
                dataIndex: 'trainTransportPriceTax',
                valueType: 'digit',
                colProps: { xs: 12 },
              },
            ],
          },
        ],
      },
    ],
  },
];

export default columns;
