/*
 * @Author: SHUANG
 * @Date: 2024-01-17 10:32:38
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-03 09:53:15
 * @Description: 工程造价-其他费汇总 调用其他费模板
 */
import { useState } from 'react';
import { Button, Modal, Tag } from 'antd';
import { InfoCircleOutlined, SwapOutlined } from '@ant-design/icons';
import BaseModal from 'jd-framework-web/package/components/BaseModal';
import { TableActionType } from 'jd-framework-web/package/components';

import { OtherFeeTempDirectoryItem } from '@/pages/standard/StdOtherFeeTemp/OtherFeeTempDirectoryTree/typings';
import { ProductItem } from '@/pages/dbapply/Product/Product/typings';
import StdOtherFeeTemp from '@/pages/standard/StdOtherFeeTemp';

import { insertProductOtherSumByDirectoryId } from '../services';

type Props = {
  /** 当前产品 */
  productActionCurrent?: ProductItem;
  /** 其他费汇总表 REF */
  otherFeeSummaryTableRef?: TableActionType;
};

export default (props: Props) => {
  /** 当前选中 */
  const { productActionCurrent } = props;
  const { otherFeeSummaryTableRef } = props;

  const [modal, contextHolder] = Modal.useModal();

  const [current, setCurrent] = useState<OtherFeeTempDirectoryItem>();

  /** 提交方法 */
  const onSubmit = async (current?: OtherFeeTempDirectoryItem) => {
    /** 工程ID 阶段ID  */
    const directoryId = current?.id || '';

    const stageId = productActionCurrent?.id || '';
    const projectId = productActionCurrent?.projectId || '';

    const res = await insertProductOtherSumByDirectoryId({ stageId, projectId, directoryId });
    if (res?.status == 'SUCCESS') {
      otherFeeSummaryTableRef?.current?.reload?.();
    }
    return res;
  };

  /** 弹窗触发保存 */
  const handleOnSubmitSave: any = async () => {
    if (!current) {
      const modalInfo = { icon: <InfoCircleOutlined />, content: '请选择模板目录！' };
      modal.warning({ ...modalInfo, title: '继续操作', okText: '确定' });
      return;
    }

    if (!!current?.children?.length) {
      const modalInfo = {
        content: '请选择模板目录中最后一个层级，进行保存设置！',
        icon: <InfoCircleOutlined />,
        title: '继续操作',
        okText: '确定',
      };
      modal.warning(modalInfo);
      return;
    }

    const res = onSubmit?.(current);
    return res;
  };

  /** 调用其他费模板库 */
  const StdOtherSumTempRender = (
    <section style={{ height: 380 }}>
      <StdOtherFeeTemp
        toolbarSlot={<Tag color="blue">请选择模板目录中最后一个层级，进行保存!</Tag>}
        setOtherFeeTempDirectoryCurrent={setCurrent}
        splitScroll="percent"
        splitLWidth={300}
        readonly
      />
    </section>
  );

  /** 触发按钮 */
  const modalTrigger = (
    <Button className="BorderButtonBlue">
      <SwapOutlined /> 调用其他费模板
    </Button>
  );

  return (
    <>
      <BaseModal
        width={1200}
        trigger={modalTrigger}
        onSubmit={handleOnSubmitSave}
        style={{ top: 260 }}
        title="调用其他费模板"
        okText="保存当前模板"
      >
        {StdOtherSumTempRender}
      </BaseModal>
      {contextHolder}
    </>
  );
};
