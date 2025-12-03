/*
 * @Author: SHUANG
 * @Date: 2023-11-07 14:04:07
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-01-11 14:34:15
 * @Description: 清单关联定额映射库 - 清单 - 项目特征
 */

import { Button } from 'antd';
import { FileTextOutlined } from '@ant-design/icons';
import { BaseTableProps } from 'jd-framework-web/package/components';
import ModalButton from 'jd-framework-web/package/components/ActionButton/ModalButton';
import BaseTable from 'jd-framework-web/package/components/BaseTable';

import { relationDetailPropertiesQueryPageInfo } from '../../services';
import useTableColumns from './useTableColumns';
import {
  RelationDetailPropertiesQueryParams,
  RelationDetailPropertiesItem,
  RelationDetailItem,
} from '../../typings';

/** 当前选中清单 */
type Props = { relationDetailActionCurrent?: RelationDetailItem };

export default (props: Props) => {
  /** 当前选中清单 */
  const { relationDetailActionCurrent } = props;
  /** 清单 ID */
  const detailId = relationDetailActionCurrent?.id || '';
  /** 目录 ID */
  const listNormDirectoryId = relationDetailActionCurrent?.listNormDirectoryId || '';

  /** 清单项目特征表 */
  const generateTable: BaseTableProps<RelationDetailPropertiesItem, RelationDetailPropertiesQueryParams> = {
    persistenceKey: 'PAGESTANDARDRELATIONNORMDETAILPROPERTIESTABLE',
    service: {
      dataSourceRequest: relationDetailPropertiesQueryPageInfo,
      params: { listNormDirectoryId, detailId },
      manualRequest: !detailId,
    },
    columns: useTableColumns,
    rowSelection: false,
    search: false,
  };

  /** 弹窗属性 */
  const modalProps = { defaultFullScreen: false, width: 900 };

  /** 触发按钮 */
  const triggerButton = (
    <Button className="BorderButtonGeekBlue" icon={<FileTextOutlined />}>
      项目特征
    </Button>
  );

  const tableRender = (
    <section style={{ height: 400 }}>
      <BaseTable {...generateTable} />
    </section>
  );

  return (
    <ModalButton
      determineActionCurrent={!detailId}
      trigger={triggerButton}
      modalProps={modalProps}
      modalTitle="项目特征"
      render={tableRender}
    />
  );
};
