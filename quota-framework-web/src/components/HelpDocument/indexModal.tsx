/*
 * @Author: SHUANG
 * @Date: 2023-04-18 13:34:48
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-09-22 15:26:51
 * @Description: 帮助文档
 */
import { Tooltip } from 'antd';
import { FileTextOutlined } from '@ant-design/icons';
import { businessexcelDocumentPlay } from './services';

/** from components */
import ModalButton from '../ActionButton/ModalButton';

type Props = { moduleKey: string };

export default (props: Props) => {
  if (!props.moduleKey) return <></>;

  // 获取 PDF 文件的二进制流数据
  const handleClickToGuideDocuments = async () => {
    const res: any = await businessexcelDocumentPlay({ fileType: props.moduleKey });
    const pdfUrl = window.URL.createObjectURL(res.data);
    // const url = URL.createObjectURL(blob);
    // 在 embed 标签中展示 PDF 文件
    const embedElement = document.createElement('embed');
    embedElement.src = pdfUrl;

    document.getElementById('help_guide_preview_docs')?.appendChild(embedElement);
    // 打开一个窗口预览文件
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

  return (
    <ModalButton
      trigger={trigger}
      modalTitle="帮助文档"
      modalProps={{ width: 800, defaultFullScreen: true }}
      render={
        <section id="help_guide_preview_docs" style={{ height: 400, paddingLeft: 4, paddingRight: 4 }} />
      }
    />
  );
};
