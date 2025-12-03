/*
 * @Author: SHUANG
 * @Date: 2023-05-05 11:18:23
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-20 17:09:18
 * @Description:
 */
import { Button, Col, Row } from 'antd';
import { PlayCircleOutlined } from '@ant-design/icons';
import { CSSProperties, useState } from 'react';

import { ModalActionType } from '../../../../../components/BaseModal/typings';
import SpaceView from '../../../../../components/ViewContainer/SpaceView';
import BaseModal from '../../../../../components/BaseModal';
import BaseCard from '../../../../../components/BaseCard';

import AnnexTable from '../../../../annex/AnnexTable';

import { sysNewsQueryOne } from '../services';
import { BulletinListItem } from '../typings';
// 在展示页面引入css样板文件
import 'braft-editor/dist/output.css';

const sectionStyle = { padding: 15, margin: 2 };
const titleStyle: CSSProperties = {
  fontSize: 20,
  height: 106,
  borderBottom: '3px solid #ccc',
  textAlign: 'center',
  fontWeight: 'normal',
};

const descStyle: CSSProperties = {
  fontSize: 13,
  marginTop: 14,
};

const labelStyle: CSSProperties = {
  display: 'inline-block',
  textAlign: 'right',
  width: 140,
};

type Prop = {
  id?: string;
  button?: 'text' | 'button' | 'icon' | 'none'; // 按钮渲染成 文字 ｜按钮｜图标
  actionRef?: ModalActionType; // 操作弹窗
};

export default (prop: Prop) => {
  const [value, setValue] = useState<BulletinListItem>();
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const queryNewsOne = async () => {
    const errorValue: FETCH.Row = { status: 'ERROR', rows: {} };
    const successvalue: FETCH.Row = { status: 'SUCCESS', rows: {} };
    if (!prop?.id) return errorValue;
    setBtnLoading(true);
    sysNewsQueryOne({ id: prop.id }).then((res) => {
      setBtnLoading(false);
      setValue(res.rows);
    });
    return successvalue;
  };

  const triggerButton = (
    <Button type="primary" loading={btnLoading} className="ViewButton">
      <PlayCircleOutlined /> 预览
    </Button>
  );

  const qlContainer = (
    <>
      <h1 style={titleStyle}>
        {value?.title || ''}
        <div style={descStyle}>
          <Row gutter={100} style={{ marginTop: 4 }}>
            <Col span={12} style={{ textAlign: 'right' }}>
              创建人：<span style={labelStyle}>{value?.createMan || ''}</span>
            </Col>
            <Col span={12} style={{ textAlign: 'left' }}>
              创建时间：<span style={labelStyle}>{value?.createDatetime || ''}</span>
            </Col>
          </Row>

          <Row gutter={100} style={{ marginTop: 4 }}>
            <Col span={12} style={{ textAlign: 'right' }}>
              修改人：<span style={labelStyle}>{value?.updateMan || ''}</span>
            </Col>
            <Col span={12} style={{ textAlign: 'left' }}>
              修改时间：<span style={labelStyle}>{value?.updateDatetime || ''}</span>
            </Col>
          </Row>
        </div>
      </h1>
      <div
        dangerouslySetInnerHTML={{ __html: value?.contentString || '' }}
        className="braft-output-content .bf-container"
        style={{ width: '100', height: '100%' }}
      />
    </>
  );

  const render = (
    <BaseModal
      title="预览"
      width={1100}
      trigger={prop.button === 'none' ? <></> : triggerButton}
      triggerControl={queryNewsOne}
      actionRef={prop?.actionRef}
      defaultFullScreen
      footer={null}
    >
      <SpaceView style={{ height: 'max-content' }}>
        <BaseCard bordered type="H2" title="公告">
          <section className="ql-container ql-snow" style={sectionStyle}>
            {!!value && qlContainer}
          </section>
        </BaseCard>
      </SpaceView>

      <SpaceView>
        <BaseCard bordered type="H2" title="附件">
          <AnnexTable deleted={false} upload={false} businessId={prop?.id || ''} />
        </BaseCard>
      </SpaceView>
    </BaseModal>
  );

  return render;
};
