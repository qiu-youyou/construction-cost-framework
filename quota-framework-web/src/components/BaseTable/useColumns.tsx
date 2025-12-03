/*
 * @Author: SHUANG
 * @Date: 2022-08-18 11:21:32
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-25 17:57:11
 * @Description:
 */
import moment from 'moment';
import { Tooltip, Typography } from 'antd';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { ResizeCallbackData } from 'react-resizable';
import { FormInstance } from '@ant-design/pro-components';

/** from components */
import { BaseTableProps, TableActionType, TableColumnsDefine } from './typings';
import { modifyWidthColumnsByDataIndex, handleEditableColumns } from './util';
import { generateColumns } from './data';

const { Text } = Typography;

const includesUnit = ['unit', 'mUnit', 'visaUnit', 'detailUnit', 'materialUnit'];
let lastTimeStamp: any;
/** 查找当前正在编辑的单元格 */
function findCurEditableColumn(arrColumns: any, item: any) {
  for (let i = 0; i < arrColumns.length; i++) {
    const currentColumn = arrColumns[i];
    const nextColumn = arrColumns[i + 1];

    /** 是否可编辑 */
    const isCellEdit = currentColumn?.cellEdit;

    /** 是否为同一个 */
    const isSameDataIndex = currentColumn?.dataIndex === item?.dataIndex;

    /** 下一项是否有children */
    const nextHasChildren = !!nextColumn?.children?.length;

    /** 如果如果下一列是可编辑列有children 优先返回chldren中的索引 */
    if (isCellEdit && isSameDataIndex && nextHasChildren) {
      /** 如果下一项是 有chidren的 那么item 一定是chirldren中 第一个可编辑的列 */
      const childrenItem = nextColumn.children.find((findItem: any) => findItem.cellEdit);
      const findCurChildren: any = findCurEditableColumn(nextColumn.children, childrenItem);
      if (findCurChildren.curIndex !== -1) {
        return findCurChildren;
      }
    }

    if (isCellEdit && isSameDataIndex) {
      return { curIndex: i, curColumns: arrColumns };
    }
  }
  /**  没有找到 */
  return -1; // Not found
}

/** 查找下一个可编辑单元格 */
function findNextEditableColumn(arrColumns: any, currentIndex = 0) {
  if (currentIndex >= arrColumns.length - 1) {
    return null; // No more editable arrColumns found
  }
  /** 当前位置的下一个单元格 */
  const nextItem = arrColumns[currentIndex + 1];
  const noChildren = !nextItem?.children?.length;

  /** 如果生命了 cellEdit并且包含chidlren 就去children 里面寻找 */
  if (nextItem?.cellEdit && !noChildren) {
    return findNextEditableColumn(nextItem?.children, 0);
  }
  /** 如果可编辑 也没有children 就是这个 */
  if (nextItem?.cellEdit && noChildren) {
    return nextItem;
  }
  /** 继续查找 */
  return findNextEditableColumn(arrColumns, currentIndex + 1);
}

