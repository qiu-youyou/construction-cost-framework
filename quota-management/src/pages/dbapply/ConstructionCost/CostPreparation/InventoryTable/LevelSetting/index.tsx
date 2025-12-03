/*
 * @Author: SHUANG
 * @Date: 2024-01-16 09:56:08
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-21 15:37:09
 * @Description: 工程造价-工程量清单编制-分部分项清单表 升级 降级
 */
import { useState } from 'react';
import { Button, Space, message } from 'antd';
import { DownSquareOutlined, UpSquareOutlined } from '@ant-design/icons';
import { TableActionType, TreeActionType } from 'jd-framework-web/package/components';

import { inventoryUpgradeAndDowngrade } from '../services';
import { InventoryItem } from '../typings';

type Props = {
  /** 分部分项清单表 REF */
  inventoryTableRef?: TableActionType;
  /** 分部分项目录 REF */
  inventoryDirectoryTreeRef?: TreeActionType;
  /** 分部分项清单 当前选中 */
  inventoryActionCurrent?: InventoryItem;
  /** 分部分项清单 数据源 */
  inventoryDataSource?: InventoryItem[];
};

export default (props: Props) => {
  const [upgradeLoading, setUpgradeLoading] = useState(false);
  const [downgradeLoading, setDowngradeLoading] = useState(false);

  /** 当前清单 */
  const { inventoryDataSource, inventoryActionCurrent } = props;
  const { inventoryTableRef, inventoryDirectoryTreeRef } = props;

  /** 通过ID 递归查找数据 找到就返回 */
  const findNextDataById: any = (id: string, data: InventoryItem[]) => {
    /** 递归查找 data 找到id相同的数据下一项 */
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === id) {
        return data[i + 1];
      }
      if (data[i].children) {
        const res = findNextDataById(id, data[i].children);
        if (res) return res;
      }
    }
  };

  /** 通过ID 递归查找数据 找到就返回 */
  const findDataById: any = (id: string, data: InventoryItem[]) => {
    /** 递归查找 data 找到id相同的数据下一项 */
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === id) {
        return data[i];
      }
      if (data[i]?.children && data[i]?.children?.length > 0) {
        const result = findDataById(id, data[i].children);
        if (result) {
          return result;
        }
      }
    }
  };

  /** 保存方法 */
  const fetchInventoryUpgradeAndDowngrade = async (data: any) => {
    const res = await inventoryUpgradeAndDowngrade(data);
    if (res?.status === 'SUCCESS') {
      inventoryDirectoryTreeRef?.current?.reload?.();
      inventoryTableRef?.current?.reload?.();
    }
    return res;
  };

  /** 升级 */
  const handleUpgrade = async () => {
    if (!inventoryActionCurrent) return;
    const id = inventoryActionCurrent?.id;
    const findId = inventoryActionCurrent?.parentId;
    if (findId == '0') {
      message.destroy();
      message.warning('已经是第一层级了！');
      return;
    }
    const findItem = findDataById(findId, inventoryDataSource);
    const parentId = findItem?.parentId || '';
    const { projectId, stageId } = inventoryActionCurrent;
    setUpgradeLoading(true);
    await fetchInventoryUpgradeAndDowngrade({ projectId, stageId, parentId, id });
    setUpgradeLoading(false);
  };

  /** 降级 */
  const handleDowngrade = async () => {
    if (!inventoryActionCurrent) return;
    const id = inventoryActionCurrent?.id;
    const result = findNextDataById(id, inventoryDataSource);
    if (!result?.id) {
      message.destroy();
      message.warning('已经是最后层级了！');
      return;
    }
    const { projectId, stageId } = inventoryActionCurrent;
    const parentId = result?.id;
    setDowngradeLoading(true);
    await fetchInventoryUpgradeAndDowngrade({ projectId, stageId, parentId, id });
    setDowngradeLoading(false);
  };

  return (
    <Space size={2}>
      <Button className="BorderButtonCyan" onClick={handleUpgrade} loading={upgradeLoading}>
        <UpSquareOutlined /> 升级
      </Button>

      <Button className="BorderButtonCyan" onClick={handleDowngrade} loading={downgradeLoading}>
        <DownSquareOutlined /> 降级
      </Button>
    </Space>
  );
};
