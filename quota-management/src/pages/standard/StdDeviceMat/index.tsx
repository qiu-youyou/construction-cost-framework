/*
 * @Author: SHUANG
 * @Date: 2023-11-09 10:25:55
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-10 11:55:09
 * @Description: 标准库-装置性材料价格库
 */
import { useState } from 'react';
import BaseCard from 'jd-framework-web/package/components/BaseCard';
import ViewContainer from 'jd-framework-web/package/components/ViewContainer';
import SplitPane, { PaneContainer } from 'jd-framework-web/package/components/SplitPane';

import { DeviceMatDirectoryItem } from './DeviceMatDirectoryTree/typings';
import { DeviceMatDetailItem } from './DeviceMatDetailTable/typings';
import DeviceMatDirectoryTree from './DeviceMatDirectoryTree';
import DeviceMatDetailTable from './DeviceMatDetailTable';

export default () => {
  /** 装置性材料 当前目录 */
  const [deviceMatDirectoryCurrent, setDeviceMatDirectoryCurrent] = useState<DeviceMatDirectoryItem>();

  /** 装置性材料 当前明细 */
  const [deviceMatDetailCurrent, setDeviceMatDetailCurrent] = useState<DeviceMatDetailItem>();

  return (
    <ViewContainer>
      <SplitPane>
        <PaneContainer width={380}>
          <BaseCard title="新能源工程装置性材料">
            <DeviceMatDirectoryTree
              setDeviceMatDirectoryCurrent={setDeviceMatDirectoryCurrent}
              deviceMatTypeCode="ZC"
            />
          </BaseCard>
        </PaneContainer>
        <PaneContainer flex>
          <BaseCard title="材料明细">
            <DeviceMatDetailTable
              deviceMatDirectoryCurrent={deviceMatDirectoryCurrent}
              setDeviceMatDetailCurrent={setDeviceMatDetailCurrent}
              deviceMatDetailCurrent={deviceMatDetailCurrent}
            />
          </BaseCard>
        </PaneContainer>
      </SplitPane>
    </ViewContainer>
  );
};
