/*
 * @Author: SHUANG
 * @Date: 2022-09-02 17:55:05
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-12-27 10:35:12
 * @Description: 驳回按钮
 */
import { useRef, useState } from 'react';
import { Button, message, Modal } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { ExclamationCircleOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { CommitTaskPropsParams, NextUserListItem, UserListQueryParams } from '../typing';

import { ModalActionType } from '../../../components/BaseModal/typings';
import SpaceView from '../../../components/ViewContainer/SpaceView';
import BaseTable from '../../../components/BaseTable';
import BaseModal from '../../../components/BaseModal';
import BaseCard from '../../../components/BaseCard';

import { commitRejectTask, getRejectUser } from './services';
import useTableColumns from './useTableColumns';

type Props = {
  /** 不同业务模块 提交 url */
  commitUrl: string;
  /** 查询参数 */
  queryParams: UserListQueryParams;
  /** 提交参数 */
  commitParams?: CommitTaskPropsParams;
  /** 单据表单中使用 / 列表中使用 默认 form */
  mode?: 'form' | 'list';
  /** 刷新主单据函数 */
  refresh?: () => void;
  /** 当前操作 list 模式 */
  current?: any; //
};

export default (props: Props) => {
  const [modal, contextHolder] = Modal.useModal();
  /** 操作弹窗 */
  const modelActionRef = useRef<ModalActionType>();

  const [messageText, setMessageText] = useState<string>('');
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [nextUserCurrent, setNextUserCurrent] = useState<NextUserListItem>();

  /** 确认提交 */
  const onSubmit = async () => {
    /** 不是最后一个流程 必须选择人员 */
    if (!nextUserCurrent && statusMessage !== 'end') {
      message.warning('请选择人员');
      return { status: 'Error' };
    }

    /** 必须填写意见 */
    if (!messageText) {
      message.warning('请填写驳回意见！');
      return { status: 'Error' };
    }

    /** 是否是最后一步 */
    const confirmContent =
      statusMessage === 'end'
        ? `确定驳回？`
        : `是否驳回到：${nextUserCurrent?.positionsName}：${nextUserCurrent?.userRealname}?`;

    modal.confirm({
      title: '提示',
      icon: <ExclamationCircleOutlined />,
      content: confirmContent,

      async onOk() {
        if (!props.commitParams) return;
        const fromParams = await props?.queryParams?.fromParams?.();

        const res = await commitRejectTask(props.commitUrl, {
          ...props.commitParams,
          /** 查询参数 */
          upperPersonnel: JSON.stringify([{ ...nextUserCurrent, userId: nextUserCurrent?.id }]),
          companyId: props.queryParams.companyId,
          workflowKey: props.queryParams.workFlowKey,
          processInstanceId: props.queryParams.processInstanceId,
          generalFactoryCode: props.queryParams.generalFactoryCode,
          projectCode: props.queryParams.projectCode,
          billStatus: props.queryParams.billStatus,
          fromParams: !!fromParams ? JSON.stringify(fromParams) : '',
          message: messageText,
        });

        if (res?.status === 'SUCCESS') {
          modelActionRef?.current?.close?.();
          message.success(res?.message || '流程提交完成');
          Modal.destroyAll();

          props?.refresh?.();
        }
        return res;
      },
    });
    return;
  };

  /** 获取人员 判断 message 是否为 end */
  const handleGetRejectUser = async (params: UserListQueryParams) => {
    const res = await getRejectUser(params);
    setStatusMessage(res?.message || '');
    return { ...res, rows: res?.rows || [] };
  };

  /** 点击时校验 */
  const handleTriggerControl = async () => {
    const rejectParams: FETCH.Row = { rows: {}, status: 'ERROR' };

    if (props?.mode === 'list' && !props?.current) {
      modal.warning({ title: '继续操作', content: '请选择一项数据进行操作!' });
      return rejectParams;
    }

    if (props?.queryParams?.billStatus !== '2') {
      modal.info({
        title: '继续操作',
        icon: <InfoCircleOutlined style={{ color: 'd48806' }} />,
        content: '只能对已完成的单据进行驳回操作！',
        okText: '确定',
      });
      return rejectParams;
    }

    if (!props?.queryParams?.processInstanceId || !props?.queryParams?.processDefinitionId) {
      modal.info({
        title: '继续操作',
        icon: <InfoCircleOutlined style={{ color: 'd48806' }} />,
        content: '当前单据不能驳回！',
        okText: '确定',
      });
      return rejectParams;
    }

    const returnParams: FETCH.Row = { rows: {}, status: 'SUCCESS' };
    return returnParams;
  };

  /** 触发 DOM */
  const trigger = (
    <Button className="BorderButtonOrange">
      <InfoCircleOutlined /> 驳回
    </Button>
  );

  return (
    <>
      <BaseModal
        width={900}
        title="驳回"
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
              placeholder="驳回意见"
              showCount
            />
          </div>
        </SpaceView>

        {statusMessage !== 'end' && (
          <SpaceView>
            <section style={statusMessage !== 'end' ? { height: 360 } : { height: 0 }}>
              <BaseCard noHeader tabs={{ type: 'card' }}>
                <BaseCard.TabPane tab="下一环节审核人" key="1">
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
                    persistenceKey="REJECTUSERTABLE"
                    columns={useTableColumns()}
                    pagination={false}
                    virtual={false}
                    search={false}
                    rowKey={false}
                  />
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
