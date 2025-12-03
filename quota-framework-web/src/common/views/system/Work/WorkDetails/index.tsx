/*
 * @Author: SHUANG
 * @Date: 2023-08-14 17:15:15
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-09-21 18:00:19
 * @Description:
 */
import { useRef, useState } from 'react';
import { Space, Button, message } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import { ProFormInstance } from '@ant-design/pro-components';

import { BaseSchemaFormProps } from '../../../../../components/BaseSchemaForm/typings';
import SpaceView from '../../../../../components/ViewContainer/SpaceView';
import BaseSchemaForm from '../../../../../components/BaseSchemaForm';
import BaseCard from '../../../../../components/BaseCard';

import { LAYOUTCOL } from '../../../../constant/layoutCol';
import AnnexTable from '../../../../annex/AnnexTable';

import useMainFormColumns from './useMainFormColumns';
import { sysWorkSave } from '../services';
import * as TYPES from '../typings';
import style from './index.less';

type propsDefine = {
  formType: SYS.FormType;
  workCurrent?: TYPES.WorkListItem;
};

/** 表单通用配置 */
const schemaFormConfig = {
  ...LAYOUTCOL.defaultLayout,
  submitter: false,
  grid: true,
};

export default (props: propsDefine) => {
  /** 非新增取当前行 */
  const { formType: formTypeProp } = props;
  const formCurrent = props.formType === 1 ? undefined : props.workCurrent;

  /** 已完成单据不可编辑只可查看 */
  const formType = formTypeProp === 2 ? (formCurrent?.billStatus == '2' ? 0 : 2) : formTypeProp;
  /** 当前问题及反馈单据 */
  const [workCurrent, setWorkCurrent] = useState<TYPES.WorkListItem | undefined>(formCurrent);

  /** 主单据信息 */
  const mainFormRef = useRef<ProFormInstance>();
  const generateMainForm: BaseSchemaFormProps = {
    columns: useMainFormColumns({ formType }),
    initialValues: workCurrent,
    formRef: mainFormRef,
    disabled: !formType,
    ...schemaFormConfig,
  };

  /** 点击保存 */
  const onClickSave = async () => {
    try {
      const values = await mainFormRef?.current?.validateFieldsReturnFormatValue?.();
      const res = await sysWorkSave({ ...values });
      if (res?.status !== 'SUCCESS') return;
      message.success(res.message);
      mainFormRef?.current?.setFieldsValue(res?.rows);
    } catch (error) {}
  };

  /** 表单保存按钮 */
  const buttonGroups = [
    <Button key="save" type="primary" onClick={onClickSave}>
      <SaveOutlined /> 保存
    </Button>,
  ];

  return (
    <section className={style.richTextSection} style={{ height: 480 }}>
      <SpaceView style={{ padding: '2px 6px 4px 6px' }}>
        <Space size={5}>{!!formType && buttonGroups}</Space>
      </SpaceView>

      <SpaceView>
        <BaseCard bordered type="H2" title="主单据">
          <BaseSchemaForm {...generateMainForm} />
        </BaseCard>
      </SpaceView>

      <SpaceView disable={!workCurrent?.id}>
        <BaseCard bordered type="H2" title="附件">
          <AnnexTable deleted={!!formType} businessId={workCurrent?.id} />
        </BaseCard>
      </SpaceView>
    </section>
  );
};
