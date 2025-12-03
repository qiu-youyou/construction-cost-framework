/*
 * @Author: SHUANG
 * @Date: 2023-10-17 15:30:36
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-19 14:10:33
 * @Description: 定额册复制
 */
import { Button } from 'antd';
import { useRef } from 'react';
import { CopyOutlined } from '@ant-design/icons';
import { BaseModalProps, ModalActionType } from 'jd-framework-web/package/components';
import EditButton from 'jd-framework-web/package/components/ActionButton/EditButton';

import { DataBaseProps, DatabaseDbCopy } from '../../DbMain/DatabaseMain/typings';
import { fetchDatabaseDbDbCopy } from './fetch';
import useFormColumns from './useFormColumns';

/** @name buttonType 触发按钮形式 */
export default (props: DataBaseProps) => {
  /** 弹窗操作 */
  const modalActionRef = useRef<ModalActionType>();

  /** 数据接收 */
  const { databaseCurrent, reloadDbDataSource } = props;

  /** 源定额库名称 ID */
  const dbNameSource = databaseCurrent?.dbName || '';

  /** 弹窗属性 */
  const modalProps: BaseModalProps = { defaultFullScreen: false, width: 500 };

  /** 表单属性 */
  const schemaFormProps = { wrapperCol: { span: 15 }, labelCol: { span: 7 } };

  /** 复制定额库保存方法 */
  const handleOnSubmit = async (params: DatabaseDbCopy) =>
    fetchDatabaseDbDbCopy(params, databaseCurrent, reloadDbDataSource);

  /** 触发按钮 */
  const triggerButton = (
    <Button type="primary" className="PlusButton" icon={<CopyOutlined />}>
      复制
    </Button>
  );

  return (
    <EditButton
      trigger={triggerButton}
      onSubmit={handleOnSubmit}
      current={{ ...databaseCurrent, targetName: dbNameSource }}
      columns={useFormColumns({ dbNameSource })}
      schemaFormProps={schemaFormProps}
      actionRef={modalActionRef}
      modalProps={modalProps}
      modalTitle="定额册复制"
    />
  );
};
