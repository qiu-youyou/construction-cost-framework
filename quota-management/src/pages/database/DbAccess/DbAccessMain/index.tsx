/*
 * @Author: SHUANG
 * @Date: 2023-10-26 11:34:26
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-02-19 15:33:39
 * @Description: 定额库权限设置
 */
import { useState } from 'react';
import BaseCard from 'jd-framework-web/package/components/BaseCard';
import SplitPane, { PaneContainer } from 'jd-framework-web/package/components/SplitPane';

import { DbAccessDirectorItem, DbAccessProps } from './typings';
import DbAccessDirector from './DbAccessDirector';
import DbAccessUser from './DbAccessUser';

export default (props: DbAccessProps) => {
  /** 数据接收 */
  const { dbAccessCurrent } = props;
  /** 当前权限目录 */
  const [dbAccessDirCurrent, setDbAccessDirCurrent] = useState<DbAccessDirectorItem>();

  return (
    <section style={{ height: 460 }}>
      <SplitPane>
        <PaneContainer width={260}>
          <BaseCard title={<>{dbAccessCurrent?.dbName}</>}>
            <DbAccessDirector {...props} setDbAccessDirCurrent={setDbAccessDirCurrent} />
          </BaseCard>
        </PaneContainer>
        <PaneContainer flex>
          <DbAccessUser {...props} dbAccessDirCurrent={dbAccessDirCurrent} />
        </PaneContainer>
      </SplitPane>
    </section>
  );
};
