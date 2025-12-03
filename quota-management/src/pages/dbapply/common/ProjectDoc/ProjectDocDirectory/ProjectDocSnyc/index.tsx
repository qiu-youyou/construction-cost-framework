/*
 * @Author: SHUANG
 * @Date: 2024-02-05 16:00:37
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-02-05 16:24:38
 * @Description: 项目文档库-目录 项目相关设计文档库同步
 */

import { useState } from 'react';
import { Button, Modal, message } from 'antd';
import { TableActionType } from 'jd-framework-web/package/components';
import { ExclamationCircleOutlined, RetweetOutlined } from '@ant-design/icons';

import { projectDocDirectoryBatchInsert } from '../services';
import { ProjectItem } from '../../../../Product/Project/typings';

type Props = {
  /** 当前工程 */
  projectActionCurrent?: ProjectItem;

  /** 文档库目录 REF */
  projectDocDirectoryRef?: TableActionType;
};

export default (props: Props) => {
  /** 当前工程 */
  const { projectActionCurrent } = props;
  const { projectDocDirectoryRef } = props;
  const projectId = projectActionCurrent?.id || '';

  const [modal, contextHolder] = Modal.useModal();

  /** Loading */
  const [loading, setLoading] = useState<boolean>(false);

  /** 项目相关设计文档库同步 */
  const onOk = async () => {
    setLoading(true);
    const res = await projectDocDirectoryBatchInsert({ projectId });
    setLoading(false);
    if (res?.status === 'SUCCESS') {
      message.success(res?.message || '操作成功');
      projectDocDirectoryRef?.current?.reload?.();
    }
    return res;
  };

  /** 项目相关设计文档库同步 */
  const handleOnClick = async () => {
    modal.confirm({
      title: '提示',
      icon: <ExclamationCircleOutlined />,
      content: `可能会对当前数据造成影响, 是否继续?`,
      onOk,
    });
  };

  /** 触发按钮 */
  const triggerBtn = (
    <Button onClick={handleOnClick} className="BorderButtonCyan" loading={loading}>
      <RetweetOutlined /> 项目相关设计文档库同步
    </Button>
  );

  return (
    <>
      {triggerBtn}
      {contextHolder}
    </>
  );
};
