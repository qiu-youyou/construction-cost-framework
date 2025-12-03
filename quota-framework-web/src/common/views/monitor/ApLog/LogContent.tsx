/*
 * @Author: SHUANG
 * @Date: 2023-07-25 10:46:03
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-07-25 17:03:32
 * @Description:
 */
import BaseCard from '../../../../components/BaseCard';
import { SwapLogContent } from './typings';

type Props = { swapLogContent?: SwapLogContent };

const contentStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  background: '#fff',
  padding: 10,
  lineHeight: '20px',
};

export default (props: Props) => {
  const { swapLogContent } = props;

  // 消息内容 其他消息 返回结果
  const swapContent = <div style={contentStyle}>{swapLogContent?.content}</div>;
  const swapResultInfo = <div style={contentStyle}>{swapLogContent?.resultInfo}</div>;
  const swapOtherInfo = <div style={contentStyle}>{swapLogContent?.otherInfo}</div>;

  const tabItems = [
    { key: 'content', label: '消息内容', children: swapContent },
    { key: 'otherInfo', label: '其他信息', children: swapOtherInfo },
    { key: 'resultInfo', label: '返回结果', children: swapResultInfo },
  ];

  return <BaseCard noHeader tabs={{ animated: true, items: tabItems }} />;
};
