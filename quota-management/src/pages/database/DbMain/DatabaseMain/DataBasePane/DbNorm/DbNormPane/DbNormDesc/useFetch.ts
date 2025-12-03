/*
 * @Author: SHUANG
 * @Date: 2023-10-19 18:21:12
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-04 15:34:01
 * @Description: 定额明细查询 注，工作内容，适用范围
 */

/**
 * @Author: SHUANG
 * @Description: 根据定额库、章节、定额明细 ID 查询当前工作内容
 * @Date: 2023-10-24 17:12:17
 * @name dbNormCurrent 当前定额明细
 */
import { DbNormItem } from '../../DbNormTable/typings';

export default (props: { API: any }) => {
  const { API } = props;
  /** 查询 明细扩展表(注，工作内容，适用范围) */
  const handleDbNormExt = async (dbNormCurrent?: DbNormItem) => {
    if (!dbNormCurrent) return undefined;
    const { id, dbId, chapterId } = dbNormCurrent;

    /** 兼容基础企业定额库 */
    const businessId = dbNormCurrent?.businessId || '';

    const res = await API.dbNormExtQueryOne({ id, dbId, chapterId }, businessId);
    return res?.rows;
  };

  /**
   * @Author: SHUANG
   * @Description: 保存 明细扩展表(注，工作内容，适用范围)
   * @Date: 2023-10-24 17:12:07
   * @name dbNormCurrent 当前定额明细
   * @name filedName 修改的Key
   * @name value 修改的值
   */
  const handleDbNormExtSave = async (filedName: string, newValue: string, dbNormCurrent?: DbNormItem) => {
    if (!dbNormCurrent) return undefined;
    const { id, dbId, chapterId } = dbNormCurrent;

    /** 兼容基础企业定额库 */
    const businessId = dbNormCurrent?.businessId || '';

    /** 模拟行编辑 */
    return await API.dbNormExtUpdateRow({ filedName, newValue, id }, { id, dbId, chapterId }, businessId);
  };

  return { handleDbNormExt, handleDbNormExtSave };
};
