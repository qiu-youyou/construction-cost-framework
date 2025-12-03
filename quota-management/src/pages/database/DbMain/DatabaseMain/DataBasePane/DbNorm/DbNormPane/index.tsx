/*
 * @Author: SHUANG
 * @Date: 2023-10-18 12:00:51
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-04 15:24:06
 * @Description: 定额表对应PANE
 */
import { TabsProps } from 'antd';
import { useEffect, useState } from 'react';
import BaseCard from 'jd-framework-web/package/components/BaseCard';

import { DbNormExtItem, DbNormExtItemKey } from '../DbNormTable/typings';
import { DbNormProps, PropsDbNormInfo } from '../typings';
import useServices from '../DbNormTable/useServices';
import useFetch from './DbNormDesc/useFetch';

import DbNormMatContent from './DbNormMatContent';
import DbNormParams from './DbNormParams';
import DbNormDesc from './DbNormDesc';

export default (props: DbNormProps & PropsDbNormInfo) => {
  const { dbNormDescUseServices } = props;
  const API = dbNormDescUseServices?.() || useServices();
  const FET = useFetch({ API });

  /** 数据接收 */
  const { dbNormCurrent } = props;

  /** 注，工作内容，适用范围 */
  const [dbNormExt, setDbNormExt] = useState<DbNormExtItem>();

  /** 当前pane激活Key */
  const [normPaneActiveKey, setNormPaneActiveKey] = useState<DbNormExtItemKey>();

  /** 查询 注，工作内容，适用范围 */
  const queryDbNormExt = async () => setDbNormExt(await FET.handleDbNormExt(dbNormCurrent));

  /** 记录当前激活Key */
  const handleDbNormPaneChange = (key: any) => {
    const includesKey: DbNormExtItemKey[] = ['normWorkContent', 'normAnnotate', 'normScope'];
    if (includesKey?.includes(key)) setNormPaneActiveKey(key);
    else setNormPaneActiveKey(undefined);
  };

  /** 注，工作内容，适用范围 */
  const DbNormDescRender = (
    <DbNormDesc
      dbNormDescUseServices={dbNormDescUseServices}
      databaseCurrent={props.databaseCurrent}
      dbNormCurrent={props.dbNormCurrent}
      dbNormExtKey={normPaneActiveKey}
      queryDbNormExt={queryDbNormExt}
      dbNormExt={dbNormExt}
    />
  );

  /** 定额改变重新获取 */
  useEffect(() => {
    queryDbNormExt();
  }, [dbNormCurrent?.id]);

  /** pane items */
  const DbNormPaneItemsSource: TabsProps['items'] = [
    { key: 'normMatContent', label: '人材机含量', children: <DbNormMatContent {...props} /> },

    { key: 'normParams', label: '参数', children: <DbNormParams {...props} /> },

    { key: 'normWorkContent', label: '工作内容', children: DbNormDescRender },

    { key: 'normScope', label: '适用范围', children: DbNormDescRender },

    { key: 'normAnnotate', label: '注', children: DbNormDescRender },
  ];

  const DbNormPaneItems: TabsProps['items'] = !!props?.dbNormPaneItems
    ? [...props?.dbNormPaneItems, ...DbNormPaneItemsSource]
    : DbNormPaneItemsSource;

  return <BaseCard noHeader tabs={{ items: DbNormPaneItems, onChange: handleDbNormPaneChange }} />;
};
