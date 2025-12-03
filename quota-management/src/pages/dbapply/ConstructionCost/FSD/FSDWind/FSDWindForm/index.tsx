/*
 * @Author: SHUANG
 * @Date: 2024-04-16 16:26:53
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-24 16:01:09
 * @Description: 工程造价-风水电 供风点信息
 */
import { message } from 'antd';
import { debounce } from 'lodash';
import { useEffect, useRef } from 'react';
import { ProFormInstance } from '@ant-design/pro-components';
import BaseCard from 'jd-framework-web/package/components/BaseCard';
import { BaseSchemaFormProps } from 'jd-framework-web/package/components';
import BaseSchemaForm from 'jd-framework-web/package/components/BaseSchemaForm';
import SplitPane, { PaneContainer } from 'jd-framework-web/package/components/SplitPane';

import { fsdWinUpdateFsdWind, fsdWindDataModel } from '../services';
import useKQYSJFormColumns from './useKQYSJFormColumns';
import useSBFormColumns from './useSBFormColumns';
import { FSDWindItem } from '../typings';
import { FsdProps } from '../../typings';

/** 表单通用配置 */
const schemaFormConfig: any = {
  submitter: false,
  span: 24,
};

export default (props: FsdProps) => {
  /** 当前 用风 */
  const { fsdWindCurrent } = props;
  const { FSDWindTableRef } = props;

  /** 工程ID 阶段ID */
  const id = fsdWindCurrent?.id || '';
  const matId = fsdWindCurrent?.matId || '';
  const stageId = fsdWindCurrent?.stageId || '';
  const projectId = fsdWindCurrent?.projectId || '';

  const serviceParams = { id, matId, stageId, projectId };

  /** 水泵 */
  const SBFormRef = useRef<ProFormInstance>();
  /** 空气压缩机 */
  const KQYSJFormRef = useRef<ProFormInstance>();

  const handleOnSave = async (changeValue?: any) => {
    if (!id) {
      message.error('请先添加供风点信息！');
      return { status: 'ERROR' };
    }
    const SBFormValues = await SBFormRef?.current?.validateFieldsReturnFormatValue?.();
    const KQYSJFormValues = await KQYSJFormRef?.current?.validateFieldsReturnFormatValue?.();
    const item = { ...SBFormValues, ...KQYSJFormValues };

    if (JSON.stringify(changeValue) === '{}') {
      for (const key in fsdWindDataModel) {
        if (item[key] === undefined) {
          item[key] = fsdWindDataModel[key];
        }
      }
    }
    const res = await fsdWinUpdateFsdWind({ ...item, ...serviceParams });
    FSDWindTableRef?.current?.reload?.();
  };

  /** 保存表单内容 */
  const handleOnValuesChange = debounce(handleOnSave, 800);

  const generateSBForm: BaseSchemaFormProps = {
    onValuesChange: handleOnValuesChange,
    columns: useSBFormColumns({ SBFormRef, KQYSJFormRef }),
    wrapperCol: { span: 6 },
    labelCol: { span: 17 },
    formRef: SBFormRef,
    ...schemaFormConfig,
  };

  const generateKQYSJForm: BaseSchemaFormProps = {
    onValuesChange: handleOnValuesChange,
    columns: useKQYSJFormColumns({ SBFormRef, KQYSJFormRef }),
    wrapperCol: { span: 6 },
    labelCol: { span: 10 },
    formRef: KQYSJFormRef,
    ...schemaFormConfig,
  };

  /** 表单提交 */
  const setFormFieldsValue = (value?: FSDWindItem) => {
    SBFormRef?.current?.setFieldsValue({ ...value });
    KQYSJFormRef?.current?.setFieldsValue({ ...value });
  };

  /** 表单回填 */
  useEffect(() => {
    setFormFieldsValue(fsdWindCurrent);
  }, [fsdWindCurrent]);

  return (
    <SplitPane>
      <PaneContainer width="49%">
        <div style={{ height: '100%', padding: '5px' }}>
          <BaseCard type="H2" bordered extraCollapsed={false} title=" ">
            <BaseSchemaForm {...generateSBForm} />
          </BaseCard>
        </div>
      </PaneContainer>
      <PaneContainer flex>
        <div style={{ height: '100%', padding: '5px' }}>
          <BaseCard type="H2" bordered extraCollapsed={false} title=" ">
            <BaseSchemaForm {...generateKQYSJForm} />
          </BaseCard>
        </div>
      </PaneContainer>
    </SplitPane>
  );
};
