/*
 * @Author: SHUANG
 * @Date: 2024-04-16 16:26:53
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-24 15:47:04
 * @Description: 工程造价-风水电 供电点信息
 */
import { message } from 'antd';
import { debounce } from 'lodash';
import { useEffect, useRef } from 'react';
import { ProFormInstance } from '@ant-design/pro-components';
import BaseCard from 'jd-framework-web/package/components/BaseCard';
import { BaseSchemaFormProps } from 'jd-framework-web/package/components';
import BaseSchemaForm from 'jd-framework-web/package/components/BaseSchemaForm';
import SplitPane, { PaneContainer } from 'jd-framework-web/package/components/SplitPane';

import { fsdElectricityDataModel, fsdElectricityUpdateFsdElectricity } from '../services';
import useDWDJFormColumns from './useDWDJFormColumns';
import useCYFDFormColumns from './useCYFDFormColumns';
import useZHDJFormColumns from './useZHDJFormColumns';
import { FSDElectricityItem } from '../typings';
import RatioSetting from './RatioSetting';
import { FsdProps } from '../../typings';

/** 表单通用配置 */
const schemaFormConfig: any = {
  submitter: false,
  span: 24,
};

export default (props: FsdProps) => {
  /** 当前 用电 */
  const { fsdElectricityCurrent } = props;
  const { FSDElectricityTableRef } = props;

  /** 工程ID 阶段ID */
  const id = fsdElectricityCurrent?.id || '';
  const matId = fsdElectricityCurrent?.matId || '';
  const stageId = fsdElectricityCurrent?.stageId || '';
  const projectId = fsdElectricityCurrent?.projectId || '';

  const serviceParams = { id, matId, stageId, projectId };

  const DWDJFormRef = useRef<ProFormInstance>();
  const CYFDFormRef = useRef<ProFormInstance>();
  const ZHDJFormRef = useRef<ProFormInstance>();

  const handleOnSave = async (changeValue?: any) => {
    if (!id) {
      message.error('请先添加供电点信息！');
      return { status: 'ERROR' };
    }
    const DWDJFormValues = await DWDJFormRef?.current?.validateFieldsReturnFormatValue?.();
    const CYFDFormValues = await CYFDFormRef?.current?.validateFieldsReturnFormatValue?.();
    const ZHDJFormValues = await ZHDJFormRef?.current?.validateFieldsReturnFormatValue?.();
    const item = { ...DWDJFormValues, ...CYFDFormValues, ...ZHDJFormValues };
    if (JSON.stringify(changeValue) === '{}') {
      for (const key in fsdElectricityDataModel) {
        if (item[key] === undefined) {
          item[key] = fsdElectricityDataModel[key];
        }
      }
    }
    const res = await fsdElectricityUpdateFsdElectricity({ ...item, ...serviceParams });
    FSDElectricityTableRef?.current?.reload?.();
  };

  /** 保存表单内容 */
  const handleOnValuesChange = debounce(handleOnSave, 800);

  /** 电网电价资料 */
  const generateDWDJForm: BaseSchemaFormProps = {
    onValuesChange: handleOnValuesChange,
    columns: useDWDJFormColumns,
    wrapperCol: { span: 5 },
    labelCol: { span: 17 },
    formRef: DWDJFormRef,
    ...schemaFormConfig,
  };

  /** 柴油发电资料 */
  const generateCYFDForm: BaseSchemaFormProps = {
    onValuesChange: handleOnValuesChange,
    columns: useCYFDFormColumns,
    wrapperCol: { span: 8 },
    labelCol: { span: 15 },
    formRef: CYFDFormRef,
    ...schemaFormConfig,
  };

  /** 综合电价资料 */
  const generateZHDJForm: BaseSchemaFormProps = {
    onValuesChange: handleOnValuesChange,
    columns: useZHDJFormColumns,
    wrapperCol: { span: 6 },
    labelCol: { span: 7 },
    formRef: ZHDJFormRef,
    ...schemaFormConfig,
  };

  /** 表单提交 */
  const setFormFieldsValue = async (value?: FSDElectricityItem) => {
    DWDJFormRef?.current?.setFieldsValue({ ...value });
    CYFDFormRef?.current?.setFieldsValue({ ...value });
    ZHDJFormRef?.current?.setFieldsValue({ ...value });
  };

  /** 表单回填 */
  useEffect(() => {
    setFormFieldsValue(fsdElectricityCurrent);
  }, [fsdElectricityCurrent]);

  return (
    <SplitPane>
      <PaneContainer width="32%">
        <div style={{ height: '100%', padding: '5px' }}>
          <BaseCard type="H2" bordered extraCollapsed={false} title="电网电价资料">
            <BaseSchemaForm {...generateDWDJForm} />
          </BaseCard>
        </div>
      </PaneContainer>
      <PaneContainer width="36%">
        <div style={{ height: '100%', padding: '5px' }}>
          <BaseCard type="H2" bordered extraCollapsed={false} title="柴油发电资料">
            <BaseSchemaForm {...generateCYFDForm} />
          </BaseCard>
        </div>
      </PaneContainer>
      <PaneContainer flex>
        <div style={{ height: '100%', padding: '5px' }}>
          <BaseCard type="H2" bordered extraCollapsed={false} title="综合电价资料">
            <BaseSchemaForm {...generateZHDJForm} />
            <RatioSetting
              fsdElectricityCurrent={fsdElectricityCurrent}
              handleOnValuesChange={handleOnSave}
              ZHDJFormRef={ZHDJFormRef}
            />
          </BaseCard>
        </div>
      </PaneContainer>
    </SplitPane>
  );
};
