/*
 * @Author: SHUANG
 * @Date: 2024-02-04 16:47:31
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-02-22 17:54:25
 * @Description: 项目文档库
 */

import { Button } from 'antd';
import { BookOutlined } from '@ant-design/icons';
import ModalButton from 'jd-framework-web/package/components/ActionButton/ModalButton';

import ProjectDoc from '../../../common/ProjectDoc';
import { ProjectItem } from '../typings';

type Props = { projectActionCurrent?: ProjectItem };

export default (props: Props) => {
  /** 弹窗属性 */
  const modalProps = { width: 1200 };

  /** 当前工程 */
  const { projectActionCurrent } = props;

  /** 触发按钮 */
  const triggerBtn = (
    <Button className="BorderButtonPrimary">
      <BookOutlined /> 项目文档库
    </Button>
  );

  return (
    <ModalButton
      modalTitle="项目文档库"
      current={{ id: projectActionCurrent?.id }}
      modalProps={modalProps}
      trigger={triggerBtn}
      render={
        <section style={{ height: 480 }}>
          <ProjectDoc {...props} />
        </section>
      }
    />
  );
};
