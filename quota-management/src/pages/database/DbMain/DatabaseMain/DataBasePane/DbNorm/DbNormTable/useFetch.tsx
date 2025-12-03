/*
 * @Author: SHUANG
 * @Date: 2023-10-18 15:24:59
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-16 16:49:36
 * @Description: 定额明细
 */
import { Modal, message } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

import { DataBaseProps, DatabaseDbItem } from '../../../typings';
import { DbNormProps } from '../typings';
import * as TYPES from './typings';

type Props = { API: any };

export default (props: Props & DbNormProps & DataBaseProps) => {
  const { API } = props;
  const { databaseCurrent, dbChapterCurrent } = props;
  const { dbNormCurrent, dbNormTableRef } = props;
  const { dbNormMatContentTableRef } = props;

  /**
   * @Author: SHUANG
   * @Description: 定额明细查询方法
   * @Date: 2024-03-01 17:55:01
   */
  const fetchDbNormQueryPageInfo = async (p: FETCH.Req<TYPES.DbNormQuery>) => {
    const finalParams: FETCH.Req & Partial<DatabaseDbItem> = { ...p };
    const searchParams = finalParams?.searchParams;
    if (searchParams && searchParams !== '{}') {
      const searchParamsJSON = JSON.parse(searchParams);
      if (searchParamsJSON?.scopeLike != '1') {
        delete finalParams?.chapterId;
      }
      delete searchParamsJSON?.scopeLike;
      finalParams.searchParams = JSON.stringify(searchParamsJSON);
    }
    const res = await API.dbNormQueryPageInfo(finalParams);
    return res;
  };

  /**
   * @Author: SHUANG
   * @Description: 定额明细新增空行
   * @Date: 2024-03-01 17:55:13
   */
  const fetchDbNormPlus = async (params: TYPES.DbNormQuery) => {
    if (!databaseCurrent || !dbChapterCurrent) return message.warning('请选中章节！');
    /** 只有最后一个层级的目录可以进行新增操作 */
    if (!!dbChapterCurrent?.children?.length) {
      const modalInfo = { icon: <InfoCircleOutlined />, content: '当前章节不可新增！' };
      Modal.warning({ ...modalInfo, title: '继续操作', okText: '确定' });
      return;
    }

    const { dbCode, dbSimple, dbPhase } = databaseCurrent;
    const { chapterCode, chapterName, chapterSimple } = dbChapterCurrent;
    const chapterParams = { chapterCode, chapterName, chapterSimple };
    const dbParams = { dbSimple, dbPhase, dbCode };

    return await API.dbNormSaveBlankRow({ ...params, ...chapterParams, ...dbParams });
  };

  /**
   * @Author: SHUANG
   * @Description: 定额明细 粘贴
   * @Date: 2024-03-01 17:55:32
   */
  const fetchDbNormPaste = async (
    params: FETCH.Paste,
    current?: TYPES.DbNormItem,
    actionRows?: TYPES.DbNormItem[],
  ) => {
    /** 原库原章节信息 */
    const actionCurrent = actionRows?.[0];
    if (!actionCurrent) return { status: 'ERROR' };
    if (!dbChapterCurrent) return message.warning('没有目标数据！');

    /** 源册ID 章节ID */
    const { chapterId, dbId } = actionCurrent;
    /** 目标库ID */
    const currentDbId = current?.dbId || dbChapterCurrent?.dbId;
    const chapterSimple = dbChapterCurrent?.chapterSimple;
    /** 目标章节ID */
    const currentChapterId = current?.chapterId || dbChapterCurrent?.id;

    const finalParams: TYPES.DbNormPasteParams = {
      ...params,
      dbId,
      chapterId,
      currentChapterId,
      currentDbId,
      chapterSimple,
    };
    return await API.dbNormPaste(finalParams);
  };

  /**
   * @Author: SHUANG
   * @Description: 借用定额方法
   * @Date: 2024-03-01 17:55:44
   */
  const fetchDbNormBorrowOnSubmit = async (selection?: TYPES.DbNormItem[]) => {
    if (!selection?.length) return;
    const params: FETCH.Paste = {
      copyIds: selection?.map((item) => item.id),
      billSort: dbNormCurrent?.billSort || '',
      currentId: dbNormCurrent?.id || '',
      actionsType: 'copy',
      option: 'copy',
    };
    const res = await fetchDbNormPaste(params, dbNormCurrent, selection);
    if (res?.status === 'SUCCESS') {
      dbNormTableRef?.current?.reload?.();
    }
    return res;
  };

  /**
   * @Author: SHUANG
   * @Description: 系数调整方法
   * @Date: 2024-03-01 17:56:02
   */
  const fetchDbNormCoefficientAdjust = async (
    params: TYPES.DbNormAdjustParams,
    selections?: TYPES.DbNormItem[],
    dirChapterId?: string,
  ) => {
    /** 参数组装 */
    const record = selections?.[0];
    const dbId = record?.dbId || '';
    const chapterId = dirChapterId || '';
    const ids = selections?.map((item) => item.id) || [];

    const finalParams: TYPES.DbNormAdjustParams = { ...params, chapterId, dbId, ids };
    const res = await API.dbNormCoefficientAdjust(finalParams);
    if (res?.status === 'SUCCESS') {
      dbNormMatContentTableRef?.current?.reload?.();
    }
    return res;
  };

  /**
   * @Author: SHUANG
   * @Description: 定额手动计算
   * @Date: 2024-03-01 17:56:10
   */
  const fetchDbNormManualCalculation = async (params: TYPES.DbNormQuery) => {
    const res = await API.dbNormManualCalculation(params);
    if (res?.status === 'SUCCESS') {
      dbNormMatContentTableRef?.current?.reload?.();
    }
    return res;
  };

  return {
    fetchDbNormPlus,
    fetchDbNormPaste,
    fetchDbNormQueryPageInfo,
    fetchDbNormBorrowOnSubmit,
    fetchDbNormCoefficientAdjust,
    fetchDbNormManualCalculation,
  };
};
