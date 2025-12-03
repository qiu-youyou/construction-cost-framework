/*
 * @Author: SHUANG
 * @Date: 2023-10-16 15:53:53
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-02-29 17:41:02
 * @Description: 定额库选择器 功能
 */
import { Select, SelectProps } from 'antd';
import { CSSProperties } from 'react';
import { DataBaseProps } from '../../DbMain/DatabaseMain/typings';
import styles from './index.less';

type Props = {
  width?: number;
  dbSelectorDisabled?: boolean;
  selectProps?: SelectProps<any, any>;
};

export default (props: DataBaseProps & Props) => {
  const fieldNames = { label: 'dbName', value: 'id' };

  const SelectorStyle: CSSProperties = {
    width: props?.width || 300,
    transform: 'translateY(-1.5px)',
    marginLeft: '-8px',
    fontWeight: 600,
    border: 'none',
    height: 22,
  };

  /** 接收数据 */
  const { dbSelectorDisabled } = props;
  const { dbDataSource, databaseCurrent, setDatabaseCurrent } = props;

  /** 搜索过滤 */
  const filterOption = (input: string, option?: { dbName: string }) =>
    (option?.dbName ?? '').toLowerCase().includes(input.toLowerCase());

  /** 数据改变更改当前定额库 */
  const selectOnChange = (id: string) => {
    const selectCurrent = dbDataSource?.find((item) => item.id === id);
    setDatabaseCurrent?.(selectCurrent);
  };

  return (
    <span className={styles.dbSelector}>
      <Select
        showSearch
        bordered={false}
        style={SelectorStyle}
        options={dbDataSource}
        fieldNames={fieldNames}
        filterOption={filterOption}
        disabled={dbSelectorDisabled}
        loading={dbDataSource == undefined}
        dropdownMatchSelectWidth={300}
        value={databaseCurrent?.id}
        onChange={selectOnChange}
        {...props.selectProps}
      />
    </span>
  );
};
