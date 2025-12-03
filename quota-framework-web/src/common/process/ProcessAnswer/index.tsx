/*
 * @Author: SHUANG
 * @Date: 2023-05-10 17:40:22
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-12-27 10:26:05
 * @Description: 答复流程
 */
import React from 'react';
import { useModel, useRequest } from 'umi';
import { List, message, Modal } from 'antd';
import { CloseOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

import SpaceView from '../../../components/ViewContainer/SpaceView';
import BaseCard from '../../../components/BaseCard';

import { sysAnswerClose, sysAnswerQueryPageInfo } from './services';
import ProcessAnswerDetails from './ProcessAnswerDetails';

// 在展示页面引入css样板文件
import 'braft-editor/dist/output.css';
import styles from './index.less';

/** 触发按钮样式 */
const triggerButtonStyle = {
  fontSize: 12,
  marginLeft: 10,
  fontWeight: 400,
  borderBottom: '1px solid red',
  cursor: 'pointer',
  color: 'red',
};

type Props = {
  businessId: string; // 业务单据 ID
  businessType: string; // 业务单据流程 Key
  businessCode: string; // 业务单据编号
  businessName: string; // 业务单据名称
};

export default (props: Props) => {
  const [modal, contextHolder] = Modal.useModal();

  const { initialState } = useModel('@@initialState');

  /** 获取参数 */
  const getPropsParams = () => {
    const { businessCode, businessId, businessName, businessType } = props;
    return { businessCode, businessId, businessName, businessType };
  };

  /** 答复流程列表查询 */
  const { data: answerList, refresh: reload }: any = useRequest(() => {
    const { businessId, businessType } = props;
    return sysAnswerQueryPageInfo({ businessId, businessType });
  });

  /** 标题渲染 */
  const listHeaderRender = <ProcessAnswerDetails answerType="create" {...getPropsParams()} reload={reload} />;

  /** 关闭当前答复流程 */
  const hanldeSysAnswerClose = (id: string) => {
    modal.confirm({
      title: '关闭答复流程',
      icon: <ExclamationCircleOutlined />,
      content: `关闭该问题后将不能再进行答复，但答复记录依然保留, 是否继续?`,
      async onOk() {
        const res = await sysAnswerClose(id);
        if (res?.status !== 'SUCCESS') return;
        message.success('操作成功');
        reload?.();
      },
    });
  };

  /** 列表项渲染 */
  const ListItemTitle = (item: any) => {
    return (
      <div className={styles.answerTitle}>
        {item.showTitleName}
        {item.billStatus != '2' && (
          <>
            <ProcessAnswerDetails
              answerType="answer"
              answerId={item.id}
              {...getPropsParams()}
              reload={reload}
            />
            {item.answerType === 'create' && item.createManId === initialState?.currentUser?.userid && (
              <span style={triggerButtonStyle} onClick={() => hanldeSysAnswerClose(item.id)}>
                {React.createElement(CloseOutlined)}关闭
              </span>
            )}
          </>
        )}
      </div>
    );
  };

  /** 列表渲染 */
  const handleRenderItem = (item: any) => (
    <List.Item key={item.id}>
      <List.Item.Meta title={ListItemTitle(item)} />

      <div className={styles.answerContent}>
        <div
          dangerouslySetInnerHTML={{ __html: item?.answerContent || '' }}
          className="braft-output-content .bf-container"
          style={{ width: '100', height: '100%' }}
        />
      </div>
    </List.Item>
  );

  return (
    <>
      <SpaceView>
        <BaseCard bordered type="H2" title="答复记录">
          <section className={styles.answerList}>
            <List
              size="small"
              itemLayout="vertical"
              locale={{ emptyText: ' ' }}
              renderItem={handleRenderItem}
              header={listHeaderRender}
              dataSource={answerList}
            />
          </section>
        </BaseCard>
      </SpaceView>
      {contextHolder}
    </>
  );
};
