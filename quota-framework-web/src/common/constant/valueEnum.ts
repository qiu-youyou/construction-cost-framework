import { ReactNode } from 'react';

/**
 * @name text 显示文字
 * @name status 描述状态
 * @name color 描述颜色
 * @name describe 其他描述
 */

export type ColorDefine =
  | 'magenta'
  | 'red'
  | 'volcano'
  | 'orange'
  | 'gold'
  | 'lime'
  | 'green'
  | 'cyan'
  | 'blue'
  | 'geekblue'
  | 'purple';

export type Enum = {
  [key: string]: {
    text?: ReactNode;
    color?: ColorDefine;
    status?: 'Success' | 'Error' | 'Processing' | 'Warning' | 'Default';
    describe?: 'EnableStatus' | 'DisableStatus' | 'SaveStatus';
  };
};

/** 状态枚举 */
const ENUMBILLSTATUS: Enum = {
  0: { text: '保存', status: 'Processing', color: 'blue', describe: 'SaveStatus' },
  3: { text: '启用', status: 'Success', color: 'green', describe: 'EnableStatus' },
  4: { text: '禁用', status: 'Warning', color: 'orange', describe: 'DisableStatus' },
  '': { text: '保存', status: 'Processing', color: 'blue', describe: 'SaveStatus' },
};

/** ENUMISSWITCH 启用 禁用 */
const ENUMISSWITCH: Enum = { 启用: { text: '启用' }, 禁用: { text: '禁用' } };

/** 显示隐藏 */
const ENUMSHOW: Enum = {
  显示: { text: '显示', status: 'Processing' },
  不显示: { text: '隐藏', status: 'Default' },
};

/** 是否 */
const ENUMISNO: Enum = {
  Y: { text: '是' },
  N: { text: '否' },
};

/** 是否 */
const ENUMISSHOW: Enum = {
  是: { text: '显示', status: 'Processing' },
  否: { text: '隐藏', status: 'Default' },
};

/** 组织机构类型 */
const ENUMORGTYPE: Enum = {
  集团: { text: '集团' },
  '公司(总厂)': { text: '公司(总厂)' },
  分厂: { text: '分厂' },
  部门: { text: '部门' },
  岗位: { text: '岗位' },
};

/** 角色类型 */
const ENUMROLETYPE: Enum = {
  4: { text: '系统角色', color: 'geekblue' },
  3: { text: '流程角色', color: 'cyan' },
  0: { text: '普通角色', color: 'blue' },
};

/** 性别 */
const ENUMUSERSEX: Enum = {
  男: { text: '男', color: 'geekblue' },
  女: { text: '女', color: 'magenta' },
};

/** 证件类型 */
const ENUMIDCARDTYPE: Enum = {
  身份证: { text: '身份证' },
  护照: { text: '护照' },
  港澳通行证: { text: '港澳通行证' },
};

/** 链接打开类型 */
const ENUMOPENTYPE: Enum = {
  blank: { text: '外链' },
  self: { text: '内链' },
};

/** 工作日｜节假日 */
const ENUMWORKDAY: Enum = { Y: { text: '工作日' }, N: { text: '休息日' } };

/** 高级查询值 类型 */
const ENUMFIELDTYPE: Enum = {
  string: { text: '字符串' },
  number: { text: '数字' },
  date: { text: '日期' },
};

/** 公告类型 */
const ENUUMNEWSTYPE: Enum = {
  PUBLIC: { text: '公共' },
  PRIVATE: { text: '私有' },
};
/** 流程类型 */
const ENUMPROCESSENUM: Enum = {
  已保存: { text: '已保存', color: 'blue' },
  审核中: { text: '审核中', color: 'gold' },
  提交中: { text: '提交中', color: 'cyan' },
  已完成: { text: '已完成', color: 'green' },
  被退回: { text: '被退回', color: 'red' },
};

const ENUMPROCESSSTATUS: Enum = {
  0: { text: '已保存', color: 'blue' },
  1: { text: '审核中', color: 'gold' },
  2: { text: '已完成', color: 'green' },
  4: { text: '待办', color: 'green' },
};

const ENUMDUE: Enum = {
  0: { text: '已超期', color: 'blue' },
  1: { text: '未超期', color: 'gold' },
};

/** 签证 / 明细 */
const ENUMBILLTYPE: Enum = {
  V: { text: '签证', color: 'geekblue' },
  D: { text: '明细', color: 'blue' },
  P: { text: '定价', color: 'cyan' },
};

const ENUMDELETESTATUS: Enum = {
  0: { text: ' ' },
  1: { text: '已删除', status: 'Error' },
};

/** 查询日期纬度 */
const ENUMDATEDIMENSION = {
  year: '年度',
  month: '月度',
  quarter: '季度',
};

export {
  /** 状态枚举 */
  ENUMBILLSTATUS,
  /** 是否 */
  ENUMISNO,
  /** 显示隐藏 */
  ENUMSHOW,
  ENUMISSHOW,
  /**  启用 禁用 */
  ENUMISSWITCH,
  /** 组织机构类型 */
  ENUMORGTYPE,
  /** 角色类型 */
  ENUMROLETYPE,
  /** 性别 */
  ENUMUSERSEX,
  /** 连接打开方式 */
  ENUMOPENTYPE,
  /** 工作日｜节假日 */
  ENUMWORKDAY,
  /** 高级查询可选值类型 */
  ENUMFIELDTYPE,
  /** 公告类型 */
  ENUUMNEWSTYPE,
  /** 证件类型 */
  ENUMIDCARDTYPE,
  /** 流程类型 */
  ENUMPROCESSENUM,
  ENUMPROCESSSTATUS,
  /** 是否抄起 */
  ENUMDUE,
  /** 签证 / 明细 */
  ENUMBILLTYPE,
  /** 删除状态 */
  ENUMDELETESTATUS,
  /** 日期纬度 */
  ENUMDATEDIMENSION,
};
