/*
 * @Author: SHUANG
 * @Date: 2022-09-04 14:28:24
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-01-18 11:13:11
 * @Description: 查看流程图
 */

import { Button, Tooltip } from 'antd';
import { CSSProperties, ReactNode } from 'react';
import { ClusterOutlined, EyeOutlined } from '@ant-design/icons';

import ModalButton from '../../../components/ActionButton/ModalButton';
import { workflowProcessViewPath } from '@/common/constant/path';
import { getToken } from '../../../utils/auth/authorization';

type Props = {
  button?: 'text' | 'button' | 'icon'; // 按钮渲染成 文字 ｜按钮 ｜ 图标
  setIsOpen?: (v: boolean) => void; // 修复奇怪bug
  processDefinitionId: string; // 流程部署ID
  processInstanceId: string; // 流程实例ID
  current?: any; // 作为按钮使用
};

const iconStyle: CSSProperties = {
  transform: 'translateY(0.5px)',
  fontSize: 16,
};

/** 渲染DOM */
const triggerButtonMap: { [index: string]: ReactNode } = {
  button: (
    <Button className="ButtonCyan">
      <EyeOutlined /> 查看流程图
    </Button>
  ),
  icon: (
    <Tooltip title="查看流程图" mouseEnterDelay={0.5}>
      <ClusterOutlined className="linkAButton" style={iconStyle} />
    </Tooltip>
  ),
  default: (
    <a className="linkAButton" target="_blank" key="l">
      流程图
    </a>
  ),
};

export default (props: Props) => {
  /** 如果不是按钮 必须包含流程参数 */
  if (props.button !== 'button') {
    if (!props?.processInstanceId || !props?.processDefinitionId) return <></>;
  }

  /** 触发按钮 */
  const trigger = triggerButtonMap[props?.button || 'default'];

  /** 处理 modelImage 参数 */
  const getIframeSrc = () => {
    const { processInstanceId, processDefinitionId } = props;
    const urlQuery = `processInstanceId=${processInstanceId}&processDefinitionId=${processDefinitionId}&Token=${getToken()}`;
    const iframeSrc = `${workflowProcessViewPath}?${urlQuery}`;
    return iframeSrc;
  };

  /** beforeOpen afterClose 修复了很奇怪的bug 不要觉得没用 */
  const beforeOpen = () => {
    props?.setIsOpen?.(true);
  };
  const afterClose = () => {
    props?.setIsOpen?.(false);
  };

  return (
    <ModalButton
      trigger={trigger}
      modalTitle="查看流程图"
      current={props.current}
      determineActionCurrent={props.button == 'button'}
      modalProps={{
        wrapClassName: 'COMMON_PROCESS_PROCESSCHART_WRAPMODAL',
        beforeOpen,
        afterClose,
        width: 800,
      }}
      render={
        <section style={{ height: 800 }}>
          <iframe style={{ width: '100%', height: '100%' }} src={getIframeSrc()} />
        </section>
      }
    />
  );
};
