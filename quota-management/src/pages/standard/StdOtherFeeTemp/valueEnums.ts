/*
 * @Author: SHUANG
 * @Date: 2023-11-10 11:13:44
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-10 11:13:52
 * @Description: 标准库-其他费模板库 字典
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
