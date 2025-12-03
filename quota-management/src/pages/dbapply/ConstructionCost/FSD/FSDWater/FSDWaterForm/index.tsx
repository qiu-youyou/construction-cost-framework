/*
 * @Author: SHUANG
 * @Date: 2024-04-24 16:46:21
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-25 11:41:18
 * @Description: 工程造价-风水电 价区及供水点
 */

import { message } from 'antd';
import { debounce } from 'lodash';
import { useEffect, useRef } from 'react';
import { ProFormInstance } from '@ant-design/pro-components';
import BaseCard from 'jd-framework-web/package/components/BaseCard';
import { BaseSchemaFormProps } from 'jd-framework-web/package/components';
import BaseSchemaForm from 'jd-framework-web/package/components/BaseSchemaForm';

import { fsdWaterUpdateFsdWater, fsdwaterDataModel } from '../services';
import useDJGSFormColumns from './useDJGSFormColumns';
import useGSDFormColumns from './useGSDFormColumns';
import useJQFormColumns from './useJQFormColumns';
import { FsdProps } from '../../typings';
import { FSDWaterItem } from '../typings';

/** 表单通用配置 */
const schemaFormConfig: any = {
  submitter: false,
  span: 24,
  grid: false,
};

export default (props: FsdProps) => {
  /** 当前 用电 */
  const { fsdWaterCurrent } = props;
  const { FSDWaterTableRef } = props;

  /** 工程ID 阶段ID */
  const id = fsdWaterCurrent?.id || '';
  const matId = fsdWaterCurrent?.matId || '';
  const stageId = fsdWaterCurrent?.stageId || '';
  const projectId = fsdWaterCurrent?.projectId || '';

  const serviceParams = { id, matId, stageId, projectId };

  const JQFormRef = useRef<ProFormInstance>();
  const GSDFormRef = useRef<ProFormInstance>();
  const DJGSFormRef = useRef<ProFormInstance>();

  const handleOnSave = async (changeValue?: any) => {
    if (!id) {
      message.error('请先添加供水信息！');
      return { status: 'ERROR' };
    }
    const DWDJFormValues = await JQFormRef?.current?.validateFieldsReturnFormatValue?.();
    const CYFDFormValues = await GSDFormRef?.current?.validateFieldsReturnFormatValue?.();
    const ZHDJFormValues = await DJGSFormRef?.current?.validateFieldsReturnFormatValue?.();
    const item = { ...DWDJFormValues, ...CYFDFormValues, ...ZHDJFormValues };
    if (JSON.stringify(changeValue) === '{}') {
      for (const key in fsdwaterDataModel) {
        if (item[key] === undefined && key !== 'waterRatio') {
          item[key] = fsdwaterDataModel[key];
        }
      }
    }
    if (item?.waterRatio === undefined) item['waterRatio'] = fsdWaterCurrent?.waterRatio;
    fsdWaterUpdateFsdWater({ ...item, ...serviceParams, level: fsdWaterCurrent?.level || '' });
    FSDWaterTableRef?.current?.reload?.();
  };

  /** 保存表单内容 */
  const handleOnValuesChange = debounce(handleOnSave, 800);

  /** 价区 */
  const generateJQForm: BaseSchemaFormProps = {
    onValuesChange: handleOnValuesChange,
    columns: useJQFormColumns,
    wrapperCol: { span: 4 },
    labelCol: { span: 11 },
    formRef: JQFormRef,
    ...schemaFormConfig,
  };

  /** 供水点 */
  const generateGSDForm: BaseSchemaFormProps = {
    onValuesChange: handleOnValuesChange,
    columns: useGSDFormColumns,
    wrapperCol: { span: 4 },
    labelCol: { span: 11 },
    formRef: GSDFormRef,
    ...schemaFormConfig,
  };

  /** 多级供水 */
  const generateDJGSForm: BaseSchemaFormProps = {
    onValuesChange: handleOnValuesChange,
    columns: useDJGSFormColumns,
    wrapperCol: { span: 4 },
    labelCol: { span: 11 },
    formRef: DJGSFormRef,
    ...schemaFormConfig,
  };

  /** 表单提交 */
  const setFormFieldsValue = async (value?: FSDWaterItem) => {
    JQFormRef?.current?.setFieldsValue({ ...value });
    GSDFormRef?.current?.setFieldsValue({ ...value });
    DJGSFormRef?.current?.setFieldsValue({ ...value });
  };

  /** 表单回填 */
  useEffect(() => {
    setFormFieldsValue(fsdWaterCurrent);
  }, [fsdWaterCurrent]);

  const generateMainForm: any = { '1': generateJQForm, '2': generateGSDForm, '3': generateDJGSForm };

  return (
    <div style={{ height: '100%', padding: '5px' }}>
      <BaseCard type="H2" bordered extraCollapsed={false} title="">
        <>{fsdWaterCurrent?.level && <BaseSchemaForm {...generateMainForm[fsdWaterCurrent?.level]} />}</>
      </BaseCard>
    </div>
  );
};
