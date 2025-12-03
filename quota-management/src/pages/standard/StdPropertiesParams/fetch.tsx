/*
 * @Author: SHUANG
 * @Date: 2023-11-14 11:10:38
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-17 13:55:07
 * @Description: 清单项目特征与定额参数特征映射库
 */
import { TableActionType } from 'jd-framework-web/package/components';
import { propertiesParamsUpdateRow } from './services';
import * as TYPES from './typings';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Modal } from 'antd';

/**
 * @Author: SHUANG
 * @Description: 增加 参数 或 清单特征
 * @Date: 2023-11-14 11:21:42
 */
export const fetchPropertiesParamsUpdateRow = async (
  current?: TYPES.PropertiesParamsNormParamsItem,
  propertiesParamsCurrent?: TYPES.PropertiesParamsItem,
  propertiesParamsRef?: TableActionType,
) => {
  const errorReturn: FETCH.Res = { status: 'ERROR', code: '', rows: [] };
  if (!current) return errorReturn;
  if (!propertiesParamsCurrent) {
    const modalInfo = {
      icon: <InfoCircleOutlined />,
      content: '没有可替换的目标数据！',
      title: '继续操作',
      okText: '确定',
    };
    Modal.warning(modalInfo);
    return errorReturn;
  }
  let finalParams: FETCH.CellEditReq = {
    id: propertiesParamsCurrent?.id || '', // 当前选中行
    filedName: 'paramsName',
    newValue: current.paramsName,
  };

  const res = await propertiesParamsUpdateRow(finalParams);
  if (res?.status === 'SUCCESS') {
    propertiesParamsRef?.current?.reload?.();
  }
  return res;
};
