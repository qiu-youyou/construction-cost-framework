import {
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
  LockOutlined,
  ReloadOutlined,
  UnlockOutlined,
  EyeOutlined,
  CopyOutlined,
  ScissorOutlined,
  CopyTwoTone,
} from '@ant-design/icons';
import { Button, Dropdown, Space, Tooltip } from 'antd';

/** from components */
import useAuthButton from '../../utils/auth/useAuthButton';
import PlusButton from '../ActionButton/PlusButton';
import PlusLevelButton from '../ActionButton/PlusLevelButton';
import EditButton from '../ActionButton/EditButton';
import DetailsButton from '../ActionButton/DetailsButton';
import EnableButton from '../ActionButton/EnableButton';
import DisableButton from '../ActionButton/DisableButton';
import DeleteButton from '../ActionButton/DeleteButton';

import { BaseDropDownProps } from '../BaseDropDown';
import { TreeStateDefine } from './useTreeState';
import { BaseTreeProps } from './typings';
import useExpand from './useExpand';
import UploadFileButton from '../ActionButton/UploadFileButton';
import ExportButton from '../ActionButton/ExportButton';
import MoveButton from '../ActionButton/MoveButton';

const useTreeAction = (props: BaseTreeProps, treeState: TreeStateDefine) => {
  const expand = useExpand(props, treeState.dataSource, treeState.refreshDateByParams);

  const { toolbar: toolbarEx, fieldNames } = props;
  const { current, selections } = treeState;

  /** 生成默认的按钮 如果传入 auth 按照 auth规则显示 否则 有配置就显示 */
  const toolbarProps: { [index: string]: any } = toolbarEx || {};

  /** 如果权限受默认权限表控制 */
  let toolbarDefaultAuth = (authKey: string) => {};
  if (props.toolbarAuthority) {
    const { auth } = useAuthButton();
    toolbarDefaultAuth = auth;
  }

  if (!!toolbarProps) {
    for (const key in toolbarProps) {
      /** 如果权限受默认权限表控制 */
      if (props?.toolbarAuthority) {
        if (key !== 'expand') {

          toolbarProps[key].auth = toolbarDefaultAuth(toolbarProps[key]?.authKey || key);
        }
      } else if (toolbarProps[key].auth === undefined) {
        /** 默认显示按钮 */
        toolbarProps[key].auth = true;
      }
      // 添加刷新函数 onRefresh
      toolbarProps[key].onRefresh = treeState.refresh;
    }
  }
  const toolbar = toolbarProps || {};

  /** 渲染到标题区域的操作 */
  const headerBarActions = (
    <Space size={3}>
      {props.title}
      {props.toolbarBefore}
      {toolbar?.plusLevel?.auth && (
        <PlusLevelButton
          current={current}
          {...toolbar.plusLevel}
          idsKey={fieldNames?.key || ''}
          params={props?.service?.params}
        />
      )}
      {toolbar?.plus?.auth && (
        <PlusButton
          current={current}
          {...toolbar.plus}
          idsKey={fieldNames?.key || ''}
          params={props?.service?.params}
        />
      )}

      {/* 导入 */}
      {toolbar?.import?.auth && <UploadFileButton {...toolbar.import} />}

      {/* 导出 */}
      {toolbar?.export?.auth && (
        <ExportButton determineActionCurrent={false} current={current} {...toolbar.export} />
      )}

      {toolbar?.exportOther?.auth && (
        <ExportButton determineActionCurrent={false} current={current} {...toolbar.exportOther} />
      )}

      {!toolbar?.expand?.auth && expand.triggerButton}

      {/* 数据重排 */}
      {toolbar?.sort?.auth && (
        <>
          <MoveButton
            moveType="top"
            current={treeState.current}
            dataSource={treeState.dataSource}
            {...toolbar.sort}
          />

          <MoveButton
            moveType="button"
            current={treeState.current}
            dataSource={treeState.dataSource}
            {...toolbar.sort}
          />
        </>
      )}

      {props.toolbarAfter}
    </Space>
  );

  /** Node 中的 编辑按钮 */
  const nodeActionButton = {
    editButton: (
      <Tooltip title={toolbar?.edit?.buttonText || '编辑'} mouseEnterDelay={0.5}>
        <Button type="link">
          <EditOutlined />
        </Button>
      </Tooltip>
    ),
    detailsButton: (
      <Tooltip title={toolbar?.details?.buttonText || '查看'} mouseEnterDelay={0.5}>
        <Button type="link" className="DetailsButtonLink">
          <EyeOutlined />
        </Button>
      </Tooltip>
    ),
    enableButton: (
      <Tooltip title={toolbar?.enable?.buttonText || '启用'} mouseEnterDelay={0.5}>
        <Button type="link" className="EnableStatus">
          <UnlockOutlined />
        </Button>
      </Tooltip>
    ),
    disableButton: (
      <Tooltip title={toolbar?.disable?.buttonText || '禁用'} mouseEnterDelay={0.5}>
        <Button type="link" className="DisableStatus">
          <LockOutlined />
        </Button>
      </Tooltip>
    ),
    deleteButton: (
      <Tooltip title={toolbar?.deleted?.buttonText || '删除'} mouseEnterDelay={0.5}>
        <Button type="link" danger>
          <DeleteOutlined />
        </Button>
      </Tooltip>
    ),
  };

  const batchActionButtonMenuSet: BaseDropDownProps['menu'] = {
    items: [
      toolbar?.copy?.auth && {
        key: '0',
        label: (
          <Button type="link" className="LinkButtonCopy" onClick={treeState.handleClickCopy}>
            批量复制 <CopyOutlined />
          </Button>
        ),
      },
      toolbar?.copy?.auth && {
        key: '100',
        label: (
          <Button type="link" className="LinkButtonCut" onClick={treeState.handleClickCopy}>
            批量剪切 <ScissorOutlined />
          </Button>
        ),
      },
      toolbar?.enable?.auth && {
        key: '200',
        label: (
          <EnableButton
            selections={selections}
            idsKey={fieldNames?.key || ''}
            trigger={
              <Button type="link" className="EnableButtonLink">
                批量启用 <UnlockOutlined />
              </Button>
            }
            {...toolbar.enable}
          />
        ),
      },
      toolbar?.disable?.auth && {
        key: '300',
        label: (
          <DisableButton
            selections={selections}
            idsKey={fieldNames?.key || ''}
            trigger={
              <Button type="link" className="DisableButtonLink">
                批量禁用 <LockOutlined />
              </Button>
            }
            {...toolbar.disable}
          />
        ),
      },
      toolbar?.deleted?.auth && {
        key: '400',
        label: (
          <DeleteButton
            selections={selections}
            idsKey={fieldNames?.key || ''}
            trigger={
              <Button type="link" danger>
                批量删除 <DeleteOutlined />
              </Button>
            }
            {...toolbar.deleted}
            onRefresh={treeState.refreshAndReset}
          />
        ),
      },
    ],
  };

  /** Tree header 右侧 */
  const { enable, disable, deleted, copy } = toolbar;
  const toolbarActions = (
    <Space size={0}>
      {!!treeState.selections?.length && (
        <>
          <Button type="text" onClick={() => treeState.handleClickCancel()}>
            取消
          </Button>
          {!!treeState?.actionsType && (
            <Button type="link" className="LinkButtonPast" onClick={() => treeState.handleClickPaste()}>
              粘贴({treeState.actionsRows?.length})项
            </Button>
          )}
          {copy?.auth || enable?.auth || disable?.auth || deleted?.auth ? (
            !treeState?.actionsType && (
              <Dropdown menu={batchActionButtonMenuSet}>
                <Button type="link">
                  批量操作({treeState.selections.length}) <DownOutlined />
                </Button>
              </Dropdown>
            )
          ) : (
            <Button type="link"> 已选({treeState.selections.length})</Button>
          )}
        </>
      )}
      <div className="IconButton">
        <Tooltip title="刷新" mouseEnterDelay={0.5}>
          <ReloadOutlined onClick={treeState.refresh} />
        </Tooltip>
      </div>
    </Space>
  );

  /**  操作节点 */
  const nodeActions = (node: any) => (
    <Space size={1}>
      {toolbar?.details?.auth && (
        <DetailsButton
          current={node}
          {...toolbar.details}
          trigger={nodeActionButton.detailsButton}
          idsKey={fieldNames?.key || ''}
          params={props?.service?.params}
        />
      )}

      {toolbar?.edit?.auth && (
        <EditButton
          current={node}
          {...toolbar.edit}
          trigger={nodeActionButton.editButton}
          idsKey={fieldNames?.key || ''}
          params={props?.service?.params}
        />
      )}

      {toolbar?.enable?.auth && (
        <EnableButton
          current={node}
          idsKey={fieldNames?.key || ''}
          trigger={nodeActionButton.enableButton}
          {...toolbar.enable}
        />
      )}

      {toolbar?.disable?.auth && (
        <DisableButton
          current={node}
          idsKey={fieldNames?.key || ''}
          trigger={nodeActionButton.disableButton}
          {...toolbar.disable}
        />
      )}

      {toolbar?.deleted?.auth && (
        <DeleteButton
          current={node}
          idsKey={fieldNames?.key || ''}
          trigger={nodeActionButton.deleteButton}
          {...toolbar.deleted}
          onRefresh={treeState.refreshAndReset}
        />
      )}
    </Space>
  );

  const nodePasteButton = (record?: any) => {
    return (
      <Tooltip title={'粘贴到该行'} mouseEnterDelay={0.5}>
        <span className="paste-tip">
          <Tooltip title="粘贴到该行">
            <CopyTwoTone style={{ fontSize: '14px' }} onClick={() => treeState.handleClickPaste(record)} />
          </Tooltip>
        </span>
      </Tooltip>
    );
  };

  return {
    headerBarActions,
    toolbarActions,
    nodeActions,
    nodePasteButton,
    expand,
  };
};

export default useTreeAction;
