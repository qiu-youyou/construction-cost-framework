/*
 * @Author: SHUANG
 * @Date: 2023-05-11 17:20:12
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-09-22 15:32:06
 * @Description: 答复流程主单据
 */
import React, { useRef } from 'react';
import { MessageOutlined } from '@ant-design/icons';
import { ProFormInstance } from '@ant-design/pro-form';

import { BaseSchemaFormProps } from '../../../../components/BaseSchemaForm/typings';
import BaseSchemaForm from '../../../../components/BaseSchemaForm';
import BaseModal from '../../../../components/BaseModal';

import { LAYOUTCOL } from '../../../constant/layoutCol';

import useAnswerFormColumns from './useAnswerFormColumns';
import useMainFormColumns from './useMainFormColumns';
import { sysAnswerSave } from '../services';

/** 来自各项目 */
import { workflowDescNameMap } from '@/common/constant/workflow';

const triggerButtonStyle = {
  fontSize: 12,
  marginLeft: 10,
  fontWeight: 400,
  borderBottom: '1px solid #1b63ab',
  cursor: 'pointer',
  color: '#1b63ab',
};

type Props = {
  businessId: string; // 业务单据ID
  businessType: string; // 业务单据流程Key
  businessCode: string; // 业务单据编号
  businessName: string; // 业务单据名称
  answerType: 'create' | 'answer'; // 回复类型:create(新建)、answer(回复)
  reload?: () => void; // 保存成功时触发的函数
  answerId?: string; // 回复ID
};

let moduleName = ''; // 路由菜单名称
const getRouteByPathName = (routes?: USER.MenuItem[], pathname?: string) => {
  routes?.forEach?.((item) => {
    const itemPath = item.path.split('/');
    if (itemPath[itemPath.length - 1] === pathname) {
      moduleName = item.name;
      return;
    } else if (item?.children) getRouteByPathName(item.children, pathname);
  });
};

export default (props: Props) => {
  /** 主单据 */
  const mainFormRef = useRef<ProFormInstance>();
  const generateMainForm: BaseSchemaFormProps = {
    columns: props.answerType === 'create' ? useMainFormColumns() : useAnswerFormColumns(),
    ...LAYOUTCOL.maxLayout,
    formRef: mainFormRef,
    submitter: false,
    noExplain: true,
    grid: true,
  };

  /** 点击保存 新建 */
  const onClickSaveCreate = async () => {
    try {
      const values = await mainFormRef?.current?.validateFieldsReturnFormatValue?.();
      const { businessCode, businessId, businessName, businessType, answerType } = props;
      /** 根据不同模块区分 */
      moduleName = workflowDescNameMap[businessType];
      const res = await sysAnswerSave({
        ...values,
        businessCode,
        businessId,
        businessName,
        businessType,
        answerType,
        moduleName,
      });
      if (res?.status !== 'SUCCESS') return res;

      props?.reload?.();
      return res;
    } catch (error) {
      return { status: 'Error' };
    }
  };

  /** 点击保存 回复 */
  const onClickSaveAnswer = async () => {
    try {
      const values = await mainFormRef?.current?.validateFieldsReturnFormatValue?.();
      const { answerType, answerId } = props;
      const res = await sysAnswerSave({ ...values, answerType, answerId });
      if (res?.status !== 'SUCCESS') return res;

      props?.reload?.();
      return res;
    } catch (error) {
      return { status: 'Error' };
    }
  };

  const handleOnSubmit = async () => {
    if (props.answerType === 'create') return await onClickSaveCreate();
    return await onClickSaveAnswer();
  };

  const triggerButton = (
    <span style={triggerButtonStyle}>
      {React.createElement(MessageOutlined)} {props.answerType === 'create' ? '发起提问' : '回复'}
    </span>
  );

  return (
    <BaseModal width={1200} title="发起提问" trigger={triggerButton} onSubmit={handleOnSubmit}>
      <section style={{ height: 530 }}>
        <BaseSchemaForm {...generateMainForm} />
      </section>
    </BaseModal>
  );
};
