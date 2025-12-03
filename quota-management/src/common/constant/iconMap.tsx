/*
 * @Author: SHUANG
 * @Date: 2023-07-10 16:28:57
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-23 10:18:16
 * @Description:
 */
import { DatabaseOutlined, HddOutlined, PartitionOutlined, ProfileOutlined } from '@ant-design/icons';
import { JDCMDICONMAP } from 'jd-framework-web/package/common';

const ICONMAP: { [index: string]: any } = {
  ...JDCMDICONMAP,
  DatabaseOutlined: <DatabaseOutlined />,
  ProfileOutlined: <ProfileOutlined />,
  HddOutlined: <HddOutlined />,
  PartitionOutlined: <PartitionOutlined />,
};

export default ICONMAP;
