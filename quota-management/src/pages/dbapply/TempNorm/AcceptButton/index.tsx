/*
 * @Author: SHUANG
 * @Date: 2024-04-17 16:53:41
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-18 14:50:40
 * @Description: 定额临时库 接受
 */
import { useRef, useState } from 'react';
import { Button, Modal, Tag } from 'antd';
import { CheckSquareOutlined } from '@ant-design/icons';
import { BaseTableProps, TableActionType } from 'jd-framework-web/package/components';
import { DbChapterItem } from '@/pages/database/DbMain/DatabaseMain/DbChapterTree/typings';
import DbNormBorrow from '@/pages/database/common/DbNormBorrow';
import { tempNormUpdateAcceptEnterDatabase } from '../services';
import { tempNormProps } from '../typings';

export default (props: tempNormProps) => {
  const { tempNormTableRef } = props;
  const { tempNormSelection } = props;

  const [modal, contextHolder] = Modal.useModal();

  /** 定额明细表 REF */
  const dbNormTableRef = useRef<TableActionType>();

  /** Loading */
  const [loading, setLoading] = useState<boolean>(false);

  /** 当前定额册章节 */
  const [dbChapterCurrent, setDbChapterCurrent] = useState<DbChapterItem>();

  /** 接受 */
  const handleOnSave = async () => {
    if (!dbChapterCurrent) {
      modal.warning({ title: '继续操作', content: '请选择章节!' });
      return;
    }
    const chapterId = dbChapterCurrent.id;
    const dbId = dbChapterCurrent.dbId;
    let unitPriceIds: string[] = []; // 综合单价ID集合
    let projectIds: string[] = []; //  项目ID集合
    let stageIds: string[] = []; // 阶段ID集合
    let ids: string[] = []; // 定额ID集合

    tempNormSelection?.forEach((item) => {
      unitPriceIds.push(item.unitPriceId);
      projectIds.push(item.projectId);
      stageIds.push(item.stageId);
      ids.push(item.id);
    });

    const params = { unitPriceIds, projectIds, stageIds, ids, chapterId, dbId };
    setLoading(true);
    const res = await tempNormUpdateAcceptEnterDatabase({ ...params });
    setLoading(false);
    // dbNormTableRef?.current?.reload?.();
    // dbNormTableRef?.current?.tableScrollTo?.(10000);
    if (res?.status === 'SUCCESS') {
      tempNormTableRef?.current?.reload?.();
      tempNormTableRef?.current?.setTableSelection([]);
    }
    return { ...res } as any;
  };

  /** 触发控制 */
  const triggerControl = () => {
    if (!tempNormSelection?.length) {
      modal.warning({ title: '继续操作', content: '请勾选数据进行操作!' });
      return { status: 'ERROR' };
    }
    return { status: 'SUCCESS' };
  };

  /** 触发按钮 */
  const triggerBtn = (
    <Button className="BorderButtonLime" loading={loading}>
      <CheckSquareOutlined /> 接受
    </Button>
  );

  /** 定额表 */
  const dbNormTableProps: Partial<BaseTableProps> = {
    toolbarBefore: <Tag color="blue">请选择目录章节, 进行保存!</Tag>,
    rowSelection: false,
  };

  return (
    <>
      <DbNormBorrow
        databaseCurrentDefault={{ id: tempNormSelection?.[0]?.dbId } as any}
        setDbChapterCurrent={setDbChapterCurrent}
        dbNormTableProps={dbNormTableProps}
        triggerControl={triggerControl}
        dbNormTableRef={dbNormTableRef}
        triggerButton={triggerBtn}
        onSave={handleOnSave}
        okText="保存到当前章节"
        modalTitle="定额保存"
      />
      {contextHolder}
    </>
  );
};
