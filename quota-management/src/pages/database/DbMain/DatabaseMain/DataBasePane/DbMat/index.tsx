/*
 * @Author: SHUANG
 * @Date: 2023-10-20 11:46:01
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-05 10:52:06
 * @Description: 定额库(人材机 机械台班 混凝土配合比)
 */

import { useRef, useState } from 'react';
import SplitPane, { PaneContainer } from 'jd-framework-web/package/components/SplitPane';
import { TableActionType } from 'jd-framework-web/package/components';

import { DbMatContentItem } from './DbMatContentTable/typings';
import { DbMatItem } from './DbMatMainTable/typings';
import DbMatContentTable from './DbMatContentTable';
import DbMatMainTable from './DbMatMainTable';
import { DataBaseProps } from '../../typings';

export default (props: DataBaseProps) => {
  /** 接收数据 */
  const { classifyRjcType } = props;

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
      <PaneContainer height={classifyRjcType !== 'rcj' ? '52%' : '100%'}>
        <DbMatMainTable
          {...props}
          dbMatMainTableRef={dbMatMainTableRef}
          setDbMatCurrent={setDbMatCurrent}
          dbMatCurrent={dbMatCurrent}
        />
      </PaneContainer>

      {classifyRjcType !== 'rcj' && (
        <PaneContainer flex>
          <DbMatContentTable
            {...props}
            setDbMatContentCurrent={setDbMatContentCurrent}
            dbMatContentTableRef={dbMatContentTableRef}
            dbMatContentCurrent={dbMatContentCurrent}
            dbMatMainTableRef={dbMatMainTableRef}
            dbMatCurrent={dbMatCurrent}
          />
        </PaneContainer>
      )}
    </SplitPane>
  );
};
