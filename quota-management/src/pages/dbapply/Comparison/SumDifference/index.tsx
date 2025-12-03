/*
 * @Author: SHUANG
 * @Date: 2024-03-19 18:25:01
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-03 09:08:52
 * @Description: 工程造价对比
 */
import { Button, Modal, TabsProps } from 'antd';
import { StockOutlined } from '@ant-design/icons';
import ModalButton from 'jd-framework-web/package/components/ActionButton/ModalButton';
import BaseCard from 'jd-framework-web/package/components/BaseCard';
import { ProductItem } from '../../Product/Product/typings';
import DifferenceSubitem from './DifferenceSubitem';
import DifferenceIndex from './DifferenceIndex';
import DifferenceStage from './DifferenceStage';
import DifferenceWbs from './DifferenceWbs';
import { DifferenceQuery } from './typings';

type Props = { stageSelection?: ProductItem[] };

export default (props: Props) => {
  const { stageSelection } = props;

  const [modal, contextHolder] = Modal.useModal();

  /** 所选 工程ID */
  const beforeProjectId = stageSelection?.[0]?.projectId || '';
  const afterProjectId = stageSelection?.[1]?.projectId || '';

  /** 所选 阶段ID */
  const beforeStageId = stageSelection?.[0]?.id || '';
  const afterStageId = stageSelection?.[1]?.id || '';

  /** SERVICE 关联查询参数 */
  const serviceParams: DifferenceQuery = {
    beforeProjectId,
    afterProjectId,
    beforeStageId,
    afterStageId,
  };

  /** pane items */
  const itemsPane: TabsProps['items'] = [
    {
      children: <DifferenceSubitem serviceParams={serviceParams} />,
      label: '分部分项汇总对比',
      key: 'subitem',
    },
    {
      children: <DifferenceWbs serviceParams={serviceParams} />,
      label: 'WBS汇总对比',
      key: 'wbs',
    },
    {
      children: <DifferenceIndex serviceParams={serviceParams} />,
      label: '指标汇总对比',
      key: 'index',
    },
    {
      children: <DifferenceStage serviceParams={serviceParams} />,
      label: '项目汇总对比',
      key: 'stage',
    },
  ];

  /** 人材机选择 */
  const ModalRender = (
    <section style={{ height: 480 }}>
      <BaseCard tabs={{ items: itemsPane }} noHeader />
    </section>
  );

  /** 弹窗属性 */
  const triggerControl = async () => {
    const errorReturn: FETCH.Res = { status: 'ERROR', code: '200', rows: [] };
    if (!stageSelection || stageSelection?.length < 2) {
      modal.warning({ title: '继续操作', content: `请勾选两个阶段，进行对比！` });
      return errorReturn;
    }
    return { ...errorReturn, status: 'SUCCESS' };
  };

  /** 触发按钮 */
  const triggerBtn = (
    <Button className="EditButton" style={{ marginTop: 2 }}>
      <StockOutlined /> 工程造价对比
    </Button>
  );

  /** 弹窗属性 */
  const modalProps = {
    defaultFullScreen: true,
    style: { top: 130 },
    triggerControl,
    width: 1150,
  };

  return (
    <>
      <ModalButton
        trigger={triggerBtn}
        modalTitle="相关定额查看"
        determineActionCurrent={false}
        modalProps={modalProps}
        render={ModalRender}
      />
      {contextHolder}
    </>
  );
};
