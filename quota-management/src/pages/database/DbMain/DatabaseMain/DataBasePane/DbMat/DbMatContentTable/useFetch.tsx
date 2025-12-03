/*
 * @Author: SHUANG
 * @Date: 2023-10-23 15:43:21
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-05 16:59:19
 * @Description: MAT明细对应含量
 */
import { TableActionType } from 'jd-framework-web/package/components';
import { DbMatContentItem, DbMatContentQuery, DbMatContentSaveSelectMatDetailParams } from './typings';

import { DbMatItem, DbMatProps } from '../DbMatMainTable/typings';

type Props = { API: any } & DbMatProps;

export default (props: Props) => {
  const { API } = props;

  const { dbMatCurrent, dbMatContentCurrent } = props;
  const { dbMatMainTableRef } = props;

  /** 人材机添加到含量 */
  const handlePlusRcjSave = async (matDataSelection: DbMatItem[]) => {
    const errorReturn: FETCH.Res = { status: 'ERROR', code: '', rows: [] };
    if (!dbMatCurrent) return errorReturn;

    /** 库id  当前页面明细行id  当前页面明细的目录id */
    const { dbId, classifyId, id: matId } = dbMatCurrent;
    const selectIds = matDataSelection?.map((item) => item.id); //	选择的导入行ids
    const currentId = dbMatContentCurrent?.id || ''; // 要放在什么含量后面的id
    const billSort = dbMatContentCurrent?.billSort || '';

    const params = { dbId, matId, classifyId, selectIds, currentId, billSort };

    const finalParams: DbMatContentSaveSelectMatDetailParams = params;

    const res = await API.dbMatContentSaveSelectMatDetail(finalParams);
    return res;
  };

  /** 行编辑人材机明细 */
  const fetchDbMatContentUpdateRow = async (params: FETCH.CellEditReq, tableParams?: DbMatContentQuery) => {
    const res = await API.dbMatContentUpdateRow(params, tableParams);
    /** 刷新 MAT含量表 */
    if (res?.status === 'SUCCESS') {
      dbMatMainTableRef?.current?.reload?.();
    }
    return res;
  };

  /** 人材机明细 删除方法 */
  const fetchDbMatContentDeleteByIds = async (params: FETCH.UpStatus) => {
    const res = await API.dbMatContentDeleteByIds(params);
    /** 删除成功 重新刷新 MAT 主表 */
    if (res?.status === 'SUCCESS') {
      dbMatMainTableRef?.current?.reload?.();
    }
    return res;
  };

  return {
    handlePlusRcjSave,
    fetchDbMatContentUpdateRow,
    fetchDbMatContentDeleteByIds,
  };
};
