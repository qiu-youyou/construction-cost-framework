/*
 * @Author: SHUANG
 * @Date: 2022-07-12 10:15:10
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-09-21 15:50:03
 * @Description:
 */

import { Tag } from 'antd';

/** from common */
import { ENUMPROCESSENUM } from '../constant/valueEnum';

/**
 * @name type 决定渲染为文字类型还是 标记类型
 * @name status 0 已保存 1 ( workflowLockStatus: Y 提交中 N 审核中) 2 已完成
 * @default {type:'tag'}
 * */
type PropsDefine = {
  type?: 'text' | 'tag';
  status: number | string;
  workflowLockStatus: string;
  returnStatus: string;
};

export default ({ status, workflowLockStatus, returnStatus, type = 'tag' }: PropsDefine) => {
  if (status == '-5') return <></>;
  const processStatus =
    returnStatus == 'unpass'
      ? '被退回'
      : workflowLockStatus == 'Y'
      ? '提交中'
      : status == 0
      ? '已保存'
      : status == 1
      ? '审核中'
      : status == 2
      ? '已完成'
      : '';

  if (type === 'tag') {
    const current = ENUMPROCESSENUM[processStatus];
    if (!current) return <></>;
    return <Tag color={current?.color || ''}>{current?.text}</Tag>;
  }

  return <></>;
};
