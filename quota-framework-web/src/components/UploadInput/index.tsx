/*
 * @Author: SHUANG
 * @Date: 2022-08-03 13:52:38
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-08-01 17:42:07
 * @Description: 自定义 renderFormItem 模拟 input file
 */
import { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload, UploadProps } from 'antd';
import type { RcFile } from 'antd/es/upload/interface';
import styles from './index.less';

export type UploadInputDefine = {
  value?: { key: string; label: string }[];
  onChange?: (file?: RcFile) => void;
} & UploadProps;

export default (props: UploadInputDefine) => {
  const [fileList, setFileList] = useState([]);
  const { onChange, ...restProps } = props;

  const uploadProps: UploadProps = {
    onRemove: (file: any) => {
      const index = fileList.indexOf(file as never);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
      if (onChange) onChange();
    },
    beforeUpload: (file: RcFile) => {
      setFileList([...fileList, file as never]);
      if (onChange) onChange(file);
      return false;
    },
    ...restProps,
    maxCount: 1,
    fileList,
  };

  return (
    <div className={styles.uploadInputWrapper}>
      <Upload {...uploadProps}>
        {!fileList?.length && (
          <div className={styles.uploadInputButton}>
            <Button icon={<UploadOutlined />}>点击上传文件</Button>
            <span style={{ marginLeft: 10 }}>未选择任何文件</span>
          </div>
        )}
      </Upload>
    </div>
  );
};
