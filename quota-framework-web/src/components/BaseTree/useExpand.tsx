/*
 * @Author: SHUANG
 * @Date: 2022-11-16 10:37:31
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-10-26 17:25:52
 * @Description:
 */
import { Button, Tooltip } from 'antd';
import { DataNode } from 'antd/lib/tree';
import { Key, useEffect, useState } from 'react';
import { ArrowsAltOutlined, ShrinkOutlined } from '@ant-design/icons';

/** from components */
import { BaseTreeProps } from './typings';

const useExpand = (props: BaseTreeProps, dataSource: DataNode[], refreshDateByParams?: string) => {
  /** 当前展开节点 */
  const [expandedKeys, setExpandedKeys] = useState<Key[]>();

  /** 递归克隆节点Key */
  const deepTraversa = (node: any, nodelist?: Key[]) => {
    const keysList = nodelist || [];
    if (node !== null) {
      keysList.push(node?.[props.fieldNames?.key || 'id']);
      for (let i = 0; i < node?.children?.length; i++) {
        deepTraversa(node?.children[i], keysList);
      }
    }
    return keysList;
  };

  // 展开收起事件
  const toggleExpandAll = () => {
    if (!!expandedKeys?.length) return setExpandedKeys([]);
    const keys: any[] = [];
    dataSource.forEach((item) => keys.push(deepTraversa(item)));
    setExpandedKeys(keys.flat());
  };

  const expandAll = () => {
    const keys: any[] = [];
    dataSource.forEach((item) => keys.push(deepTraversa(item)));
    setExpandedKeys(keys.flat());
  };

  // 触发节点
  const triggerButton = (
    <Button onClick={toggleExpandAll}>
      {!!expandedKeys?.length ? (
        <>
          <ShrinkOutlined /> 折叠全部
        </>
      ) : (
        <>
          <ArrowsAltOutlined /> 展开全部
        </>
      )}
    </Button>
  );

  const triggerIcon = (
    <Button onClick={toggleExpandAll}>
      {!!expandedKeys?.length ? (
        <Tooltip title="折叠全部">
          <ShrinkOutlined />
        </Tooltip>
      ) : (
        <>
          <Tooltip title="展开全部">
            <ArrowsAltOutlined />
          </Tooltip>
        </>
      )}
    </Button>
  );

  /** 数据发生改变时 是否为展开全部 */
  useEffect(() => {
    if (!dataSource?.length) return;
    if (expandedKeys !== undefined) return;
    if (props.defaultExpandAll) expandAll();
  }, [dataSource]);

  useEffect(() => {
    if (!refreshDateByParams) return;
    if (props.defaultExpandAll) expandAll();
  }, [refreshDateByParams]);

  return {
    expandedKeys,
    setExpandedKeys,
    triggerButton,
    triggerIcon,
  };
};

export default useExpand;
