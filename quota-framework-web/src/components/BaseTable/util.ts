/*
 * @Author: SHUANG
 * @Date: 2022-08-23 11:44:54
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-10 18:03:15
 * @Description:
 */

import { Key, ProColumns } from '@ant-design/pro-components';

/** from components */
import { TableColumnsDefine } from './typings';

/** 异步测试函数 */
export const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

/**
 * @Author: SHUANG
 * @Description: 查找所有 default 为 true 的节点
 * @param {unknown} source
 * @param {string} findkey
 * @return {unknown} 查找结果
 */
export const getDefaultCheckedItems = (source: unknown[], findkey?: string) => {
  const defaultCheckedItems: any[] = [];

  const findChecked = (arr: any[], findkey?: string) => {
    if (!arr?.length) return;
    arr.forEach((item) => {
      if (item.checked) defaultCheckedItems.push(item);
      if (item?.children) findChecked(item?.children, findkey);
    });
  };

  findChecked(source, findkey);
  return defaultCheckedItems;
};

/**
 * @Author: SHUANG
 * @Description: 恢复所有已勾选
 * @Date: 2023-10-08 09:51:07
 * @param {any} source
 * @param {any} selection
 * @param {string} findkey
 * @return {*} 查找结果
 */
export const getRestoreCheckedItems = (source: any[], selection: any[], findkey: string) => {
  let restoreCheckedItems: any[] = [];

  const findChecked = (arr: any[]) => {
    if (!arr?.length) return;
    arr.forEach?.((item) => {
      let findArr: any = [];
      selection.forEach((selItem) => {
        if (item[findkey] == selItem[findkey]) {
          findArr.push(item);
        }
      });
      restoreCheckedItems = [...restoreCheckedItems, ...findArr];
      if (!!item?.children?.length) findChecked(item.children);
    });
  };

  findChecked(source);

  return restoreCheckedItems;
};

/**
 * @Author: SHUANG
 * @Description: 查找当前行
 * @Date: 2023-10-08 10:10:12
 * @param {any} source
 * @param {any} current
 * @param {string} findkey
 * @return {*} 查找结果
 */
export const getRestoreCurrent = (source: any[], current: any, findkey: string) => {
  let restoreCurrent: any;
  if (!current) return undefined;
  const findCurrent = (arr: any[]) => {
    if (!arr?.length) return;
    arr.forEach?.((item) => {
      if (item?.[findkey] === current?.[findkey]) restoreCurrent = item;
      if (!!item?.children?.length) findCurrent(item?.children);
    });
  };

  findCurrent(source);
  return restoreCurrent;
};

/** 生成基于前端的 rowKey */
export const generateRowKeyIsFontId = (data: any[]) => {
  data.forEach((item, index) => (item.frontId = index + 1));
  return data;
};

/** 动态计算表格高度 保证了穿插内容或者折叠时 表格始终 固定高度 */
export const getTableScroll = (table: any, hasFooter?: boolean) => {
  setTimeout(() => {
    if (!table?.firstChild || !table?.firstChild?.childNodes) return;
    /** 包裹 pro table 的容器 */
    const elementTableContianer = table?.firstChild;
    /** 容器内 的所有子元素 最后一个为 proTable 容器 */
    const childNodes = elementTableContianer?.childNodes;
    /** 累加高度 表格容器内排出最后一个是表格的元素的 高度累加 */
    let childNodesHeight = 0;
    for (let i = 0; i < childNodes.length - 1; i++) {
      childNodesHeight += childNodes[i]?.offsetHeight || 0;
    }
    /** protable 容器 */
    /**  protable 容器的高度是 表格容器减去 所有card内容 和 12px 向下margin */
    const elementProTable = elementTableContianer?.lastChild;
    if (!elementProTable) return;
    // const marginHeight = (childNodes.length - 1) * 8 || 8;
    const marginHeight = 0;
    elementProTable.style.height = `calc(100% - ${childNodesHeight + marginHeight}px)`;

    /** ant-table-wrapper 的高度是减去 工具栏的高度 减去分页器的高度 */
    const getToolHeight = elementProTable.getElementsByClassName('ant-pro-table-list-toolbar')?.[0]
      ?.offsetHeight;
    const toolHeight = getToolHeight || 0;

    const getPaginationHeight = elementProTable.getElementsByClassName('ant-pagination')?.[0]?.offsetHeight;
    const paginationHeight = getPaginationHeight || 0;

    const elementTableWrapper = elementProTable.getElementsByClassName('ant-table-wrapper')?.[0];
    if (!elementTableWrapper) return getTableScroll(table);
    elementTableWrapper.style.height = `calc(100% - ${toolHeight + paginationHeight + 1}px)`;

    /** 表格body的高度是 减去表头的高度 */
    const theaderHeight = elementProTable.getElementsByClassName('ant-table-header')?.[0]?.offsetHeight || 0;
    const tfooterHeight = hasFooter ? 23 : 0;
    const elementTbody = elementProTable.getElementsByClassName('ant-table-body')?.[0];

    elementTbody.style.height = `calc(100% - ${theaderHeight + tfooterHeight - 1}px)`;
    elementTbody.style.overflow = `auto`;
  }, 27);
};

