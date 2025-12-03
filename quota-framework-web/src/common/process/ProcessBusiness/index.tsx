/*
 * @Author: SHUANG
 * @Date: 2023-08-18 12:01:13
 * @LastEditors: 2470381299@qq.com
 * @LastEditTime: 2023-11-06 09:04:09
 * @Description: 流程主单据组件
 */
import { TabsProps } from 'antd';
import BaseCard from '../../../components/BaseCard';
import SpaceView from '../../../components/ViewContainer/SpaceView';

import { handleProcessCommitParams, handleProcessQueryParams } from './defaultProps';
import { ProcessBusinessProps } from './typings';
import ProcessHistory from '../ProcessHistory';
import ProcessButton from '../ProcessButton';
import ProcessAnswer from '../ProcessAnswer';
import React, { ReactNode } from 'react';

type Props = ProcessBusinessProps & { tabs?: TabsProps };

const ProcessBusiness = (props: Props) => {
  /** 当前表单模式 如果是新增不查询流程权限 */
  const { mode, formType, current, commitUrl, fieldNames, appendTitleRender } = props;
  const { onSave, validateFieldsForms, fromParams, onReset, refresh } = props;

  /** 如果传入了 就是用传入的 默认根据current生成 */
  const queryParams = props?.queryParams || handleProcessQueryParams(current, fieldNames, props?.fromParams);
  const commitParams = props?.commmitParams || handleProcessCommitParams(current, fieldNames);

  /** 流程历史 */
  const processHistory = (
    <ProcessHistory
      current={current}
      fromParams={fromParams}
      fieldNames={fieldNames}
      queryParams={queryParams}
      commitUrl={commitUrl}
    />
  );

  /** 当前流程权限发生改变 */
  const handlesetProcessAuth = (saveAuth: boolean) => {
    /** 如果外部有函数接收 */
    props?.setProcessAuth?.(saveAuth);
  };

  /** 流程按钮 */
  const processButton = (
    <ProcessButton
      commitUrl={commitUrl}
      fieldNames={fieldNames}
      validateFieldsForms={validateFieldsForms}
      setProcessAuth={handlesetProcessAuth}
      commmitParams={commitParams}
      queryParams={queryParams}
      fromParams={fromParams}
      current={current}
      onReset={onReset}
      refresh={refresh}
      onSave={onSave}
      mode={mode}
      appendTitleRender={appendTitleRender}
    />
  );

  /** 答复流程 */
  const { workFlowKey, projectCode } = queryParams;
  const { businessId, businessName } = commitParams;

  const processAnswer = (
    <ProcessAnswer
      businessType={workFlowKey}
      businessName={businessName}
      businessCode={projectCode}
      businessId={businessId}
    />
  );

  const { children } = props;
  const hasTabsChildren = !!props.tabs && props.tabs?.type === 'card';

  const tabsNewChildren: ReactNode[] = [];
  hasTabsChildren &&
    React.Children.forEach(children, (item, index) => {
      const { props } = item;
      if (index == 0) {
        const childProps = {
          ...props,
          children: (
            <>
              {props?.children}

              {!!current && (
                <SpaceView>
                  <BaseCard bordered type="H2" title="审批历史">
                    {processHistory}
                  </BaseCard>
                </SpaceView>
              )}

              {!!current && processAnswer}
            </>
          ),
        };
        tabsNewChildren.push(React.cloneElement(item, childProps));
      } else {
        tabsNewChildren.push(item);
      }
    });

  return (
    <section style={{ height: 480 }}>
      <BaseCard
        headerBordered={false}
        extraFullScreen={false}
        title={!!formType && processButton}
        tabs={props.tabs}
      >
        {hasTabsChildren ? (
          tabsNewChildren
        ) : (
          <>
            {children}

            {!!current && (
              <SpaceView>
                <BaseCard bordered type="H2" title="审批历史">
                  {processHistory}
                </BaseCard>
              </SpaceView>
            )}

            {!!current && processAnswer}
          </>
        )}
      </BaseCard>
    </section>
  );
};

export default ProcessBusiness;
