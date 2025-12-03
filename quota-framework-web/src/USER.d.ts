/*
 * @Author: SHUANG
 * @Date: 2023-06-19 17:02:41
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-10-11 17:57:05
 * @Description:
 */

import { JDCMDUserTypings } from './common';

declare namespace USER {
  type CurrentUser = JDCMDUserTypings['CurrentUser'];

  type LoginResult = JDCMDUserTypings['LoginResult'];

  type LoginParams = JDCMDUserTypings['LoginParams'];

  type PassParams = JDCMDUserTypings['PassParams'];

  type MenuItem = JDCMDUserTypings['MenuItem'];

  type SysSettings = JDCMDUserTypings['SysSettings'];
}
export = USER;
export as namespace USER;
