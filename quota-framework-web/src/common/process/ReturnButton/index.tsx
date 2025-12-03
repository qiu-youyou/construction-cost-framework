/*
 * @Author: SHUANG
 * @Date: 2022-09-02 17:55:05
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-12 17:12:16
 * @Description: 退回按钮
 */
import { useRef, useState } from 'react';
import { Button, message, Modal } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { DeliveredProcedureOutlined, ExclamationCircleOutlined, InfoCircleOutlined } from '@ant-design/icons';

import { ModalActionType } from '../../../components/BaseModal/typings';
import SpaceView from '../../../components/ViewContainer/SpaceView';
import BaseTable from '../../../components/BaseTable';
import BaseModal from '../../../components/BaseModal';
import BaseCard from '../../../components/BaseCard';

import { CommitTaskPropsParams, NextUserListItem, UserListQueryParams } from '../typing';
import UserMentions, { MentionsProps } from '../UserMentions';
import useTableColumns from './useTableColumns';
import * as API from './services';

type Props = {
  /** 不同业务模块 提交 url */
  commitUrl: string;
  /** 查询参数 */
  queryParams: UserListQueryParams;
  /** 提交参数 */
  commitParams?: CommitTaskPropsParams;
  /** 发生操作前会调用 保存方法 */
  onSave?: (params: SYS.WorkflowSaveCallbackParams) => Promise<FETCH.Row>;
  /** 发生操作前会 校验表单 */
  validateFieldsForms?: () => Promise<FETCH.Row>;
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

  const [messageText, setMessageText] = useState<string>('');
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [nextUserCurrent, setNextUserCurrent] = useState<NextUserListItem>();

  const MentionsRef = useRef<MentionsProps['actionRef']>(null);

  /** 操作弹窗 */
  const modelActionRef = useRef<ModalActionType>();

  /** 确认提交 */
  const onSubmit = async () => {
    /** 不是最后一个流程 必须选择人员 */
    if (!nextUserCurrent && statusMessage !== 'end') {
      message.warning('请选择人员');
      return { status: 'Error' };
    }

    /** 必须填写意见 */
    if (!messageText) {
      message.warning('请填写退回意见！');
      return { status: 'Error' };
    }

    /** 是否是最后一步 */
    const confirmContent =
      statusMessage === 'end'
        ? `确定退回？`
        : `是否退回到：${nextUserCurrent?.positionsName}：${nextUserCurrent?.userRealname}?`;

    modal.confirm({
      title: '提示',
      icon: <ExclamationCircleOutlined />,
      content: confirmContent,

      async onOk() {
        if (!props.commitParams) return;

        const fromParams = await props?.queryParams?.fromParams?.();
        const MentionsParams = MentionsRef?.current?.getNoticeParams?.();

        const returnParams = {
          ...props.commitParams,
          /** 查询参数 */
          upperPersonnel: JSON.stringify([{ ...nextUserCurrent, userId: nextUserCurrent?.id }]),
          companyId: props.queryParams.companyId,
          workflowKey: props.queryParams.workFlowKey,
          processInstanceId: props.queryParams.processInstanceId,
          projectCode: props.queryParams.projectCode,
          generalFactoryCode: props.queryParams.generalFactoryCode,
          billStatus: props.queryParams.billStatus,
          fromParams: !!fromParams ? JSON.stringify(fromParams) : '',
          message: messageText,
          noticeContent: MentionsParams?.noticeContent,
          noticePerson: MentionsParams?.noticePerson,
        };

        /** 超级管理员退回 */
        let res;
        if (props.mode === 'list') {
          res = await API.commitRejectBySuper(props.commitUrl, returnParams);
        } else {
          res = await API.commitRejectTask(props.commitUrl, returnParams);
        }

        if (res?.status === 'SUCCESS') {
          modelActionRef?.current?.close?.();
          message.success(res?.message || '流程提交完成');
          /** 关闭弹窗 */
          Modal.destroyAll();
          /** 重新查询权限 */
          props?.refreshToolbarAuth?.();
          /** 触发刷新  */
          props?.refresh?.();
        }
        return res;
      },
    });
  };

  /** 获取人员 判断 message 是否为 end */
  const handleGetRejectUser = async (params: UserListQueryParams) => {
    if (props.mode == 'list') {
      params.m = 'Y';
    }
    let res;
    /** 超级管理员获取人员 */
    if (props.mode === 'list') {
      res = await API.getRejectUserBySuper(params);
    } else {
      res = await API.getRejectUser(props.commitUrl, params);
    }
    setStatusMessage(res?.message || '');
    return { ...res, rows: res?.rows || [] };
  };

  /** 点击时校验 */
  const handleTriggerControl = async () => {
    setStatusMessage('');
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
            content: '审核中单据才可退回！',
            okText: '确定',
          });
          return errRes;
        }

        // 退回操作检查
        const checkRes = await API.commitRejectTaskCheck(props.commitUrl, {
          workflowKey: props.queryParams.workFlowKey,
          processInstanceId: props.queryParams.processInstanceId,
          billStatus: props.queryParams.billStatus,
          businessId: props.commitParams?.businessId,
        });

        if (checkRes?.status !== 'SUCCESS') {
          return errRes;
        }
        return sucRes;
      }

      // 退回操作检查
      const checkRes = await API.commitRejectTaskCheck(props.commitUrl, {
        workflowKey: props.queryParams.workFlowKey,
        processInstanceId: props.queryParams.processInstanceId,
        billStatus: props.queryParams.billStatus,
        businessId: props.commitParams?.businessId,
      });

      if (checkRes?.status !== 'SUCCESS') {
        return;
      }

      /** 校验单据并保存 */
      await props?.validateFieldsForms?.();
      setSubmitLoading(true);
      const saveRes = await props?.onSave?.({
        workflowKey: props.queryParams.workFlowKey,
        actionType: 'rejectBtn',
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

  /** 触发 DOM */
  const trigger = (
    <Button
      loading={submitLoading}
      className={props?.mode === 'list' ? 'BorderButtonGold' : 'ButtonGold'}
      style={{ marginRight: props?.mode === 'list' ? 0 : 5 }}
    >
      <DeliveredProcedureOutlined /> 退回
    </Button>
  );

  return (
    <>
      <BaseModal
        width={900}
        title="退回"
        trigger={trigger}
        actionRef={modelActionRef}
        triggerControl={handleTriggerControl}
        submiterAsHeader={true}
        onSubmit={onSubmit}
      >
        <SpaceView className="text-area-approval">
          <div style={{ padding: '5px 5px 0 5px' }}>
            <TextArea
              onChange={(v) => setMessageText(v.target.value)}
              style={{ height: 120 }}
              placeholder="退回意见"
              showCount
            />
          </div>
        </SpaceView>

        {statusMessage !== 'end' ? (
          <SpaceView>
            <section style={statusMessage !== 'end' ? { height: 360 } : { height: 0 }}>
              <BaseCard noHeader tabs={{ type: 'card' }}>
                <BaseCard.TabPane tab="选择退回环节和人员" key="1">
                  <BaseTable<NextUserListItem>
                    service={{
                      params: { ...props.queryParams },
                      dataSourceRequest: handleGetRejectUser,
                    }}
                    localRetrieval={{
                      placeholder: '员工代号、姓名',
                      searchKey: ['userName', 'userRealname'],
                    }}
                    onCurrent={(record) => setNextUserCurrent(record)}
                    rowSelection={{ columnWidth: 25, type: 'radio' }}
                    persistenceKey="RETURNUSERTABLE"
                    columns={useTableColumns()}
                    pagination={false}
                    virtual={false}
                    search={false}
                    rowKey={false}
                  />
                </BaseCard.TabPane>

                <BaseCard.TabPane tab="选择单据通知人" key="2">
                  <UserMentions actionRef={MentionsRef} />
                </BaseCard.TabPane>
              </BaseCard>
            </section>
          </SpaceView>
        ) : (
          <SpaceView>
            <section style={{ height: 360 }}>
              <BaseCard noHeader tabs={{ type: 'card' }}>
                <BaseCard.TabPane tab="选择单据通知人" key="2">
                  <UserMentions actionRef={MentionsRef} />
                </BaseCard.TabPane>
              </BaseCard>
            </section>
          </SpaceView>
        )}
      </BaseModal>
      {contextHolder}
    </>
  );
};