const useColumns = (baseTableProps: BaseTableProps, tableRefresh: () => void, refTable: TableActionType) => {
  const {
    columns: columnsProp,
    rowKey: rowKeyProps,
    service,
    cellEditable,
    columnDigitNilText,
    columnSortable,
    search,
  } = baseTableProps;
  const rowKey = rowKeyProps || 'frontId';

  /** 可控的编辑 */
  const generate = generateColumns(columnsProp, !!search, columnSortable);
  const [editableKeys, setEditableKeys] = useState<React.Key>();
  const [columnsSource, setColumnsSource] = useState<TableColumnsDefine<any>>(generate);

  /** 保存 可编辑表格的dataIndex  用于设置动态类*/
  const [editDataIndex, setEditDataIndex] = useState();

  /** 根据传入的props更新列表 */
  const prevColumnsProp = useRef(columnsProp);
  useEffect(() => {
    if (!baseTableProps?.columnsDynamic) return;
    if (columnsProp != prevColumnsProp.current) {
      prevColumnsProp.current = columnsProp;
      if (columnsSource.length === generate.length) {
        // 将伸缩后的列宽重新赋值给新的columns
        columnsSource.forEach((item) => {
          const index = generate.findIndex((generateItem) => {
            if (!generateItem.hideInTable && !item.hideInTable) {
              return generateItem.dataIndex === item.dataIndex;
            }
          });
          if (index !== -1) {
            generate[index].width = item.width;
          }
        });
      }
      // 设置可编辑列
      const formatGenerate = editDataIndex ? handleEditableColumns(generate, editDataIndex) : generate;
      setColumnsSource(formatGenerate);
    }
  }, [columnsProp]);

  /** 支持列拖动 */
  const handleResize =
    (columns: any, index: number) =>
    (_: React.SyntheticEvent<Element>, { size }: ResizeCallbackData) => {
      const newColumns: any = [...columnsSource];

      /** 如果是叶子节点 */
      if (columns?.isLeaf) {
        const nodes = modifyWidthColumnsByDataIndex(columns.dataIndex, newColumns, size.width);
        setColumnsSource(nodes);
        return;
      }

      newColumns[index] = { ...newColumns[index], width: size.width };
      setColumnsSource(newColumns);
    };

  /** 表格列头拖动事件 */
  const handleOnHeaderCell = (columns: any, index: number) => {
    const { width } = columns;
    return { width, onResize: handleResize(columns, index) };
  };

  /** 生成可编辑 单元格 */
  const handleSetEditColumns = (dataIndex: string) => {
    const res = handleEditableColumns(columnsSource, dataIndex);
    setColumnsSource(res);
  };

  /** 可编辑单元格 进入焦点事件 */
  const handleCellEditOnFocus = (e: any, form: FormInstance) => {
    // 上一次 e.timeStamp 与这一次 e.timeStamp 间隔小于 100 return
    if (e.timeStamp - lastTimeStamp < 100) {
      return;
    }
    lastTimeStamp = e.timeStamp;
    form?.resetFields?.();
    e?.target?.focus();
    e?.target?.select(); // 进入焦点后自动选中所有内容
  };

  /** 可编辑单元格 保存编辑内容 */
  const handleCellEditOnSubmit = async (form: FormInstance, row: any, item: any) => {
    const { rowKey, entity } = row;
    await form.validateFields();
    const { dataIndex } = item;

    const rowValue = form.getFieldValue(rowKey || '');
    let rowNewValue = rowValue?.[dataIndex];
    /** 如果是 枚举类型 */
    if (rowValue?.[dataIndex]?.includes?.('label')) {
      rowNewValue = rowValue?.[dataIndex];
    }

    /** 如果是 日期类型 */
    if (moment.isMoment(rowValue?.[dataIndex])) {
      if (item?.valueType === 'time') {
        rowNewValue = rowValue?.[dataIndex].format('HH:mm');
      } else if (item?.valueType === 'dateTime') {
        rowNewValue = rowValue?.[dataIndex].format('YYYY-MM-DD HH:mm:ss');
      } else if (dataIndex === 'yearMonth') {
        rowNewValue = rowValue?.[dataIndex].format('YYYY-MM');
      } else {
        rowNewValue = rowValue?.[dataIndex].format('YYYY-MM-DD');
      }
    }

    /** 如果是可输入可选择单位 保存输入的值 */
    if (!!item?.selectWritingIn) {
      rowNewValue = form?.getFieldValue?.(dataIndex);
    }

    const modifyRecord: FETCH.CellEditReq = {
      id: rowKey?.[0] || '',
      filedName: dataIndex,
      newValue: rowNewValue,
    };

    /** 无效修改 */
    if (!rowKey?.[0] || rowNewValue === undefined) {
      setEditableKeys(undefined);
      return;
    }

    /** 新的值与旧的值相同 不做更改 */
    if (modifyRecord.newValue === entity?.[dataIndex]) {
      setEditableKeys(undefined);
      return;
    }

    /** 修改并没有成功 */
    setEditableKeys(undefined);
    const entitySource = { ...entity };
    entity[dataIndex] = modifyRecord.newValue;

    const res = await service?.cellEditSaveRequest?.(
      modifyRecord,
      service?.params,
      service?.cellParams,
      {
        ...entity,
      },
      entitySource,
    );
    tableRefresh?.();
    // entity[col.dataIndex] = modifyRecord.newValue;
    // for (const key in res?.rows) {
    //   entity[key] = res?.rows[key];
    // }
  };

  /** 可编辑单元格 tab 到下一项 */
  const handlecellEditOnTabNext = async (form: FormInstance, { entity }: any, item: any) => {
    // cellEdit 为true 才算
    // 当前节点是否是子节点
    const findColumns = item?.isLeaf ? columns[item?.parentIndex].children : columns;
    let { curIndex, curColumns } = findCurEditableColumn(findColumns, item);
    if (curIndex === -1) return;
    const findNextColumn = findNextEditableColumn(curColumns, curIndex);
    if (!findNextColumn) return;

    setTimeout(() => {
      handleSetEditColumns(findNextColumn?.dataIndex);
      refTable?.current?.startEditable?.(entity[rowKey]);
      setEditableKeys(entity[rowKey]);
    }, 0);
  };

  /** 可编辑单元格 检测按键 */
  const handleCellEditOnKeyDown = async (key: string, form: FormInstance, row: any, item: any) => {
    if (key === 'Escape') {
      // ESC 按键退出编辑
      form?.resetFields?.();
      setEditableKeys(undefined);
    }
    if (key === 'Tab') handlecellEditOnTabNext(form, row, item);
  };

  /** 处理可编辑单元格自定义渲染 */
  const handleCellEditRender = (
    dom: ReactNode,
    entity: any,
    index: number,
    action: any,
    schema: any,
    item: any,
  ) => {
    let cellEditRender: ReactNode;
    let cellDigitRender = '';
    const { cellEdit, dataIndex, customRender } = item;
    const propsArgs = [dom, entity, index, action, schema];

    const onCellClickStartEdit = () => {
      handleSetEditColumns(dataIndex);
      // 用于设置动态类
      setEditDataIndex(dataIndex);
      action?.startEditable?.(entity[rowKey]);
      setEditableKeys(entity[rowKey]);
    };

    const value = entity?.[item?.dataIndex];

    /** 处理显示精度问题 */
    if (item?.valueType === 'digit') {
      /** 为0显示 */
      /** 修复 精度 bug */
      if (columnDigitNilText != '0' && value == 0) cellDigitRender = columnDigitNilText || '';
      else cellDigitRender = value || dom;
    }

    /** 数值为0 单独处理 */
    const newDom = item?.valueType === 'digit' ? cellDigitRender : dom;

    cellEditRender =
      item?.ellipsis === false ? (
        customRender?.(...propsArgs) || newDom
      ) : (
        <Tooltip destroyTooltipOnHide={true} mouseEnterDelay={0.8} title={value || ''}>
          <Text style={{ width: 'max-content' }} ellipsis={true}>
            {customRender?.(...propsArgs) || newDom}
          </Text>
        </Tooltip>
      );

    /** 子级支持编辑 父级必须支持 */
    if (!cellEditable || !cellEdit) return cellEditRender;

    /** 如果可编辑属性传入为一个函数 那么根据这个函数的返回值来决定是否可编辑 */
    if (typeof cellEdit === 'function') {
      if (!cellEdit(entity, index, action, schema)) return cellEditRender;
    }

    return (
      <div className="ant-table-row-edit" onClick={onCellClickStartEdit}>
        {cellEditRender}
      </div>
    );
  };

  /** 处理单元格编辑表单项 */
  const handleCellEditFieldProps = (form: FormInstance, row: any, item: any) => {
    const { customFieldProps: customFieldProps, cellEdit } = item;
    /** 如果被传入自定一 filedProps 先获取再返回 不然默认的 filedProps */
    const fieldProps =
      typeof customFieldProps === 'function' ? customFieldProps(form, row) : customFieldProps;

    /** 返回 fiedlProps 用户传入权重更大 */
    const newFieldProps: { [index: string]: any } = {};

    // 下拉可以输入
    if (item?.valueType === 'select') {
      newFieldProps['showSearch'] = true;

      // 选择器支持写入
      if (!!item?.selectWritingIn) {
        if (!fieldProps?.onSearch) {
          newFieldProps['onSearch'] = (value: string) => {
            if (value !== '') {
              const values: any = {};
              values[item?.dataIndex] = value;
              form?.setFieldsValue?.({ ...values });
            }
          };
        }
        if (!fieldProps?.onChange) {
          newFieldProps['onChange'] = (value: string) => {
            const values: any = {};
            values[item?.dataIndex] = value;
            form?.setFieldsValue?.({ ...values });
          };
        }
      }
    }

    if (item?.valueType === 'digit') {
      // 数字可以穿负值
      newFieldProps['min'] = Number.MIN_SAFE_INTEGER;
      // 去掉数字格式旁边的箭头
      newFieldProps['controls'] = false;
    }

    /** 子级支持编辑 父级必须支持 */
    if (!cellEditable || !cellEdit) return { ...newFieldProps, ...fieldProps };

    /** 返回 fiedlProps 用户传入权重更大 */
    const newCellEditFieldProps = {
      //自动获取焦点
      autoFocus: true,
      /** 当前编辑进入默认选中所有内容 */
      onFocus: (e: any) => handleCellEditOnFocus(e, form),
      /** 当前编辑失去焦点出发提交 */
      onBlur: () => handleCellEditOnSubmit(form, row, item),
      /** 当前编辑回车按键触发提交 */
      onPressEnter: () => handleCellEditOnSubmit(form, row, item),

      /** 当前编辑检测 ESC 触发退出 */
      /** 当前编辑检测 Tab 自动激活下一项 */
      onKeyDown: ({ key }: { key: string }) => handleCellEditOnKeyDown(key, form, row, item),
      ...newFieldProps,
      ...fieldProps,
    };

    return newCellEditFieldProps;
  };

  /** 处理单元格即点即编 */
  const handleTableCellEdit = (columnsArr: TableColumnsDefine<any>, childrenIs?: boolean) => {
    if (!columnsArr?.length) return columnsArr;
    const newColumnsArr: TableColumnsDefine<any> = [...columnsArr];
    /** */
    return newColumnsArr.map((item, index) => {
      /** 支持即点即编 */
      item = {
        ...item,
        render: (...args) => handleCellEditRender(...args, item),
        fieldProps: (...args) => handleCellEditFieldProps(...args, item),
        onHeaderCell: (_) => handleOnHeaderCell(_, index),
      };

      /** 递归处理子级 处理嵌套多层级表格 */
      if (item?.children?.length) {
        const children: TableColumnsDefine<any> = handleTableCellEdit(item.children, true);
        return { ...item, children };
      }
      return item;
    });
  };

  const columns: TableColumnsDefine<any> = handleTableCellEdit(columnsSource);
  return { columns, editableKeys };
};

export default useColumns;
