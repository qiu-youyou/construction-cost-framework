/*
 * @Author: SHUANG
 * @Date: 2023-10-17 09:38:10
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-05 09:17:45
 * @Description: 章节对应明细PANE
 */
import { TabsProps } from 'antd';
import BaseCard from 'jd-framework-web/package/components/BaseCard';

import { ClassifyRjcType, DataBaseProps } from '../typings';
import DbChapterDesc from './DbChapterDesc';
import DatabaseDesc from './DatabaseDesc';
import DbNorm from './DbNorm';
import DbMat from './DbMat';

import styles from './index.less';

export default (props: DataBaseProps) => {
  /** 数据接收 */
  const { setClassifyRjcType } = props;

  const classifyRjcTypePane = props?.classifyRjcTypePane || [
    'databaseDesc',
    'dbChapterDesc',
    'dbNorm',
    'machine',
    'concrete',
    'rcj',
  ];

  /** pane items */
  let DbChapterPaneItems: TabsProps['items'] = [];

  const DbChapterPaneItemsMap: any = {
    databaseDesc: { key: 'databaseDesc', label: '册编制说明', children: <DatabaseDesc {...props} /> },

    dbChapterDesc: { key: 'dbChapterDesc', label: '章节说明', children: <DbChapterDesc {...props} /> },

    dbNorm: { key: 'dbNorm', label: '定额', children: <DbNorm {...props} /> },

    machine: { key: 'machine', label: '机械台班', children: <DbMat {...props} /> },

    concrete: { key: 'concrete', label: '混凝土配合比', children: <DbMat {...props} /> },

    rcj: { key: 'rcj', label: '人材机', children: <DbMat {...props} /> },
  };

  /** 根据传入 pane 配置 */
  classifyRjcTypePane?.forEach((item) => {
    DbChapterPaneItems?.push(DbChapterPaneItemsMap[item]);
  });

  /** 设置当前类型 */
  const dbPaneOnChange = (activeKey?: string) => {
    setClassifyRjcType?.(activeKey as ClassifyRjcType);
  };

  return (
    <section className={styles.dbChapterPane}>
      <BaseCard
        noHeader
        tabs={{
          destroyInactiveTabPane: true,
          items: DbChapterPaneItems,
          defaultActiveKey: 'dbNorm',
          onChange: dbPaneOnChange,
        }}
      />
    </section>
  );
};
