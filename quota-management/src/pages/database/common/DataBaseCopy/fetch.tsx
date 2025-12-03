/*
 * @Author: SHUANG
 * @Date: 2023-11-07 11:22:49
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-02-22 10:23:38
 * @Description: 定额库复制
 */

import { Modal } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

import { DatabaseDbCopy, DatabaseDbItem } from '../../DbMain/DatabaseMain/typings';
import { databaseDbDbCopy } from '../../DbMain/DatabaseMain/services';

/**
 * @Author: SHUANG
 * @Description: 复制定额库方法
 * @Date: 2023-11-07 11:23:10
 * @name params 复制默认参数
 * @name databaseCurrent 当前数据库
 */

export const fetchDatabaseDbDbCopy = async (
  params: DatabaseDbCopy,
  databaseCurrent?: DatabaseDbItem,
  reloadDbDataSource?: () => void,
) => {
  const { targetName } = params;

  /** 源定额库名称 ID */
  const sourceDbId = databaseCurrent?.id || '';
  const dbNameSource = databaseCurrent?.dbName || '';

  // if (targetName?.trim() === dbNameSource) {
  //   const modalInfo = {
  //     icon: <InfoCircleOutlined />,
  //     content: '复制后名称不能与源名称相同！',
  //     title: '继续操作',
  //     okText: '确定',
  //   };
  //   Modal.warning(modalInfo);
  //   return { status: 'ERROR' };
  // }

  const res = await databaseDbDbCopy({ ...params, sourceDbId });
  if (res?.status === 'SUCCESS') reloadDbDataSource?.();
  return res;
};
