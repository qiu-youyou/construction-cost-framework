/*
 * @Author: SHUANG
 * @Date: 2023-10-17 13:57:21
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-19 17:11:36
 * @Description: 定额库查询
 */
import { Button, Space, message } from 'antd';
import { useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import BaseTable from 'jd-framework-web/package/components/BaseTable';
import ModalButton from 'jd-framework-web/package/components/ActionButton/ModalButton';
import { BaseModalProps, BaseTableProps, ModalActionType } from 'jd-framework-web/package/components';

import useDbTableColumns from '@/pages/database/DbMain/DatabaseMain/useDbTableColumns';
import { DataBaseProps, DatabaseDbItem } from '../../DbMain/DatabaseMain/typings';
import { databaseDbQueryPageInfo } from '../../DbMain/DatabaseMain/services';
import { ButtonProps } from 'antd/es/button';

type Props = {
  tableProps?: Partial<BaseTableProps<DatabaseDbItem>>;
  buttonProps?: ButtonProps;
  modalTitle?: string;
};

export default (props: DataBaseProps & Props) => {
  /** 弹窗操作 */
  const modalActionRef = useRef<ModalActionType>();

  /** 数据接收 */
  const { tableProps, databaseCurrent, setDatabaseCurrent } = props;

  /** 定额库表当前行 */
  const [currentRow, setCurrentRow] = useState<DatabaseDbItem>();

  /** 改变当前数据库 并 关闭弹窗 */
  const handleSetDatabaseCurrent = () => {
    if (!currentRow) return message.warning('请选择一行数据！');
    setDatabaseCurrent?.(currentRow);
    modalActionRef?.current?.close?.();
  };

  /** 取消操作 */
  const handleOnCancel = () => {
    modalActionRef?.current?.close?.();
  };

  /** 操作按钮 */
  const actionBtn = (
    <div className="SchemaFormFooter" style={{ padding: '2px 6px 0 6px' }}>
      <Space>
        <Button onClick={handleOnCancel}>取消</Button>
        <Button type="primary" onClick={handleSetDatabaseCurrent}>
          <span>确定</span>
        </Button>
      </Space>
    </div>
  );

  /** radio 效果 */
  const defaultSelectedRowKeys = [currentRow?.id || databaseCurrent?.id || ''];

  /** 定额库查询表去掉状态列 */
  const columns = useDbTableColumns.filter((item) => item.dataIndex !== 'billStatus');

  /** 定额库查询表 */
  const generateTable: BaseTableProps<DatabaseDbItem> = {
    persistenceKey: 'PAGESDATABASESELECTORSEARCHTABLE',
    service: { dataSourceRequest: databaseDbQueryPageInfo },
    rowSelection: { type: 'radio', defaultSelectedRowKeys },
    onCurrent: setCurrentRow,
    defaultCurrent: false,
    columns: columns,
    ...tableProps,
  };

  /** 弹窗属性 */
  const modalProps: BaseModalProps = {
    style: { top: 150, left: '5vw' },
    defaultFullScreen: false,
    width: 1100,
  };

  /** 触发按钮 */
  const triggerButton = (
    <Button
      type="link"
      style={{ transform: 'translateY(-1.5px)' }}
      icon={<SearchOutlined />}
      {...props?.buttonProps}
    >
      查询
    </Button>
  );

  const tableRender = (
    <section className="ant-form" style={{ height: 440 }}>
      <section style={{ height: 'calc(100% - 26px)' }}>
        <BaseTable {...generateTable} />
      </section>
      {actionBtn}
    </section>
  );

  return (
    <ModalButton
      modalTitle={props?.modalTitle || '定额册查询'}
      determineActionCurrent={false}
      actionRef={modalActionRef}
      trigger={triggerButton}
      modalProps={modalProps}
      render={tableRender}
    />
  );
};
