/*
 * @Author: SHUANG
 * @Date: 2023-11-21 16:39:00
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-21 18:34:06
 * @Description: 定额库-定额审查
 */
import { Button } from 'antd';
import { useState } from 'react';
import { FileDoneOutlined } from '@ant-design/icons';
import ModalButton from 'jd-framework-web/package/components/ActionButton/ModalButton';

import DbCheckNormMatLogTable from './DbCheckNormMatLogTable';
import { DatabaseDbItem } from '../DatabaseMain/typings';
import DbCheckNormTable from './DbCheckNormTable';
import DatabaseMain from '../DatabaseMain';

type Props = { databaseCurrent?: DatabaseDbItem };

export default (props: Props) => {
  /** 默认当前数据库 */
  const { databaseCurrent: databaseCurrentDefault } = props;

  /** 当前定额库 、设置当前定额库 */
  const [databaseCurrent, setDatabaseCurrent] = useState<DatabaseDbItem>();

  /** 定额库-定额审查 SLOT */
  const toolbar = (
    <>
      {/* 定额库-定额审查 数据校核 */}
      <DbCheckNormTable databaseCurrent={databaseCurrent} />
      {/* 定额库-定额审查 汇总修改记录 */}
      <DbCheckNormMatLogTable databaseCurrent={databaseCurrent} />
    </>
  );

  /** 应用基础库 定额模块 */
  const DataBaseMainRender = (
    <DatabaseMain
      databaseCurrentDefault={databaseCurrentDefault}
      setDatabaseCurrent={setDatabaseCurrent}
      classifyRjcTypePane={['dbNorm']}
      dbNormTableToolbarSlot={toolbar}
      readonly
    />
  );

  /** 触发按钮 */
  const triggerBtn = (
    <Button className="BorderButtonCyan">
      <FileDoneOutlined /> 定额审查
    </Button>
  );

  return (
    <ModalButton
      modalProps={{ width: 1200 }}
      determineActionCurrent={false}
      render={DataBaseMainRender}
      modalTitle="定额审查"
      trigger={triggerBtn}
    />
  );
};
