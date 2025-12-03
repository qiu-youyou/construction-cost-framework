/*
 * @Author: SHUANG
 * @Date: 2023-01-09 11:46:40
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-12-27 10:23:33
 * @Description: 业务作废按钮
 */
import { useRef, useState } from 'react';
import { Button, message, Modal } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import BaseModal from '../../../components/BaseModal';
import SpaceView from '../../../components/ViewContainer/SpaceView';
import { ModalActionType } from '../../../components/BaseModal/typings';
import {
  ExclamationCircleOutlined,
  InfoCircleOutlined,
  MinusCircleOutlined,
  StopOutlined,
} from '@ant-design/icons';
import { abandonWorkflow, abandonWorkflowBySuper } from './services';

type Props = {
  commitUrl: string; // 模块URL
  refresh?: () => void; // 刷新操作 作废成功触发
  mode?: 'form' | 'list'; // 单据表单中使用 / 列表中使用 默认 form
  current?: any; // 当前操作
  other?: any;
};

export default (props: Props) => {
  const [modal, contextHolder] = Modal.useModal();

  /** 操作弹窗 */
  const modelActionRef = useRef<ModalActionType>();

  /** 作废说明 */
  const [mainAnnulNote, setMainAnnulNote] = useState<string>('');

  /** 作废 */
  const handleAbandonWorkflow = async () => {
    if (!props?.current) return;

    if (!mainAnnulNote) {
      message.warning('请填写废弃原因');
      return { status: 'Error' };
    }

    modal.confirm({
      title: '提示',
      icon: <ExclamationCircleOutlined />,
      content: `一旦作废不能恢复！是否确定废弃？ `,
      onOk: async () => {
        if (!props?.current) return;
        const { id: businessId, processInstanceId, billStatus } = props.current;

        const params = { businessId, processInstanceId, billStatus, abandonMessage: mainAnnulNote };

        let res;
        // 超级管理员退回
        if (props.mode === 'list') {
          res = await abandonWorkflowBySuper(props.commitUrl, params);
        } else {
          res = await abandonWorkflow(props.commitUrl, params);
        }
        if (res?.status === 'SUCCESS') {
          message.success(res?.message || '操作成功');

          /** 触发刷新 关闭弹窗 */
          props?.refresh?.();
          modelActionRef?.current?.close?.();
        }
        return res;
      },
    });
    return;
  };

  const handleTriggerControl: () => Promise<FETCH.Row> = async () => {
    setMainAnnulNote('');
    const value: FETCH.Row = { status: 'ERROR', rows: {} };

    if (!props?.current) {
      modal.warning({ title: '继续操作', content: '请选择一项数据进行操作!' });
      return { ...value, status: 'ERROR' };
    }

    /** 单据状态 */
    const { current } = props;
    const { returnStatus, workflowLockStatus, billStatus } = current;

    if (workflowLockStatus == 'Y') {
      modal.info({
        title: '继续操作',
        icon: <InfoCircleOutlined style={{ color: 'd48806' }} />,
        content: '只能对审核中的单据进行作废!',
        okText: '确定',
      });
      return { ...value, status: 'ERROR' };
    }

    if (returnStatus !== 'unpass' && billStatus != '1') {
      modal.info({
        title: '继续操作',
        icon: <InfoCircleOutlined style={{ color: 'd48806' }} />,
        content: '只能对审核中的单据进行作废!',
        okText: '确定',
      });
      return { ...value, status: 'ERROR' };
    }

    /** 参数状态 */
    const { id: businessId, processInstanceId } = current;
    if (!businessId && !processInstanceId) {
      modal.info({
        title: '继续操作',
        icon: <InfoCircleOutlined style={{ color: 'd48806' }} />,
        content: '该单据不能进行该操作!',
        okText: '确定',
      });
      return { ...value, status: 'ERROR' };
    }
    return { ...value, status: 'SUCCESS' };
  };

  /** 触发DOM */
  const trigger =
    props?.mode === 'list' ? (
      <Button className="BorderButtonVolcano">
        <MinusCircleOutlined /> 作废
      </Button>
    ) : (
      <Button className="BorderButtonRed">
        <StopOutlined /> 作废
      </Button>
    );

  return (
    <>
      <BaseModal
        width={500}
        title="作废"
        trigger={trigger}
        actionRef={modelActionRef}
        onSubmit={handleAbandonWorkflow}
        triggerControl={handleTriggerControl}
      >
        <SpaceView>
          <div style={{ padding: '5px 5px 0 5px' }}>
            <TextArea
              onChange={(v) => setMainAnnulNote(v.target.value)}
              style={{ height: 160 }}
              placeholder="作废原因"
              showCount
            />
          </div>
        </SpaceView>
      </BaseModal>
      {contextHolder}
    </>
  );
};
