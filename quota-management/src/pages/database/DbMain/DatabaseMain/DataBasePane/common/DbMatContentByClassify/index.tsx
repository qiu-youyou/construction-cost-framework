/*
 * @Author: SHUANG
 * @Date: 2023-10-31 15:17:29
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-18 11:41:04
 * @Description: MAT目录对应 MAT明细
 */

import { useRef, useState } from 'react';
import { TableActionType } from 'jd-framework-web/package/components';
import SplitPane, { PaneContainer } from 'jd-framework-web/package/components/SplitPane';

import { DbMatContentByClassifyProps } from './services';
import { DbMatContentItem } from '../../DbMat/DbMatContentTable/typings';
import { DbMatItem } from '../../DbMat/DbMatMainTable/typings';
import DbMatContentTable from '../../DbMat/DbMatContentTable';
import DbMatMainTable from './DbMatMainTable';

export default (props: DbMatContentByClassifyProps) => {
  /** 数据接收 */
  const { classifyRjcType, databaseCurrent } = props;

  /** MAT明细 TableRef*/
  const dbMatMainTableRef = useRef<TableActionType>();

  /** MAT明细对应含量 TableRef */
  const dbMatContentTableRef = useRef<TableActionType>();

  /** 当前MAT明细 */
  const [dbMatCurrent, setDbMatCurrent] = useState<DbMatItem>();

  /** 当前MAT含量 */
  const [dbMatContentCurrent, setDbMatContentCurrent] = useState<DbMatContentItem>();

  return (
    <SplitPane mode="vertical">
      <PaneContainer height={classifyRjcType !== 'rcj' ? '54%' : '100%'}>
        <DbMatMainTable {...props} dbMatMainTableRef={dbMatMainTableRef} setDbMatCurrent={setDbMatCurrent} />
      </PaneContainer>

      {classifyRjcType !== 'rcj' && (
        <PaneContainer flex>
          <DbMatContentTable
            dbMatContentTableProps={props?.dbMatContentTableProps}
            setDbMatContentCurrent={setDbMatContentCurrent}
            dbMatContentTableRef={dbMatContentTableRef}
            dbMatContentCurrent={dbMatContentCurrent}
            dbMatMainTableRef={dbMatMainTableRef}
            classifyRjcType={classifyRjcType}
            databaseCurrent={databaseCurrent}
            dbMatCurrent={dbMatCurrent}
          />
        </PaneContainer>
      )}
    </SplitPane>
  );
};
