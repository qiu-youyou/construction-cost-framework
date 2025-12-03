/*
 * @Author: SHUANG
 * @Date: 2022-09-01 15:39:21
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-12-27 10:24:40
 * @Description: 转办按钮
 */
import { useRef, useState } from 'react';
import { Button, message, Modal } from 'antd';
import { ExclamationCircleOutlined, InfoCircleOutlined, NodeExpandOutlined } from '@ant-design/icons';

import { ModalActionType } from '../../../components/BaseModal/typings';
import SpaceView from '../../../components/ViewContainer/SpaceView';
import BaseModal from '../../../components/BaseModal';
import BaseCard from '../../../components/BaseCard';

import { CommitTaskPropsParams, UserListQueryParams } from '../typing';
import { forwardTaskByUser, forwardTaskSuperByUser } from './services';
import UserMentions, { MentionsProps } from '../UserMentions';

type Props = {
  /** 查询参数 */
  queryParams: UserListQueryParams;
  /** 提交参数 */
  commitParams?: CommitTaskPropsParams;
  /** 发生操作前会调用 保存方法 */
  onSave?: (params: SYS.WorkflowSaveCallbackParams) => Promise<FETCH.Row>;
  /** 发生操作前会 校验表单 */
  validateFieldsForms?: () => Promise<FETCH.Row>; //
  /** 操作成功后刷新操作权限 */
  refreshToolbarAuth?: () => void;
  /** 单据表单中使用 / 列表中使用 默认 form */
  mode?: 'form' | 'list';

  /** 刷新主单据函数 */
  refresh?: () => void;

  /** 当前操作 list 模式 */
  current?: any;
};

export default (props: Props) => {
  const [modal, contextHolder] = Modal.useModal();

  const MentionsRef = useRef<MentionsProps['actionRef']>(null);
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);

  /** 操作弹窗 */
  const modelActionRef = useRef<ModalActionType>();

  /** 提交请求 */
  const handleCommitCompleteTask = async () => {
    const MentionsParams = MentionsRef?.current?.getNoticeParams?.();

    const forwardParams = {
      processInstanceId: props.queryParams.processInstanceId,
      workflowKey: props.queryParams.workFlowKey,
      userInfo: MentionsParams?.noticePerson,
      content: MentionsParams?.noticeContent,
    };

    /** 如果是超级管理员操作 */
    let res;
    if (props?.mode === 'list') {
      res = await forwardTaskSuperByUser(forwardParams);
    } else {
      res = await forwardTaskByUser(forwardParams);
    }

    if (res?.status === 'SUCCESS') {
      modelActionRef?.current?.close?.();
      message.success(res?.message || '转办完成');
      /** 关闭弹窗 */
      Modal.destroyAll();
      /** 重新查询权限 */
      props?.refreshToolbarAuth?.();
      /** 触发刷新  */
      props?.refresh?.();
    }
    return res;
  };

  /** 确认提交 */
  const onSubmit = async () => {
    const MentionsParams = MentionsRef?.current?.getNoticeParams?.();
    /** 结束状态 不判读是否选择了人员 */
    if (!MentionsParams?.noticePerson) {
      message.warning('请选择人员');
      return { status: 'Error' };
    }
    if (MentionsParams?.noticePerson?.split(',').length > 1) {
      message.warning('不能同时转办给多人');
      return { status: 'Error' };
    }

    modal.confirm({
      title: '提示',
      icon: <ExclamationCircleOutlined />,
      onOk: handleCommitCompleteTask,
      content: `确定转办？到：${MentionsParams?.noticePerson}`,
    });
    return;
  };

  /** 点击时校验 */
  const handleTriggerControl = async () => {
    try {
      // 如果是列表中使用 那么一定要有当前操作行
      if (props?.mode === 'list') {
        const sucRes: FETCH.Row = { message: '', status: 'SUCCESS', rows: {} };
        const errRes: FETCH.Row = { message: '', status: 'ERROR', rows: {} };

        if (!props?.current) {
          modal.warning({ title: '继续操作', content: '请选择一项数据进行操作!' });
          return errRes;
        }

        /** 状态判断 退回只有审核中的可以退回 */
        if (props?.queryParams?.billStatus != '1') {
          modal.info({
            title: '继续操作',
            icon: <InfoCircleOutlined style={{ color: 'd48806' }} />,
            content: '审核中单据才可转办！',
            okText: '确定',
          });
          return errRes;
        }
        return sucRes;
      }

      /** 校验单据并保存 */
      await props?.validateFieldsForms?.();
      setSubmitLoading(true);
      const saveRes = await props?.onSave?.({
        workflowKey: props.queryParams.workFlowKey,
        actionType: 'forwardBtn',
      });
      setSubmitLoading(false);
      return saveRes;
    } catch (error: any) {
      if (!!error?.errorFields?.length) {
        message.warning('请将主单填写完成！');
        setSubmitLoading(false);
      }
      const returnParams: FETCH.Row = { status: 'ERROR', rows: {} };
      return returnParams;
    }
  };

  /** 触发DOM */
  const trigger = (
    <Button
      loading={submitLoading}
      className={props?.mode === 'list' ? 'BorderButtonCyan' : 'ButtonCyan'}
      style={{ marginRight: props?.mode === 'list' ? 0 : 5 }}
    >
      <NodeExpandOutlined /> 转办
    </Button>
  );

  return (
    <>
      <BaseModal
        width={800}
        title="转办"
        trigger={trigger}
        actionRef={modelActionRef}
        triggerControl={handleTriggerControl}
        onSubmit={onSubmit}
      >
        <SpaceView>
          <section style={{ height: 260 }}>
            <BaseCard noHeader tabs={{ type: 'card' }}>
              <BaseCard.TabPane tab="选择转办人" key="1">
                <UserMentions personLabel="转办人员" contentLabel="备注内容" actionRef={MentionsRef} />
              </BaseCard.TabPane>
            </BaseCard>
          </section>
        </SpaceView>
      </BaseModal>
      {contextHolder}
    </>
  );
};
