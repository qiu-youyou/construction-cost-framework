/*
 * @Author: SHUANG
 * @Date: 2024-02-23 10:36:23
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-02-23 10:39:18
 * @Description: 接口功能
 */
import { ProjectItem } from '@/pages/dbapply/Product/Project/typings';
import { request } from 'umi';

/**
 * @Author: SHUANG
 * @Description: 查询项目信息
 * @Date: 2024-02-23 10:38:23
 */
export async function dataswapQueryCBXXProject(data: FETCH.Req) {
  return request<FETCH.Res<Partial<ProjectItem>>>('/dataswap/queryCBXXProject.action', {
    method: 'POST',
    data,
  });
}
