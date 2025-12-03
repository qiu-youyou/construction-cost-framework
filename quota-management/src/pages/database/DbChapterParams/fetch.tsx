/*
 * @Author: SHUANG
 * @Date: 2023-11-02 17:39:50
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-27 14:24:17
 * @Description: 定额章节 - 定额章节参数
 */

import { message } from 'antd';
import { dbChapterParamsQueryPageInfo, dbChapterParamsSave } from './services';
import { DbChapterParamsItem, DbChapterParamsQuery, DbChapterParamsSave } from './typings';

/**
 * @Author: SHUANG
 * @Description: 查询方法
 * @Date: 2023-11-02 17:43:46
 */
export const fetchDbChapterParamsQueryPageInfo = async (params: FETCH.Req<DbChapterParamsQuery>) => {
  const res = await dbChapterParamsQueryPageInfo(params);

  // 递归处理 、处理参数
  const handleRow = (rows: any[], parentIndex?: number | string) => {
    rows.forEach((item) => {
      const paramsNames = item?.paramsNames;
      for (let i = 0; i < 5; i++) {
        item[i + 1 + ''] = paramsNames?.[i] || '';
      }
      if (!!item?.children?.length) {
        handleRow(item.children);
      }
    });
  };
  handleRow(res?.rows);
  return res;
};

/**
 * @Author: SHUANG
 * @Description: 设置参数 行编辑方法
 * @Date: 2023-11-02 18:24:18
 * @name params 行编辑默认参数
 * @name queryParams 关联的查询参数
 * @name chapterParamsCurrent 当前 章节
 */
export const fetchDbChapterParamsSave = async (
  params: FETCH.CellEditReq,
  queryParams?: DbChapterParamsQuery,
  cellParams?: DbChapterParamsQuery,
  chapterParamsCurrent?: DbChapterParamsItem,
) => {
  if (!chapterParamsCurrent) return message.warning('请选择章节！');
  const finalParams: DbChapterParamsSave = {
    dbId: chapterParamsCurrent?.dbId, // 数据库ID
    chapterId: chapterParamsCurrent?.id, // 章节ID
    id: params.filedName, // 修改参数一类型 id =1 以此类推
    paramsName: params.newValue, // 修改字符串
    billSort: params.filedName, // 修改参数一类型 billSort =1 以此类推
  };

  const res = await dbChapterParamsSave(finalParams);
  return res;
};
