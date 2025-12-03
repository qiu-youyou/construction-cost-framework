/*
 * @Author: SHUANG
 * @Date: 2024-01-17 14:18:42
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-29 13:43:09
 * @Description: 工程造价-项目汇总 查看费用表达式
 */
import { Button } from 'antd';
import { FileTextOutlined } from '@ant-design/icons';
import { BaseTableProps } from 'jd-framework-web/package/components';
import BaseTable from 'jd-framework-web/package/components/BaseTable';
import ModalButton from 'jd-framework-web/package/components/ActionButton/ModalButton';

import useTableColumns from './useTableColumns';
import { ProductExpItem, productExpQueryPageInfo } from './services';

type Props = { productActionCurrent?: any };

export default (props: Props) => {
  const { productActionCurrent } = props;

  /** 工程ID 阶段ID  */
  const stageId = productActionCurrent?.id || '';
  const projectId = productActionCurrent?.projectId || '';

  /** 查看取费表达式表 */
  const generateTable: BaseTableProps<ProductExpItem, any> = {
    persistenceKey: 'PAGES_CONSTRUCTIONCOST_PROJECTSUMMARY_FEEEXPTABLE',
    service: { dataSourceRequest: productExpQueryPageInfo, params: { projectId, stageId } },
    columns: useTableColumns,
    rowSelection: false,
    virtual: false,
    search: false,
  };

  /** MODAL RENDER */
  const ModalRender = (
    <section style={{ height: 440 }}>
      <BaseTable {...generateTable} />
    </section>
  );

  /** 触发按钮 */
  const triggerBtn = (
    <Button className="BorderButtonCyan">
      <FileTextOutlined /> 查看费用表达式
    </Button>
  );

  /** 弹窗属性 */
  const modalProps = {
    defaultFullScreen: false,
    width: 600,
  };

  return (
    <ModalButton
      modalTitle="查看费用表达式"
      determineActionCurrent={!stageId}
      modalProps={modalProps}
      render={ModalRender}
      trigger={triggerBtn}
    />
  );
};
