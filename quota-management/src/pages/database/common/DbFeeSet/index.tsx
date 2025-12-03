/*
 * @Author: SHUANG
 * @Date: 2023-11-16 17:07:23
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-03 09:50:54
 * @Description: 设置取费类型
 */
import { Button, Modal, Tag } from 'antd';
import { ReactNode, useState } from 'react';
import { MenuOutlined, InfoCircleOutlined } from '@ant-design/icons';
import BaseModal from 'jd-framework-web/package/components/BaseModal';

import { DbFeeDirectoryItem } from '../../DbFee/DbFeeDirectoryTree/typings';
import { PropsDbFee } from '../../DbFee/typings';
import DbFee from '../../DbFee';

export type DbFeeSetProps = {
  /** 触发DOM */
  trigger?: ReactNode;
  /** 保存取费方法 */
  onSubmit?: (current?: DbFeeDirectoryItem) => Promise<FETCH.Res>;
  /** 弹窗条件控制 */
  triggerControl?: (() => any) | undefined;
};

export default (props: DbFeeSetProps & PropsDbFee) => {
  const { onSubmit, triggerControl } = props;

  const [modal, contextHolder] = Modal.useModal();

  /** 当前取费章节目录 */
  const [dbFeeDirectoryCurrent, setDbFeeDirectoryCurrent] = useState<DbFeeDirectoryItem>();

  /** 保存当前选中的 取费模板目录 */
  const handleOnSubmitSaveSetFee: any = async () => {
    if (!dbFeeDirectoryCurrent?.id) {
      const modalInfo = { icon: <InfoCircleOutlined />, content: '请选择取费目录！' };
      modal.warning({ ...modalInfo, title: '继续操作', okText: '确定' });
      return;
    }

    if (!!dbFeeDirectoryCurrent?.children?.length) {
      const modalInfo = {
        content: '请选择取费目录中最后一个层级，进行保存设置！',
        icon: <InfoCircleOutlined />,
        title: '继续操作',
        okText: '确定',
      };
      modal.warning(modalInfo);
      return;
    }

    const res = await onSubmit?.(dbFeeDirectoryCurrent);
    return res;
  };

  /** 触发按钮 */
  const modalTrigger = props?.trigger || (
    <Button className="BorderButtonGeekBlue">
      <MenuOutlined /> 设置取费类型
    </Button>
  );

  const modalRender = (
    <DbFee
      toolbarSlot={<Tag color="blue">请选择取费目录中最后一个层级，进行保存!</Tag>}
      databaseCurrentDefault={props?.databaseCurrentDefault}
      setDbFeeDirectoryCurrent={setDbFeeDirectoryCurrent}
      dbSelectorDisabled={props?.dbSelectorDisabled}
      readonly
    />
  );

  return (
    <>
      <BaseModal
        width={1200}
        trigger={modalTrigger}
        triggerControl={triggerControl}
        onSubmit={handleOnSubmitSaveSetFee}
        okText="保存当前取费"
        title="设置取费类型"
      >
        {modalRender}
      </BaseModal>
      {contextHolder}
    </>
  );
};
