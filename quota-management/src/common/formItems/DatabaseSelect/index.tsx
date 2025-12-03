/*
 * @Author: SHUANG
 * @Date: 2024-02-29 14:18:17
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-02-29 17:54:31
 * @Description: 选择定额库
 */
import { useRequest } from 'umi';
import { Col, Row } from 'antd';
import { useEffect, useState } from 'react';

import { databaseDbQueryPageInfo } from '@/pages/database/DbMain/DatabaseMain/services';
import { DatabaseDbItem } from '@/pages/database/DbMain/DatabaseMain/typings';
import DataBaseSearch from '@/pages/database/common/DataBaseSearch';
import DbSelector from '@/pages/database/common/DbSelector';

type Props = {
  // formItem 默认当前值
  value?: string;
  // formItem 默认事件
  onChange?: (value?: string, databaseItem?: DatabaseDbItem) => void;
};

export default (props: Props) => {
  const { value, onChange } = props;
  /** 获取定额库数据 */
  const { loading, data: dbDataSource } = useRequest(
    async () => await databaseDbQueryPageInfo({ pageSize: 1000 }),
  );

  /** 当前定额库 */
  const [databaseCurrent, setDatabaseCurrent] = useState<DatabaseDbItem>();

  const handleSetDatabaseCurrent: any = (databaseCurrent: DatabaseDbItem) => {
    setDatabaseCurrent(databaseCurrent);
    if (onChange) {
      onChange(databaseCurrent?.id, databaseCurrent);
    }
  };

  /** 定额库选择器 */
  const DbselectorProps = { setDatabaseCurrent: handleSetDatabaseCurrent, databaseCurrent, dbDataSource };

  useEffect(() => {
    if (!!value) {
      const find = dbDataSource?.find((item) => item.id == value);
      setDatabaseCurrent(find);
    }
  }, [loading]);

  const DbSelectorRender = (
    <Row>
      <Col span={19}>
        <DbSelector
          selectProps={{ bordered: true, style: { marginLeft: 0, width: '100%' } }}
          {...DbselectorProps}
        />
      </Col>
      <Col span={5} style={{ border: '1px solid #d9d9d9', borderRadius: 2 }}>
        <span style={{ display: 'inline-block' }}>
          <DataBaseSearch {...DbselectorProps} buttonProps={{ style: { transform: 'translateY(1px)' } }} />
        </span>
      </Col>
    </Row>
  );

  return DbSelectorRender;
};
