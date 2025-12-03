/*
 * @Author: SHUANG
 * @Date: 2024-01-18 09:52:20
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-02-05 17:33:43
 * @Description: 工程造价-造价编制-工程量指标汇总
 */

/** 工程造价-造价编制-工程量指标汇总 查询 */
export type SubindexSummaryQuery = {
  projectId: string; // 项目id
  stageId: string; // 阶段id
};

/** 工程造价-造价编制-工程量指标汇总 数据项 */
export type SubindexSummaryItem = {
  id: string; //	无
  indexAmount: string; //	指标数量
  indexCode: string; //	指标编码
  indexName: string; //	指标名称
  indexPrice: string; //	单价
  indexTotal: string; //	合价
  indexUnit: string; //	指标单位
};
