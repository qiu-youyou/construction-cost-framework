/*
 * @Author: SHUANG
 * @Date: 2024-02-27 17:52:48
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-15 09:21:11
 * @Description: EXCEL 高级导入 导入文件
 */
import { UploadProps, Typography } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import Dragger from 'antd/lib/upload/Dragger';
import { ExcelUploadProPropsContent } from '../typings';

export default (props: ExcelUploadProPropsContent) => {
  /** PROPS 文件列表 */
  const { fileSourceList } = props;
  const { setFileSourceList } = props;

  const { sheetScopeMatching, setWorkbookInfo } = props;

  /** 文件发生改变 可控的 fileList */
  const handleChange: UploadProps['onChange'] = (info) => {
    let fileList = [...info.fileList];

    // 仅显示两个最近上载的文件，旧文件将替换为新文件
    fileList = fileList.slice(-1);

    //  读取响应并显示文件链接 组件将显示文件。url作为链接
    fileList = fileList.map((file) => {
      if (file.response) {
        file.url = file.response.url;
      }
      return file;
    });

    /** 清空已选择专业的对应关系 */
    sheetScopeMatching?.clear();
    setWorkbookInfo?.(undefined);
    setFileSourceList?.(fileList);
  };

  return (
    <section
      style={{ width: 900, margin: '20px auto 60px auto', padding: 10, height: 320 }}
      className="JDUploadFileDraggerContainer"
    >
      <Typography.Title level={5}>上传EXCEL文件</Typography.Title>
      <div style={{ height: 250 }}>
        <Dragger fileList={fileSourceList} onChange={handleChange} accept=".xls,.xlsx" multiple={false}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">单击或拖动文件到该区域进行上传</p>
          <p className="ant-upload-hint">只可上传 .xlsx 文件</p>
        </Dragger>
      </div>
    </section>
  );
};
