import { Button } from 'antd';
import { DataNode } from 'antd/lib/tree';
import { ArrowsAltOutlined, ShrinkOutlined } from '@ant-design/icons';
import { Key, useEffect, useState } from 'react';

const useExpand = (rowKey: string, defaultExpandAll: boolean, dataSource: DataNode[]) => {
  /** 当前展开节点 */
  const [expandedKeys, setExpandedKeys] = useState<Key[]>([]);

  /** 递归克隆节点Key */
  const deepTraversa = (node: any, nodelist?: Key[]) => {
    const keysList = nodelist || [];
    if (node !== null) {
      keysList.push(node?.[rowKey || 'frontId']);
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

  /** 数据发生改变时 是否为展开全部 */
  useEffect(() => {
    if (!dataSource?.length) return;
    if (defaultExpandAll) expandAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataSource]);

  return {
    expandedKeys,
    setExpandedKeys,
    triggerButton,
  };
};

export default useExpand;
