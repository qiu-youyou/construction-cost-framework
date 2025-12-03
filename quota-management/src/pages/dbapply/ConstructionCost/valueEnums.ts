/*
 * @Author: SHUANG
 * @Date: 2023-11-15 15:37:01
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-15 16:08:50
 * @Description: 标准综合单价库 - 清单明细
 */
import { queryDictItemByClassCode } from 'jd-framework-web/package/common/services/system';

/** 当前模块字典 */
let valueEnums: Partial<SYS.DictDefine>;

export async function valueEnumsRequest(key: keyof SYS.DictDefine) {
  if (!valueEnums) {
    valueEnums = {};
    const queryKeys: (keyof SYS.DictDefine)[] = ['UNIT'];
    const res = await queryDictItemByClassCode(queryKeys);
    valueEnums = res.rows;
  }
  return valueEnums?.[key];
}
