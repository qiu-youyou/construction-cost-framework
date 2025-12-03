/*
 * @Author: SHUANG
 * @Date: 2022-07-12 10:15:10
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-09-21 15:50:42
 * @Description:
 */
import { Tag } from 'antd';

/** from common */
import { ENUMROLETYPE } from '../constant/valueEnum';

/**
 * @name type 决定渲染为文字类型还是 标记类型
 * @name roleType 同 VALUEENUM roleType
 * @default {type:'tag'}
 * */
type PropsDefine = {
  type?: 'text' | 'tag';
  roleType: number | string;
};

export default ({ roleType: v, type = 'tag' }: PropsDefine) => {
  if (type === 'tag') {
    if (v === '') return <Tag color={ENUMROLETYPE['']?.color || ''}>{ENUMROLETYPE['']?.text}</Tag>;
    const current = ENUMROLETYPE[v];
    if (!current) return <></>;
    return <Tag color={current?.color || ''}>{current?.text}</Tag>;
  }
  return <></>;
};
