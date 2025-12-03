/*
 * @Author: SHUANG
 * @Date: 2023-07-10 16:28:57
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-29 17:12:24
 * @Description:
 */
import { SmileOutlined } from '@ant-design/icons';
import * as ICONS from '@ant-design/icons';
import React from 'react';

const ICONMAP: { [index: string]: any } = {
  smile: <SmileOutlined />,
};

for (const key in ICONS) {
  ICONMAP[key] = React.createElement(ICONS[key]);
}

export default ICONMAP;
