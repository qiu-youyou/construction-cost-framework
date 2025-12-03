/*
 * @Author: SHUANG
 * @Date: 2022-09-03 09:55:20
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-12 17:34:30
 * @Description: 操作按钮
 */
import { useState } from 'react';
import { Button, message, Space } from 'antd';
import { handleProcessCommitParams, handleProcessQueryParams } from '../ProcessBusiness/defaultProps';

import useAuthButton from '../../../utils/auth/useAuthButton';
import { useMount } from '../../../utils/util/uses';

import { workflowCommonGetToolbarAuth, workflowQueryWorkFlowKey } from '../services';
import { ProcessBusinessProps } from '../ProcessBusiness/typings';
import SubmitterButton from '../SubmitterButton';
import AbandonButton from '../AbandonButton';
import ForwardButton from '../ForwardButton';
import ReturnButton from '../ReturnButton';
import RejectButton from '../RejectButton';

import { ButtonAuth } from '../typing';
import { SaveOutlined } from '@ant-design/icons';
let currentWorkFlowKey: any = '';

export default (props: ProcessBusinessProps) => {
  /** 业务权限 */
  const { auth } = useAuthButton();
  /** 当前流程按钮权限 */
  const [buttonAuth, setButtonAuth] = useState<ButtonAuth>();

  /** 处理参数 */
  const { current, fieldNames } = props;
  /** 如果传入了 就是用传入的 */
  const queryParams = props?.queryParams || handleProcessQueryParams(current, fieldNames, props?.fromParams);
  const commitParams = props?.commmitParams || handleProcessCommitParams(current, fieldNames);

  /** 获取查询权限 */
  const getActivitiCommonGetToolbarAuth = async () => {
    let workFlowKey = queryParams?.workFlowKey;
    /** 如果不存在 workFlowkey 去查询 workFlowkey */
    if (!workFlowKey) {
      const queryWorkFlowKeyRes = await workflowQueryWorkFlowKey(props?.commitUrl);
      if (queryWorkFlowKeyRes?.status === 'SUCCESS') {
        workFlowKey = queryWorkFlowKeyRes?.rows;
      }
    }

    const fromParams = await queryParams?.fromParams?.();
    currentWorkFlowKey = workFlowKey;
    const res = await workflowCommonGetToolbarAuth(props?.commitUrl, {
      ...queryParams,
      fromParams: !!fromParams ? JSON.stringify(fromParams) : '',
      businessId: commitParams?.businessId,
      workFlowKey,
    });
    if (res?.status !== 'SUCCESS') return;
    setButtonAuth(res?.rows);

    /** 当没有 保存 和 提交按钮时 返回无权限状态 */
    props?.setProcessAuth?.(!!res?.rows?.saveBtn);
  };

  /** 不作为超级管理员操作时 查询业务权限 */
  useMount(() => {
    if (props?.mode === 'list') return;
    getActivitiCommonGetToolbarAuth();
  });

  /** 处理保存 */
  const [saveLoading, setSaveLoading] = useState<boolean>();

  const handleClickSave = async (actionType: SYS.WorkflowSaveCallbackParams['actionType']) => {
    try {
      await props?.validateFieldsForms?.();
      setSaveLoading(true);
      const res = await props?.onSave?.({ workflowKey: currentWorkFlowKey, actionType });
      setSaveLoading(false);
      if (res?.status !== 'SUCCESS') return;
      message.success(res?.message);
    } catch (error: any) {
      if (!!error?.errorFields?.length) {
        message.warning('请将主单填写完成！');
      }
      return;
    }
  };

  const ProcessButtonGroup = (
    <>
      {/* 主单据列表中使用 读取按钮权限 */}
      {props?.mode === 'list' ? (
        <Space size={4} style={{ marginLeft: 2 }}>
          {/*业务驳回 */}
          {auth('disallow') && (
            <RejectButton
              current={props?.current}
              commitUrl={props?.commitUrl}
              commitParams={commitParams}
              queryParams={queryParams}
              refresh={props?.refresh}
              mode="list"
            />
          )}

          {/* 业务作废 */}
          {auth('disuse') && (
            <AbandonButton
              current={props?.current}
              commitUrl={props?.commitUrl}
              refresh={props?.refresh}
              mode="form"
              other=""
            />
          )}

          {/* 超级管理员转办按钮 */}
          {auth('forward_admin') && (
            <ForwardButton
              current={props?.current}
              queryParams={queryParams}
              commitParams={commitParams}
              refresh={props?.refresh}
              mode="list"
            />
          )}

          {/* 超级管理员退回按钮 */}
          {auth('reject_admin') && (
            <ReturnButton
              current={props?.current}
              commitUrl={props?.commitUrl}
              commitParams={commitParams}
              queryParams={queryParams}
              refresh={props?.refresh}
              mode="list"
            />
          )}

          {/* 超级管理员作废按钮 */}
          {auth('abandon_admin') && (
            <AbandonButton
              current={props?.current}
              commitUrl={props?.commitUrl}
              refresh={props?.refresh}
              mode="list"
              other=""
            />
          )}
        </Space>
      ) : (
        <>
          {/* 保存 */}
          {buttonAuth?.saveBtn && (
            <Button
              type="primary"
              onClick={() => handleClickSave('saveBtn')}
              style={{ marginRight: 5 }}
              loading={saveLoading}
            >
              <SaveOutlined /> 保存
            </Button>
          )}

          {/* 提交 */}
          {buttonAuth?.subBtn && (
            <SubmitterButton
              commitUrl={props?.commitUrl}
              commitParams={commitParams}
              queryParams={queryParams}
              refreshToolbarAuth={getActivitiCommonGetToolbarAuth}
              validateFieldsForms={props?.validateFieldsForms}
              refresh={props?.refresh}
              onSave={props?.onSave}
            />
          )}

          {/* 提前结束 提交 */}
          {buttonAuth?.finishBtn && (
            <SubmitterButton
              finishBtn={true}
              commitUrl={props?.commitUrl}
              commitParams={commitParams}
              queryParams={queryParams}
              refreshToolbarAuth={getActivitiCommonGetToolbarAuth}
              validateFieldsForms={props?.validateFieldsForms}
              refresh={props?.refresh}
              onSave={props?.onSave}
            />
          )}

          {/* 转办 */}
          {buttonAuth?.forwardBtn && (
            <ForwardButton
              queryParams={queryParams}
              refreshToolbarAuth={getActivitiCommonGetToolbarAuth}
              refresh={props?.refresh}
              onSave={props?.onSave}
            />
          )}

          {/* 退回 */}
          {buttonAuth?.rejectBtn && (
            <ReturnButton
              commitUrl={props?.commitUrl}
              commitParams={commitParams}
              queryParams={queryParams}
              refreshToolbarAuth={getActivitiCommonGetToolbarAuth}
              validateFieldsForms={props?.validateFieldsForms}
              refresh={props?.refresh}
              onSave={props?.onSave}
            />
          )}
          {/** 追加按钮 */}
          {props.appendTitleRender?.({ buttonAuth })}
        </>
      )}
    </>
  );

  return ProcessButtonGroup;
};