// 转化为平级数据
export const transforDataSourceConcise = (arr: any[]) => {
  const result: any[] = [];
  const data: any[] = JSON.parse(JSON.stringify(arr));
  if (!data?.length) return [];
  data.forEach((item) => {
    result.push({ ...item });
    item?.children?.forEach?.((items: any) => {
      result.push(items);
    });
  });
  return result;
};

// 转化为平级数据
export const transforDataSourceConciseRecur = (arr: any[], result: any[]) => {
  const data: any[] = JSON.parse(JSON.stringify(arr));
  if (!data?.length) return;
  data.forEach((item) => {
    result.push(item);
    if (!!item?.children?.length) {
      transforDataSourceConciseRecur(item.children, result);
    }
  });
};

/** 把当前复制的数据 存在本地 */
const localActionKey = 'LOCALACTIONSROWS';
const localActionOptionKey = 'LOCALACTIONSOPTION';

export const saveActionsRows = (persistenceKey?: string, rows?: any[], option?: 'copy' | 'mv') => {
  if (persistenceKey !== 'SETTLEBILLDETAILSTABLE') return;
  sessionStorage.setItem(localActionKey, JSON.stringify(rows || []));
  if (!option) return;
  sessionStorage.setItem(localActionOptionKey, option);
};

export const getActionsRows = (persistenceKey?: string) => {
  if (persistenceKey !== 'SETTLEBILLDETAILSTABLE') return [];
  const value = sessionStorage.getItem(localActionKey);
  if (!value) return [];
  return JSON.parse(value);
};

export const getActionsOption = (persistenceKey?: string) => {
  if (persistenceKey !== 'SETTLEBILLDETAILSTABLE') return undefined;
  const value: any = sessionStorage.getItem(localActionOptionKey);
  return value || undefined;
};

