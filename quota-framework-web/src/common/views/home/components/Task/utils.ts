/*
 * @Author: SHUANG
 * @Date: 2023-09-12 16:44:53
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-09-14 13:47:52
 * @Description:
 */

/**
 * @Author: SHUANG
 * @Description: 搜索条件提前处理日期格式
 * @Date: 2023-09-12 16:59:55
 */
export const beforeSearchSubmit = (params: any) => {
  const finalParams: { [index: string]: any } = {};
  for (const key in params) {
    if (key !== 'current' && key !== 'pageSize' && key !== '_timestamp')
      if (params?.[key] === 0 || !!params?.[key]) {
        if (key === 'dateTime') {
          finalParams[key + 'Start_'] = params[key]?.[0];
          finalParams[key + 'End_'] = params[key]?.[1];
        } else {
          finalParams[key] = params[key];
        }
      }
  }
  return { ...finalParams };
};
