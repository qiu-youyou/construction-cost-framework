/*
 * @Author: SHUANG
 * @Date: 2022-07-12 10:15:10
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-09-21 15:51:20
 * @Description:
 */

import { Tag } from 'antd';

/** from common */
import { ENUMBILLSTATUS } from '../constant/valueEnum';

/**
 * @name type 决定渲染为文字类型还是 标记类型
 * @name status 0 保存 3 启用 4 禁用 其他保存
 * @default {type:'tag'}
 * */
type PropsDefine = {
  type?: 'text' | 'tag';
  status: number | string;
};

export default ({ status, type = 'tag' }: PropsDefine) => {
  // 文字类型
  if (type === 'text') {
    if (status === '' || !status)
      return <span className={ENUMBILLSTATUS['']?.describe}> ({ENUMBILLSTATUS['']?.text})</span>;
    const current = ENUMBILLSTATUS[status];
    return <span className={current?.describe}> ({current?.text})</span>;
  }

  // 标签类型
  if (type === 'tag') {
    if (status === '' || !status)
      return <Tag color={ENUMBILLSTATUS['']?.color || ''}>{ENUMBILLSTATUS['']?.text}</Tag>;
    const current = ENUMBILLSTATUS[status];
    return <Tag color={current?.color || ''}>{current?.text}</Tag>;
  }

  return <></>;
};
