/*
 * @Author: SHUANG
 * @Date: 2023-11-09 11:52:12
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-09 15:01:20
 * @Description: 标准库-次材市场价格库 字典
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
