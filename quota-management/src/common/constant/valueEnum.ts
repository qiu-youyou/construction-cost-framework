import { JDCMDVALUEENUM } from 'jd-framework-web/package/common';

/**
 * @name text 显示文字
 * @name status 描述状态
 * @name color 描述颜色
 * @name describe 其他描述
 */

type ColorDefine = JDCMDVALUEENUM.ColorDefine;

export type Enum = JDCMDVALUEENUM.Enum;

/** 状态枚举 */
const ENUMBILLSTATUS: Enum = JDCMDVALUEENUM.ENUMBILLSTATUS;

/** ENUMISSWITCH 启用 禁用 */
const ENUMISSWITCH: Enum = JDCMDVALUEENUM.ENUMISSWITCH;

/** 显示隐藏 */
const ENUMSHOW: Enum = JDCMDVALUEENUM.ENUMSHOW;

/** 是否 */
const ENUMISNO: Enum = JDCMDVALUEENUM.ENUMISNO;

/** 是否 */
const ENUMISSHOW: Enum = JDCMDVALUEENUM.ENUMISSHOW;

/** 组织机构类型 */
const ENUMORGTYPE: Enum = JDCMDVALUEENUM.ENUMORGTYPE;

/** 角色类型 */
const ENUMROLETYPE: Enum = JDCMDVALUEENUM.ENUMROLETYPE;

/** 性别 */
const ENUMUSERSEX: Enum = JDCMDVALUEENUM.ENUMUSERSEX;

/** 证件类型 */
const ENUMIDCARDTYPE: Enum = JDCMDVALUEENUM.ENUMIDCARDTYPE;

/** 链接打开类型 */
const ENUMOPENTYPE: Enum = JDCMDVALUEENUM.ENUMOPENTYPE;

/** 工作日｜节假日 */
const ENUMWORKDAY: Enum = JDCMDVALUEENUM.ENUMWORKDAY;

/** 高级查询值 类型 */
const ENUMFIELDTYPE: Enum = JDCMDVALUEENUM.ENUMFIELDTYPE;

/** 公告类型 */
const ENUUMNEWSTYPE: Enum = JDCMDVALUEENUM.ENUUMNEWSTYPE;

/** 流程类型 */
const ENUMPROCESSENUM: Enum = JDCMDVALUEENUM.ENUMPROCESSENUM;

const ENUMPROCESSSTATUS: Enum = JDCMDVALUEENUM.ENUMPROCESSSTATUS;

const ENUMDUE: Enum = JDCMDVALUEENUM.ENUMDUE;

/** 签证 / 明细 */
const ENUMBILLTYPE: Enum = JDCMDVALUEENUM.ENUMBILLTYPE;

const ENUMDELETESTATUS: Enum = JDCMDVALUEENUM.ENUMDELETESTATUS;

/** 查询日期纬度 */
const ENUMDATEDIMENSION = JDCMDVALUEENUM.ENUMDATEDIMENSION;

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
