/*
 * @Author: SHUANG
 * @Date: 2023-11-06 11:01:24
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-15 17:24:06
 * @Description: 清单关联定额映射库 - 清单
 */

import { TableActionType } from 'jd-framework-web/package/components';
import { RelationDirectoryItem } from '../RelationDirectoryTree/typings';
import { relationDetailQueryTreeAll, relationDetailSyncListNormDetail } from './services';
import { RelationDetailImportParams, RelationSubItemByCostSystemItem } from './typings';

/**
 * @Author: SHUANG
 * @Description: 查询方法
 * @Date: 2023-11-06 11:02:18
 * 统计了总条数 虚拟滚动需要计算
 */
export const fetchRelationDetailQueryTreeAll = async (params: any) => {
  const res = await relationDetailQueryTreeAll(params);
  // 记录数据条数
  let total = 0;

  const handleRow = (rows: any[]) => {
    rows.forEach((item) => {
      if (!!item?.children?.length) handleRow(item.children);
      total++;
    });
  };
  handleRow(res?.rows);
  return { ...res, total };
};

/**
 * @Author: SHUANG
 * @Description: 导入清单
 * @Date: 2023-11-07 11:41:47
 * @name branch 当前选中分部分项
 * @name relationDirectoryCurrent 映射库当前选中目录
 * @name relationDetailTableRef 当前映射清单表 Ref
 */
export const fetchRelationDetailSyncListNormDetail = async (
  branch?: RelationSubItemByCostSystemItem,
  relationDirectoryCurrent?: RelationDirectoryItem,
  relationDetailTableRef?: TableActionType,
) => {
  const errorReturn: FETCH.Res = { status: 'ERROR', code: '', rows: [] };

  if (!branch) return errorReturn;

  const listNormDirectoryId = relationDirectoryCurrent?.id || '';
  const branchDirectoryId = branch?.id || '';

  const finalParams: RelationDetailImportParams = {
    listNormDirectoryId,
    branchDirectoryId,
  };

  const res = await relationDetailSyncListNormDetail(finalParams);
  if (res?.status == 'SUCCESS') {
    await relationDetailTableRef?.current?.reload?.();
    // relationDetailTableRef?.current?.
  }
  return res;
};
