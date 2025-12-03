/*
 * @Author: SHUANG
 * @Date: 2024-02-04 16:47:31
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-26 14:36:00
 * @Description: 项目文档库
 */
import { useState } from 'react';
import BaseCard from 'jd-framework-web/package/components/BaseCard';
import AnnexTable from 'jd-framework-web/package/common/annex/AnnexTable';
import SplitPane, { PaneContainer } from 'jd-framework-web/package/components/SplitPane';
import { attachmentQueryPageInfo } from 'jd-framework-web/package/common/annex/AnnexTable/services';

import { ProjectDocDirectoryItem } from './ProjectDocDirectory/typings';
import { ProjectItem } from '../../Product/Project/typings';
import ProjectDocDirectory from './ProjectDocDirectory';

type Props = { projectActionCurrent?: ProjectItem };

export default (props: Props) => {
  /** 当前工程 */
  const { projectActionCurrent } = props;

  /** 当前目录、设置当前目录 */
  const [projectDocDirectoryCurrent, setProDocDirectoryCurrent] = useState<ProjectDocDirectoryItem>();

  return (
    <SplitPane>
      <PaneContainer width={500}>
        <BaseCard title="文档目录">
          <ProjectDocDirectory setProDocDirectoryCurrent={setProDocDirectoryCurrent} {...props} />
        </BaseCard>
      </PaneContainer>

      <PaneContainer flex>
        <BaseCard title="文档附件">
          <AnnexTable
            uploadParams={{ businessId: projectDocDirectoryCurrent?.id, otherId: projectActionCurrent?.id }}
            annexTableProps={{
              service: {
                params: { businessId: projectDocDirectoryCurrent?.id, otherId: projectActionCurrent?.id },
                manualRequest: !projectDocDirectoryCurrent?.id,
                dataSourceRequest: attachmentQueryPageInfo,
              },
            }}
            maxHeight="100%"
          />
        </BaseCard>
      </PaneContainer>
    </SplitPane>
  );
};
