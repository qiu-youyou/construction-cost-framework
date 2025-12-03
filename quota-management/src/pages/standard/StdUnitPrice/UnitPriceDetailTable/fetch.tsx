/*
 * @Author: SHUANG
 * @Date: 2023-11-15 14:36:20
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-08 11:04:08
 * @Description: 标准综合单价库 - 清单明细
 */
import { Modal, message } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { TableActionType } from 'jd-framework-web/package/components';
import { RelationDirectoryItem } from '../../StdRelationNorm/RelationDirectoryTree/typings';
import { UnitPriceDirectoryItem } from '../UnitPriceDirectoryTree/typings';
import { OtherTypeApiItem } from '../../StdTypeTarget/typings';

import * as TYPES from './typings';
import * as API from './services';

/**
 * @Author: SHUANG
 * @Description: 标准综合单价库 - 清单明细 - 查询
 * @Date: 2023-11-15 15:20:05
 */
export const fetchUnitPriceDetailQueryTreeAll = async (params: TYPES.UnitPriceDetailQuery) => {
  const res = await API.unitPriceDetailQueryTreeAll(params);
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
 * @Description: 标准综合单价库 - 清单明细 - 新增空行
 * @Date: 2023-11-15 14:38:37
 * @name params 默认新增行参数
 * @name unitPriceDirectoryCurrent 当前综合单价目录
 * @name unitPriceDetailActionCurrent 当前 清单明细 操作行
 */
export const fetchUnitPriceDetailSaveBlankRow = async (
  params: TYPES.UnitPriceDetailSave,
  unitPriceDirectoryCurrent?: UnitPriceDirectoryItem,
  unitPriceDetailActionCurrent?: TYPES.UnitPriceDetailItem,
) => {
  /** 当前操作行 父ID */
  const parentId = unitPriceDetailActionCurrent?.parentId || '0';
  /** 当前目录ID 有当前行 取当前行 没有则取目录 */
  const unitPriceDbId = unitPriceDetailActionCurrent?.unitPriceDbId || unitPriceDirectoryCurrent?.id || '';

  const finalParams: TYPES.UnitPriceDetailSave = { ...params, unitPriceDbId, parentId };
  const res = await API.unitPriceDetailSaveBlankRow({ ...finalParams });
  return res;
};

/**
 * @Author: SHUANG
 * @Description: 同步映射库清单数据
 * @Date: 2023-11-15 17:25:05
 * @name relationDirectoryCurrent 当前选择的 映射库目录
 * @name unitPriceDirectoryCurrent 当前选择的 综合单价目录
 * @name unitPriceDetailTableRef 清单明细表 REF
 */
export const fetchUnitPriceDetailSyncListNorm = async (
  relationDirectoryCurrent?: RelationDirectoryItem,
  unitPriceDirectoryCurrent?: UnitPriceDirectoryItem,
  unitPriceDetailTableRef?: TableActionType,
) => {
  const finalParams: TYPES.UnitPriceDetailSyncListNorm = {
    listNormDirectoryId: relationDirectoryCurrent?.id || '', // 清单关联映射库目录ID
    unitPriceDbId: unitPriceDirectoryCurrent?.id || '', // 综合单价库目录ID
  };
  const res = await API.unitPriceDetailSyncListNorm(finalParams);
  if (res?.status === 'SUCCESS') {
    unitPriceDetailTableRef?.current?.reload?.();
    message.success(res?.message || '操作成功');
  }
  return res;
};

/**
 * @Author: SHUANG
 * @Description: 标准综合单价库 - 清单明细 修改单价类型
 * @Date: 2023-11-20 15:48:38
 * @name otherTypeApi 当前选择单价类型
 * @name unitPriceDetailActionCurrent 清单明细当前行
 * @name unitPriceDetailTableRef 清单明细表
 */
export const fetchUnitPriceDetailUpdateRow = async (
  otherTypeApi?: OtherTypeApiItem,
  unitPriceDetailActionCurrent?: TYPES.UnitPriceDetailItem,
  unitPriceDetailTableRef?: TableActionType,
) => {
  const errorReturn: FETCH.Res = { status: 'ERROR', code: '', rows: [] };
  if (!otherTypeApi) return errorReturn;

  if (!unitPriceDetailActionCurrent) {
    const modalInfo = {
      icon: <InfoCircleOutlined />,
      content: '没有可编辑的目标数据！',
      title: '继续操作',
      okText: '确定',
    };
    Modal.warning(modalInfo);
    return errorReturn;
  }

  let finalParams: FETCH.CellEditReq = {
    id: unitPriceDetailActionCurrent?.id || '', // 当前选中行
    filedName: 'unitPriceTypeName',
    newValue: otherTypeApi.kpiName,
  };

  const res = await API.unitPriceDetailUpdateRow(finalParams, {
    unitPriceDbId: unitPriceDetailActionCurrent?.unitPriceDbId || '',
  });

  if (res?.status === 'SUCCESS') {
    message.destroy();
    message.success(res?.message || `操作成功`);
    unitPriceDetailTableRef?.current?.reload?.();
  }
  return res;
};
