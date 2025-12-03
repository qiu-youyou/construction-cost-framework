/*
 * @Author: SHUANG
 * @Date: 2024-02-28 17:56:06
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-11 17:19:37
 * @Description: EXCEL 高级导入 页签识别
 */

import LuckyExcel from 'luckyexcel';
import { Typography, message } from 'antd';
import { CSSProperties, useEffect, useRef } from 'react';
import BaseTable from 'jd-framework-web/package/components/BaseTable';
import { BaseTableProps, TableActionType } from 'jd-framework-web/package/components';

import { ExcelUploadProPropsContent } from '../typings';
import useTableColumns from './useTableColumns';

export default (props: ExcelUploadProPropsContent) => {
  /** 导入源文件 */
  const { fileSourceList } = props;

  /** 文件解析后信息 */
  const { workbookInfo, setWorkbookInfo } = props;

  /** 匹配好的页签数据 */
  const { sheetScopeMatching, structuralScopeSelect } = props;

  /** 匹配SHEET页 表 REF */
  const sheetIdentifyTableRef = useRef<TableActionType>();

  /** 转换 XLSX 为可读JSON */
  const transformExcel = () => {
    props?.setLoading?.(true);
    /** 文件 */
    const originFile = fileSourceList?.[0]?.originFileObj;
    /** 读取异常 */
    const handleError = (error: any) => {
      message.error(error);
      props?.setLoading?.(false);
    };
    /** 当前 SHEETS */
    LuckyExcel.transformExcelToLucky(
      originFile,
      (info: any) => {
        setWorkbookInfo?.(info);
        props?.setLoading?.(false);
      },
      handleError,
    );
  };

  /** 组装 已选择范围 */
  const dataSourceRequest = async () => {
    const tableDataSource = structuralScopeSelect?.map((item) => {
      const sheetName = sheetScopeMatching?.get(item?.label) || '';
      const dataItem = { id: item?.label, tableName: item?.label, sheetName };
      return dataItem;
    });
    const successReturn: FETCH.Res = { code: '200', status: 'SUCCESS', rows: tableDataSource || [] };
    return successReturn;
  };

  /** 选择对应 SHEET */
  const cellEditSaveRequest = async (params: FETCH.CellEditReq) => {
    sheetScopeMatching?.set(params?.id, params?.newValue || '');
    const successReturn: FETCH.Res = { code: '200', status: 'SUCCESS', rows: [] };
    return successReturn;
  };

  /** 源文件发生改变 */
  useEffect(() => {
    if (!fileSourceList?.length) return;
    transformExcel();
  }, [fileSourceList]);

  /** 匹配SHEET页 表 */
  const generateTable: BaseTableProps = {
    persistenceKey: 'JDCOMPONENTS_SHEETIDENTIFY_TABLE',
    columns: useTableColumns({ workbookInfo, sheetScopeMatching, sheetIdentifyTableRef }),
    service: { dataSourceRequest, cellEditSaveRequest },
    actionRef: sheetIdentifyTableRef,
    columnsDynamic: true,
    rowSelection: false,
    cellEditable: true,
    pagination: false,
    virtual: false,
    search: false,
  };

  /** section style */
  const sectionStyle: CSSProperties = {
    margin: '20px auto 60px auto',
    padding: 10,
    width: 900,
  };

  /** table section style */
  const tableSectionStyle: CSSProperties = {
    border: '1px solid #d7d7d7',
    padding: '10px 15px',
    height: 400,
  };

  return (
    <section style={sectionStyle}>
      <Typography.Title level={5} style={{ marginBottom: 18 }}>
        表格页签识别
      </Typography.Title>

      <section style={tableSectionStyle}>
        <BaseTable {...generateTable} />
      </section>
    </section>
  );
};
