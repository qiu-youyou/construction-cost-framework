/*
 * @Author: SHUANG
 * @Date: 2024-04-17 16:53:41
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-18 14:50:50
 * @Description: 定额临时库 拒绝
 */
import { useState } from 'react';
import { Button, Modal, message } from 'antd';
import { CloseSquareOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { tempNormUpdateRejectEnterDatabase } from '../services';
import { tempNormProps } from '../typings';

export default (props: tempNormProps) => {
  const { tempNormTableRef } = props;
  const { tempNormSelection } = props;
  const [modal, contextHolder] = Modal.useModal();

  /** Loading */
  const [loading, setLoading] = useState<boolean>(false);

  /** 拒绝 */
  const onOk = async () => {
    setLoading(true);

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

    const params = { unitPriceIds, projectIds, stageIds, ids };
    const res = await tempNormUpdateRejectEnterDatabase(params);
    setLoading(false);
    if (res?.status === 'SUCCESS') {
      message.success(res?.message || '操作成功');
      tempNormTableRef?.current?.reload?.();
      tempNormTableRef?.current?.setTableSelection([]);
    }
    return res;
  };

  /** 拒绝 */
  const handleOnClick = async () => {
    if (!tempNormSelection?.length) {
      modal.warning({ title: '继续操作', content: '请勾选数据进行操作!' });
      return;
    }

    modal.confirm({
      title: '提示',
      icon: <ExclamationCircleOutlined />,
      content: `确定拒绝？`,
      onOk,
    });
  };

  /** 触发按钮 */
  const triggerBtn = (
    <Button onClick={handleOnClick} className="BorderButtonRed" loading={loading}>
      <CloseSquareOutlined /> 拒绝
    </Button>
  );

  return (
    <>
      {triggerBtn}
      {contextHolder}
    </>
  );
};
