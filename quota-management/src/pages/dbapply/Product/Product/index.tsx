/*
 * @Author: SHUANG
 * @Date: 2024-01-31 10:38:14
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-22 16:43:32
 * @Description: 工程造价产品-产品信息
 */
import { Button } from 'antd';
import { DiffOutlined } from '@ant-design/icons';
import BaseTable from 'jd-framework-web/package/components/BaseTable';
import { BaseTableProps, TableToolbarDefine } from 'jd-framework-web/package/components';

import { projectProductDeleteByIds, projectProductQueryPageInfo, projectProductSave } from './services';
import { useMount } from 'jd-framework-web/package/utils/util/uses';
import ConstructionCost from '../../ConstructionCost';
import { valueEnumsRequest } from '../valueEnums';
import useTableColumns from './useTableColumns';
import useFormColumns from './useFormColumns';
import { ProductProps } from '../typings';
import ProductCopy from './ProductCopy';
import * as TYPES from './typings';
import { useRequest } from 'umi';
import { queryDictItemByClassCode } from 'jd-framework-web/package/common/services/system';

export default (props: ProductProps & TYPES.PropsProduct) => {
  /** 当前工程 */
  const { tableProps } = props;
  const { projectCurrent } = props;
  const { productTableRef } = props;
  const projectId = projectCurrent?.id || '';

  /** 弹窗属性 */
  const modalProps = { width: 600, style: { top: 30 } };

  /** 当前操作产品 */
  const { productActionCurrent, setProductActionCurrent } = props;

  const { data: optionsData } = useRequest(queryDictItemByClassCode, { defaultParams: ['dbapply_type'] });

  /** TOOLBAR 产品复制操作 */
  const ProductCopyTrigger = (
    <ProductCopy
      dbapplyType={optionsData?.['dbapply_type']}
      productActionCurrent={productActionCurrent}
      productTableRef={productTableRef}
    />
  );

  /** TOOLBAR 工程造价编制 */
  const ProductCostTrigger = (
    <Button className="EditMoreButton" icon={<DiffOutlined />}>
      工程造价编制
    </Button>
  );

  /** TOOLBAR */
  const toolbar: TableToolbarDefine<TYPES.ProductItem> = {
    plus: {
      columns: useFormColumns({ type: 'plus', dbapplyType: optionsData?.['dbapply_type'] }),
      onSubmit: projectProductSave,
      modalProps,
    },
    plusMore: { triggerType: 'submit', trigger: ProductCopyTrigger },
    edit: {
      columns: useFormColumns({ type: 'edit', dbapplyType: optionsData?.['dbapply_type'] }),
      onSubmit: projectProductSave,
      modalProps,
    },
    editOther: {
      render: <ConstructionCost productActionCurrent={productActionCurrent} />,
      modalProps: { keyboardESC: false, width: 1200, style: { top: 45 } },
      trigger: ProductCostTrigger,
      buttonText: '工程造价编制',
    },
    deleted: { onSubmit: projectProductDeleteByIds },
  };

  /** 产品列表 */
  const generateTable: BaseTableProps<TYPES.ProductItem, TYPES.ProductQueryParams> = {
    persistenceKey: 'PAGES_DBAPPLY_PRODUCT_PROJECT_PRODUCT_TABLE',
    service: {
      dataSourceRequest: projectProductQueryPageInfo,
      manualRequest: !projectId,
      params: { projectId },
    },
    onDoubleClick: () => ({ trigger: 'editOther' }),
    onActionCurrent: setProductActionCurrent,
    rowSelection: { columnWidth: 40 },
    actionRef: productTableRef,
    columns: useTableColumns,
    search: false,
    toolbar,
    ...tableProps,
  };

  return <BaseTable {...generateTable} />;
};
