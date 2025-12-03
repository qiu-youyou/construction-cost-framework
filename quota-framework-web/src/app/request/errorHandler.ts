/*
 * @Author: SHUANG
 * @Date: 2022-06-22 14:54:08
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-10-20 14:04:01
 * @Description: 请求异常处理
 */
import { message, notification } from 'antd';
import { SSOMessage, UnTokenMessage } from './errorConfig';

interface Error {
  data: any;
  name: string;
  type: string;
  response: {
    url: string;
    status: number;
    statusText: string;
  };
}

const responseStatus: Record<number, string> = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  405: 'Method Not Allowed',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

// 错误请求处理
export const errorHandler = (error: Error) => {
  if (error.name === 'BizError') {
    const data = error?.data;
    if (data.code == SSOMessage) return data.code;
    if (data.code == UnTokenMessage) return data.code;
    if (!!data?.message && data.message.includes('java.lang')) {
      notification.error({ message: `java.lang`, description: data?.message, duration: 10 });
    } else {
      message.error(data?.message || '操作失败');
    }

    return data;
  }

  const { response } = error;
  const errortext = responseStatus[response?.status] || response?.statusText;
  notification.error({
    message: `请求错误 ${response?.status}: ${response?.url}`,
    description: errortext,
    duration: 10,
  });
};
