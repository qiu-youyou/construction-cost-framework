/*
 * @Author: SHUANG
 * @Date: 2023-11-08 09:32:15
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-08 10:09:14
 * @Description: 定额库维护 - 字典
 */

import { queryDictItemByClassCode } from 'jd-framework-web/package/common/services/system';

/** 当前模块字典 */
let valueEnums: Partial<SYS.DictDefine>;

export async function valueEnumsRequest(key: keyof SYS.DictDefine) {
  if (!valueEnums) {
    valueEnums = {};
    const queryKeys: (keyof SYS.DictDefine)[] = ['PROFESSION', 'PHASE'];

    const res = await queryDictItemByClassCode(queryKeys);
    valueEnums = res.rows;
  }
  return valueEnums?.[key];
}
