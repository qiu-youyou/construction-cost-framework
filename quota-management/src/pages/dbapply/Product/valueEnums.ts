/*
 * @Author: SHUANG
 * @Date: 2024-01-31 10:34:49
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-22 16:28:30
 * @Description: 工程造价产品 字典
 */
import { queryDictItemByClassCode } from 'jd-framework-web/package/common/services/system';

/** 当前模块字典 */
let valueEnums: Partial<SYS.DictDefine>;

export async function valueEnumsRequest(key?: keyof SYS.DictDefine) {
  if (!valueEnums || !key) {
    valueEnums = {};
    const queryKeys: (keyof SYS.DictDefine)[] = [
      'SPE_AREA_TYPE',
      'dbapply_phase',
      'dbapply_type',
      'PROFESSION',
      'busi_type',
      'project_type',
      'soil_type',
      'AREA_TYPE',
      'YES_NO',
    ];

    const res = await queryDictItemByClassCode(queryKeys);
    valueEnums = res.rows;
  }
  if (!key) return [];
  return valueEnums?.[key];
}
