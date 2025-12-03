/*
 * @Author: SHUANG
 * @Date: 2023-11-14 14:24:56
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-28 16:05:31
 * @Description: 人材机明细重构（材料关联关系设置）
 */
import { Button } from 'antd';
import { useRef, useState } from 'react';
import { FilterOutlined } from '@ant-design/icons';
import BaseCard from 'jd-framework-web/package/components/BaseCard';
import useAuthButton from 'jd-framework-web/package/utils/auth/useAuthButton';
import { BaseTableProps, TableActionType } from 'jd-framework-web/package/components';
import ViewContainer, { ViewContainePropsType } from 'jd-framework-web/package/components/ViewContainer';
import SplitPane, { PaneContainer } from 'jd-framework-web/package/components/SplitPane';
import { PaneContainerPropsType } from 'jd-framework-web/package/components/SplitPane';

/** 引用次材库 */
import DeviceMatDirectoryTree from '@/pages/standard/StdDeviceMat/DeviceMatDirectoryTree';
import SubsidiaryMatDetailTable from '@/pages/standard/StdSubsidiaryMat/SubsidiaryMatDetailTable';
import { DeviceMatDirectoryItem } from '@/pages/standard/StdDeviceMat/DeviceMatDirectoryTree/typings';
import { SubsidiaryMatDetailItem } from '@/pages/standard/StdSubsidiaryMat/SubsidiaryMatDetailTable/typings';

import MatRelatedNorm from '../DbMain/DatabaseMain/DataBasePane/DbMat/components/MatRelatedNorm';
import { matMainQueryPageInfoNotExistSubsidiary } from './MatSubsidiaryContentTable/services';
import { MatSubsidiaryContentItem } from './MatSubsidiaryContentTable/typings';
import MatSyncPriceInfo from './MatSubsidiaryContentTable/MatSyncPriceInfo';
import MatSubsidiaryDetailTable from './MatSubsidiaryContentTable';
import DbMatBranchInsert from '../common/DbMatBranchInsert';

type Props = {
  subsidiaryMatTableProps?: Partial<BaseTableProps>;
  subsidiaryMatDetailTableProps?: Partial<BaseTableProps>;
  viewContaineProps?: ViewContainePropsType;
  paneContainerProps?: PaneContainerPropsType;
};

export default (props: Props) => {
  const { auth } = useAuthButton();
  /** 次材明细表 REF */
  const matSubsidirayDetailTableRef = useRef<TableActionType>();

  /** 人材机明细表 REF */
  const matSubsidirayContentTableRef = useRef<TableActionType>();

  /** 次材 当前目录 */
  const [matSubsidirayDirectory, setMatSubsidirayDirectory] = useState<DeviceMatDirectoryItem>();

  /** 次材 当前明细 */
  const [matSubsidirayDetailAction, setMatSubsidirayDetailAction] = useState<SubsidiaryMatDetailItem>();
  const [matSubsidirayDetailCurrent, setMatSubsidirayDetailCurrent] = useState<SubsidiaryMatDetailItem>();

  /** 人材机当前明细 */
  const [matSubsidirayContentCurrent, setMatSubsidirayContentCurrent] = useState<MatSubsidiaryContentItem>();

  /** 次材 当前勾选 */
  const [matSubsidirayDetailSelection, setMatSubsidirayDetailSelection] =
    useState<SubsidiaryMatDetailItem[]>();

  /** DbMatBranchInser Trigger */
  const dbMatBranchInsertTrigger = (
    <Button className="BorderButtonPrimary">
      <FilterOutlined /> 检查无关联的材料
    </Button>
  );

  /** Subsidiary Toolbar Slot */
  const SubsidiaryToolbarSlot = (
    <>
      {/* 同步调整定额基价 */}
      {auth('sync-price') && (
        <MatSyncPriceInfo
          matSubsidirayDetailSelection={matSubsidirayDetailSelection}
          matSubsidirayContentTableRef={matSubsidirayContentTableRef}
        />
      )}

      {/* 检查无关联的材料 */}
      {auth('check-mat') && (
        <DbMatBranchInsert
          matMainDataSourceRequest={matMainQueryPageInfoNotExistSubsidiary}
          primaryCurrent={{ id: 'subsidiaryId' }}
          trigger={dbMatBranchInsertTrigger}
          classifyRjcTypePane={['rcj']}
          modalTitle="检查无关联的材料"
          noFoolter
        />
      )}
    </>
  );

  const SubsidiaryDetailToolbarSlot =
    /* 查看相关定额 */
    auth('with-norm') && <MatRelatedNorm dbMatCurrent={matSubsidirayContentCurrent} />;

  return (
    <ViewContainer {...props?.viewContaineProps}>
      <SplitPane>
        <PaneContainer width={380} {...props?.paneContainerProps}>
          <BaseCard title="材料类型">
            <DeviceMatDirectoryTree
              setDeviceMatDirectoryCurrent={setMatSubsidirayDirectory}
              deviceMatTypeCode="CC"
            />
          </BaseCard>
        </PaneContainer>

        <PaneContainer flex>
          <SplitPane mode="vertical">
            <PaneContainer height="58%">
              <BaseCard title="材料明细">
                <SubsidiaryMatDetailTable
                  subsidiaryMatTableProps={props?.subsidiaryMatTableProps}
                  setSubsidiaryMatDetailSelection={setMatSubsidirayDetailSelection}
                  setSubsidiaryMatDetailCurrent={setMatSubsidirayDetailCurrent}
                  setSubsidiaryMatDetailAction={setMatSubsidirayDetailAction}
                  subsidiaryMatDetailTableRef={matSubsidirayDetailTableRef}
                  subsidiaryMatDetailCurrent={matSubsidirayDetailCurrent}
                  subsidiaryMatDirectoryCurrent={matSubsidirayDirectory}
                  subsidiaryMatDetailAction={matSubsidirayDetailAction}
                  toolbarSlot={SubsidiaryToolbarSlot}
                />
              </BaseCard>
            </PaneContainer>

            <PaneContainer flex>
              <MatSubsidiaryDetailTable
                subsidiaryMatDetailTableProps={props?.subsidiaryMatDetailTableProps}
                matSubsidirayDetailTableRef={matSubsidirayDetailTableRef}
                matSubsidirayContentTableRef={matSubsidirayContentTableRef}
                setMatSubsidirayContentCurrent={setMatSubsidirayContentCurrent}
                matSubsidirayContentCurrent={matSubsidirayContentCurrent}
                matSubsidirayDetailCurrent={matSubsidirayDetailCurrent}
                matSubsidirayDirectory={matSubsidirayDirectory}
                toolbarSlot={SubsidiaryDetailToolbarSlot}
              />
            </PaneContainer>
          </SplitPane>
        </PaneContainer>
      </SplitPane>
    </ViewContainer>
  );
};
