/*
 * @Author: SHUANG
 * @Date: 2024-04-17 16:53:41
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-18 15:17:57
 * @Description: 人材机临时库 接受
 */
import { useState } from 'react';
import { Button, Modal, Tag } from 'antd';
import { CheckSquareOutlined } from '@ant-design/icons';
import { BaseTableProps } from 'jd-framework-web/package/components';
import BaseModal from 'jd-framework-web/package/components/BaseModal';
import { UnitPriceDetailItem } from '@/pages/standard/StdUnitPrice/UnitPriceDetailTable/typings';
import { UnitPriceDirectoryItem } from '@/pages/standard/StdUnitPrice/UnitPriceDirectoryTree/typings';
import StdUnitPrice from '@/pages/standard/StdUnitPrice';

import { tempUnitPriceUpdateAcceptEnterDatabase } from '../services';
import { TempUnitPriceProps } from '../typings';

export default (props: TempUnitPriceProps) => {
  const { tempUnitPriceTableRef } = props;
  const { tempUnitPriceSelection } = props;

  const [modal, contextHolder] = Modal.useModal();

  /** Loading */
  const [loading, setLoading] = useState<boolean>(false);

  /** 综合单价目录 当前选中  */
  const [unitPriceDirectoryCurrent, setUnitPriceDirectoryCurrent] = useState<UnitPriceDirectoryItem>();

  /** 综合单价 清单明细 当前选中 */
  const [unitPriceDetailCurrent, setUnitPriceDetailCurrent] = useState<UnitPriceDetailItem>();

  /** 接受 */
  const handleOnSave = async () => {
    if (!unitPriceDetailCurrent) {
      modal.warning({ title: '继续操作', content: '请选择插入综合单价的行位置!' });
      return;
    }

    if (unitPriceDetailCurrent?.parentId == '0') {
      modal.warning({ title: '继续操作', content: '请选择插入综合单价的行位置!' });
      return;
    }

    const unitPriceDbId: string = unitPriceDetailCurrent?.unitPriceDbId || ''; // 标准综合单价库目录ID
    const unitPriceId: string = unitPriceDetailCurrent?.id || ''; // 标准综合单价行ID
    let projectIds: string[] = []; //  项目ID集合
    let stageIds: string[] = []; // 阶段ID集合
    let ids: string[] = []; // ID集合

    tempUnitPriceSelection?.forEach((item) => {
      projectIds.push(item.projectId);
      stageIds.push(item.stageId);
      ids.push(item.id);
    });

    const params = { projectIds, stageIds, ids, unitPriceDbId, unitPriceId };
    setLoading(true);

    const res = await tempUnitPriceUpdateAcceptEnterDatabase({ ...params });
    setLoading(false);
    // dbNormTableRef?.current?.reload?.();
    // dbNormTableRef?.current?.tableScrollTo?.(10000);
    if (res?.status === 'SUCCESS') {
      tempUnitPriceTableRef?.current?.reload?.();
      tempUnitPriceTableRef?.current?.setTableSelection([]);
    }
    return { ...res } as any;
  };

  /** 触发按钮 */
  const triggerBtn = (
    <Button className="BorderButtonLime" loading={loading}>
      <CheckSquareOutlined /> 接受
    </Button>
  );

  /** 触发控制 */
  const triggerControl = () => {
    if (!tempUnitPriceSelection?.length) {
      modal.warning({ title: '继续操作', content: '请勾选数据进行操作!' });
      return { status: 'ERROR' };
    }
    return { status: 'SUCCESS' };
  };

  /** 定额表 */
  const propsUnitPriceDetailTableProps: Partial<BaseTableProps> = {
    toolbarLast: <Tag color="blue">请选择插入综合单价的行位置!</Tag>,
    rowSelection: false,
  };

  return (
    <>
      <BaseModal
        okText="保存到当前行"
        triggerControl={triggerControl}
        onSubmit={handleOnSave}
        trigger={triggerBtn}
        title="综合单价保存"
        width={1100}
      >
        <section style={{ height: 530 }}>
          <StdUnitPrice
            propsUnitPriceDetail={{ tableProps: propsUnitPriceDetailTableProps }}
            setUnitPriceDirectoryCurrent={setUnitPriceDirectoryCurrent}
            setUnitPriceDetailCurrent={setUnitPriceDetailCurrent}
            viewContaineProps={{ scroll: 'percent' }}
            paneContainerProps={{ width: 360 }}
          />
        </section>
      </BaseModal>
      {contextHolder}
    </>
  );
};
