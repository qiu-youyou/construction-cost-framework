/*
 * @Author: SHUANG
 * @Date: 2024-04-19 14:10:59
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-23 15:55:40
 * @Description: 工程造价-运保杂费计算 铁路综合运费
 */

import { Button } from 'antd';
import { debounce } from 'lodash';
import { useRef, useState } from 'react';
import { CalculatorOutlined } from '@ant-design/icons';
import { ProFormInstance } from '@ant-design/pro-components';
import BaseSchemaForm from 'jd-framework-web/package/components/BaseSchemaForm';
import EditButton from 'jd-framework-web/package/components/ActionButton/EditButton';
import { BaseModalProps, BaseSchemaFormProps } from 'jd-framework-web/package/components';
import { transportOriginTrainQueryOne, transportOriginTrainUpdateTransportTrain } from './services';
import { transportTrainDataModel } from './services';
import { TransportProps } from '../../../typings';
import useFormColumns from './useFormColumns';

/** 表单通用配置 */
const schemaFormConfig: any = {
  submitter: false,
  grid: true,
};

export default (props: TransportProps) => {
  /** 当前产品 */
  const formRef = useRef<ProFormInstance>();

  const { transportOriginTrainRef } = props;
  const { transportOriginMethodCurrent } = props;

  /** 关联参数 */
  const id = transportOriginMethodCurrent?.id || '';
  const oriId = transportOriginMethodCurrent?.oriId || '';
  const traId = transportOriginMethodCurrent?.traId || '';
  const stageId = transportOriginMethodCurrent?.stageId || '';
  const projectId = transportOriginMethodCurrent?.projectId || '';
  const traTaxRate = transportOriginMethodCurrent?.traTaxRate;

  const serviceParams = { id, oriId, traId, stageId, projectId, traTaxRate  };

  /** 铁路运输费计算 */
  const [transportOriginTrain, setTransportOriginTrain] = useState<any>();

  /** 查询铁路综合运费 */
  const fetchTransportOriginTrainQueryOne = async () => {
    const res = await transportOriginTrainQueryOne(serviceParams);
    setTransportOriginTrain(res?.rows);
    formRef?.current?.setFieldsValue({ ...res?.rows });
    return res;
  };

  /** 铁路运输费计算保存 */
  const handleOnValuesChange = debounce(async (changeValue, item) => {
    if (JSON.stringify(changeValue) === '{}') {
      for (const key in transportTrainDataModel) {
        if (item[key] === undefined) {
          item[key] = transportTrainDataModel[key];
        }
      }
    }
    const res = await transportOriginTrainUpdateTransportTrain({ ...item, ...serviceParams });
    fetchTransportOriginTrainQueryOne();
  }, 800);

  /** 关闭弹窗 */
  const afterClose = () => {
    const { transportMainTableRef, transportOriginTableRef, transportOriginMethodTableRef } = props;
    transportMainTableRef?.current?.reload?.();
    transportOriginTableRef?.current?.reload?.();
    transportOriginMethodTableRef?.current?.reload?.();
  };

  /** 触发按钮 */
  const triggerButton = (
    <Button className="BorderButtonGreen" icon={<CalculatorOutlined />}>
      运费计算
    </Button>
  );

  /** 弹窗属性 */
  const modalProps: BaseModalProps = {
    triggerControl: fetchTransportOriginTrainQueryOne,
    defaultFullScreen: false,
    noFooter: true,
    footer: null,
    width: 820,
    afterClose,
  };

  const generateForm: BaseSchemaFormProps = {
    initialValues: transportOriginTrain,
    onValuesChange: handleOnValuesChange,
    columns: useFormColumns,
    wrapperCol: { span: 9 },
    labelCol: { span: 12 },
    colProps: { span: 8 },
    formRef: formRef,
    ...schemaFormConfig,
  };

  const renderForm = (
    <section style={{ padding: '20px' }}>
      <BaseSchemaForm {...generateForm} />
    </section>
  );

  return (
    <EditButton
      render={renderForm}
      current={transportOriginMethodCurrent}
      actionRef={transportOriginTrainRef}
      trigger={triggerButton}
      modalProps={modalProps}
      modalTitle="铁路运输费用"
    />
  );
};
