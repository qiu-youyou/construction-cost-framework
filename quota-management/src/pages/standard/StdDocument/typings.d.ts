/*
 * @Author: SHUANG
 * @Date: 2023-11-10 15:24:29
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-10 15:27:06
 * @Description: 项目相关设计文档目录结构
 */

import React, { Dispatch } from 'react';
import { DocumentDirectoryItem } from './DocumentDirectoryTree/typings';

/**
 * 设计文档库 共享 Props
 * @name documentDirectoryCurrent  文档目录 当前选中
 * @name setDocumentDirectoryCurrent  文档目录 设置当前选中
 */
export type StdDocumentProps = {
  /** 文档目录 当前选中 */
  documentDirectoryCurrent?: DocumentDirectoryItem;
  /** 文档目录 设置当前选中 */
  setDocumentDirectoryCurrent?: Dispatch<React.SetStateAction<DocumentDirectoryItem | undefined>>;
};
