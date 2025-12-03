/*
 * @Author: SHUANG
 * @Date: 2024-03-01 15:36:06
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-04 15:18:26
 * @Description: 基础企业定额维护-定额
 */
import { useRef, useState } from 'react';
import { TableActionType } from 'jd-framework-web/package/components';
import SplitPane, { PaneContainer } from 'jd-framework-web/package/components/SplitPane';

import { DbNormItem } from '@/pages/database/DbMain/DatabaseMain/DataBasePane/DbNorm/DbNormTable/typings';
import { DataBaseProps } from '@/pages/database/DbMain/DatabaseMain/typings';
import DbBasicNormTable from './DbBasicNormTable';
import DbBasicNormPane from './DbBasicNormPane';

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
        <DbBasicNormTable
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
        <DbBasicNormPane
          dbNormMatContentTableRef={dbNormMatContentTableRef}
          databaseCurrent={props?.databaseCurrent}
          dbNormTableRef={dbNormTableRef}
          dbNormCurrent={dbNormCurrent}
        />
      </PaneContainer>
    </SplitPane>
  );
};
