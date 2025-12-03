import { Tooltip } from 'antd';
import { ReactNode } from 'react';
import Split from '@uiw/react-split';
import { CaretLeftOutlined, CaretUpOutlined } from '@ant-design/icons';

/** from components */
import { SplitPaneProps } from './typings';
import styles from './index.less';

const SplitPropsDefine: SplitPaneProps = {
  mode: 'horizontal',
  dragVisiable: true,
  draggable: true,
};

const splitStyle = {};
const mouseDownStyle = {};

const SplitPane = (propsDefine: SplitPaneProps) => {
  const props = { ...SplitPropsDefine, ...propsDefine };
  const { mode, draggable, dragVisiable } = props;

  const onClickToggleLeftBtn = ({ nativeEvent }: any) => {
    /** 获取被点击的上一个兄弟节点 */
    const findPath = nativeEvent.path || (nativeEvent.composedPath && nativeEvent.composedPath());
    if (!findPath) return;
    const bar = findPath.find((item: any) => item.className === 'w-split-bar w-split-large-bar');
    if (!bar?.previousElementSibling) return;

    if (bar.previousElementSibling.style.display === 'none') {
      bar.previousElementSibling.style.display = 'block';
      if (!bar.getElementsByTagName('path')?.[0]) return;
      bar.getElementsByTagName('path')[0].style.transform = 'rotate(0deg)';
      bar.getElementsByTagName('path')[0].style.transformOrigin = 'center';
    } else {
      bar.previousElementSibling.style.display = 'none';
      if (!bar.getElementsByTagName('path')?.[0]) return;
      bar.getElementsByTagName('path')[0].style.transform = 'rotate(180deg)';
      bar.getElementsByTagName('path')[0].style.transformOrigin = 'center';
    }
  };

  let sourceHeight: any;
  const onClickToggleBottomBtn = ({ nativeEvent }: any) => {
    /** 获取被点击的上一个兄弟节点 */
    const findPath = nativeEvent.path || (nativeEvent.composedPath && nativeEvent.composedPath());
    if (!findPath) return;
    const bar = findPath.find((item: any) => item.className === 'w-split-bar w-split-large-bar');
    if (!bar?.nextElementSibling) return;

    if (bar.nextElementSibling.style.display === 'none') {
      bar.nextElementSibling.style.display = 'block';
      if (!bar.getElementsByTagName('path')?.[0]) return;
      bar.getElementsByTagName('path')[0].style.transform = 'rotate(0deg)';
      bar.getElementsByTagName('path')[0].style.transformOrigin = 'center';
      if (!bar?.previousElementSibling) return;
      bar.previousElementSibling.style.height = sourceHeight;
    } else {
      bar.nextElementSibling.style.display = 'none';
      if (!bar.getElementsByTagName('path')?.[0]) return;
      bar.getElementsByTagName('path')[0].style.transform = 'rotate(180deg)';
      bar.getElementsByTagName('path')[0].style.transformOrigin = 'center';

      if (!bar?.previousElementSibling) return;
      sourceHeight = bar.previousElementSibling.style.height;
      bar.previousElementSibling.style.height = '100%';
    }
  };

  const renderBar = ({ onMouseDown, ...props }: any) => {
    return (
      <div {...props} style={{ ...splitStyle }}>
        <div onMouseDown={onMouseDown} style={{ ...mouseDownStyle }} />
        {mode === 'horizontal' ? (
          <Tooltip title="切换左侧面板" mouseEnterDelay={0.5}>
            <span className={styles.paneToggleBtnH} onClick={onClickToggleLeftBtn}>
              <CaretLeftOutlined />
            </span>
          </Tooltip>
        ) : (
          <Tooltip title="切换底部面板" mouseEnterDelay={0.5}>
            <span className={styles.paneToggleBtnV} onClick={onClickToggleBottomBtn}>
              <CaretUpOutlined />
            </span>
          </Tooltip>
        )}
      </div>
    );
  };

  return (
    <Split mode={mode} disable={!draggable} visiable={dragVisiable} renderBar={renderBar}>
      {props.children}
    </Split>
  );
};

/**
 * 页面级别下的面板
 * @type PaneContainerPropsType
 * @name width 容器宽度 数字为px
 */
export type PaneContainerPropsType = {
  children?: ReactNode;
  /** @name width 容器宽度 数字为px string 可以是css表达式 */
  width?: number | string;
  /** @name minWidth 容器宽度 数字为px string 可以是css表达式 */
  minWidth?: number | string;
  /** @name height 容器宽度 数字为px string 可以是css表达式 */
  height?: number | string;
  style?: React.CSSProperties;
  /** @name flex flex 为true的会填满其余空间 */
  flex?: true;
};
const PaneContainerPropsDefault: PaneContainerPropsType = {};

export const PaneContainer = (propsDefine: PaneContainerPropsType) => {
  const props = { ...PaneContainerPropsDefault, ...propsDefine };

  const { width, minWidth, height, flex } = props;

  return (
    <div
      className={styles.paneContainer}
      style={{
        width: typeof width === 'number' ? width + 'px' : width,
        minWidth: minWidth === 'number' ? minWidth + 'px' : minWidth,
        height: typeof height === 'number' ? height + 'px' : height,
        flex: flex && 1,
        ...props.style,
      }}
    >
      {props.children}
    </div>
  );
};

export default SplitPane;
