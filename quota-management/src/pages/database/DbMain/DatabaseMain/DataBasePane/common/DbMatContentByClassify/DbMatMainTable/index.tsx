/*
 * @Author: SHUANG
 * @Date: 2023-10-25 15:20:20
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-23 15:17:02
 * @Description: 根据MAT目录章节获取 MAT明细
 */
import { dbMatUpdateRow } from '../../../DbMat/DbMatMainTable/useServices';
import { DbMatContentByClassifyProps, DbMatContentQueryParams } from '../services';
import { DbMatItem, DbMatQuery } from '../../../DbMat/DbMatMainTable/typings';
import { ClassifyRjcType } from '../../DbMatQuerySelection';
import DbMatMainTable from '../../../DbMat/DbMatMainTable';

let dbIdBefore: string;
let selectionBefore: any[] = [];

export default (props: DbMatContentByClassifyProps) => {
  /** 接收数据 */
  const { databaseCurrent, dbMatMainTableRef } = props;

  const { isNorm, selection, setSelection, setDbMatCurrent } = props;

  const { queryByDb, primaryCurrent, matCatalogCurrent, classifyRjcType } = props;

  const { dbMatMainUseServices, dbMatMainTableProps } = props;

  /** 当前数据库ID 当前章节ID */
  const dbId = matCatalogCurrent?.dbId || '';
  const classifyId = matCatalogCurrent?.id || '';

  /** 处理勾选逻辑 */
  const handleOnSelection = (
    sele?: (DbMatItem & { classifyRjcType?: ClassifyRjcType })[],
    seleMethods?: string,
  ) => {
    if (sele === undefined) return;
    if (seleMethods === 'cancel') {
      selectionBefore = [];
      setSelection?.([]);
      return;
    }
    if (sele?.length === 0) return;

    /** 当前所有勾选 小于 历史勾选是 为取消勾选 */
    const filterUndefinedSele = sele?.filter((item) => item !== undefined);
    if (sele?.length < selectionBefore?.length) {
      selectionBefore = selectionBefore?.map((item) => ({
        ...item,
        classifyRjcType: item?.classifyRjcType || classifyRjcType,
      }));

      const classifyRjcTypeSelection = selectionBefore?.filter(
        (item) => item.classifyRjcType === classifyRjcType,
      );
      // 对比 classifyRjcTypeSelection数组 和 filterUndefinedSele数组 保留未删除项
      const newSeleClassifyRjcTypeSelection = classifyRjcTypeSelection?.filter((item) =>
        filterUndefinedSele.some((item2) => item2?.id === item?.id),
      );

      /** 重新替换当前目录类型的数据 */
      const noClassifyRjcTypeSelection = selectionBefore?.filter(
        (item) => item.classifyRjcType !== classifyRjcType,
      );
      if (!!newSeleClassifyRjcTypeSelection.length) {
        selectionBefore = [...noClassifyRjcTypeSelection, ...newSeleClassifyRjcTypeSelection];
      }
      setSelection?.(selectionBefore);
      return;
    }

    /** 增加选中 */
    const hasUndefined = sele?.filter((item) => item == undefined);

    if (hasUndefined?.length > 1) {
      const newSele = filterUndefinedSele?.map((item) => ({ ...item, classifyRjcType }));
      /** 合并 selectionBefore 和 newSele 两个数组合并； 不合并id相同的项目 */
      const newSele2 = newSele?.concat(
        selectionBefore?.filter((item) => !newSele.some((item2) => item2?.id === item?.id)),
      );
      setSelection?.([...newSele2]);
      return;
    }
    setSelection?.(filterUndefinedSele);
  };

  /**  MAT明细 选择表 */
  const serviceDataSourceRequest = async (params: FETCH.Req) => {
    const res = props?.matMainDataSourceRequest?.({ ...params, classifyRjcType });

    /** 切换了定额库 */
    if (dbIdBefore === undefined) dbIdBefore = params?.dbId;
    if (!!queryByDb && dbIdBefore !== params?.dbId) {
      dbIdBefore = params?.dbId;

      setTimeout(() => {
        setSelection?.([]);
        selectionBefore = [];
        dbMatMainTableRef?.current?.setTableSelection?.([]);
      }, 0);
      return res;
    }

    setTimeout(() => {
      selectionBefore = !!selection ? [...selection] : [];
      dbMatMainTableRef?.current?.setTableSelection?.(selectionBefore);
    }, 0);
    return res;
  };

  /**  主表为定额 else 当前主表为主材 */
  const getServiceParams = () => {
    if (!primaryCurrent) return;
    /** 通过数据库查询 */
    if (!!queryByDb) {
      const params: DbMatQuery = { classifyId, dbId };
      return params;
    }
    if (!!isNorm) {
      /**	定额 主表ID（dbMatCurrent）  */
      const normId = primaryCurrent?.id || '';
      /** 定额 目录ID (DbMatcurrent) */
      const chapterId = primaryCurrent?.chapterId || '';

      const params: DbMatContentQueryParams = { dbId, classifyId, normId, chapterId };
      return params;
    }

    /**	机械台班/混凝土 主表ID（dbMatCurrent）  */
    const machineMatId = primaryCurrent?.id || '';
    /** 机械台班/混凝土 目录ID (DbMatcurrent) */
    const machineClassifyId = primaryCurrent?.classifyId || '';

    const params: DbMatContentQueryParams = { dbId, classifyId, machineMatId, machineClassifyId };
    return params;
  };

  return (
    <DbMatMainTable
      tableProps={{
        search: { labelWidth: 80, span: { xs: 12, sm: 12, md: 8, lg: 6, xl: 6, xxl: 6 } },
        rowSelection: { columnWidth: 40, revert: false },
        service: {
          cellEditSaveRequest: dbMatMainUseServices?.()?.dbMatUpdateRow || dbMatUpdateRow,
          dataSourceRequest: serviceDataSourceRequest,
          params: getServiceParams(),
          manualRequest: !classifyId,
        },
        onSelections: handleOnSelection,
      }}
      dbMatMainUseServices={dbMatMainUseServices}
      dbMatMainTableProps={dbMatMainTableProps}
      dbMatClassifyCurrent={matCatalogCurrent}
      dbMatMainTableRef={dbMatMainTableRef}
      classifyRjcType={classifyRjcType}
      databaseCurrent={databaseCurrent}
      setDbMatCurrent={setDbMatCurrent}
    />
  );
};
