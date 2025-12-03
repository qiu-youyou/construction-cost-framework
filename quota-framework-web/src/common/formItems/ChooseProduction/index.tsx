/*
 * @Author: SHUANG
 * @Date: 2023-05-29 10:34:04
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-09-21 10:27:12
 * @Description: 用户所属公司
 */
import BaseTable from '../../../components/BaseTable';
import { BaseTableProps, TableToolbarDefine } from '../../../components/BaseTable/typings';
import useTableColumns from './useTableColumns';
import useFormColumns from './useFormColumns';
import * as API from './services';

// 用户id
type Props = { id: string };

export default (props: Props) => {
  /** 新增方法 */
  const handleUserBaseCodeSave = async (params: API.UserBaseCodeListItem) => {
    const res = await API.userBaseCodeSave({ ...params, id: props.id });
    return res;
  };

  /** 启用禁用方法 */
  const handleUserBaseCodeUPdateStatus = async (params: FETCH.UpStatus) => {
    const res = await API.userBaseCodeUpdateStatusByIds({
      id: props.id,
      productionBaseCodeList: params['ids']?.join(','),
      billStatus: params.billStatus,
    });
    return res;
  };

  /** 删除方法 */
  const handleUserBaseCodeDelete = async (params: FETCH.UpStatus) => {
    const res = await API.userBaseCodeDeleteByIds({
      id: props.id,
      productionBaseCodeList: params['ids']?.join(','),
    });
    return res;
  };

  const toolbar: TableToolbarDefine<API.UserBaseCodeListItem> = {
    plus: {
      buttonText: '新增公司',
      disabled: !props?.id,
      columns: useFormColumns,
      onSubmit: handleUserBaseCodeSave,
      modalProps: { style: { top: 200 } },
    },
    enable: { disabled: !props?.id, onSubmit: handleUserBaseCodeUPdateStatus },
    disable: { disabled: !props?.id, onSubmit: handleUserBaseCodeUPdateStatus },
    deleted: { disabled: !props?.id, onSubmit: handleUserBaseCodeDelete },
  };

  const generateTable: BaseTableProps<API.UserBaseCodeListItem, { id: string }> = {
    rowKey: 'productionBaseCode',
    persistenceKey: 'COMPONENTCHOOSEPRODUCTIONTABLE',
    service: {
      params: { id: props?.id },
      manualRequest: !props?.id,
      dataSourceRequest: API.userBaseCodeQueryPageInfo,
    },
    columns: useTableColumns(),
    rowSelection: false,
    search: false,
    virtual: false,
    toolbar,
  };

  return (
    <section style={{ height: 280 }}>
      <BaseTable {...generateTable} />
    </section>
  );
};
