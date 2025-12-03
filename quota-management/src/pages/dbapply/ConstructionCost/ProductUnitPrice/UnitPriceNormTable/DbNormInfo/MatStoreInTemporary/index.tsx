/*
 * @Author: SHUANG
 * @Date: 2024-04-09 15:50:38
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-10 09:29:40
 * @Description: 工程造价-工程量清单编制-人材机明细 - 人材机存入临时库
 */

import { Button, Modal, message } from 'antd';
import { ExclamationCircleOutlined, SaveOutlined } from '@ant-design/icons';
import { TableActionType } from 'jd-framework-web/package/components';

import { DbNormMatContentItem } from '@/pages/database/DbMain/DatabaseMain/DataBasePane/DbNorm/DbNormPane/DbNormMatContent/typings';
import { UnitPriceNormItem } from '@/pages/standard/StdUnitPrice/UnitPriceNormTable/typings';
import { productUnitPriceNormMatUpdateDatabaseStatusByIds } from '../services';

type Props = {
  /** 当前人材机 */
  unitPriceNormActionCurrent?: UnitPriceNormItem;

  /** 已选择的 人材机材料 */
  dbNormMatContentSelection?: DbNormMatContentItem[];

  /** 已选择的 人材机材料 */
  dbNormMatContentCurrent?: DbNormMatContentItem;

  /** 人材机 人材机表 */
  unitPriceNormTableRef?: TableActionType;
};

export default (props: Props) => {
  const [modal, contextHolder] = Modal.useModal();

  /** 当前人材机 */
  const { unitPriceNormActionCurrent } = props;

  const { dbNormMatContentCurrent, dbNormMatContentSelection } = props;

  /** 工程ID 阶段ID 单价ID  */
  const unitPriceId = unitPriceNormActionCurrent?.unitPriceId || '';
  const unitPriceNormId = unitPriceNormActionCurrent?.id || '';
  const stageId = unitPriceNormActionCurrent?.stageId || '';
  const projectId = unitPriceNormActionCurrent?.projectId || '';

  const onOk = async () => {
    let ids: string[] = [];
    if (!dbNormMatContentSelection?.length) {
      ids = [dbNormMatContentCurrent?.id || ''];
    } else {
      ids = dbNormMatContentSelection?.map((item) => item.id) || [];
    }
    const res = await productUnitPriceNormMatUpdateDatabaseStatusByIds({
      unitPriceNormId,
      projectId,
      stageId,
      unitPriceId,
      ids,
    });
    if (res?.status === 'SUCCESS') {
      message.success(res?.message || `操作成功`);
    }
  };

  const handleOnClick = async () => {
    if (!dbNormMatContentSelection?.length && !dbNormMatContentCurrent) {
      modal.warning({ title: '继续操作', content: '请选择人材机进行操作!' });
      return;
    }
    if (!dbNormMatContentSelection?.length) {
      Modal.confirm({
        title: '提示',
        icon: <ExclamationCircleOutlined />,
        content: `将人材机当前行, 存入临时库?`,
        onOk,
      });
      return;
    }
    modal.confirm({
      title: '提示',
      icon: <ExclamationCircleOutlined />,
      content: `将已选择(${dbNormMatContentSelection?.length})的人材机, 存入临时库?`,
      onOk,
    });
  };

  return (
    <>
      <Button className="BorderButtonGreen" onClick={handleOnClick}>
        <SaveOutlined /> 人材机存入临时库
      </Button>
      {contextHolder}
    </>
  );
};
