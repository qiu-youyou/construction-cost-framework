/*
 * @Author: SHUANG
 * @Date: 2022-07-12 10:15:10
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-30 11:43:10
 * @Description:
 */
import { ReactNode, useRef, useState } from 'react';
import { ArrowsAltOutlined, ShrinkOutlined } from '@ant-design/icons';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';

/** from components */
import { Resizable, ResizeCallbackData } from 'react-resizable';
import { BaseModalProps } from './typings';
import { throttle } from 'lodash';

const useModalRender = (props: BaseModalProps) => {
  /** draggleRef */
  const draggleRef = useRef<HTMLDivElement>(null);
  /** 为true 将不会进行任何拖拽 */
  const [dragDisabled, setDragDisabled] = useState<boolean>(true);
  /** 拖拽边界 */
  const [bounds, setBounds] = useState({ left: 0, top: 0, bottom: 0, right: 0 });
  /** 是否全屏幕 */
  const [fullscreened, setFullscreened] = useState<boolean>(!!props.defaultFullScreen);

  /** 弹窗动态 宽度、高度 */
  const [resizableWidth, setResizableWidth] = useState<number>(props?.width || 458);
  const [resizableHeight, setResizableHeight] = useState<number>(0);

  /** 切换全屏幕 */
  const toggleModalFullScreen = () => {
    setFullscreened(!fullscreened);
    if (fullscreened) setBounds({ left: 0, top: 0, bottom: 0, right: 0 });
  };

  const Shrink = <ShrinkOutlined className="ArrowsShrinkIcon" />;
  const Arrows = <ArrowsAltOutlined className="ArrowsShrinkIcon" />;

  const renderTitle = (
    <div
      style={{ cursor: 'move' }}
      onMouseOver={(_) => dragDisabled && setDragDisabled(false)}
      onMouseOut={(_) => setDragDisabled(true)}
    >
      <span>{props.title}</span>
      <span onClick={toggleModalFullScreen}>{fullscreened ? Shrink : Arrows}</span>
    </div>
  );

  const onStart = (_event: any, uiData: DraggableData) => {
    const { clientWidth, clientHeight } = window.document.documentElement;
    const targetRect = draggleRef.current?.getBoundingClientRect();
    if (_event?.target?.style?.cursor !== 'move') return;
    if (!targetRect) return;
    // 如果是拖拽改变大小 不处理
    const modalWrapRefElAll = document.querySelectorAll('.ant-modal-root')!;
    const modalWrapRefEl = modalWrapRefElAll[modalWrapRefElAll.length - 1];
    const modalWrapEl = modalWrapRefEl.querySelector<HTMLDivElement>('.ant-modal-wrap');
    const cursor = modalWrapEl?.style?.cursor;
    if (cursor !== 'auto' && cursor !== '') {
      return;
    }
    setBounds({
      left: -targetRect.left + uiData.x,
      right: clientWidth - (targetRect.right - uiData.x),
      top: -targetRect.top + uiData.y,
      bottom: clientHeight - (targetRect.bottom - uiData.y),
    });
  };

  const onResize = (e: any, data: ResizeCallbackData) => {
    /** 阻止滚动条 */
    e?.stopPropagation();
    /** 全屏幕不生效 */
    if (fullscreened) return;
    /** 控制最小宽度 */
    if (data?.size?.width > 240) {
      setResizableWidth(data?.size?.width);
    }

    if (resizableHeight < 10) {
      /** 窗口默认高度为 鼠标点击位置 减去 弹窗距离 窗口的 TOP ，默认为 100 */
      const calcHeight = e?.pageY - (props?.style?.top || 100);
      setResizableHeight(calcHeight);
    } else {
      if (data?.size?.height > 200) {
        setResizableHeight(data?.size?.height);
      }
    }
  };

  /** 自定义渲染对话框  支持拖拽 */
  const modalRender = (modal: ReactNode) => (
    <Draggable
      bounds={bounds}
      disabled={fullscreened || dragDisabled}
      onStart={(event, uiData) => onStart(event, uiData)}
    >
      <div ref={draggleRef}>
        <Resizable
          className="react-resizable-handle-modal"
          width={resizableWidth}
          height={resizableHeight}
          onResize={throttle(onResize, 1000)}
        >
          {modal}
        </Resizable>
      </div>
    </Draggable>
  );

  const className = [
    fullscreened ? 'ModalFullScreen' : '',
    props.noFooter ? 'NoFooter' : '',
    props.submiterAsHeader ? 'SubmiterAsHeader' : '',
  ].join(' ');

  return {
    renderTitle,
    resizableHeight,
    resizableWidth,
    fullscreened,
    modalRender,
    className,
  };
};

export default useModalRender;
