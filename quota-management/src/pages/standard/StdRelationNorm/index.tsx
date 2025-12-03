/*
 * @Author: SHUANG
 * @Date: 2023-11-06 09:43:50
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-01 11:52:58
 * @Description: 标准库 - 清单关联定额映射库
 */
import { useEffect, useRef, useState } from 'react';
import BaseCard from 'jd-framework-web/package/components/BaseCard';
import { BaseTableProps, BaseTreeProps, TableActionType } from 'jd-framework-web/package/components';
import ViewContainer, { ViewContainePropsType } from 'jd-framework-web/package/components/ViewContainer';
import SplitPane, { PaneContainer } from 'jd-framework-web/package/components/SplitPane';
import { PaneContainerPropsType } from 'jd-framework-web/package/components/SplitPane';
import { RelationDirectoryItem } from './RelationDirectoryTree/typings';
import { RelationDetailItem } from './RelationDetailTable/typings';
import { RelationNormItem } from './RelationNormTable/typings';
import RelationDirectoryTree from './RelationDirectoryTree';
import RelationDetailTable from './RelationDetailTable';
import RelationNormTable from './RelationNormTable';
import { PropsRelationNorm } from './typings';

type Props = {
  viewContaineProps?: ViewContainePropsType;
  paneContainerProps?: PaneContainerPropsType;
  relationDirectoryTreeProps?: Partial<BaseTreeProps>;
  relationDetailTableProps?: Partial<BaseTableProps>;
  relationNormTableProps?: Partial<BaseTableProps>;
};

export default (props: PropsRelationNorm & Props) => {
  const { readonly } = props;
  const { setRelationNormSelection } = props;
  /** 目录对应清单明细表 REF */
  const relationDetailTableRef = useRef<TableActionType>();

  /** 清单表 对应 定额表明细表 REF */
  const relationNormTableRef = useRef<TableActionType>();

  /** 当前映射库目录 */
  const [relationDirectoryCurrent, setRelationDirectoryCurrent] = useState<RelationDirectoryItem>();

  /** 目录对应清单表 当前操作定额 */
  const [relationNormActionCurrent, setRelationNormActionCurrent] = useState<RelationNormItem>();

  /** 目录对应清单 当前清单 */
  const [relationDetailCurrent, setRelationDetailCurrent] = useState<RelationDetailItem>();

  /** 同步设置传入 当前映射库目录 */
  useEffect(() => {
    props?.setRelationDirectoryCurrent?.(relationDirectoryCurrent);
  }, [relationDirectoryCurrent]);

  return (
    <ViewContainer scroll={readonly ? 'percent' : 'vh'} {...props?.viewContaineProps}>
      <SplitPane>
        <PaneContainer width={readonly ? 200 : 300} {...props?.paneContainerProps}>
          <BaseCard title="目录">
            <RelationDirectoryTree
              relationDirectoryTreeProps={props?.relationDirectoryTreeProps}
              setRelationDirectoryCurrent={setRelationDirectoryCurrent}
              relationDirectoryCurrent={relationDirectoryCurrent}
              readonly={readonly}
            />
          </BaseCard>
        </PaneContainer>

        <PaneContainer flex>
          <SplitPane mode="vertical">
            <PaneContainer height={readonly ? '53%' : '58%'}>
              <BaseCard title="清单关联定额映射库">
                <RelationDetailTable
                  relationDetailTableProps={props?.relationDetailTableProps}
                  relationDirectoryCurrent={relationDirectoryCurrent}
                  setRelationDetailCurrent={setRelationDetailCurrent}
                  relationDetailTableRef={relationDetailTableRef}
                  relationDetailCurrent={relationDetailCurrent}
                  readonly={readonly}
                />
              </BaseCard>
            </PaneContainer>
            <PaneContainer flex>
              <RelationNormTable
                relationNormTableProps={props?.relationNormTableProps}
                setRelationNormActionCurrent={setRelationNormActionCurrent}
                relationNormActionCurrent={relationNormActionCurrent}
                relationDirectoryCurrent={relationDirectoryCurrent}
                setRelationNormSelection={setRelationNormSelection}
                relationDetailTableRef={relationDetailTableRef}
                relationDetailCurrent={relationDetailCurrent}
                relationNormTableRef={relationNormTableRef}
                readonly={readonly}
              />
            </PaneContainer>
          </SplitPane>
        </PaneContainer>
      </SplitPane>
    </ViewContainer>
  );
};
