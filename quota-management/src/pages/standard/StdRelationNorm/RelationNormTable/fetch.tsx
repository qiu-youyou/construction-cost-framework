/*
 * @Author: SHUANG
 * @Date: 2023-11-07 15:43:27
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-07 16:21:16
 * @Description: 清单关联定额映射库 - 清单 - 定额
 */
import { Button } from 'antd';
import { PlusOutlined, SaveOutlined } from '@ant-design/icons';
import { TableActionType } from 'jd-framework-web/package/components';

import { DbNormItem } from '@/pages/database/DbMain/DatabaseMain/DataBasePane/DbNorm/DbNormTable/typings';
import { RelationDetailItem } from '../RelationDetailTable/typings';
import { RelationNormSaveParams } from './typings';
import { relationNormInsert } from './services';

/**
 * @Author: SHUANG
 * @Description: 定额 查询 增加
 * @Date: 2023-11-07 15:45:31
 */
export const fetchRelationNormInsert = async (
  normSelection?: DbNormItem[],
  relationDetailCurrent?: RelationDetailItem,
  relationNormTableRef?: TableActionType,
) => {
  const errorReturn: FETCH.Res = { status: 'ERROR', code: '', rows: [] };
  if (!normSelection) return errorReturn;
  const finalParams: RelationNormSaveParams = {
    normIds: normSelection?.map((item) => item.id),
    listNormDirectoryId: relationDetailCurrent?.listNormDirectoryId || '',
    detailId: relationDetailCurrent?.id || '',
    dbId: normSelection?.[0]?.dbId || '',
  };
  const res = await relationNormInsert(finalParams);

  if (res?.status === 'SUCCESS') {
    relationNormTableRef?.current?.reload?.();
  }
  return res;
};

/** 清单映射定额 - 定额查询并增加 - 触发按钮 */
export const dbNormBorrowTrigger = (
  <Button type="primary" className="PlusButton" icon={<PlusOutlined />}>
    定额查询
  </Button>
);

export const dbNormBorrowSaveTrigger = (
  <span>
    <SaveOutlined /> 保存
  </span>
);
