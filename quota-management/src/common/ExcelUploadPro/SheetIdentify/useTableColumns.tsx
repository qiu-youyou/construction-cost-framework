/*
 * @Author: SHUANG
 * @Date: 2024-02-28 18:14:32
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-11 14:33:15
 * @Description: EXCEL 高级导入 页签识别
 */

import { TableActionType, TableColumnsDefine } from 'jd-framework-web/package/components';
import { ExcelUploadProPropsContent } from '../typings';

type Props = { sheetIdentifyTableRef?: TableActionType };

export default (props: ExcelUploadProPropsContent & Props) => {
  /** 解析后的文件信息 */
  const { workbookInfo } = props;

  /** 匹配好的页签数据 */
  const { sheetScopeMatching } = props;

  const { sheetIdentifyTableRef } = props;

  const sheetNameOptions = workbookInfo?.sheets?.map(({ name }: any) => ({ label: name, value: name }));

  const columns: TableColumnsDefine<any> = [
    {
      dataIndex: 'index',
      width: 20,
    },
    {
      title: '表名称',
      dataIndex: 'tableName',
      width: 100,
    },
    {
      title: 'SHEET页签',
      dataIndex: 'sheetName',
      valueType: 'select',
      cellEdit: true,
      width: 100,
      customFieldProps: (_, config) => ({
        options: sheetNameOptions,
        onClear: () => {
          sheetScopeMatching?.delete(config?.entity?.id);
          sheetIdentifyTableRef?.current?.reload?.();
        },
      }),
    },
  ];

  return columns;
};
