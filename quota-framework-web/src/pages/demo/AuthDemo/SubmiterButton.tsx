/*
 * @Author: SHUANG
 * @Date: 2022-09-09 10:45:21
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-08-17 16:45:24
 * @Description: 提交按钮
 */

import { Dispatch, SetStateAction } from 'react';
import ProcessButton from '@/common/process/ProcessButton';

export type Props = {
  onSave?: (params: SYS.WorkflowSaveCallbackParams) => Promise<FETCH.Row>;
  validateFieldsForms?: () => Promise<any>; // 提交时先校验表单
  setProcessAuth?: Dispatch<SetStateAction<boolean>>; // 向外部设置当前表单权限
  handleFormParams?: () => Promise<{}>; // 获取表单携带参数
  refresh?: () => void; // 刷新主单据函数
  mode?: 'form' | 'list'; // 单据表单中使用 / 列表中使用 默认 form
  current?: any; // 列表中使用判断 是否勾选了多行
};

export default (props: Props) => {
  return (
    <ProcessButton
      commitUrl="/sample/large/issue"
      validateFieldsForms={props.validateFieldsForms}
      setProcessAuth={props.setProcessAuth}
      refresh={props.refresh}
      onSave={props.onSave}
      current={props.current}
      mode={props.mode}
    />
  );
};
