/*
 * @Author: SHUANG
 * @Date: 2023-11-09 14:21:24
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-15 10:13:48
 * @Description: 标准库-次材市场价格库
 */

import { useRef, useState } from 'react';
import BaseCard from 'jd-framework-web/package/components/BaseCard';
import { TableActionType } from 'jd-framework-web/package/components';
import ViewContainer from 'jd-framework-web/package/components/ViewContainer';
import SplitPane, { PaneContainer } from 'jd-framework-web/package/components/SplitPane';

import { DeviceMatDirectoryItem } from '../StdDeviceMat/DeviceMatDirectoryTree/typings';
import { SubsidiaryMatDetailItem } from './SubsidiaryMatDetailTable/typings';
import DeviceMatDirectoryTree from '../StdDeviceMat/DeviceMatDirectoryTree';
import SubsidiaryMatDetailTable from './SubsidiaryMatDetailTable';

export default () => {
  /** 次材明细表REF */
  const subsidiaryMatDetailTableRef = useRef<TableActionType>(null);

  /** 次材 当前目录 */
  const [subsidiaryMatDirectoryCurrent, setSubsidiaryMatDirectoryCurrent] =
    useState<DeviceMatDirectoryItem>();

  /** 次材 当前明细 */
  const [subsidiaryMatDetailAction, setSubsidiaryMatDetailAction] = useState<SubsidiaryMatDetailItem>();
  const [subsidiaryMatDetailCurrent, setSubsidiaryMatDetailCurrent] = useState<SubsidiaryMatDetailItem>();

  return (
    <ViewContainer>
      <SplitPane>
        <PaneContainer width={380}>
          <BaseCard title="人材机类型">
            <DeviceMatDirectoryTree
              setDeviceMatDirectoryCurrent={setSubsidiaryMatDirectoryCurrent}
              deviceMatTypeCode="CC"
            />
          </BaseCard>
        </PaneContainer>
        <PaneContainer flex>
          <BaseCard title="材料明细">
            <SubsidiaryMatDetailTable
              subsidiaryMatDirectoryCurrent={subsidiaryMatDirectoryCurrent}
              setSubsidiaryMatDetailCurrent={setSubsidiaryMatDetailCurrent}
              setSubsidiaryMatDetailAction={setSubsidiaryMatDetailAction}
              subsidiaryMatDetailTableRef={subsidiaryMatDetailTableRef}
              subsidiaryMatDetailCurrent={subsidiaryMatDetailCurrent}
              subsidiaryMatDetailAction={subsidiaryMatDetailAction}
            />
          </BaseCard>
        </PaneContainer>
      </SplitPane>
    </ViewContainer>
  );
};
