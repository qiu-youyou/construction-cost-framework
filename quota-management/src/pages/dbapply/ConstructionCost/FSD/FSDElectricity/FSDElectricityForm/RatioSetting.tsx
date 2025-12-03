/*
 * @Author: SHUANG
 * @Date: 2024-04-23 17:35:24
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-24 14:11:53
 * @Description: 综合电价资料 比例设置
 */
import { useRef } from 'react';
import { Button, Modal } from 'antd';
import { BaseModalProps, BaseSchemaFormProps } from 'jd-framework-web/package/components';
import { FormColumnsDefine, ModalActionType } from 'jd-framework-web/package/components';
import EditButton from 'jd-framework-web/package/components/ActionButton/EditButton';
import { ProFormInstance } from '@ant-design/pro-components';
import { FSDElectricityItem } from '../typings';
import { accAdd } from '@/utils/use';

type Props = {
  handleOnValuesChange: any;
  fsdElectricityCurrent?: FSDElectricityItem;
  ZHDJFormRef: React.MutableRefObject<ProFormInstance | undefined>;
};

export default (props: Props) => {
  const { ZHDJFormRef } = props;
  const { fsdElectricityCurrent } = props;
  const [modal, contextHolder] = Modal.useModal();

  const ratioSettingRef = useRef<ProFormInstance>();

  /** 弹窗操作 */
  const modalActionRef = useRef<ModalActionType>();

  const handleCalcSumRatio = (values: any) => {
    const eleOutsideRatio = Number(values?.eleOutsideRatio) || 0;
    const eleOneselfRatio = Number(values?.eleOneselfRatio) || 0;
    const eleOtherRatio = Number(values?.eleOtherRatio) || 0;
    const sumRatio = accAdd(eleOutsideRatio, eleOneselfRatio);
    const sum = accAdd(sumRatio, eleOtherRatio);
    return sum;
  };

  /** 保存方法 */
  const handleOnSubmit = async (values: Partial<FSDElectricityItem>) => {
    const sum = handleCalcSumRatio(values);
    if (sum !== 100) {
      modal.warning({ content: '三个比例之和必须是100%！' });
      return { status: 'ERROR' };
    }
    const eleOutsideRatio = Number(values?.eleOutsideRatio) || 0;
    const eleOneselfRatio = Number(values?.eleOneselfRatio) || 0;
    const eleOtherRatio = Number(values?.eleOtherRatio) || 0;
    ZHDJFormRef?.current?.setFieldsValue({ eleOutsideRatio, eleOneselfRatio, eleOtherRatio });
    props?.handleOnValuesChange?.();
    return { status: 'SUCCESS' };
  };

  const getInitialValues = () => {
    const sumRatio = handleCalcSumRatio(fsdElectricityCurrent);
    return { ...fsdElectricityCurrent, sumRatio };
  };

  const triggerControl = async () => {
    return { status: 'SUCCESS' };
  };

  /** 弹窗属性 */
  const modalProps: BaseModalProps = { defaultFullScreen: false, width: 480, triggerControl };

  /** 触发按钮 */
  const triggerButton = (
    <Button style={{ position: 'absolute', top: 6, left: 280 }} className="ButtonHeight94">
      设置比例
    </Button>
  );

  /** 表单属性 */
  const schemaFormProps: Partial<BaseSchemaFormProps> = {
    initialValues: getInitialValues(),
    formRef: ratioSettingRef,
    wrapperCol: { span: 9 },
    labelCol: { span: 11 },
  };

  const columns: FormColumnsDefine<FSDElectricityItem> = [
    {
      title: '外购电比例',
      dataIndex: 'eleOutsideRatio',
      valueType: 'digit',
      customFieldProps: { min: 0, max: 100 },
    },
    {
      title: '自发电比例',
      dataIndex: 'eleOneselfRatio',
      valueType: 'digit',
      customFieldProps: { min: 0, max: 100 },
    },
    {
      title: '其它供电比例',
      dataIndex: 'eleOtherRatio',
      valueType: 'digit',
      customFieldProps: { min: 0, max: 100 },
    },
    {
      title: '(三个比例之和必须是100%)',
      tooltip: '三个比例之和必须是100%，不填写作为“0”处理！',
      dependencies: ['eleOutsideRatio', 'eleOneselfRatio', 'eleOtherRatio'],
      dataIndex: 'sumRatio',
      valueType: 'digit',
      customFieldProps: (form) => {
        const values = form.getFieldsValue(['eleOutsideRatio', 'eleOneselfRatio', 'eleOtherRatio']);
        const sum = handleCalcSumRatio(values);
        form.setFieldsValue({ sumRatio: sum });
        return { max: 100, min: 0 };
      },
    },
  ];

  return (
    <>
      <EditButton
        columns={columns}
        schemaFormProps={schemaFormProps}
        actionRef={modalActionRef}
        onSubmit={handleOnSubmit}
        modalProps={modalProps}
        trigger={triggerButton}
        current={{ id: '1' }}
        modalTitle="设置比例"
      />
      {contextHolder}
    </>
  );
};
