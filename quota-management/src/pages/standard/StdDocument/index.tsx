/*
 * @Author: SHUANG
 * @Date: 2023-11-10 14:55:07
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-17 13:42:26
 * @Description: 项目相关设计文档目录结构
 */
import { useState } from 'react';
import ViewContainer from 'jd-framework-web/package/components/ViewContainer';
import { DocumentDirectoryItem } from './DocumentDirectoryTree/typings';
import DocumentDirectoryTree from './DocumentDirectoryTree';

export default () => {
  /** 当前文档目录 */
  const [documentDirectoryCurrent, setDocumentDirectoryCurrent] = useState<DocumentDirectoryItem>();

  /** 操作栏禁用条件&附件上传条件 */
  // const toolbarDisabled = !documentDirectoryCurrent || !!documentDirectoryCurrent?.children?.length;

  return (
    <ViewContainer>
      <DocumentDirectoryTree
        setDocumentDirectoryCurrent={setDocumentDirectoryCurrent}
        documentDirectoryCurrent={documentDirectoryCurrent}
      />
    </ViewContainer>
  );
};
