/*
 * @Author: SHUANG
 * @Date: 2023-10-13 17:04:40
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-10-13 17:23:14
 * @Description: 外链外部链接
 */
import ViewContainer from '../../../components/ViewContainer';
import { CSSProperties } from 'react';
import { history } from 'umi';

export default () => {
  const iframeUrl: any = history?.location?.state || '';

  const frameStyle: CSSProperties = {
    width: '100%',
    height: '100%',
    border: 'none',
  };

  return (
    <ViewContainer>
      <iframe style={frameStyle} src={iframeUrl}></iframe>
    </ViewContainer>
  );
};
