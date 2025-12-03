/*
 * @Author: SHUANG
 * @Date: 2023-02-10 15:41:47
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-09-19 18:32:38
 * @Description: 帮助视频
 */
import { Tooltip } from 'antd';
import { PlayCircleOutlined } from '@ant-design/icons';

/** from components */
import ModalButton from '../ActionButton/ModalButton';

type Props = { moduleKey: string };

const isDev = process.env.NODE_ENV === 'development';
const baseUrl = isDev ? '/api' : '/web/server';

export default (props: Props) => {
  if (!props.moduleKey) return <></>;
  const trigger = (
    <Tooltip placement="top" title="帮助视频">
      <PlayCircleOutlined className="ant-pro-table-list-toolbar-setting-item" />
    </Tooltip>
  );

  return (
    <ModalButton
      trigger={trigger}
      modalTitle={'帮助视频'}
      modalProps={{ width: 800, defaultFullScreen: false }}
      determineActionCurrent={false}
      render={
        <section style={{ height: 400, paddingLeft: 4, paddingRight: 4 }}>
          <video
            src={`${baseUrl}/businessexcel/common/video/play.action?videoType=${props.moduleKey}`}
            width="100%"
            height="98%"
            controls
            autoPlay
          />
        </section>
      }
    />
  );
};
