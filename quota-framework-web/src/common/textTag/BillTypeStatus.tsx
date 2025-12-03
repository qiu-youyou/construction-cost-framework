/*
 * @Author: SHUANG
 * @Date: 2022-07-12 10:15:10
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-09-19 18:16:29
 * @Description:
 */

import { Tag } from 'antd';

/** from common */
import { ENUMBILLTYPE } from '../constant/valueEnum';

/**
 * @name type 决定渲染为文字类型还是 标记类型
 * @name status 0 已保存 1 ( workflowLockStatus: Y 提交中 N 审核中) 2 已完成
 * @default {type:'tag'}
 * */
type PropsDefine = {
  type?: 'text' | 'tag';
  detailTypeCode: string;
  costTypeCode?: string;
};

export default ({ detailTypeCode, costTypeCode, type = 'tag' }: PropsDefine) => {
  if (type === 'tag') {
    if (costTypeCode === 'FFBW01' && detailTypeCode === 'V') {
      return <Tag color="geekblue">分部</Tag>;
    }
    const current = ENUMBILLTYPE[detailTypeCode];
    if (!current) return <></>;
    return <Tag color={current?.color || ''}>{current?.text}</Tag>;
  }

  return <></>;
};
