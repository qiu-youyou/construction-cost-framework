/*
 * @Author: SHUANG
 * @Date: 2022-08-04 18:00:56
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-09-18 15:32:00
 * @Description:
 */

/** from components */
import { BaseTreeProps } from './typings';

export const defaultProps: BaseTreeProps = {
  fieldNames: { key: 'id', children: 'chidren', title: 'name' },
  defaultExpandAll: false,
  checkable: false,
  showLine: true,
  defaultCurrent: true,
  defaultSelection: true,
  noHeader: false,
  checkStrictly: true,
};
