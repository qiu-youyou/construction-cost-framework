/*
 * @Author: SHUANG
 * @Date: 2024-02-04 16:49:05
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-02-05 11:56:56
 * @Description: 项目文档库
 */

import { Dispatch, SetStateAction } from 'react';
import { ProjectDocDirectoryItem } from './ProjectDocDirectory/typings';
import { ProjectItem } from '../../Product/Project/typings';

/** 项目文档库 传递 PROPS */
export type ProjectDocProps = {
  /** 当前操作工程 */
  projectActionCurrent?: ProjectItem;

  /** 当前目录、设置当前目录 */
  proDocDirectoryCurrent?: ProjectDocDirectoryItem;
  setProDocDirectoryCurrent?: Dispatch<SetStateAction<ProjectDocDirectoryItem | undefined>>;
};
