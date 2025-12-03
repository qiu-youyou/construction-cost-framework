/*
 * @Author: SHUANG
 * @Date: 2024-03-08 16:55:59
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-26 15:25:43
 * @Description:  EXCEL 匹配
 */

import { Select } from 'antd';
import ReactDOM from 'react-dom';
import '@fortune-sheet/react/dist/index.css';
import { Workbook } from '@fortune-sheet/react';
import { CSSProperties, useEffect, useState } from 'react';
import ViewContainer from 'jd-framework-web/package/components/ViewContainer';
import { EXCELTableProps } from '../typings';

const SHEETID = 'JDCOMPONENTS_EXCELUPLOADPRO_EXCELTABLE';

export default (props: EXCELTableProps) => {
  /** 工作簿解析 */
  const { workbookInfo } = props;

  /** 当前匹配好的 专业和页签 */
  const { sheetScopeMatchingCurrent } = props;

  /** 列宽度 */
  const [columnlen, setColumnlen] = useState<number[]>();

  /** 当前激活的SHEET */
  const sheetName = sheetScopeMatchingCurrent?.sheetName || '';

  /** 序号列宽度 */
  const [fortuneLeftTopWidth, setFortuneLeftTopWidth] = useState<string>('45px');

  /** 当前匹配导入字典 */
  const [matchDictionary, setMatchDictionary] = useState<{}[]>([]);

  /** 当前列匹配结果 */
  const [matchColumns, setMatchColumns] = useState<string[]>([]);

  /** 当前行匹配结果 */
  // const [matchRows, setMatchRows] = useState<string[]>();

  /**  EXCEL 工作簿 配置 */
  const WorkbookSettings = { showToolbar: false, allowEdit: false, showFormulaBar: false, lang: 'zh-CN' };

  /** EXCEL 工作簿 匹配器 跟随滚动 */
  const handleWorkbookScrollLeft = (e: any) => {
    const workbookScrollLeft = e?.target?.scrollLeft || 0;
    const SELECTElement = document.getElementById(SHEETID + '_SELECT');
    if (!SELECTElement) return;

    SELECTElement.scrollLeft = workbookScrollLeft;
  };

  /** 根据匹配信息 生成列头匹配 */
  const handleWorkbookColumns = () => {
    const { excelMatchInfo } = props;

    const matchInfoDictionary = JSON.parse(excelMatchInfo?.dictionary || '{}');
    const matchInfoFirstMatchLine = JSON.parse(excelMatchInfo?.firstMatchLine || '{}');

    /** 当前激活的Table */
    const tableName = sheetScopeMatchingCurrent?.tableName || '';

    /** 找到当前 SHEET 对应 DATA */
    const dictionary = eval(matchInfoDictionary?.[tableName] || '[]');
    const columns = eval(matchInfoFirstMatchLine?.[tableName] || '[]');

    setMatchDictionary(dictionary?.map((item: string) => ({ label: item, value: item })));
    setMatchColumns(columns);
  };

  /** 转换 XLSX 为可读JSON */
  const renderWorkbook = async () => {
    /** 根据匹配信息 生成列头匹配 */
    handleWorkbookColumns();

    /** 找到当前 SHEET 对应 DATA */
    const sheets = workbookInfo?.sheets?.filter(({ name }: { name: string }) => name === sheetName);
    setColumnlen(Object.values(sheets?.[0]?.config?.columnlen || {}));

    /** 渲染 工作簿 */
    ReactDOM.render(
      <Workbook {...WorkbookSettings} data={sheets} />,
      document.getElementById(SHEETID),
      () => {
        setTimeout(() => {
          const workbookScrollLeftEl = document.querySelector('.luckysheet-scrollbar-x');
          if (!workbookScrollLeftEl) return;
          workbookScrollLeftEl.removeEventListener('scroll', handleWorkbookScrollLeft, false);
          workbookScrollLeftEl.addEventListener('scroll', handleWorkbookScrollLeft, false);
          /** 序号列 宽度 */
          const fortuneLeftTop: any = document.querySelector('.fortune-left-top');
          const fortuneLeftTopWidth = fortuneLeftTop?.style?.width || '45px';
          setFortuneLeftTopWidth(fortuneLeftTopWidth);
        }, 0);
      },
    );
  };

  /** 匹配列头发生改变 */
  const handleMatchColumns = (value: string, option: {}, index: number) => {
    const newMatchColumns = [...matchColumns];
    newMatchColumns[index] = value;
    setMatchColumns(newMatchColumns);

    const { excelMatchInfo, setExcelMatchInfo } = props;

    const matchInfoFirstMatchLine = JSON.parse(excelMatchInfo?.firstMatchLine || '{}');
    const tableName = sheetScopeMatchingCurrent?.tableName || '';
    if (!matchInfoFirstMatchLine?.[tableName]) return;

    /** 缓存改动后的信息 */
    matchInfoFirstMatchLine[tableName] = JSON.stringify(newMatchColumns);
    setExcelMatchInfo?.((v: any) => ({ ...v, firstMatchLine: JSON.stringify(matchInfoFirstMatchLine) }));
  };

  /** 源文件发生改变 */ 
  useEffect(() => {
    if (!sheetScopeMatchingCurrent) return;
    if (!workbookInfo) return;
    renderWorkbook();
  }, [workbookInfo]);

  const selectorSytle: CSSProperties = {
    border: '1px solid rgba(0,0,0,0.08)',
    margin: '5px 0 10px 0px',
    whiteSpace: 'nowrap',
    padding: '4px 0px',
    overflow: 'hidden',
    borderRadius: 2,
  };

  const textorStyle: CSSProperties = {
    display: 'inline-block',
    textAlign: 'center',
    color: '#00489d',
  };

  return (
    <ViewContainer scroll="percent">
      <div style={selectorSytle} id={SHEETID + '_SELECT'}>
        <span style={{ ...textorStyle, width: fortuneLeftTopWidth }}>状态:</span>
        {!!matchColumns?.length &&
          matchColumns.map((item, index) => (
            <Select
              style={{ width: columnlen?.[index] || 80, marginRight: 1 }}
              onChange={(value, option) => handleMatchColumns(value, option, index)}
              defaultValue={item === '未匹配' || !item ? undefined : item}
              options={matchDictionary}
              placeholder="未匹配"
              key={index}
              showSearch
              allowClear
            />
          ))}

        {!!matchColumns?.length &&
          new Array(10)
            .fill(0)
            ?.map((_, i) => <span key={i} style={{ display: 'inline-block', width: 5000 }} />)}
      </div>

      <div id={SHEETID} />
    </ViewContainer>
  );
};
