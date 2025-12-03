/*
 * @Author: SHUANG
 * @Date: 2022-07-12 10:15:10
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-09-21 15:50:25
 * @Description:
 */

import { Tag } from 'antd';

/** from common */
import { ENUMPROCESSENUM } from '../constant/valueEnum';

/** @name status 0 保存 2 审核中 7 完成 */
type PropsDefine = {
  status: number | string;
};

export default ({ status }: PropsDefine) => {
  const current = ENUMPROCESSENUM[status];
  if (!current) return <></>;
  return <Tag color={current?.color || ''}>{current?.text}</Tag>;
};
