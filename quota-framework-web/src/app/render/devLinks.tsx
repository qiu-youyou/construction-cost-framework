/*
 * @Author: SHUANG
 * @Date: 2023-07-14 14:18:00
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-07-14 14:21:51
 * @Description: 连接
 */
import { Link } from 'umi';
import { BookOutlined } from '@ant-design/icons';

const isDev = process.env.NODE_ENV === 'development';

const devLinks = isDev
  ? [
      <Link to="/~docs" key="docs">
        <BookOutlined />
        <span>文档(开发环境)</span>
      </Link>,
    ]
  : [];

export default devLinks;
