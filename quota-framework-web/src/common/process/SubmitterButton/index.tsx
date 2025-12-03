/*
 * @Author: SHUANG
 * @Date: 2022-09-01 15:39:21
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-12-27 10:35:35
 * @Description: 提交按钮 / 拥有提前结束状态
 */
import { useRef, useState } from 'react';
import { Button, message, Modal } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { ExclamationCircleOutlined, FileDoneOutlined } from '@ant-design/icons';

import { ModalActionType } from '../../../components/BaseModal/typings';
import SpaceView from '../../../components/ViewContainer/SpaceView';
import BaseTable from '../../../components/BaseTable';
import BaseModal from '../../../components/BaseModal';
import BaseCard from '../../../components/BaseCard';

import { CommitTaskPropsParams, NextUserListItem, UserListQueryParams } from '../typing';
import UserMentions, { MentionsProps } from '../UserMentions';
import { commitCompleteTask, getNextUser } from './services';
import useTableColumns from './useTableColumns';

type Props = {
  /** 不同业务模块 提交 url */
  commitUrl: string;
  /** 是否提前结束 可提前结束状态 */
  finishBtn?: boolean;
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
  const handleCommitCompleteTask = async () => {
    if (!props.commitParams) return;

    /** 是否提前结束 */
    const finish = props.finishBtn ? { finish: true } : {};

    const fromParams = await props?.queryParams?.fromParams?.();
    const MentionsParams = MentionsRef?.current?.getNoticeParams?.();

    const res = await commitCompleteTask(props.commitUrl, {
      ...props.commitParams,
      /** 查询参数 */
      nextPersonnel: JSON.stringify([{ ...nextUserCurrent, userId: nextUserCurrent?.id }]),
      companyId: props.queryParams.companyId,
      workflowKey: props.queryParams.workFlowKey,
      processInstanceId: props.queryParams.processInstanceId,
      projectCode: props.queryParams.projectCode,
      generalFactoryCode: props.queryParams.generalFactoryCode,
      billStatus: props.queryParams.billStatus,
      message: messageText,
      fromParams: !!fromParams ? JSON.stringify(fromParams) : '',
      ...finish,
      noticeContent: MentionsParams?.noticeContent,
      noticePerson: MentionsParams?.noticePerson,
    });

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
  };

  /** 确认提交 */
  const onSubmit = async () => {
    /** 不是最后一个流程 必须选择人员 */
    if (!nextUserCurrent && statusMessage !== 'end') {
      message.warning('请选择人员');
      return { status: 'Error' };
    }

    /** 是否是最后一步 */
    const confirmContent =
      statusMessage === 'end'
        ? `确定提交？`
        : `是否提交到：${nextUserCurrent?.positionsName}：${nextUserCurrent?.userRealname}?`;

    modal.confirm({
      title: '提示',
      icon: <ExclamationCircleOutlined />,
      onOk: handleCommitCompleteTask,
      content: confirmContent,
    });

    return;
  };

  /** 获取人员 判断 message 是否为 end */
  const handleGetNextUser = async (params: UserListQueryParams) => {
    const fromParams = await props?.queryParams?.fromParams?.();
    const res = await getNextUser({
      ...params,
      fromParams: !!fromParams ? JSON.stringify(fromParams) : '',
    });
    setStatusMessage(res?.message || '');
    return { ...res, rows: res?.rows || [] };
  };

  /** 点击时校验 */
  const handleTriggerControl = async () => {
    setStatusMessage('');
    try {
      await props?.validateFieldsForms?.();
      setSubmitLoading(true);
      const saveRes = await props?.onSave?.({
        workflowKey: props.queryParams.workFlowKey,
        actionType: 'subBtn',
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
    <Button className="ButtonBlue" loading={submitLoading} style={{ marginRight: 5 }}>
      <FileDoneOutlined /> {props.finishBtn ? '提前结束' : '提交'}
    </Button>
  );

  return (
    <>
      <BaseModal
        width={900}
        title="提交"
        trigger={trigger}
        submiterAsHeader={true}
        actionRef={modelActionRef}
        triggerControl={handleTriggerControl}
        onSubmit={onSubmit}
      >
        <SpaceView className="text-area-approval">
          <div style={{ padding: '5px 5px 0 5px' }}>
            <TextArea
              onChange={(v) => setMessageText(v.target.value)}
              style={{ height: 120 }}
              placeholder="审批意见"
              showCount
            />
          </div>
        </SpaceView>

        {statusMessage !== 'end' ? (
          <SpaceView>
            <section style={statusMessage !== 'end' ? { height: 360 } : { height: 0 }}>
              <BaseCard noHeader tabs={{ type: 'card' }}>
                <BaseCard.TabPane tab="下一环节审核人" key="1">
                  <BaseTable<NextUserListItem>
                    service={{
                      params: { ...props.queryParams },
                      dataSourceRequest: handleGetNextUser,
                    }}
                    localRetrieval={{
                      placeholder: '员工代号、姓名',
                      searchKey: ['userName', 'userRealname'],
                    }}
                    onCurrent={(record) => setNextUserCurrent(record)}
                    rowSelection={{ columnWidth: 25, type: 'radio' }}
                    persistenceKey="SUBMITTERUSERTABLE"
                    columns={useTableColumns()}
                    pagination={false}
                    virtual={false}
                    search={false}
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
