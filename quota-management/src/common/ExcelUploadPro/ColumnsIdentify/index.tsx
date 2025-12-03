/*
 * @Author: SHUANG
 * @Date: 2024-03-08 15:57:34
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-15 11:39:58
 * @Description: EXCEL 高级导入 行列识别
 */
import { TabsProps } from 'antd';
import { ReactNode } from 'react';
import { FileTextOutlined } from '@ant-design/icons';
import BaseCard from 'jd-framework-web/package/components/BaseCard';
import { ExcelUploadProPropsContent } from '../typings';
import EXCELWorkbook from '../EXCELWorkbook';

export default (props: ExcelUploadProPropsContent) => {
  /** 匹配好的页签数据 */
  const { sheetScopeMatching } = props;

  /** 根据匹配好的页签 生成tabs' */
  let tabPaneItems: TabsProps['items'] = [];

  const LabelRender = ({ content }: { content?: ReactNode }) => {
    return (
      <span>
        <FileTextOutlined /> {content}
      </span>
    );
  };

  sheetScopeMatching?.forEach((value, key) => {
    tabPaneItems?.push({
      children: <EXCELWorkbook sheetScopeMatchingCurrent={{ tableName: key, sheetName: value }} {...props} />,
      label: <LabelRender content={key} />,
      key,
    });
  });

  return <BaseCard noHeader tabs={{ destroyInactiveTabPane: true, items: tabPaneItems }} />;
};
