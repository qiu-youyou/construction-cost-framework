/*
 * @Author: SHUANG
 * @Date: 2023-08-15 14:09:28
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-12-25 17:19:37
 * @Description:
 */

import { useState } from 'react';
import { ColumnsState } from '@ant-design/pro-table';
import { ColumnsStateType } from '@ant-design/pro-table/lib/typing';
import { queryUserColumnConfig, saveUserColumnConfig } from './services';
import { useMount } from '../../utils/util/uses';

const useColumnsState = (persistenceKey?: string, columnsStateProps?: ColumnsStateType) => {
  const localKey = 'LOCALSTATE' + persistenceKey;

  const defaultValue = columnsStateProps?.defaultValue || {};

  const [columnsStateMap, setColumnsStateMap] = useState<Record<string, ColumnsState>>();

  /** 保存用户表配置 */
  const saveColumnStateConfig = (value: Record<string, ColumnsState>) => {
    if (!persistenceKey) return;
    /** 实时生效  */
    setColumnsStateMap(value);
    /** 保存到服务器 */
    saveUserColumnConfig({
      configPosition: localKey,
      configContent: JSON.stringify(value),
    });
  };

  const getColumnStateConfig = async () => {
    if (!persistenceKey) return '';
    const res = await queryUserColumnConfig({ configPosition: localKey });
    if (res?.status !== 'SUCCESS') return {};
    if (!res?.rows?.configContent) return {};
    return JSON.parse(res?.rows?.configContent);
  };

  /** 初始化表格列配置 */
  const initColumnStateConfig = async () => {
    const localState = await getColumnStateConfig();
    setColumnsStateMap({ ...defaultValue, ...localState });
  };

  const columnsStateOnChange = async (value: Record<string, ColumnsState>) => {
    saveColumnStateConfig({ ...defaultValue, ...value });
  };

  useMount(initColumnStateConfig);

  return {
    columnsStateOnChange,
    columnsStateMap,
  };
};

export default useColumnsState;
