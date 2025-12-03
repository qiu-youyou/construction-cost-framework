/*
 * @Author: SHUANG
 * @Date: 2023-08-10 17:04:17
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-08-11 14:44:26
 * @Description: 报表Demo
 */
import BaseReport from '@/components/BaseReport';
import ViewContainer from '@/components/ViewContainer';

export default () => {
  return (
    <ViewContainer>
      <BaseReport params={{ projectId: '2', stageId: '3' }} />
    </ViewContainer>
  );
};
