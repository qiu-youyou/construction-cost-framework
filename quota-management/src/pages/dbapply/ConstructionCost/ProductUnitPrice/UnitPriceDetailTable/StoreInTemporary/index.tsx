/*
 * @Author: SHUANG
 * @Date: 2024-01-15 17:38:51
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-09 15:48:30
 * @Description: 工程造价-工程量清单编制-单价明细表 综合单价存入临时库
 */
import { Button, Modal, message } from 'antd';
import { ExclamationCircleOutlined, SaveOutlined } from '@ant-design/icons';
import { UnitPriceDetailItem } from '@/pages/standard/StdUnitPrice/UnitPriceDetailTable/typings';
import { TableActionType } from 'jd-framework-web/package/components';
import { ProductItem } from '@/pages/dbapply/Product/Product/typings';

import { productUnitUpdateDatabaseStatusByIds } from '../services';

type Props = {
  /** 当前产品 */
  productActionCurrent?: ProductItem;
  /** 已选择的综合单价 */
  unitPriceDetailActionCurrent?: UnitPriceDetailItem;
  /** 已选择的综合单价 */
  unitPriceDetailSelection?: UnitPriceDetailItem[];

  /** 综合单价表 */
  unitPriceDetailTableRef?: TableActionType;
};

export default (props: Props) => {
  const [modal, contextHolder] = Modal.useModal();

  /** 当前综合单价 */
  const { productActionCurrent } = props;
  const { unitPriceDetailSelection } = props;
  const { unitPriceDetailActionCurrent } = props;

  /** 工程ID 阶段ID */
  const stageId = productActionCurrent?.id || '';
  const projectId = productActionCurrent?.projectId || '';

  const onOk = async () => {
    let ids: string[] = [];
    if (!unitPriceDetailSelection?.length) {
      ids = [unitPriceDetailActionCurrent?.id || ''];
    } else {
      ids = unitPriceDetailSelection?.map((item) => item.id) || [];
    }
    const res = await productUnitUpdateDatabaseStatusByIds({ projectId, stageId, ids });
    if (res?.status === 'SUCCESS') {
      message.success(res?.message || `操作成功`);
    }
  };

  const handleOnClick = async () => {
    if (!unitPriceDetailSelection?.length && !unitPriceDetailActionCurrent) {
      modal.warning({ title: '继续操作', content: '请选择综合单价进行操作!' });
      return;
    }
    if (!unitPriceDetailSelection?.length) {
      Modal.confirm({
        title: '提示',
        icon: <ExclamationCircleOutlined />,
        content: `将综合单行价当前行, 存入临时库?`,
        onOk,
      });
      return;
    }

    modal.confirm({
      title: '提示',
      icon: <ExclamationCircleOutlined />,
      content: `将已选择(${unitPriceDetailSelection?.length})的综合单价, 存入临时库?`,
      onOk,
    });
  };

  return (
    <>
      <Button className="BorderButtonGreen" onClick={handleOnClick}>
        <SaveOutlined /> 综合单价存入临时库
      </Button>
      {contextHolder}
    </>
  );
};
