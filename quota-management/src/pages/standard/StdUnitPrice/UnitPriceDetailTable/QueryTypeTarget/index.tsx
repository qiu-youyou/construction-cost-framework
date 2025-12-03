/*
 * @Author: SHUANG
 * @Date: 2023-11-20 15:17:04
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-02-26 15:54:11
 * @Description: 综合单价库 清单明细 查询替换 单价类型
 */
import { useState } from 'react';
import { Button, Modal, Tag } from 'antd';
import { InfoCircleOutlined, SwapOutlined } from '@ant-design/icons';
import BaseModal from 'jd-framework-web/package/components/BaseModal';

import { OtherTypeApiItem } from '@/pages/standard/StdTypeTarget/typings';
import StdTypeTarget from '@/pages/standard/StdTypeTarget';

type Props = { onSubmit: (current?: OtherTypeApiItem) => Promise<FETCH.Res> };

export default (props: Props) => {
  const { onSubmit } = props;
  const [modal, contextHolder] = Modal.useModal();

  /** 当前选中 */
  const [current, setCurrent] = useState<OtherTypeApiItem>();

  /** 弹窗触发保存 */
  const handleOnSubmit: any = async () => {
    if (!current) {
      const modalInfo = {
        icon: <InfoCircleOutlined />,
        content: '请选择增加的数据！再进行该操作！',
        title: '继续操作',
        okText: '确定',
      };
      modal.warning(modalInfo);
      return;
    }
    onSubmit?.(current);
    return;
  };

  /** 触发按钮 */
  const modalTrigger = (
    <Button className="EditButton">
      <SwapOutlined /> 查询单价类型
    </Button>
  );

  /** 工程量分类库 */
  const StdTypeTargetRender = (
    <section style={{ height: 320 }}>
      <StdTypeTarget
        toolbarSlot={<Tag color="blue">可以双击行快速设置当前单价类型</Tag>}
        setOtherTypeApiCurrent={setCurrent}
        onDoubleClick={handleOnSubmit}
        readonly
      />
    </section>
  );

  return (
    <>
      <BaseModal
        width={600}
        title="查询单价类型"
        trigger={modalTrigger}
        onSubmit={handleOnSubmit}
        style={{ top: 300, left: '16vw' }}
        okText="确 定"
        mask={false}
      >
        {StdTypeTargetRender}
      </BaseModal>
      {contextHolder}
    </>
  );
};
