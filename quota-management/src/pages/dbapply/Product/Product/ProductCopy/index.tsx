/*
 * @Author: SHUANG
 * @Date: 2024-02-04 17:15:10
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-22 16:49:42
 * @Description: 工程造价产品-产品信息 复制产品
 */
import { useRef } from 'react';
import { Button, Modal } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import { BaseModalProps, ModalActionType, TableActionType } from 'jd-framework-web/package/components';
import EditButton from 'jd-framework-web/package/components/ActionButton/EditButton';

import { ProductCopyParams, ProductItem } from '../typings';
import { projectProductCopy } from '../services';
import useFormColumns from './useFormColumns';

type Props = {
  /** 工程产品 复制源 */
  productActionCurrent?: ProductItem;

  /** 产品表 REF */
  productTableRef?: TableActionType;

  dbapplyType?: any[];
};

export default (props: Props) => {
  /** 当前产品 */
  const { dbapplyType } = props;
  const { productTableRef } = props;
  const { productActionCurrent } = props;

  const [modal, contextHolder] = Modal.useModal();

  /** 弹窗操作 */
  const modalActionRef = useRef<ModalActionType>();

  /** 复制源名称 */
  const productNameSource = productActionCurrent?.productName || '';
  const productPhaseSource = productActionCurrent?.productPhase || '';
  const productTypeSource = productActionCurrent?.productType || '';

  /** 保存方法 */
  const handleOnSubmit = async (params: ProductCopyParams) => {
    const res = await projectProductCopy(params);
    if (res?.status === 'SUCCESS') {
      productTableRef?.current?.reload?.();
    }
    return res;
  };

  const triggerControl = async () => {
    const errorReturn: FETCH.Res = { status: 'ERROR', code: '200', rows: [] };
    if (!productActionCurrent) {
      modal.warning({ title: '继续操作', content: `请选择一行数据进行复制！` });
      return errorReturn;
    }
    return { ...errorReturn, status: 'SUCCESS' };
  };

  /** 表单属性 */
  const schemaFormProps = { wrapperCol: { span: 15 }, labelCol: { span: 7 } };

  /** 弹窗属性 */
  const modalProps: BaseModalProps = { defaultFullScreen: false, width: 480, triggerControl };

  /** 触发按钮 */
  const triggerButton = (
    <Button type="primary" className="PlusButton" icon={<CopyOutlined />}>
      复制
    </Button>
  );

  return (
    <>
      <EditButton
        columns={useFormColumns({ productNameSource, productPhaseSource, productTypeSource, dbapplyType })}
        current={{ ...productActionCurrent, sourceProductId: productActionCurrent?.id }}
        schemaFormProps={schemaFormProps}
        actionRef={modalActionRef}
        onSubmit={handleOnSubmit}
        modalProps={modalProps}
        trigger={triggerButton}
        modalTitle="产品复制"
      />
      {contextHolder}
    </>
  );
};
