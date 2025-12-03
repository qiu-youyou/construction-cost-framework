/*
 * @Author: SHUANG
 * @Date: 2024-03-28 11:03:31
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-26 10:22:02
 * @Description: 工程造价-人材机汇总与调价 材料分类设置
 */
import { useState } from 'react';
import { Button, Modal, Tag, message } from 'antd';
import { InfoCircleOutlined, TagOutlined } from '@ant-design/icons';
import BaseModal from 'jd-framework-web/package/components/BaseModal';
import { TableActionType } from 'jd-framework-web/package/components';
import { OtherMatTypeItem } from '@/pages/standard/StdMatType/typings';

import { matSummaryUpdateByMatCode } from '../MatSummaryTable/services';
import { MatSummaryItem } from '../MatSummaryTable/typings';
import StdMatType from '@/pages/standard/StdMatType';

type Props = {
  matSummaryTableRef?: TableActionType;
  matSummaryCurrent?: MatSummaryItem;
};

export default (props: Props) => {
  const [modal, contextHolder] = Modal.useModal();

  const { matSummaryCurrent, matSummaryTableRef } = props;

  const [current, setCurrent] = useState<OtherMatTypeItem>();

  /** 提交方法 */
  const onSubmit = async (current: OtherMatTypeItem) => {
    if (!matSummaryCurrent) return;

    const { matCode, matName, matUnit, matPrice, projectId, stageId } = matSummaryCurrent;
    const matParams = { matCode, matName, matUnit, matPrice, projectId, stageId };

    /** 修改前材料分类名称\修改前市场价\修改前主材标识 */
    const {
      matMarkPrice: currentMatMarkPrice,
      matTypeName: currentMatTypeName,
      matIsMain: currentMatIsMain,
    } = matSummaryCurrent;
    const curParams = { currentMatMarkPrice, currentMatTypeName, currentMatIsMain };

    const { id: matTypeId } = current;

    const finalParams = { ...matParams, ...curParams, matTypeId };
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
  const StdMapTypeRender = (
    <StdMatType
      viewContaineProps={{ scroll: 'percent' }}
      tableProps={{
        toolbarBefore: <Tag color="blue">可以双击行快速设置当前材料</Tag>,
        onCurrent: setCurrent,
        rowSelection: false,
        search: { span: 8 },
        onDoubleClick: (record) => {
          onSubmit?.(record);
        },
      }}
    />
  );

  /** 触发按钮 */
  const modalTrigger = (
    <Button className="EditButton">
      <TagOutlined /> 材料分类设置
    </Button>
  );

  return (
    <>
      <BaseModal
        width={600}
        title="材料分类设置"
        trigger={modalTrigger}
        onSubmit={handleOnSubmit}
        triggerControl={triggerControl}
        style={{ top: 100, left: '-13vw' }}
        mask={false}
      >
        <section style={{ height: 380 }}>
          <>{StdMapTypeRender}</>
        </section>
      </BaseModal>
      {contextHolder}
    </>
  );
};
