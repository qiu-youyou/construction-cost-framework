/*
 * @Author: SHUANG
 * @Date: 2024-02-22 10:03:38
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-02-22 10:29:24
 * @Description: 取费模板库复制
 */

import { Button } from 'antd';
import { useRef } from 'react';
import { CopyOutlined } from '@ant-design/icons';
import { BaseModalProps, ModalActionType } from 'jd-framework-web/package/components';
import EditButton from 'jd-framework-web/package/components/ActionButton/EditButton';

import { DbFeeDatabaseCopy, DbFeeDatabaseItem } from '../typings';
import { databaseDbFeeDbFeeCopyByIds } from '../services';
import useFormColumns from './useFormColumns';

type Props = {
  dbFeeDatabaseCurrent?: DbFeeDatabaseItem;
  reloadDbFeeDatabaseTable?: () => void;
};

export default (props: Props) => {
  /** 弹窗操作 */
  const modalActionRef = useRef<ModalActionType>();

  /** 数据接收 */
  const { dbFeeDatabaseCurrent, reloadDbFeeDatabaseTable } = props;

  /** 弹窗属性 */
  const modalProps: BaseModalProps = { defaultFullScreen: false, width: 500 };

  /** 表单属性 */

  const schemaFormProps = { wrapperCol: { span: 15 }, labelCol: { span: 7 } };

  /** 源定额库名称 */
  const feeNameSource = dbFeeDatabaseCurrent?.feeName || '';

  /** 触发按钮 */
  const triggerButton = (
    <Button type="primary" className="PlusButton" icon={<CopyOutlined />}>
      复制
    </Button>
  );

  /** 复制定额库保存方法 */
  const handleOnSubmit = async (params: DbFeeDatabaseCopy) => {
    /** 源 ID */
    const sourceDbId = dbFeeDatabaseCurrent?.id || '';

    const res = await databaseDbFeeDbFeeCopyByIds({ ...params, sourceDbId });
    if (res?.status === 'SUCCESS') reloadDbFeeDatabaseTable?.();
    return res;
  };

  return (
    <EditButton
      trigger={triggerButton}
      onSubmit={handleOnSubmit}
      current={{ ...dbFeeDatabaseCurrent, targetName: feeNameSource }}
      columns={useFormColumns({ feeNameSource })}
      schemaFormProps={schemaFormProps}
      actionRef={modalActionRef}
      modalProps={modalProps}
      modalTitle="取费复制"
    />
  );
};
