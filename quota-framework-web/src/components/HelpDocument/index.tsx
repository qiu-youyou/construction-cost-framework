/*
 * @Author: SHUANG
 * @Date: 2023-04-18 13:34:48
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-09-19 18:21:17
 * @Description: 帮助文档
 */
import { Tooltip } from 'antd';
import { FileTextOutlined } from '@ant-design/icons';
import { businessexcelDocumentPlay } from './services';

type Props = { moduleKey: string };

export default (props: Props) => {
  if (!props.moduleKey) return <></>;

  // 获取 PDF 文件的二进制流数据
  const handleClickToGuideDocuments = async () => {
    const res: any = await businessexcelDocumentPlay({ fileType: props.moduleKey });
    if (!res) return;
    const pdfUrl = window.URL.createObjectURL(res?.data);
    const linka = document.createElement('a');
    linka.href = pdfUrl;
    linka.target = '_blank';
    linka.click();
  };

  const trigger = (
    <Tooltip placement="top" title="帮助文档">
      <FileTextOutlined
        className="ant-pro-table-list-toolbar-setting-item"
        onClick={handleClickToGuideDocuments}
      />
    </Tooltip>
  );

  return trigger;
};
