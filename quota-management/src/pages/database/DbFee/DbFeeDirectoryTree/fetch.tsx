/*
 * @Author: SHUANG
 * @Date: 2023-10-31 18:43:41
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-02-18 14:11:03
 * @Description: 取费目录
 */

import { Modal } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { TreeActionType } from 'jd-framework-web/package/components';

import { DbFeeDirectoryItem, DbFeeDirectoryPasteParams, DbFeeDirectorySaveParams } from './typings';
import { DatabaseDbItem } from '../../DbMain/DatabaseMain/typings';
import { dbFeeDirectoryPaste, dbFeeDirectorySave } from './services';

/**
 * @Author: SHUANG
 * @Description: 取费目录增加删除方法
 * @Date: 2023-11-09 09:09:39
 */
export const fetchDbFeeDirectorySave = async (
  params: DbFeeDirectorySaveParams,
  databaseCurrent?: DatabaseDbItem,
) => {
  const dbCode = databaseCurrent?.dbCode || '';
  const dbSimple = databaseCurrent?.dbSimple || '';
  const dbPhase = databaseCurrent?.dbPhase || '';
  const finalParams: DbFeeDirectorySaveParams = {
    ...params,
    dbCode,
    dbSimple,
    dbPhase,
  };
  const res = await dbFeeDirectorySave(finalParams);
  return res;
};

/**
 * @Author: SHUANG
 * @Description: 取费目录粘贴操作
 * @Date: 2023-10-31 18:44:43
 * @name params 粘贴原参数
 * @name current 粘贴的目标行
 * @name actionRows 被粘贴的行数组
 */
export const handleDbFeeDirectoryPaste = async (
  params: FETCH.Paste,
  current?: DbFeeDirectoryItem,
  actionRows?: DbFeeDirectoryItem[],
  databaseCurrent?: DatabaseDbItem,
  other?: unknown,
) => {
  /** 原库原章节信息 */
  const actionCurrent = actionRows?.[0];

  if (!actionCurrent) return { status: 'ERROR' };

  /** 要复制的库ID */
  const dbId = actionCurrent?.dbId || '';

  /** 目标库ID 目标 parentId */
  const currentDbId = current?.dbId || databaseCurrent?.id || '';
  const parentId = current?.parentId || '0';

  /** 最终参数 */
  const finalParams: DbFeeDirectoryPasteParams = {
    ...params,
    currentDbId,
    parentId,
    dbId,
  };

  const res = await dbFeeDirectoryPaste(finalParams);
  return res;
};

/**
 * @Author: SHUANG
 * @Description: 粘贴控制
 * @Date: 2023-11-01 09:59:34
 */
export const handleDbFeeDirectoryPasteTrigger: (
  selections?: any[] | undefined,
  actionType?: 'copy' | 'mv' | undefined,
  dbFeeDirectoryTreeRef?: { current?: TreeActionType },
) => Promise<FETCH.Res<any>> = async (selections, actionType, dbFeeDirectoryTreeRef) => {
  /** 如果没有有效节点进行提示 */
  const errorReturn: FETCH.Res = { status: 'ERROR', code: '', rows: [] };

  const validSelections = selections?.filter((item) => !item?.children?.length);
  if (!validSelections?.length) {
    const modalInfo = {
      icon: <InfoCircleOutlined />,
      content: '所选节点不可复制！请选择最后层级中节点进行复制！',
      title: '继续操作',
      okText: '确定',
    };
    Modal.warning(modalInfo);
    return errorReturn;
  }

  /** 设置被复制的行 只为有效行 */
  dbFeeDirectoryTreeRef?.current?.setTreeSelections?.(validSelections);
  dbFeeDirectoryTreeRef?.current?.setTreePasteSelections?.(validSelections, actionType);

  return errorReturn;
};
