/*
 * @Author: SHUANG
 * @Date: 2023-11-13 18:42:41
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-03 09:53:45
 * @Description: 清单项目特征与定额参数特征映射库
 */
import { Button, Tag } from 'antd';
import { useState } from 'react';
import { SwapOutlined } from '@ant-design/icons';
import { BaseTableProps } from 'jd-framework-web/package/components';
import BaseModal from 'jd-framework-web/package/components/BaseModal';
import BaseTable from 'jd-framework-web/package/components/BaseTable';

import { propertiesParamQueryNormParams } from '../../services';
import { PropertiesParamsNormParamsItem } from '../../typings';
import useTableColumns from './useTableColumns';
import { fetchOnSubmit } from './fetch';

type Props = { onSubmit: (current?: PropertiesParamsNormParamsItem) => Promise<FETCH.Res> };

export default (props: Props) => {
  /** 当前选中 */
  const [current, setCurrent] = useState<PropertiesParamsNormParamsItem>();

  /** 弹窗触发保存 */
  const handleOnSubmit: any = async () => fetchOnSubmit(current, props?.onSubmit);

  /** 查询 清单特征库 表 */
  const generateTable: BaseTableProps<PropertiesParamsNormParamsItem> = {
    persistenceKey: 'PAGESTANDARDPROPERTIESPARAMSSYNCDETAILTABLE',
    service: { dataSourceRequest: propertiesParamQueryNormParams },
    toolbarBefore: <Tag color="blue">可以双击行快速替换当前定额参数</Tag>,
    onDoubleClick: handleOnSubmit,
    columns: useTableColumns,
    onCurrent: setCurrent,
    rowKey: 'paramsCode',
    rowSelection: false,
  };

  /** 触发按钮 */
  const modalTrigger = (
    <Button type="primary">
      <SwapOutlined /> 查询定额参数
    </Button>
  );

  return (
    <BaseModal
      width={600}
      title="查询定额参数"
      trigger={modalTrigger}
      onSubmit={handleOnSubmit}
      style={{ top: 200, left: '15vw' }}
      okText="替换"
      mask={false}
    >
      <section style={{ height: 380 }}>
        <BaseTable {...generateTable} />
      </section>
    </BaseModal>
  );
};
