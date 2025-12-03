/*
 * @Author: SHUANG
 * @Date: 2022-09-03 16:17:30
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-09-21 15:17:59
 * @Description: 主单据查看审批流程历史记录
 */
import { Image } from 'antd';
import { useState } from 'react';
import { Card, Col, Row, Timeline } from 'antd';

import BaseCard from '../../../components/BaseCard';
import { useMount } from '../../../utils/util/uses';

import { handleProcessQueryParams } from '../ProcessBusiness/defaultProps';
import { ProcessBusinessProps } from '../ProcessBusiness/typings';
import ProcessHistoryTable from '../ProcessHistoryTable';
import { UserListQueryParams } from '../typing';
import { analysisWorkflow } from './services';
import styles from './index.less';

type Props = {
  /** 不同业务模块 提交 url */
  commitUrl: string;
  current: ProcessBusinessProps['current'];
  fieldNames?: ProcessBusinessProps['fieldNames'];
  fromParams?: ProcessBusinessProps['fromParams'];
  /** 如果传入就不会自动处理 */
  queryParams?: UserListQueryParams;
};

export default (props: Props) => {
  const [processHistory, setProcessHistory] = useState<any>();

  const { current, fieldNames } = props;
  const queryParams = props?.queryParams || handleProcessQueryParams(current, fieldNames, props?.fromParams);

  /** 获取流程历史 */
  const getWorkflowHistroy = async () => {
    const fromParams = await queryParams?.fromParams?.();
    const res = await analysisWorkflow(props.commitUrl, {
      ...queryParams,
      fromParams: !!fromParams ? JSON.stringify(fromParams) : '',
    });
    setProcessHistory(res?.rows);
  };

  useMount(getWorkflowHistroy);

  return (
    <BaseCard noHeader tabs={{ animated: true }}>
      <BaseCard.TabPane tab="审批记录" key="1">
        <section className={styles.process_history}>
          {!!processHistory && (
            <Row gutter={16}>
              {Object.keys(processHistory).map((key) => (
                <Col span={12} key={key} style={{ marginBottom: 10 }}>
                  <div className={styles.imageSection}>
                    {processHistory[key]?.map((item: any, key: number) => (
                      <div key={key}>
                        {!!item?.seal && <Image preview={false} src={`data:image/png;base64,${item.seal}`} />}
                      </div>
                    ))}
                  </div>
                  <Card title={key}>
                    <Timeline>
                      {processHistory[key]?.map((item: any) => (
                        <Timeline.Item key={item.id}>
                          {`${item?.name || ''}`}
                          <span style={{ margin: '0 5px' }}>
                            {!!item?.userAutograph ? (
                              <Image
                                style={{ height: 38, transform: 'translateY(-2.5px)' }}
                                src={`data:image/png;base64,${item?.userAutograph}`}
                              />
                            ) : (
                              item?.userName || ''
                            )}
                          </span>
                          {`${
                            item?.endTime || item?.idea
                              ? `(${item?.idea || ''} - ${item?.endTime || ''})`
                              : ''
                          }`}
                        </Timeline.Item>
                      ))}
                    </Timeline>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </section>
      </BaseCard.TabPane>

      <BaseCard.TabPane tab="审批历史" key="2">
        <section style={{ height: 360 }}>
          <ProcessHistoryTable button="table" processInstanceId={queryParams?.processInstanceId} />
        </section>
      </BaseCard.TabPane>
    </BaseCard>
  );
};
