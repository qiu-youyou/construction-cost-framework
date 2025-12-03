/*
 * @Author: SHUANG
 * @Date: 2023-05-19 10:16:13
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-10-13 17:33:11
 * @Description: 重大问题反馈及投诉 主单据
 */
import { useRef, useState } from 'react';
import { businessQueryOne } from '@/common/process/ProcessMainForm/services';
import { ProcessBusinessProps } from '@/common/process/ProcessBusiness/typings';
import { BaseSchemaFormProps } from '@/components/BaseSchemaForm/typings';
import ProcessBusiness from '@/common/process/ProcessBusiness';
import SpaceView from '@/components/ViewContainer/SpaceView';
import BaseSchemaForm from '@/components/BaseSchemaForm';
import { ProFormInstance } from '@ant-design/pro-form';
import { LAYOUTCOL } from '@/common/constant/layoutCol';
import AnnexTable from '@/common/annex/AnnexTable';
import BaseCard from '@/components/BaseCard';

import useMainFormColumns from './useMainFormColumns';
import * as TYPES from '../typings';
import * as API from '../services';

type propsDefine = {
  formType: SYS.FormType;
  issueCurrent?: TYPES.IssueListItem;
};

/** 表单通用配置 */
const schemaFormConfig = {
  ...LAYOUTCOL.defaultLayout,
  submitter: false,
  grid: true,
};

/** 主单据详情 */
export default (props: propsDefine) => {
  /** 非新增取当前行 */
  const commitUrl = '/sample/large/issue';
  const { formType: formTypeProp } = props;
  const formCurrent = props.formType === 1 ? undefined : props.issueCurrent;

  /** 已完成单据不可编辑只可查看 */
  const formType = formTypeProp === 2 ? (formCurrent?.billStatus == '2' ? 0 : 2) : formTypeProp;

  /** 当前问题及反馈单据 */
  const [issueCurrent, setIssueCurrent] = useState<TYPES.IssueListItem | undefined>(formCurrent);

  /** 当前是否有流程保存权限 根据流程查询权限 */
  const [processAuth, setProcessAuth] = useState<boolean>(formType !== 0);

  /** 业务单据信息 */
  const mainFormRef = useRef<ProFormInstance>();
  const generatemainForm: BaseSchemaFormProps = {
    columns: useMainFormColumns(),
    initialValues: issueCurrent,
    disabled: !processAuth,
    formRef: mainFormRef,
    ...schemaFormConfig,
  };

  /** 保存成功后 回填单据信息 */
  const handleProcessOnSaveFinish = async (res: FETCH.Row) => {
    if (res?.status !== 'SUCCESS') return;
    /** 获取新的主单据 */
    const queryRes = await businessQueryOne(commitUrl, res?.rows?.id);
    setIssueCurrent({ ...issueCurrent, ...queryRes?.rows });
    /** 表单回填 */
    mainFormRef?.current?.setFieldsValue({ ...queryRes?.rows });
  };

  /** 保存方法 */
  const processOnSave = async (params: SYS.WorkflowSaveCallbackParams) => {
    /** 校验表单 */
    const mainFormValues = await mainFormRef?.current?.validateFieldsReturnFormatValue?.();
    const { workflowKey } = params;
    const res = await API.largeIssueSave({ ...mainFormValues, id: issueCurrent?.id, workflowKey });
    handleProcessOnSaveFinish(res);
    return res;
  };

  /** 校验函数 */
  const processvalidateFieldsForms = async () => {
    await mainFormRef?.current?.validateFields();

  /** 流程参数 */
  const processBusinessParams = async () => {
    return {};
  };

  const processParams: ProcessBusinessProps = {
    commitUrl,
    validateFieldsForms: processvalidateFieldsForms,
    fromParams: processBusinessParams,
    onSave: processOnSave,
    current: issueCurrent,
    setProcessAuth,
    formType,
  };

  return (
    <ProcessBusiness {...processParams} tabs={{ type: 'card' }}>
      <BaseCard.TabPane tab="页签一" key="1">
        <SpaceView>
          <BaseCard bordered type="H2" title="主单据信息">
            <BaseSchemaForm {...generatemainForm} />
          </BaseCard>
        </SpaceView>

        <SpaceView disable={!issueCurrent?.id}>
          <BaseCard bordered type="H2" title="明细表">
            <BaseCard noHeader tabs={{ animated: true }}>
              <BaseCard.TabPane tab="附件" key="1">
                <AnnexTable deleted={processAuth} businessId={issueCurrent?.id} />
              </BaseCard.TabPane>
            </BaseCard>
          </BaseCard>
        </SpaceView>
      </BaseCard.TabPane>

      <BaseCard.TabPane tab="页签二" key="2">
        <SpaceView>test</SpaceView>
      </BaseCard.TabPane>
    </ProcessBusiness>
  );
};
