/*
 * @Author: SHUANG
 * @Date: 2023-07-03 16:17:34
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-07-13 15:58:57
 * @Description:
 */
import { DefaultFooter } from '@ant-design/pro-layout';
import { useModel } from 'umi';

const BaseFooter: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const { settings } = initialState || {};

  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      copyright={`${currentYear} ${settings?.copyright}`}
      links={[{ key: settings?.homeVersion, title: settings?.homeVersion, href: '#' }]}
    />
  );
};

export default BaseFooter;
