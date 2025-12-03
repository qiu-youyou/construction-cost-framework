/*
 * @Author: SHUANG
 * @Date: 2024-03-04 18:18:12
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-05 16:31:08
 * @Description: 基础企业定额维护 - 人材机、混凝土、机械台班
 */
import { useRef, useState } from 'react';
import { TableActionType } from 'jd-framework-web/package/components';
import SplitPane, { PaneContainer } from 'jd-framework-web/package/components/SplitPane';
import { DbMatItem } from '@/pages/database/DbMain/DatabaseMain/DataBasePane/DbMat/DbMatMainTable/typings';
import { DbMatContentItem } from '@/pages/database/DbMain/DatabaseMain/DataBasePane/DbMat/DbMatContentTable/typings';
import { DataBaseProps } from '@/pages/database/DbMain/DatabaseMain/typings';
import DbBasicMatContentTable from './DbBasicMatContentTable';
import DbBasicMatMainTable from './DbBasicMatMainTable';

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
        <DbBasicMatMainTable
          {...props}
          dbMatMainTableRef={dbMatMainTableRef}
          setDbMatCurrent={setDbMatCurrent}
          dbMatCurrent={dbMatCurrent}
        />
      </PaneContainer>

      {classifyRjcType !== 'rcj' && (
        <PaneContainer flex>
          <DbBasicMatContentTable
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
