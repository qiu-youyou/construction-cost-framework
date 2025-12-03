/*
 * @Author: SHUANG
 * @Date: 2022-10-16 15:46:38
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-12-27 10:48:46
 * @Description: 数据重排按钮
 */
import { Button, message, Modal, Tooltip } from 'antd';
import { VerticalAlignBottomOutlined, VerticalAlignTopOutlined } from '@ant-design/icons';

/** from components */
import { ActionButtonProps } from './typings';

const MoveButton = (props: ActionButtonProps) => {
  const [modal, contextHolder] = Modal.useModal();

  const handleSortWarpAction: any = {
    // 查找节点
    getSortRow: (type: any, current: any) => {
      if (current.parentId == 0 || !current.parentId || (current.level == 2 && current.wbsCode))
        return handleSortWarpAction.getSortRowSame(type, current);
      else return handleSortWarpAction.getSortRowDiff(type, current);
    },

    getChildrenFindArr: null,
    getChildren: (arr: any, current: any) => {
      handleSortWarpAction.getChildrenFindArr = null;
      arr.forEach((arrItem: any) => {
        if (arrItem.id === current.parentId) handleSortWarpAction.getChildrenFindArr = arrItem;
        if (arrItem.children && !handleSortWarpAction.getChildrenFindArr)
          handleSortWarpAction.getChildren(arrItem.children, current);
      });
    },

    getSortRowSame: (type: any, current: any): any => {
      const oldIndex = props.dataSource.findIndex((item: any) => item.id === current.id);
      const newIndex = type === 'top' ? oldIndex - 1 : oldIndex + 1;
      const sortRow = props.dataSource[newIndex];
      return { sortRow, oldIndex, newIndex };
    },

    getSortRowDiff: (type: any, current: any) => {
      handleSortWarpAction.getChildren(props.dataSource, current);
      const findArr = handleSortWarpAction?.getChildrenFindArr?.children;
      if (!findArr) return false;
      const oldIndex = findArr.findIndex((item: any) => item.id === current.id);
      const newIndex = type === 'top' ? oldIndex - 1 : oldIndex + 1;
      const sortRow = findArr[newIndex];
      const sortOldRow = findArr[oldIndex];
      return { sortRow, oldIndex, newIndex, sortOldRow };
    },
  };

  // 上移下移事件
  const handleSortWarp = async () => {
    if (!props.onSubmit) return;

    /** 没有可操作行 */
    if (!props?.current) {
      modal.warning({ title: '继续操作', content: '请选择一项数据进行操作!' });
      return;
    }

    const { current } = props;
    const { sortRow } = handleSortWarpAction.getSortRow(props.moveType, current);
    if (!sortRow) {
      message.destroy();
      message.warning(props.moveType === 'top' ? '已经是第一项了!' : '已经是最后一项了!');
      return;
    }

    const res = await props?.onSubmit?.({ arg1: current.id, arg2: sortRow.id });
    if (res?.status !== 'SUCCESS') return false;
    message.destroy();
    message.success(res?.message || '操作成功');

    /** 默认传递刷新方法 */
    if (props.onRefresh) {
      props.onRefresh();
    }
  };

  const ButtonDom =
    props.trigger ||
    (props.moveType == 'top' ? (
      <Tooltip title="向上移动">
        <Button disabled={props?.disabled} onClick={handleSortWarp}>
          <VerticalAlignTopOutlined style={{ fontSize: 14 }} />
        </Button>
      </Tooltip>
    ) : (
      <Tooltip title="向下移动">
        <Button disabled={props?.disabled} onClick={handleSortWarp}>
          <VerticalAlignBottomOutlined style={{ fontSize: 14 }} />
        </Button>
      </Tooltip>
    ));

  const ModalDom = (
    <>
      {ButtonDom}
      {contextHolder}
    </>
  );

  return ModalDom;
};

export default MoveButton;
