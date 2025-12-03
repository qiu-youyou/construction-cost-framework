/*
 * @Author: SHUANG
 * @Date: 2023-08-02 16:03:12
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-09-21 17:20:47
 * @Description: 查看公章图片
 */
import { Image } from 'antd';
import { CSSProperties, useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';

import { useMount } from '../../../../../utils/util/uses';
import { signatureQueryOne } from '../services';
import { OrganListItem } from '../typings';

type Prop = {
  currentOrgan?: OrganListItem;
};

const positionAb: CSSProperties = {
  transform: 'translate(-50%, -50%)',
  position: 'absolute',
  top: '50%',
  left: '50%',
};

export default (prop: Prop) => {
  if (!prop?.currentOrgan?.id) return <></>;
  const { currentOrgan } = prop;
  const [loading, setLoading] = useState<boolean>();
  const [signature, setSignature] = useState<string>();

  useMount(async () => {
    setLoading(true);
    const res = await signatureQueryOne({ businessId: currentOrgan?.id, businessType: 'ORG' });
    setLoading(false);
    setSignature(res?.rows?.signatureImage);
  });

  return (
    <div style={{ width: '100%', minHeight: 280, textAlign: 'center', position: 'relative' }}>
      <div style={positionAb}>
        {loading ? <LoadingOutlined /> : <Image src={`data:image/png;base64,${signature}`} />}
      </div>
    </div>
  );
};
