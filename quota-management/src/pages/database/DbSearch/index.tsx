/*
 * @Author: SHUANG
 * @Date: 2023-12-28 13:59:35
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-12-29 16:57:45
 * @Description: 定额库查询
 */
import { Button } from 'antd';
import { FileSearchOutlined } from '@ant-design/icons';
import DbMain from '../DbMain';

export default () => {
  const maintenanceButton = (
    <Button className="EditButton">
      <FileSearchOutlined /> 企业定额查询
    </Button>
  );

  return <DbMain readonly={true} maintenanceButton={maintenanceButton} />;
};
