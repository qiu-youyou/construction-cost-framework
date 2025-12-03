/*
 * @Author: SHUANG
 * @Date: 2024-04-18 15:27:32
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-18 16:22:20
 * @Description: 同步接口数据
 */
import { Card, Divider, Space } from 'antd';
import ViewContainer from 'jd-framework-web/package/components/ViewContainer';
import SyncProjectFeatureButton from '../SyncProjectFeatureButton';
import SyncSysOrgAndUserButton from '../SyncSysOrgAndUserButton';
import SyncTradeClassifyButton from '../SyncTradeClassifyButton';
import SyncSysDictButton from '../SyncSysDictButton';
import SyncSysAreaButton from '../SyncSysAreaButton';
import SyncWbsButton from '../SyncWbsButton';
import SyncAll from '../SyncAll';

export default () => {
  return (
    <ViewContainer>
      <section style={{ height: '100%', background: '#fff', padding: 5, overflowY: 'auto' }}>
        <Divider orientation="left">接口数据同步</Divider>

        <Space size={[16, 16]} wrap>
          <Card
            title={<div style={{ padding: '0 5px' }}>同步数据字典(业务类型、土壤类别、项目类型)</div>}
            style={{ width: 300 }}
            size="small"
          >
            <p style={{ margin: 10 }}>
              <SyncSysDictButton />
            </p>
          </Card>

          <Card
            title={<div style={{ padding: '0 5px' }}>同步国家省份城市</div>}
            style={{ width: 300 }}
            size="small"
          >
            <p style={{ margin: 10 }}>
              <SyncSysAreaButton />
            </p>
          </Card>

          <Card
            title={<div style={{ padding: '0 5px' }}>同步用户与组织机构</div>}
            style={{ width: 300 }}
            size="small"
          >
            <p style={{ margin: 10 }}>
              <SyncSysOrgAndUserButton />
            </p>
          </Card>

          <Card
            title={<div style={{ padding: '0 5px' }}>同步WBS数据</div>}
            style={{ width: 300 }}
            size="small"
          >
            <p style={{ margin: 10 }}>
              <SyncWbsButton />
            </p>
          </Card>

          <Card
            title={<div style={{ padding: '0 5px' }}>同步行业分类</div>}
            style={{ width: 300 }}
            size="small"
          >
            <p style={{ margin: 10 }}>
              <SyncTradeClassifyButton />
            </p>
          </Card>

          <Card
            title={<div style={{ padding: '0 5px' }}>同步项目特征</div>}
            style={{ width: 300 }}
            size="small"
          >
            <p style={{ margin: 10 }}>
              <SyncProjectFeatureButton />
            </p>
          </Card>
        </Space>

        <div style={{ marginTop: 60 }}>
          <Divider orientation="left">一键同步以上所有接口数据</Divider>
          <Card size="small" style={{ width: 300 }}>
            <p style={{ margin: 10 }}>
              <SyncAll />
            </p>
          </Card>
        </div>
      </section>
    </ViewContainer>
  );
};
