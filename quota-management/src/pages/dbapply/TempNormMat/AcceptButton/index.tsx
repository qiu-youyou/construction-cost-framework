/*
 * @Author: SHUANG
 * @Date: 2024-04-17 16:53:41
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-18 14:52:34
 * @Description: 人材机临时库 接受
 */
import { useState } from 'react';
import { Button, Modal, Tag } from 'antd';
import { CheckSquareOutlined } from '@ant-design/icons';
import { BaseTableProps } from 'jd-framework-web/package/components';
import { matMainQueryPageInfoNotExistsMat } from '@/pages/database/DbMain/DatabaseMain/DataBasePane/DbMat/DbMatContentTable/useServices';
import { DbMatClassifyItem } from '@/pages/database/DbMain/DatabaseMain/DataBasePane/DbMat/DbMatClassifyTree/typings';
import DbMatBranchInsert from '@/pages/database/common/DbMatBranchInsert';

import { tempNormMatUpdateAcceptEnterDatabase } from '../services';
import { TempNormMatProps } from '../typings';

export default (props: TempNormMatProps) => {
  const { tempNormMatTableRef } = props;
  const { tempNormMatSelection } = props;

  const [modal, contextHolder] = Modal.useModal();

  /** Loading */
  const [loading, setLoading] = useState<boolean>(false);

  const [matCatalogCurrent, setMatCatalogCurrent] = useState<DbMatClassifyItem>();

  /** 接受 */
  const handleOnSave = async () => {
    if (!matCatalogCurrent) {
      modal.warning({ title: '继续操作', content: '请选择章节!' });
      return;
    }
    const classifyId = matCatalogCurrent.id; // 当前选中人材机目录的ID
    const dbId = matCatalogCurrent.dbId; // 当前选中定额库的ID
    let unitPriceNormIds: string[] = []; // 定额ID集合
    let unitPriceIds: string[] = []; // 综合单价ID集合
    let projectIds: string[] = []; //  项目ID集合
    let stageIds: string[] = []; // 阶段ID集合
    let ids: string[] = []; // 定额ID集合

    tempNormMatSelection?.forEach((item) => {
      unitPriceNormIds.push(item.normId);
      unitPriceIds.push(item.unitPriceId);
      projectIds.push(item.projectId);
      stageIds.push(item.stageId);
      ids.push(item.id);
    });

    const params = { unitPriceNormIds, unitPriceIds, projectIds, stageIds, ids, classifyId, dbId };
    setLoading(true);

    const res = await tempNormMatUpdateAcceptEnterDatabase({ ...params });
    setLoading(false);
    // dbNormTableRef?.current?.reload?.();
    // dbNormTableRef?.current?.tableScrollTo?.(10000);
    if (res?.status === 'SUCCESS') {
      tempNormMatTableRef?.current?.reload?.();
      tempNormMatTableRef?.current?.setTableSelection([]);
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
    if (!tempNormMatSelection?.length) {
      modal.warning({ title: '继续操作', content: '请勾选数据进行操作!' });
      return { status: 'ERROR' };
    }
    return { status: 'SUCCESS' };
  };

  /** 定额表 */
  const dbMatMainTableProps: Partial<BaseTableProps> = {
    toolbarLast: <Tag color="blue">请选择目录章节, 进行保存!</Tag>,
    rowSelection: false,
  };

  return (
    <>
      <DbMatBranchInsert
        matMainDataSourceRequest={matMainQueryPageInfoNotExistsMat}
        databaseCurrentDefault={{ id: tempNormMatSelection?.[0]?.dbId } as any}
        classifyRjcTypePane={['rcj', 'machine', 'concrete']}
        setMatCatalogCurrent={setMatCatalogCurrent}
        dbMatMainTableProps={dbMatMainTableProps}
        triggerControl={triggerControl}
        primaryCurrent={{ id: '1' }}
        dbMatContentTableProps={{}}
        onSave={handleOnSave}
        trigger={triggerBtn}
        modalTitle="人材机保存"
        okText="保存到当前章节"
      />
      {contextHolder}
    </>
  );
};
