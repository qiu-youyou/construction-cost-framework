/*
 * @Author: SHUANG
 * @Date: 2024-02-28 17:20:13
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-15 16:11:39
 * @Description: EXCEL 高级导入 选择结构范围
 */
import { request } from 'umi';
import { ExcelMatchInfoJSON } from './typings';

/**
 * @Author: SHUANG
 * @Description: 系统获取EXCEL匹配结果
 * @Date: 2024-03-13 15:49:04
 */
export async function sysCommonExcelUploadProGetMatchExcelInfo(data: FormData) {
  return request<FETCH.Row<ExcelMatchInfoJSON>>('/jonda/report/excel/match/firstMatchExcel.action', {
    requestType: 'form',
    method: 'POST',
    data,
  });
}
