/*
 * @Author: SHUANG
 * @Date: 2022-08-18 11:21:32
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-02-19 16:38:31
 * @Description:
 */
import { Table } from 'antd';
import { ColumnsState } from '@ant-design/pro-components';

import { BaseTableProps, TableColumnsDefine } from './typings';
import { baseTableSummaryToDecimal2NoZero } from './util';

const useSummary = (
  baseTableProps: BaseTableProps,
  columnsSource: TableColumnsDefine<any>,
  columnsStateMap?: Record<string, ColumnsState>,
  dataSourceSummary?: {},
) => {
  const { summary, summaryCalc, persistenceKey, rowSelection, requestSummary } = baseTableProps;

  const handleSummary = (pageData: readonly any[]) => {
    if (!!requestSummary) return handleRequestSummary(pageData);
    else return handleLocalSummary(pageData);
  };

  /** 前端合计 */
  const handleLocalSummary = (pageData: readonly any[]) => {
    if (!!summaryCalc) return summaryCalc(pageData);
    if (!summary || !summary?.length) return <></>;
    if (!pageData || !pageData.length) return <></>;

    const totalMap: { [index: string]: any } = {};
    summary.forEach((sum) => {
      totalMap[sum] = 0;
    });

    pageData.forEach((item) => {
      summary.forEach((sumItem) => {
        if (typeof item[sumItem] === 'number') {
          totalMap[sumItem] += item[sumItem];
        }
      });
    });

    // 按照 columnsState order 排序
    const sortColumnsStateMapRes: { [index: string]: any } = {};
    const sortColumnsStateMapValuesArray =
      columnsStateMap && Object.values(columnsStateMap).sort((a, b) => (a?.order || 0) - (b?.order || 0));

    if (!!sortColumnsStateMapValuesArray) {
      for (const item of sortColumnsStateMapValuesArray) {
        for (const key in columnsStateMap) {
          if (columnsStateMap[key]?.order === item?.order) {
            sortColumnsStateMapRes[key] = item;
          }
        }
      }
    }

    /** 如果列配置的长度和当前传入的配置长度一致 则按照用户配置进行生成 否则按照默认生成 */
    const newColumns: any = [...columnsSource];
    const columnsStateMapKeysArray = Object.keys(sortColumnsStateMapRes);
    const columnsSourceArray = newColumns?.filter((item: any) => !item?.hideInTable);

    /** 是否是默认配置 */
    let isDefault = true;
    let summaryCellGenerate = columnsSourceArray;
    if (columnsStateMapKeysArray?.length === columnsSourceArray?.length) {
      // 证明不是默认配置
      isDefault = false;
      summaryCellGenerate = columnsStateMapKeysArray;
    }

    const summaryCell = summaryCellGenerate.map((item: any, index: number) => {
      const dataIndexKey = isDefault ? item.dataIndex : item;
      if (index === 0) {
        if (!!rowSelection) {
          return (
            <>
              <Table.Summary.Cell key={0} index={1} />
              <Table.Summary.Cell key={1} index={0} align="center">
                合计
              </Table.Summary.Cell>
            </>
          );
        }

        return (
          <Table.Summary.Cell key={index} index={index} align="center">
            合计
          </Table.Summary.Cell>
        );
      }

      // 不为隐藏列 生成合计行
      if (columnsStateMap?.[dataIndexKey]?.show !== false) {
        return (
          <Table.Summary.Cell
            colSpan={1}
            key={columnsStateMap?.[dataIndexKey]?.order || index}
            index={columnsStateMap?.[dataIndexKey]?.order || index}
          >
            {baseTableSummaryToDecimal2NoZero(
              totalMap[dataIndexKey] === 0 ? 0 : totalMap[dataIndexKey] || <></>,
            )}
          </Table.Summary.Cell>
        );
      }
      return;
    });

    /** 强制合计行 clospan 为 1 */
    if (!!persistenceKey) {
      const tds: any = document
        .getElementById(persistenceKey)
        ?.getElementsByTagName('tfoot')?.[0]
        ?.getElementsByTagName('td');
      if (!!tds?.length) {
        tds?.forEach((item: any, index: number) => {
          if (index === 0) item.style.left = 0;
          item.colSpan = 1;
        });
        // tds?.[0]?.style.left = 0;
      }
    }
    return (
      <Table.Summary fixed>
        <Table.Summary.Row>{summaryCell}</Table.Summary.Row>
      </Table.Summary>
    );
  };

  /** 后台合计 */
  const handleRequestSummary = (pageData: readonly any[]) => {
    if (!!summaryCalc) return summaryCalc(pageData);
    if (!requestSummary) return <></>;
    if (!dataSourceSummary) return <></>;
    if (!pageData || !pageData.length) return <></>;

    const totalMap: { [index: string]: any } = !!dataSourceSummary ? dataSourceSummary : {};

    /** 递归克隆节点Key */
    const columnArr: any[] = [];
    const processColumns = (columnsArr: any[]) => {
      columnsArr.forEach((col: any) => {
        if (!!col.hideInTable) {
          return;
        }
        if (!!col?.children?.length) {
          processColumns(col.children);
        } else {
          columnArr.push(col);
        }
      });
    };
    processColumns(columnsSource);

    const summaryCell = columnArr.map((item: any, index) => {
      if (index === 0) {
        if (!!rowSelection) {
          return (
            <>
              <Table.Summary.Cell key={0} index={index} />
              <Table.Summary.Cell key={1} index={index} align="center">
                合计
              </Table.Summary.Cell>
            </>
          );
        }

        return (
          <Table.Summary.Cell key={index} index={index} align="center">
            合计
          </Table.Summary.Cell>
        );
      }

      if (columnsStateMap?.[item.dataIndex]?.show !== false) {
        return (
          <Table.Summary.Cell
            key={columnsStateMap?.[item.dataIndex]?.order || index}
            index={columnsStateMap?.[item.dataIndex]?.order || index}
          >
            {totalMap[item?.dataIndex || ''] === 0 ? 0 : totalMap[item?.dataIndex || ''] || ''}
          </Table.Summary.Cell>
        );
      }
    });

    return (
      <Table.Summary fixed>
        <Table.Summary.Row>{summaryCell}</Table.Summary.Row>
      </Table.Summary>
    );
  };

  return { handleSummary };
};

export default useSummary;
