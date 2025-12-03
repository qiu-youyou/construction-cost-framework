/*
 * @Author: SHUANG
 * @Date: 2024-04-17 16:53:41
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-18 14:51:04
 * @Description: 人材机临时库 拒绝
 */
import { useState } from 'react';
import { Button, Modal, message } from 'antd';
import { CloseSquareOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { tempNormMatUpdateRejectEnterDatabase } from '../services';
import { TempNormMatProps } from '../typings';

export default (props: TempNormMatProps) => {
  const { tempNormMatTableRef } = props;
  const { tempNormMatSelection } = props;
  const [modal, contextHolder] = Modal.useModal();

  /** Loading */
  const [loading, setLoading] = useState<boolean>(false);

  /** 拒绝 */
  const onOk = async () => {
    setLoading(true);

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

    const params = { unitPriceNormIds, unitPriceIds, projectIds, stageIds, ids };
    const res = await tempNormMatUpdateRejectEnterDatabase(params);
    setLoading(false);
    if (res?.status === 'SUCCESS') {
      message.success(res?.message || '操作成功');
      tempNormMatTableRef?.current?.reload?.();
      tempNormMatTableRef?.current?.setTableSelection([]);
    }
    return res;
  };

  /** 拒绝 */
  const handleOnClick = async () => {
    if (!tempNormMatSelection?.length) {
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
