/*
 * @Author: SHUANG
 * @Date: 2023-07-27 15:11:18
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-12-20 17:27:22
 * @Description: 权限表测试
 */
import BaseTable from '@/components/BaseTable';
import BaseReport from '@/components/BaseReport';
import ViewContainer from '@/components/ViewContainer';
import { BaseTableProps, TableToolbarDefine } from '@/components/BaseTable/typings';
import SplitPane, { PaneContainer } from '@/components/SplitPane';
import { testQueryPageInfo, testSave } from './services';
import useTablecolumns from './useTableColumns';
import SubmiterButton from './SubmiterButton';
import { Button } from 'antd';

export default () => {
  /** 在 Table Toolbar 后面增加 流程按钮 */
  const toolbarLast = <SubmiterButton mode="list" />;

  /** 报表权限 */
  /**
   * report_add 报表新增
   * report_edit 报表编辑
   * report_delete 报表删除
   * report_design 报表设计
   * report_copy 报表复制
   * report_all 报表查看全部
   */

  /** 流程权限 */
  /**
   * disallow 驳回
   * disuse 作废
   * forward_admin 转办—管理员
   * reject_admin 退回—管理员
   * abandon_admin 作废—管理员
   */

  const toolbar: TableToolbarDefine<any> = {
    expandStart: {},
    sortStart: {},
    plus: {}, // 新增
    plusLine: {}, // 新增
    plusLevel: {}, // 新增层级
    plusMore: {}, // 新增更多
    edit: {}, // 编辑
    details: {}, // 查看
    import: {}, // 导入
    export: {
      determineActionCurrent: false,
      options: {
        items: [
          { key: 'a', label: <Button type="link">A</Button>, onSubmit: testQueryPageInfo },
          { key: 'b', label: <Button type="link">B</Button>, onSubmit: testQueryPageInfo },
        ],
      },
    }, // 导出

    exportOther: {}, // 导出更多
    enable: {}, // 启用
    disable: {}, // 禁用
    deleted: {}, // 删除
    calc: {}, // 计算
    sort: {}, // 排序
    // bookmark: { fieldProps: { fieldKey: 'yourkey' } },
  };

  const generateTable: BaseTableProps<any> = {
    persistenceKey: 'DEMOAUTHTABLE',
    service: { dataSourceRequest: testQueryPageInfo, cellEditSaveRequest: testSave },
    columns: useTablecolumns,
    // toolbarAuthority: true, // 权限受控默认读取权限表
    cellEditable: true,
    search: false,
    toolbarLast,
    toolbar,
  };

  return (
    <ViewContainer>
      <SplitPane mode="vertical">
        <PaneContainer height="30%">
          <BaseTable {...generateTable} />
        </PaneContainer>
        <PaneContainer flex>{/* <BaseReport params={{ projectId: '2' }} /> */}</PaneContainer>
      </SplitPane>
    </ViewContainer>
  );
};
function operateExport(key: string): void {
  throw new Error('Function not implemented.');
}
