/*
 * @Author: SHUANG
 * @Date: 2023-10-20 14:14:20
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-14 16:55:50
 * @Description: 定额库(人材机 机械台班 混凝土配合比) 明细对应含量
 */

/** 定额库(人材机 机械台班 混凝土配合比) 含量数据查询参数 */
export type DbMatContentQuery = {
  dbId: string; // 定额库ID
  classifyId: string; // 目录id
  matId: string; // 人材机ID
};

/** 定额库(人材机 机械台班 混凝土配合比) 含量数据数据项目 */
export type DbMatContentItem = {
  id: string; // 人材机含量明细ID
  dbId: string; // 定额库ID
  classifyId: string; // 目录id
  matId: string; // 人材机ID
  matCode: string; // 材料编码
  matName: string; // 材料名称
  matUnit: string; // 材料单位
  matPrice: string; // 材料单价
  matAmout: string; // 材料含量
  matRjcType: string; // 人材机类型(1[人工]、2[材料]、3[机械])
  matLog: string; // 定额修改记录
  matCodeOld: string; // 材料编码(老的)
  matNameOld: string; // 材料名称(老的)
  matUnitOld: string; // 材料单位(老的)
  matPriceOld: string; // 材料单价(老的)
  matAmoutOld: string; // 材料含量(老的)
  matRjcTypeOld: string; // 人材机类型(1[人工]、2[材料]、3[机械])(老的)
  sourceId: string; // 来源主键
  sourceDbId: string; // 来源定额库ID
  sourceClassifyId: string; // 来源目录id
  sourceMatId: string; // 来源人材机
  billSort: string;
};

/** 人材机选择明细表 查询参数 */
export type MatMainNotExistsMatQuery = {
  classifyId: string; // 人材机的目录id
  dbId: string; // 人材机的库id
  machineMatId: string; // 机械台班/混凝土的明细id
  machineClassifyId: string; // 机械台班/混凝土的目录id
};

/** 人材机选择添加到含量表 参数 */
export interface DbMatContentSaveSelectMatDetailParams {
  dbId: string; // 库id
  selectIds: string[]; //	选择的导入行ids
  matId: string; // 当前页面明细行id
  classifyId: string; // 当前页面明细的目录id
  currentId?: string; // 要放在什么含量后面的id
  billSort?: string;
}
