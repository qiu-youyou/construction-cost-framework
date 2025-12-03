/*
 * @Author: SHUANG
 * @Date: 2023-10-16 08:56:18
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-15 15:22:20
 * @Description: 系统导出方法
 */

/**
 * @Author: SHUANG
 * @Description: 导出方法
 * @Date: 2023-11-24 15:16:46
 */
export async function jondaReportExcel(data: any, url?: string) {
  const params = { ...data };
  delete params.current;
  if (params?.exportAll === 'Y') {
    delete params.pageSize;
    delete params.pageNumber;
  }
  let finalParams = '';
  for (const key in params) {
    if (key === 'searchParams' && !!params?.searchParams) {
      const searchParams = JSON.parse(params.searchParams);
      delete searchParams?.scopeLike;
      finalParams += `&${key}=${encodeURIComponent(JSON.stringify(searchParams))}`;
    } else {
      if (!!params[key]) {
        finalParams += `&${key}=${params[key]}`;
      }
    }
  }
  window.open(`${url || '/jonda/report/excel'}?${finalParams}`);

  // return request<FETCH.Res>('/jonda/report/excel', {
  //   method: 'GET',
  //   responseType: 'blob',
  //   getResponse: true,
  //   data: { ...data, _u: 'file:4f6478ffdf9f43f5a382eab2909b1b9c.ureport.xml' },
  // });
}
