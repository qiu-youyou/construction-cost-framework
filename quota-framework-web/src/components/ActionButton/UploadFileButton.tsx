/*
 * @Author: SHUANG
 * @Date: 2022-08-21 09:56:12
 * @LastEditors: lmc 1551943635@qq.com
 * @LastEditTime: 2023-11-16 14:21:51
 * @Description: 导入文件按钮
 */

import { useRef, useState } from 'react';
import { Button, Dropdown, message, Upload } from 'antd';
import { CloudDownloadOutlined, CloudUploadOutlined, DownOutlined, InboxOutlined } from '@ant-design/icons';
import { UploadFile, UploadProps } from 'antd/lib/upload/interface';

/** from components */
import { ModalActionType } from '../BaseModal/typings';
import { BaseDropDownProps } from '../BaseDropDown';
import { ActionButtonProps } from './typings';
import BaseModal from '../BaseModal';

const { Dragger } = Upload;

const defaultProps: ActionButtonProps = {
  buttonText: '导入',
  triggerType: 'modal',
  importType: 'default',
  multiple: false,
  idsKey: 'id',
  accept: '',
};

export default (prop: ActionButtonProps) => {
  const props = { ...defaultProps, ...prop };
  const actionRef = useRef<ModalActionType>();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const [isCover, setIsCover] = useState<'Y' | 'N'>('N'); // Y 覆盖导入

  /** 点击按钮 */
  const ButtonDomOnClick = async () => {
    if (props.triggerType === 'modal') {
      if (!actionRef?.current?.open) return;
      actionRef?.current?.open();
      return;
    }
    if (!props?.onSubmit) return;
    const res = await props.onSubmit({
      parentId: props.current?.[props.idsKey || ''] || 0,
      ...props.params,
    });

    if (res?.status !== 'SUCCESS') return;
    message.success(res?.message || '操作成功');
    /** 默认传递刷新方法 */
    if (props.onRefresh) {
      props.onRefresh();
    }
    if (props.onSubmitFinish) {
      props.onSubmitFinish(props.onRefresh);
    }
  };

  /** 按钮DOM */
  const handleDropItemClick = (key: any) => {
    setIsCover(key);
    actionRef?.current?.open?.();
  };

  const buttonDomMenuSet: BaseDropDownProps['menu'] = {
    onClick: ({ key }) => handleDropItemClick(key),
    items: [
      { key: 'N', label: <Button type="link">追加导入</Button> },
      { key: 'Y', label: <Button type="link">覆盖导入</Button> },
    ],
  };

  const ButtonDom = props.trigger ? (
    <span onClick={ButtonDomOnClick}>{props.trigger}</span>
  ) : props?.importType === 'default' ? (
    <Button className="ImportButton" disabled={props?.disabled} onClick={ButtonDomOnClick}>
      <CloudUploadOutlined />
      {props.buttonText}
    </Button>
  ) : (
    <Dropdown disabled={props.disabled} menu={buttonDomMenuSet}>
      <Button className="ImportButton">
        <CloudUploadOutlined />
        {props.buttonText}
        <DownOutlined />
      </Button>
    </Dropdown>
  );

  /** 文件发生改变 可控的 fileList */
  const handleChange: UploadProps['onChange'] = (info) => {
    let newFileList = [...info.fileList];

    // 1. Limit the number of uploaded files
    // Only to show two recent uploaded files, and old ones will be replaced by the new
    // 限制上载的文件数;

    // 仅显示两个最近上载的文件，旧文件将替换为新文件
    if (!props.multiple) {
      newFileList = newFileList.slice(-1);
    }

    // 2. 读取响应并显示文件链接
    newFileList = newFileList.map((file) => {
      // 组件将显示文件。url作为链接
      if (file.response) {
        file.url = file.response.url;
      }
      return file;
    });

    setFileList(newFileList);
  };

  /** 提交方法 */
  const handleOnSubmit = async () => {
    if (fileList?.length === 0) return message.warning('暂无文件可上传！');
    const formData = new FormData();
    fileList?.forEach((file) => formData.append('file', file?.originFileObj || ''));
    // 其余参数
    for (const key in props.params) {
      formData.append(key, props?.params[key]);
    }
    for (const key in props?.uploadParams) {
      formData.append(key, props?.uploadParams[key]);
    }
    if (props?.importType === 'option') {
      formData.append('isCover', isCover);
    }
    if (!props?.onSubmit) return true;
    const res = await props.onSubmit(formData);
    if (res?.status !== 'SUCCESS') return false;
    message.success(res?.message || '操作成功');
    setFileList([]);
    // 默认传递刷新方法
    if (props.onRefresh) {
      props.onRefresh();
    }
    if (props.onSubmitFinish) {
      props.onSubmitFinish(props.onRefresh);
    }
    if (!actionRef?.current?.close) return true;
    actionRef?.current?.close();
    return true;
  };

  /** 上传前 */
  const beforeUpLoad = (file: any) => {
    if (!fileList?.length) return false;
    setFileList([...fileList, file]);
    return false;
  };

  return (
    <>
      {ButtonDom}

      <BaseModal
        width={480}
        actionRef={actionRef}
        title={props.modalTitle || props.buttonText}
        onSubmit={handleOnSubmit}
        {...props.modalProps}
      >
        <section className="JDUploadFileDraggerContainer" style={{ padding: 10, height: 320 }}>
          <div style={{ height: 200 }}>
            <Dragger
              multiple={props.multiple}
              onChange={handleChange}
              fileList={fileList}
              beforeUpload={beforeUpLoad}
              accept={props.accept}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">单击或拖动文件到该区域进行上传</p>
              <p className="ant-upload-hint">
                {/* 支持单次或批量上传。严禁上传公司数据或其他文件 */}
                {/* 严禁上传公司数据或其他文件 */}
              </p>
            </Dragger>
          </div>
        </section>
      </BaseModal>
    </>
  );
};
