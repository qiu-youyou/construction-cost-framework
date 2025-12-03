/*
 * @Author: SHUANG
 * @Date: 2024-03-27 15:58:37
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-01 18:23:03
 * @Description: 工程造价-工程量清单编制-分部分项清单表 查询历史项目设备价格
 */
import { useState } from 'react';
import { Button, Space, Tag } from 'antd';
import { FileSearchOutlined } from '@ant-design/icons';
import BaseModal from 'jd-framework-web/package/components/BaseModal';
import BaseTable from 'jd-framework-web/package/components/BaseTable';
import { BaseTableProps } from 'jd-framework-web/package/components';
import { inventoryQueryHistoryProjectDevPrice } from './services';
import { HistoryDevPriceQuery } from './typings';
import useTableColumns from './useTableColumns';

export default () => {
  /** 价格信息 */
  type PriceInfo = { priceAverage: number; priceMax: number; priceMiddleValue: number; priceMin: number };
  const [priceInfo, setPriceInfo] = useState<PriceInfo>();

  /** 查询方法 */
  const fetchInventoryQueryHistoryProjectDevPrice: any = async (data: FETCH.Req<HistoryDevPriceQuery>) => {
    const res = await inventoryQueryHistoryProjectDevPrice(data);
    const { priceAverage, priceMax, priceMin, priceMiddleValue } = res?.rows;
    setPriceInfo({ priceAverage, priceMax, priceMin, priceMiddleValue });
    return { status: 'SUCCESS', rows: res?.rows?.pageInfo?.list, total: res?.rows?.pageInfo?.total };
  };

  const PriceInfoRender = (
    <Space>
      <Tag color="blue">最高价: {priceInfo?.priceMax} (元)</Tag>
      <Tag color="green">最低价: {priceInfo?.priceMin} (元)</Tag>
      <Tag color="cyan">平均价: {priceInfo?.priceAverage} (元)</Tag>
      <Button type="link">中位数: {priceInfo?.priceMiddleValue}</Button>
    </Space>
  );

  /** 历史设备价格表 */
  const generateTable: BaseTableProps = {
    persistenceKey: 'PAGES_CONSTRUCTIONCOST_COSTPREPARATION_INVENTORY_QUERYHISTROYDEVPRICE_TABLE',
    service: { dataSourceRequest: fetchInventoryQueryHistoryProjectDevPrice },
    search: { defaultCollapsed: false, span: 8 },
    toolbarBefore: PriceInfoRender,
    columns: useTableColumns,
    rowSelection: false,
    rowKey: false,
  };

  /** 触发按钮 */
  const triggerButton = (
    <Button className="BorderButtonGeekBlue" icon={<FileSearchOutlined />}>
      查询历史项目设备价格
    </Button>
  );

  return (
    <>
      <BaseModal
        width={1400}
        trigger={triggerButton}
        title="查询历史项目设备价格"
        style={{ top: 100 }}
        footer={null}
        noFooter
      >
        <section style={{ height: 560 }}>
          <BaseTable {...generateTable} />
        </section>
      </BaseModal>
    </>
  );
};
