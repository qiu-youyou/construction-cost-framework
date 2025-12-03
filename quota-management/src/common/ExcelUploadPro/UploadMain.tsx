/*
 * @Author: SHUANG
 * @Date: 2024-02-27 16:44:05
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-03-18 11:01:53
 * @Description: EXCEl 高级导入
 */
import { useState } from 'react';
import { Steps, Button, UploadFile, Modal, Spin, message } from 'antd';
import { CaretLeftOutlined, CaretRightOutlined, CheckOutlined, InfoCircleOutlined } from '@ant-design/icons';
import ViewContainer from 'jd-framework-web/package/components/ViewContainer';
import { useMount } from 'jd-framework-web/package/utils/util/uses';

import { ExcelMatchInfoJSON, ExcelUploadProProps, StructuralScopeItem } from './typings';
import { sysCommonExcelUploadProGetMatchExcelInfo } from './services';
import StructuralScope from './StructuralScope';
import ColumnsIdentify from './ColumnsIdentify';
import SheetIdentify from './SheetIdentify';
import ExcelUpload from './ExcelUpload';

export default (props: ExcelUploadProProps) => {
  const { modalActionRef } = props;
  const [modal, contextHolder] = Modal.useModal();

  /** 当前步骤 */
  const [stepCurrent, setStepCurrent] = useState(0);

  /** 解析中状态 */
  const [loading, setLoading] = useState<boolean>(false);

  /** 导入文件解析后信息 */
  const [workbookInfo, setWorkbookInfo] = useState<any>();

  /** 当前上传的文件列表 */
  const [fileSourceList, setFileSourceList] = useState<UploadFile[]>([]);

  /** 当前选择的导入范围 */
  const [structuralScopeSelect, setStructuralScopeSelect] = useState<StructuralScopeItem[]>();

  /** 关联的导入范围和页签 */
  const [sheetScopeMatching] = useState<Map<string, string>>(new Map());

  /** 默认匹配信息 */
  const [excelMatchInfo, setExcelMatchInfo] = useState<ExcelMatchInfoJSON>();

  /** 配置 步骤器 */
  const stepsConfigProps = props?.stepsConfig || { upload: {}, scope: {}, sheet: {}, column: {} };
  const stepsConfig: any =
    props?.mode === 'single' ? { upload: {}, sheet: {}, column: {} } : stepsConfigProps;

  /** 单条匹配 ｜ 多条匹配 */
  useMount(() => {
    if (props?.mode === 'single') {
      const tableName = props?.workbookConfig?.tableName || '表名';
      setStructuralScopeSelect([{ label: tableName, value: tableName }]);
    }
  });

  /** 根据当前SHEET 获取默认匹配信息 */
  const getExcelMatchInfo = async () => {
    setLoading(true);
    const formData = new FormData();
    const file = fileSourceList?.[0]?.originFileObj || '';
    const params: any = [];
    sheetScopeMatching.forEach((value, key, map) => {
      const obj: any = {};
      obj[key] = value;
      params.push(obj);
    });
    formData.append('file', file);
    formData.append('params', JSON.stringify(params));
    formData.append('beanName', 'productInventoryReportServiceImpl');

    const res = await sysCommonExcelUploadProGetMatchExcelInfo(formData);
    setExcelMatchInfo(res?.rows);
    setLoading(false);
    return res;
  };

  /** 导入方法 */
  const handleSubmit = async (formData?: FormData) => {
    const { onSubmit, onSubmitFinish } = props;
    if (typeof onSubmit != 'function') return;
    try {
      setLoading(true);
      const res = await onSubmit(formData);
      setLoading(false);
      onSubmitFinish?.(res);
      if (res?.status === 'SUCCESS') {
        modalActionRef?.current?.close();
        message.success(res?.message || '导入成功');
      }
    } finally {
      setLoading(false);
    }
  };

  /** 组装表单 */
  const handleImportParams = () => {
    /** 关联参数 */
    const { formAppendParams } = props;

    /** 组装表单 */
    const formData = new FormData();
    const file = fileSourceList?.[0]?.originFileObj || '';
    formData.append('file', file);
    for (const key in excelMatchInfo) {
      formData.append(key, excelMatchInfo[key]);
    }
    for (const key in formAppendParams) {
      formData.append(key, formAppendParams[key]);
    }
    if (props?.importType === 'option') {
      formData.append('isCover', props?.isCover || 'N');
    }

    handleSubmit(formData);
  };

  /** 确认导入方法 */
  const handleConfirmImport = () => {
    const { onSubmit } = props;
    if (typeof onSubmit != 'function') return;
    const modalInfo = { icon: <InfoCircleOutlined />, content: '开始导入，是否继续？' };
    modal.confirm({ ...modalInfo, title: '继续操作', okText: '确定', onOk: handleImportParams });
  };

  /** 文件上传 */
  const ExcelUploadContent = (
    <ExcelUpload
      sheetScopeMatching={sheetScopeMatching}
      setFileSourceList={setFileSourceList}
      setWorkbookInfo={setWorkbookInfo}
      fileSourceList={fileSourceList}
    />
  );

  /** 结构范围调整 */
  const StructuralScopeContent = (
    <StructuralScope
      setStructuralScopeSelect={setStructuralScopeSelect}
      structuralScopeSelect={structuralScopeSelect}
    />
  );

  /** 页签识别 */
  const SheetIdentifyContent = (
    <SheetIdentify
      structuralScopeSelect={structuralScopeSelect}
      sheetScopeMatching={sheetScopeMatching}
      setWorkbookInfo={setWorkbookInfo}
      fileSourceList={fileSourceList}
      workbookInfo={workbookInfo}
      setLoading={setLoading}
    />
  );

  /** 行列识别 */
  const ColumnsIdentifyContent = (
    <ColumnsIdentify
      sheetScopeMatching={sheetScopeMatching}
      setExcelMatchInfo={setExcelMatchInfo}
      excelMatchInfo={excelMatchInfo}
      fileSourceList={fileSourceList}
      workbookInfo={workbookInfo}
    />
  );

  /** 步骤生成 */
  const stepsItem: any = [];

  const stepsItemDefault: ExcelUploadProProps['stepsConfig'] | any = {
    upload: { content: ExcelUploadContent, title: 'EXCEL文件上传' },
    scope: { content: StructuralScopeContent, title: '结构范围调整' },
    sheet: { content: SheetIdentifyContent, title: '页签识别' },
    column: { content: ColumnsIdentifyContent, title: '行列识别' },
  };

  for (const key in stepsConfig) {
    stepsItem.push({ ...stepsItemDefault?.[key], key, ...stepsConfig?.[key] });
  }

  const handleStepsNextClick = async () => {
    /** 下一步 结构范围调整 前是上传了文件 */
    if (stepCurrent === 0 && !fileSourceList?.length) {
      const modalInfo = { icon: <InfoCircleOutlined />, content: '请先导入 EXCEL 文件！' };
      modal.warning({ ...modalInfo, title: '继续操作', okText: '确定' });
      return;
    }

    if (stepsItem?.[stepCurrent + 1]?.key === 'sheet' && !structuralScopeSelect?.length) {
      const modalInfo = { icon: <InfoCircleOutlined />, content: '请选择导入范围！' };
      modal.warning({ ...modalInfo, title: '继续操作', okText: '确定' });
      return;
    }

    if (stepsItem?.[stepCurrent + 1]?.key === 'column' && !sheetScopeMatching?.size) {
      const modalInfo = { icon: <InfoCircleOutlined />, content: '请关联页签！' };
      modal.warning({ ...modalInfo, title: '继续操作', okText: '确定' });
      return;
    }

    /** 开始进行默认匹配 */
    if (stepsItem?.[stepCurrent + 1]?.key === 'column') {
      const res = await getExcelMatchInfo();
      if (res?.status !== 'SUCCESS') return;
    }
    setStepCurrent(stepCurrent + 1);
  };

  const handleStepsPrevClick = () => {
    if (stepsItem?.[stepCurrent - 1]?.key === 'sheet') {
      const modalInfo = { icon: <InfoCircleOutlined />, content: '当前处理结果 未保存，确认返回上一步吗？' };
      const onOk = () => setStepCurrent(stepCurrent - 1);
      modal.confirm({ ...modalInfo, title: '继续操作', okText: '确定', onOk });
      return;
    }
    setStepCurrent(stepCurrent - 1);
  };

  return (
    <>
      <ViewContainer scroll="percent">
        {!!stepsItem?.length && (
          <div className="JD-STEPS-CONTAINER">
            <Spin size="large" spinning={loading} tip="正在处理 EXCEL 文件" delay={500}>
              <div className="JD-STEPS-HEADER">
                <Steps current={stepCurrent} items={stepsItem} />
              </div>

              <div className={stepsItem[stepCurrent].key + ' JD-STEPS-CONTENT'}>
                {stepsItem[stepCurrent].content}
              </div>

              <div className="JD-STEPS-FOOTER">
                {stepCurrent > 0 && (
                  <Button size="large" style={{ margin: '0 8px' }} onClick={() => handleStepsPrevClick()}>
                    <CaretLeftOutlined /> 上一步
                  </Button>
                )}

                {stepCurrent < stepsItem.length - 1 && (
                  <Button size="large" type="primary" onClick={() => handleStepsNextClick()}>
                    下一步 <CaretRightOutlined />
                  </Button>
                )}

                {stepCurrent === stepsItem.length - 1 && (
                  <Button size="large" type="primary" onClick={handleConfirmImport}>
                    <CheckOutlined /> 确认导入
                  </Button>
                )}
              </div>
            </Spin>
          </div>
        )}
      </ViewContainer>
      {contextHolder}
    </>
  );
};
