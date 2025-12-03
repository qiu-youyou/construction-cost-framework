/*
 * @Author: SHUANG
 * @Date: 2024-03-14 15:03:17
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-14 15:35:23
 * @Description: 工程造价-人材机汇总与调价 目录
 */
import { BaseTreeProps } from 'jd-framework-web/package/components';
import BaseTree from 'jd-framework-web/package/components/BaseTree';

import { MatSummaryProps } from '../typings';
import * as API from './services';

export default (props: MatSummaryProps) => {
  /** 人材机目录 当前选中、设置当前选中 */
  const { matDirectoryCurrent, setMatDirectoryCurrent } = props;

  const generateTree: BaseTreeProps<API.MatSumDirectoryItem> = {
    fieldNames: { key: 'id', children: 'children', title: 'matName' },
    service: { dataSourceRequest: API.matSumDirectoryQueryMatClassify },
    onCurrent: setMatDirectoryCurrent,
    defaultExpandAll: true,
    checkable: false,
  };

  return <BaseTree {...generateTree} />;
};
