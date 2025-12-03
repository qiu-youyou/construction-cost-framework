/*
 * @Author: SHUANG
 * @Date: 2023-11-09 15:48:44
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-18 13:56:17
 * @Description: Mat明细 从定额库查询并选择增加到明细
 */
import { useRequest } from 'umi';
import { useEffect, useState } from 'react';
import DbMatQuerySelection from '../../DbMain/DatabaseMain/DataBasePane/common/DbMatQuerySelection';
import { DbMatQuerySelectonProps } from '../../DbMain/DatabaseMain/DataBasePane/common/DbMatQuerySelection';
import { databaseDbQueryPageInfo } from '../../DbMain/DatabaseMain/services';
import { DatabaseDbItem } from '../../DbMain/DatabaseMain/typings';
import DataBaseSearch from '../DataBaseSearch';
import DbSelector from '../DbSelector';

export default (props: DbMatQuerySelectonProps) => {
  /** 数据库 */
  const [dbDataSource, setDbDataSource] = useState<DatabaseDbItem[]>();

  /** 当前定额库 */
  const [databaseCurrent, setDatabaseCurrent] = useState<DatabaseDbItem>();

  /** 定额库选择器 */
  const DbselectorProps = { setDatabaseCurrent, databaseCurrent, dbDataSource };

  /** 获取定额库数据 */
  const { loading, data } = useRequest(async () => await databaseDbQueryPageInfo({ pageSize: 1000 }));

  /** 定额库选择器 */
  const DbSelectorRender = (
    <>
      <DbSelector width={400} {...DbselectorProps} />
      <DataBaseSearch {...DbselectorProps} />
    </>
  );

  /** 设置当前选中定额库 并指定为无维护权限 */
  const handleSetDatabaseCurrent: any = (record?: DatabaseDbItem) => {
    if (!!record) setDatabaseCurrent({ ...record, access: undefined });
  };

  /** 设置当前默认选中的定额库 */
  const handleSetDefaultDatabaseCurrent = (source?: DatabaseDbItem[]) => {
    setDbDataSource(source);
    if (!!props?.databaseCurrentDefault?.id) handleSetDatabaseCurrent({ ...props.databaseCurrentDefault });
    else handleSetDatabaseCurrent(source?.[0]);
  };

  /** 触发控制 */
  const triggerControl = () => {
    handleSetDefaultDatabaseCurrent(dbDataSource || data);
    if (typeof props?.triggerControl === 'function') return props?.triggerControl?.();
    return { status: 'SUCCESS' };
  };

  /** 获取到定额库后默认设置第一项为当前定额库 */
  useEffect(() => {
    handleSetDefaultDatabaseCurrent(data);
  }, [loading]);

  return (
    <DbMatQuerySelection
      databaseCurrent={{ ...databaseCurrent, access: [] } as DatabaseDbItem}
      classifyRjcTypePaneLabel={[DbSelectorRender]}
      queryByDb
      {...props}
      triggerControl={triggerControl}
    />
  );
};
