/*
 * @Author: SHUANG
 * @Date: 2023-11-07 14:49:54
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-02-01 11:20:59
 * @Description: 当前目录清空导入清单
 */
import { ClearOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Modal, message } from 'antd';
import { RelationDirectoryItem } from '../../../RelationDirectoryTree/typings';
import { relationDetailDeleteByBusinessId } from '../../services';

/** 当前目录 */
type Props = { relationDirectoryCurrent?: RelationDirectoryItem; onSubmit: () => void };

export default (props: Props) => {
  const [modal, contextHolder] = Modal.useModal();

  /** 当前映射库目录 */
  const { relationDirectoryCurrent } = props;

  /** 清空当前目录下清单明细 */
  const handleOnClick = () => {
    if (!relationDirectoryCurrent) {
      modal.warning({ title: '继续操作', content: '请选择一项数据进行操作!' });
      return;
    }

    modal.confirm({
      title: '提示',
      icon: <ExclamationCircleOutlined />,
      content: `当前目录下的数据将被清空, 是否继续?`,
      async onOk() {
        if (!props?.onSubmit) return;
        /** 当前目录ID */
        const listNormDirectoryId = relationDirectoryCurrent?.id || '';
        const res = await relationDetailDeleteByBusinessId({ listNormDirectoryId });
        if (res?.status === 'SUCCESS') {
          message.success(res?.message || '操作成功');
          props?.onSubmit?.();
        }
        return res;
      },
    });
  };

  return (
    <>
      <Button className="DisableButton" onClick={handleOnClick}>
        <ClearOutlined /> 清空
      </Button>
      {contextHolder}
    </>
  );
};