/** Columns 生成默认 */
export const handelDefaultColumns = (
  columnsArr: TableColumnsDefine<any>,
  columnsOther: TableColumnsDefine<any>,
  hasSearch?: boolean,
  columnSortable?: boolean,
) => {
  if (!columnsArr?.length) return [];
  const newColumnsArr: TableColumnsDefine<any> = [...columnsArr];
  return newColumnsArr?.map((item: any, index) => {
    let newItem: ProColumns = {};
    const { valueType } = item;

    /** 如果数字形式的 ，右对齐  */
    if (valueType === 'digit' || valueType === 'percent' || valueType === 'money') {
      newItem = { width: 100, align: 'right', ellipsis: false };
      /** 百分比 右对齐 */
      if (valueType === 'percent') {
        newItem = { width: 80, align: 'right', ellipsis: false };
      }
    }

    /** 如果是日期形式 居中对齐 */
    if (valueType === 'date' || valueType === 'time') {
      newItem = { width: 90, align: 'center', ellipsis: false };
    }

    if (valueType === 'dateMonth' || valueType === 'dateYear') {
      newItem = { width: 70, align: 'center', ellipsis: false };
    }

    if (valueType === 'dateTime') {
      newItem = { width: 120, align: 'center', ellipsis: false };
    }

    /** 如果是枚举形式 居中对齐 */
    if (valueType === 'select' || valueType === 'treeSelect' || valueType === 'radioButton') {
      newItem = { width: 75, align: 'center', ellipsis: false };
      // 添加默认
      // if (!item.valueEnum && !item.request) newItem.valueEnum = {};
    }

    if (valueType === 'textarea') {
      newItem = { width: 220 };
    }

    if (valueType === 'radio' || valueType === 'checkbox' || valueType === 'image') {
      newItem = { width: 50, align: 'center', ellipsis: false };
      // 添加默认
      // if (!item.valueEnum && !item.request) newItem.valueEnum = {};
    }

    /**  如果没有指定宽度的 text 形式 简短文字默认宽度 */
    if (!item?.valueType && item?.dataIndex !== 'index' && item?.dataIndex !== 'action') {
      newItem = { width: 170 };
    }

    /** 默认属性 */
    item.editable = false;

    if (columnSortable && item?.dataIndex !== 'index') {
      item.sorter = item?.sorter !== undefined ? item.sorter : true;
    }

    /** 如果存在子级 */
    if (item?.children?.length) {
      item.sorter = false;
      /** 含有子级 关闭 search */
      item.search = false;

      item.children.forEach((chilItem: any) => {
        chilItem.isLeaf = true;
        chilItem.parentIndex = index;
      });

      const children: any = handelDefaultColumns(item?.children, columnsOther, columnSortable); // 递归处理子级
      return { ...newItem, ...item, children };
    }

    /** 如果支持search 就单独拷贝出来一份 需要单独处理 */
    if (hasSearch && !item?.isLeaf && item?.search !== false && !item?.hideInTable) {
      /** 完整复制一份 */
      const copyitem = { ...item, hideInTable: true, cellEdit: false };
      columnsOther.push(copyitem);
      return { ...newItem, ...item, search: false };
    }

    return { ...newItem, ...item };
  });
};

/** Columns editable 处理 */
export const handleEditableColumns = (columnsArr: TableColumnsDefine<any>, dataIndex: string) => {
  if (!columnsArr?.length) return [];
  const newColumnsArr: TableColumnsDefine<any> = [...columnsArr];
  return newColumnsArr?.map((item: any) => {
    if (item.dataIndex === dataIndex) {
      delete item.editable;
    } else {
      item.editable = false;
    }
    // 递归处理子级
    if (item?.children?.length) {
      const children: TableColumnsDefine<any> = handleEditableColumns(item.children, dataIndex);
      return { ...item, children };
    }
    return { ...item };
  });
};

//保留2位小数，如：2，还会保留2 不会补0
export function baseTableSummaryToDecimal2NoZero(money: number) {
  if (typeof money !== 'number') {
    return money;
  }
  const f = Math.round(money * 100) / 100;
  const s = f.toString();
  return s;
}

/** 递归克隆节点Key */
export const deepTraversa = (node: any, nodelist?: Key[], rowKey?: string) => {
  const keysList = nodelist || [];
  if (node !== null) {
    keysList.push(node?.[rowKey || 'frontId']);
    for (let i = 0; i < node?.children?.length; i++) {
      deepTraversa(node?.children[i], keysList, rowKey);
    }
  }
  return keysList;
};

// newColumns中 根据 KEY 递归查找该节点
export const modifyWidthColumnsByDataIndex = (key: string, nodes: any[], width: number): any => {
  nodes.forEach((node) => {
    if (node.dataIndex === key && node?.hideInTable != true) {
      node.width = width || 200;
      return;
    }
    if (node?.children?.length) {
      node.children = modifyWidthColumnsByDataIndex(key, node.children, width);
    }
  });

  return nodes;
};
