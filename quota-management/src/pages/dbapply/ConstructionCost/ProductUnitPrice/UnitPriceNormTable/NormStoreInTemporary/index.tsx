/*
 * @Author: SHUANG
 * @Date: 2024-04-09 15:50:38
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-09 17:02:16
 * @Description: 工程造价-工程量清单编制-定额明细 - 定额存入临时库
 */

import { Button, Modal, message } from 'antd';
import { TableActionType } from 'jd-framework-web/package/components';
import { ExclamationCircleOutlined, SaveOutlined } from '@ant-design/icons';

import { UnitPriceDetailItem } from '@/pages/standard/StdUnitPrice/UnitPriceDetailTable/typings';
import { UnitPriceNormItem } from '@/pages/standard/StdUnitPrice/UnitPriceNormTable/typings';
import { productUnitPriceNormUpdateDatabaseStatusByIds } from '../services';

type Props = {
  /** 当前综合单价 */
  unitPriceDetailCurrent?: UnitPriceDetailItem;
  /** 当前定额 */
  unitPriceNormActionCurrent?: UnitPriceNormItem;

  /** 已选择的 定额含量 */
  unitPriceNormSelection?: UnitPriceNormItem[];

  /** 定额 定额表 */
  unitPriceNormTableRef?: TableActionType;
};

export default (props: Props) => {
  const [modal, contextHolder] = Modal.useModal();

  /** 当前综合单价 */
  const { unitPriceDetailCurrent } = props;

  /** 当前定额 */
  const { unitPriceNormActionCurrent } = props;
  const { unitPriceNormSelection } = props;

  /** 工程ID 阶段ID 单价ID  */
  const unitPriceId = unitPriceDetailCurrent?.id || '';
  const stageId = unitPriceDetailCurrent?.stageId || '';
  const projectId = unitPriceDetailCurrent?.projectId || '';

  const onOk = async () => {
    let ids: string[] = [];
    if (!unitPriceNormSelection?.length) {
      ids = [unitPriceNormActionCurrent?.id || ''];
    } else {
      ids = unitPriceNormSelection?.map((item) => item.id) || [];
    }
    const res = await productUnitPriceNormUpdateDatabaseStatusByIds({ projectId, stageId, unitPriceId, ids });
    if (res?.status === 'SUCCESS') {
      message.success(res?.message || `操作成功`);
    }
  };

  const handleOnClick = async () => {
    if (!unitPriceNormSelection?.length && !unitPriceNormActionCurrent) {
      modal.warning({ title: '继续操作', content: '请选择定额进行操作!' });
      return;
    }
    if (!unitPriceNormSelection?.length) {
      Modal.confirm({
        title: '提示',
        icon: <ExclamationCircleOutlined />,
        content: `将定额当前行, 存入临时库?`,
        onOk,
      });
      return;
    }

    modal.confirm({
      title: '提示',
      icon: <ExclamationCircleOutlined />,
      content: `将已选择(${unitPriceNormSelection?.length})的定额, 存入临时库?`,
      onOk,
    });
  };

  return (
    <>
      <Button className="BorderButtonGreen" onClick={handleOnClick}>
        <SaveOutlined /> 定额存入临时库
      </Button>
      {contextHolder}
    </>
  );
};
