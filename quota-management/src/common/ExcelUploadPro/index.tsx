/*
 * @Author: SHUANG
 * @Date: 2024-02-27 15:59:00
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-15 13:56:38
 * @Description: EXCEL 导入识别
 */

import { Button, Dropdown } from 'antd';
import { useRef, useState } from 'react';
import { CloudUploadOutlined, DownOutlined } from '@ant-design/icons';
import { BaseDropDownProps } from 'jd-framework-web/package/components/BaseDropDown';
import { BaseModalProps, ModalActionType } from 'jd-framework-web/package/components';
import ModalButton from 'jd-framework-web/package/components/ActionButton/ModalButton';

import { ExcelUploadProProps } from './typings';
import UploadMain from './UploadMain';

export default (props: ExcelUploadProProps) => {
  const importType = props?.importType || 'default';
  /** PROPS TRIGGER */
  const { trigger, triggerText, triggerDisabled } = props;

  /** 弹窗 REF */
  const modalActionRef = props?.modalActionRef || useRef<ModalActionType>();

  /** 是否覆盖导入 */
  const [isCover, setIsCover] = useState<'Y' | 'N'>('N');

  /** 按钮DOM */
  const handleDropItemClick = (key: any) => {
    setIsCover(key);
    modalActionRef?.current?.open?.();
  };

  const buttonDomMenuSet: BaseDropDownProps['menu'] = {
    onClick: ({ key }) => handleDropItemClick(key),
    items: [
      { key: 'N', label: <Button type="link">追加导入</Button> },
      { key: 'Y', label: <Button type="link">覆盖导入</Button> },
    ],
  };

  /** 触发弹窗的 按钮 */
  const triggerButton =
    trigger || importType === 'default' ? (
      <Button className="ImportButton" disabled={triggerDisabled}>
        <CloudUploadOutlined /> {triggerText || '导入'}
      </Button>
    ) : (
      <Dropdown disabled={triggerDisabled} menu={buttonDomMenuSet}>
        <Button className="ImportButton" disabled={triggerDisabled}>
          <CloudUploadOutlined />
          {triggerText || '导入'}
          <DownOutlined />
        </Button>
      </Dropdown>
    );

  /** 弹窗标题 */
  const modalTitle =
    triggerText ||
    '导入EXCEL' + (importType === 'option' ? `${isCover === 'Y' ? ' - 覆盖导入' : ' - 追加导入'}` : '');

  /** EXCEL 导入渲染 */
  const modalRender = (
    <section style={{ height: 540 }}>
      <UploadMain {...props} modalActionRef={modalActionRef} isCover={isCover} />
    </section>
  );

  /** 弹窗配置 */
  const modalProps: BaseModalProps = {
    width: 1200,
    style: { top: 35 },
    keyboardESC: false,
    ...props?.modelProps,
  };

  return (
    <>
      {importType === 'option' && triggerButton}
      <ModalButton
        trigger={importType !== 'option' ? triggerButton : <></>}
        actionRef={modalActionRef}
        determineActionCurrent={false}
        modalTitle={modalTitle}
        modalProps={modalProps}
        render={modalRender}
      />
    </>
  );
};
