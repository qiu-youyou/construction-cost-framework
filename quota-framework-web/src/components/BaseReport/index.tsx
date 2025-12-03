/*
 * @Author: SHUANG
 * @Date: 2023-08-09 17:21:16
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-25 09:10:20
 * @Description: 基础报表
 */
import { CSSProperties } from 'react';
import useAuthButton from '../../utils/auth/useAuthButton';

const reportEditorPath = '/jonda/report/index/toIndex.action';

const baseReportStyle: CSSProperties = {
  width: '100%',
  height: '100%',
  border: 'none',
};

type Props = {
  /**
   * @name reportEditorPath
   * @default /jonda/report/index/toIndex.action
   * @type string
   */
  reportEditorPath?: string;
  params?: { [index: string]: any };
  auth?: {};
};

/** 处理拼接参数· */
const handleFormatParams = (params: Props['params']) => {
  if (!params) return;
  const formatParams = Object.keys(params)
    .map((key) => `${key}=${params[key]}`)
    .join('&');

  const urlQuery = formatParams;

  return urlQuery;
};

export default (props: Props) => {
  const { auth } = useAuthButton();

  /** 根据当前模块生成权限 */
  const urlAuth = props?.params?.['_at'] || [
    auth('report_add') ? 1 : 0,
    auth('report_edit') ? 2 : 0,
    auth('report_delete') ? 3 : 0,
    auth('report_design') ? 4 : 0,
    auth('report_copy') ? 5 : 0,
    auth('report_all') ? 6 : 0,
    auth('report_export') ? 7 : 0,
  ];

  const urlQuery = handleFormatParams(props.params);

  return (
    <iframe
      style={baseReportStyle}
      src={`${props?.reportEditorPath || reportEditorPath}?_at=${[urlAuth]}&${urlQuery}`}
    />
  );
};
