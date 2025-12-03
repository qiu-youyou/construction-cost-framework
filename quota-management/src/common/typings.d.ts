/*
 * @Author: SHUANG
 * @Date: 2022-06-01 15:19:35
 * @LastEditTime: 2023-10-26 10:29:59
 * @Description:
 */

type COMMONROWSITEM = {
  createMan?: string; // 创建人
  createManId?: string; // 创建人ID
  createDatetime?: string; // 创建时间
  updateMan?: string; // 最后修改人
  updateManId?: string; // 最后修改人ID
  updateDatetime?: string; // 最后修改时间
};

// 全局请求函数的通用请求响应体
declare namespace FETCH {
  /** 请求 */
  type Req<PARAMS = any> = {
    pageSize?: number; // 每页大小
    pageNumber?: number; // 当前页码
    searchParams?: string;
  } & PARAMS;

  /** 更新状态时 启用 禁用 删除 */
  type UpStatus = {
    /** 更改状态 */
    ids: string[];
    billStatus?: 3 | 4 | string /** 3 启用 4 禁用 */;
  };

  /** 单元格修改时 */
  type CellEditReq = {
    id: string; // 唯一主键
    filedName: string; // 修改的字段名称
    newValue: string; // 新的值
  };

  type Paste = {
    copyIds: string[];
    actionsType: 'mv' | 'copy';
    option: 'mv' | 'copy';
    currentId?: string | number;
    billSort?: string | number;
  };

  /** 响应 */
  type Res<ROWS = any> = {
    code: string;
    message?: string;
    status: 'SUCCESS' | 'ERROR';
    total?: number;
    rows: ROWS[] & COMMONROWSITEM[];
    other?: {};
  };

  type Row<ROW = any> = {
    code?: string;
    message?: string;
    status?: 'SUCCESS' | 'ERROR';
    total?: number;
    rows: ROW;
    REPAIR_TYPE?: any | any[] | undefined;
  };

  // 下拉选择
  type DropDown<ROWS = any> = {
    itemValue: string;
  };
}

/** 环境变量 dev | mock 模式 */
declare const APP_ENV: 'dev' | 'mock' | false;
declare module '@jiaminghi/data-view-react';
declare module 'luckyexcel';
