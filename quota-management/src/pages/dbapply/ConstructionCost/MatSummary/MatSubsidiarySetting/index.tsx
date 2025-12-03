/*
 * @Author: SHUANG
 * @Date: 2024-03-28 11:03:31
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-26 10:24:28
 * @Description: 工程造价-人材机汇总与调价 次材库设置市场价
 */
import { useState } from 'react';
import { Button, Modal, Tag, message } from 'antd';
import { InfoCircleOutlined, SearchOutlined } from '@ant-design/icons';
import BaseModal from 'jd-framework-web/package/components/BaseModal';
import { TableActionType } from 'jd-framework-web/package/components';

import { SubsidiaryMatDetailItem } from '@/pages/standard/StdSubsidiaryMat/SubsidiaryMatDetailTable/typings';
import DbMatSubsidiary from '@/pages/database/DbMatSubsidiary';
import { matSummaryUpdateByMatCode } from '../MatSummaryTable/services';
import { MatSummaryItem } from '../MatSummaryTable/typings';

type Props = {
  matSummaryTableRef?: TableActionType;
  matSummaryCurrent?: MatSummaryItem;
};

export default (props: Props) => {
  const [modal, contextHolder] = Modal.useModal();

  const { matSummaryCurrent, matSummaryTableRef } = props;

  const [current, setCurrent] = useState<SubsidiaryMatDetailItem>();

  /** 提交方法 */
  const onSubmit = async (current: SubsidiaryMatDetailItem) => {
    if (!matSummaryCurrent) return;
    const { matTypeCode, matTypeName, matTypeUnit, matTypeId } = matSummaryCurrent;
    const { matCode, matName, matUnit, matIsMain, matPrice, projectId, stageId } = matSummaryCurrent;
    const curParams = { matCode, matName, matUnit, matIsMain, matPrice, projectId, stageId };
    const typeParams = { matTypeCode, matTypeName, matTypeUnit, matTypeId };

    const currentMatMarkPrice = matSummaryCurrent?.matMarkPrice || '';
    const matMarkPrice = current?.matNotTaxPrice || '';
    const finalParams = { ...curParams, ...typeParams, currentMatMarkPrice, matMarkPrice };

    const res = await matSummaryUpdateByMatCode(finalParams);

    if (res?.status === 'SUCCESS') {
      message.success(res?.message || '操作成功');
      matSummaryTableRef?.current?.reload();
    }
    return res;
  };

  /** 弹窗触发保存 */
  const handleOnSubmit: any = async () => {
    if (!current) {
      const modalInfo = { icon: <InfoCircleOutlined />, content: '请选择操作的数据！' };
      modal.warning({ ...modalInfo, title: '继续操作', okText: '确定' });
      return;
    }
    onSubmit?.(current);
    return;
  };

  /** 弹窗属性 */
  const triggerControl = async () => {
    const errorReturn: FETCH.Res = { status: 'ERROR', code: '200', rows: [] };
    if (!matSummaryCurrent) {
      modal.warning({ title: '继续操作', content: `请选择人材机，进行操作！` });
      return errorReturn;
    }
    return { ...errorReturn, status: 'SUCCESS' };
  };

  /** 材料分类库 */
  const StdSubMatRender = (
    <DbMatSubsidiary
      viewContaineProps={{ scroll: 'percent' }}
      paneContainerProps={{ width: 220 }}
      subsidiaryMatDetailTableProps={{ rowSelection: false }}
      subsidiaryMatTableProps={{
        toolbarBefore: <Tag color="blue">可以双击行快速设置当前市场价</Tag>,
        onCurrent: setCurrent,
        rowSelection: false,
        onDoubleClick: (record) => {
          onSubmit?.(record);
        },
      }}
    />
  );

  /** 触发按钮 */
  const modalTrigger = (
    <Button className="ButtonPrimary">
      <SearchOutlined /> 次材库查询
    </Button>
  );

  return (
    <>
      <BaseModal
        width={850}
        title="次材库查询"
        trigger={modalTrigger}
        onSubmit={handleOnSubmit}
        triggerControl={triggerControl}
        style={{ top: 100, left: '-12vw' }}
        mask={false}
      >
        <section style={{ height: 480 }}>
          <>{StdSubMatRender}</>
        </section>
      </BaseModal>
      {contextHolder}
    </>
  );
};
