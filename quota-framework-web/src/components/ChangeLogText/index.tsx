/*
 * @Author: SHUANG
 * @Date: 2022-10-13 16:46:30
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2022-10-17 10:13:03
 * @Description: 处理修改记录换行显示
 */

import { Typography } from 'antd';
const { Text } = Typography;

export default ({ changeLog }: { changeLog: string }) => {
  if (!changeLog) return <></>;
  return (
    <Text
      ellipsis={{
        tooltip: (
          <>{changeLog.split(';').map((item: string, i: number) => item && <div key={i}>{item};</div>)}</>
        ),
      }}
    >
      {changeLog}
    </Text>
  );
};
