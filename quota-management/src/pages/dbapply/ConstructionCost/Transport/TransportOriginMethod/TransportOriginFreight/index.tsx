/*
 * @Author: SHUANG
 * @Date: 2024-04-19 13:59:30
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-22 13:57:36
 * @Description: 工程造价-运保杂费计算 铁路综合运费 | 杂费
 */

import { TransportProps } from '../../typings';
import TransportOriginOther from './TransportOriginOther';
import TransportOriginTrain from './TransportOriginTrain';

export default (props: TransportProps) => {
  const { transportOriginMethodCurrent } = props;
  const metName = transportOriginMethodCurrent?.metName || '';

  return (
    <>{metName === '铁路' ? <TransportOriginTrain {...props} /> : <TransportOriginOther {...props} />}</>
  );
};
