import { deviceMatDetailQueryPageInfo } from './services';
import * as TYPES from './typings';

/**
 * @Author: SHUANG
 * @Description: 查询方法 确定查询范围
 * @Date: 2023-11-24 15:32:11
 */
export const fetchDeviceMatDetailQueryPageInfo = async (p: FETCH.Req<TYPES.DeviceMatDetailQuery>) => {
  const finalParams: FETCH.Req & Partial<TYPES.DeviceMatDetailItem> = {
    ...p,
  };
  if (finalParams?.searchParams && finalParams?.searchParams !== '{}') {
    const searchParams = JSON.parse(finalParams?.searchParams);
    if (searchParams?.scopeLike != '1') {
      delete finalParams?.deviceMatDirectoryId;
    }
    delete searchParams?.scopeLike;
    finalParams.searchParams = JSON.stringify(searchParams);
  }
  const res = await deviceMatDetailQueryPageInfo(finalParams);
  return res;
};
