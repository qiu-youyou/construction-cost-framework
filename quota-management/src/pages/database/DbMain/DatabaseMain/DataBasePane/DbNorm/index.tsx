/*
 * @Author: SHUANG
 * @Date: 2023-10-18 11:36:43
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-04 11:09:09
 * @Description: 企业定额维护-定额
 */
import { useRef, useState } from 'react';
import SplitPane, { PaneContainer } from 'jd-framework-web/package/components/SplitPane';
import { TableActionType } from 'jd-framework-web/package/components';

import { DbNormItem } from './DbNormTable/typings';
import { DataBaseProps } from '../../typings';
import DbNormTable from './DbNormTable';
import DbNormPane from './DbNormPane';

export default (props: DataBaseProps) => {
  /** 定额明细表 REF */
  const dbNormTableRef = useRef<TableActionType>();

  /** 定额 人材机含量表 REF */
  const dbNormMatContentTableRef = useRef<TableActionType>();

  /** 当前定额 */
  const [dbNormCurrent, setDbNormCurrent] = useState<DbNormItem>();

  /** 当前勾选定额 */
  const [dbNormSelection, setDbNormSelection] = useState<DbNormItem[]>();

  return (
    <SplitPane mode="vertical">
      <PaneContainer height="52%">
        <DbNormTable
          {...props}
          dbNormMatContentTableRef={dbNormMatContentTableRef}
          setDbNormSelection={setDbNormSelection}
          setDbNormCurrent={setDbNormCurrent}
          dbNormSelection={dbNormSelection}
          dbNormTableRef={dbNormTableRef}
          dbNormCurrent={dbNormCurrent}
        />
      </PaneContainer>

      <PaneContainer flex>
        <DbNormPane
          dbNormMatContentTableRef={dbNormMatContentTableRef}
          databaseCurrent={props?.databaseCurrent}
          dbNormTableRef={dbNormTableRef}
          dbNormCurrent={dbNormCurrent}
        />
      </PaneContainer>
    </SplitPane>
  );
};
