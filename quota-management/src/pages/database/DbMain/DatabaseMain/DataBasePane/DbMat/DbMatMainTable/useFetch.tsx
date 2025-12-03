/*
 * @Author: SHUANG
 * @Date: 2023-10-21 15:14:19
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-05 11:22:36
 * @Description: MAT明细
 */
import { Modal, message } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { DbMatClassifyItem } from '../DbMatClassifyTree/typings';
import * as TYPES from './typings';

type Props = { API: any } & TYPES.DbMatProps;

export default (props: Props) => {
  const { API } = props;
  const { classifyRjcType } = props;

  /** MAT 明细查询方法 确定查询范围 */
  const fetchDbMatQueryPageInfo = async (p: FETCH.Req<TYPES.DbMatQuery>) => {
    const finalParams: FETCH.Req & Partial<TYPES.DbMatItem> = { ...p, classifyRjcType };

    if (finalParams?.searchParams && finalParams?.searchParams !== '{}') {
      const searchParams = JSON.parse(finalParams?.searchParams);
      if (searchParams?.scopeLike != '1') {
        delete finalParams?.classifyId;
      }
      delete searchParams?.scopeLike;
      finalParams.searchParams = JSON.stringify(searchParams);
    }
    const res = await API.dbMatQueryPageInfo(finalParams);
    return res;
  };

  /** 增加行 */
  const handleDbMatMainPlus = async (
    params: TYPES.DbMatQuery,
    dbMatCurrent?: TYPES.DbMatItem,
    dbMatClassifyCurrent?: DbMatClassifyItem,
  ) => {
    let matRjcType: TYPES.DbMatRjcType | '' = '';
    if (!dbMatClassifyCurrent) return message.warning('请选择目录！');

    /** 只有最后一个层级的目录可以进行新增操作 */
    if (!!dbMatClassifyCurrent?.children?.length) {
      const modalInfo = {
        icon: <InfoCircleOutlined />,
        content: '当前章节不可新增！',
        title: '继续操作',
        okText: '确定',
      };
      Modal.warning(modalInfo);
      return;
    }

    /** 非定额章节目录  rcj[人材机]、machine[机械台班]、concrete[混凝土]  */
    if (classifyRjcType === 'rcj') {
      const { classifyCode, classifyCodeParent } = dbMatClassifyCurrent;
      const ifCode = classifyCodeParent || classifyCode;
      if (ifCode === 'man') matRjcType = '1';
      if (ifCode === 'mat') matRjcType = '2';
      if (ifCode === 'mac') matRjcType = '3';
    }
    if (classifyRjcType === 'machine') matRjcType = '4';
    if (classifyRjcType === 'concrete') matRjcType = '5';
    if (!matRjcType) return message.warning('请选择正确的目录类型！');

    const finalParams: TYPES.DbMatSaveParams = { ...params, matRjcType };

    return await API.dbMatSaveBlankRow(finalParams);
  };

  /** MAT明细粘贴操作 */
  const handleDbMatMainPaste = async (
    params: FETCH.Paste,
    current?: TYPES.DbMatItem,
    actionRows?: TYPES.DbMatItem[],
    dbMatClassifyCurrent?: DbMatClassifyItem,
    other?: unknown,
  ) => {
    /** 原库原章节信息 */
    const actionCurrent = actionRows?.[0];
    if (!actionCurrent) return { status: 'ERROR' };
    if (!dbMatClassifyCurrent) return message.warning('没有目标数据！');

    /** 源册ID 章节ID */
    const { classifyId, dbId } = actionCurrent;
    /** 目标库ID */
    const currentDbId = current?.dbId || dbMatClassifyCurrent?.dbId;
    /** 目标章节ID */
    const currentClassifyId = current?.classifyId || dbMatClassifyCurrent?.id;

    const finalParams: TYPES.DbMatPasteParams = {
      ...params,
      dbId,
      classifyId,
      currentClassifyId,
      currentDbId,
    };
    return await API.dbMatPaste(finalParams);
  };

  return {
    fetchDbMatQueryPageInfo,
    handleDbMatMainPlus,
    handleDbMatMainPaste,
  };
};
