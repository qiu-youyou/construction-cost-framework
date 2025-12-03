/*
 * @Author: SHUANG
 * @Date: 2024-01-31 14:05:15
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-08 10:16:05
 * @Description: 工程造价产品-工程信息
 */
import { FormColumnsDefine } from 'jd-framework-web/package/components';
import { UserListItem } from 'jd-framework-web/package/common/views/system/User/typings';
import VERIFICATION from 'jd-framework-web/package/common/constant/verification';

import ProjectSearchInput from '@/common/formItems/ProjectSearchInput';
import FeatureEditInput from '@/common/formItems/FeatureEditInput';
import UserSearchInput from '@/common/formItems/UserSearchInput';

import { ProjectItem, ProjectSaveParams } from './typings';
import { valueEnumsRequest } from '../valueEnums';

const countyOptions = [
  {
    value: '中国',
    label: '中国',
    children: [
      { value: '北京市', label: '北京市' },
      {
        value: '河北省',
        label: '河北省',
        children: [
          { value: '石家庄市', label: '石家庄市' },
          { value: '唐山市', label: '唐山市' },
          { value: '秦皇岛市', label: '秦皇岛市' },
          { value: '邯郸市', label: '邯郸市' },
        ],
      },
      {
        value: '山西省',
        label: '山西省',
        children: [
          { value: '太原市', label: '太原市' },
          { value: '大同市', label: '大同市' },
          { value: '阳泉市', label: '阳泉市' },
        ],
      },
      {
        value: '黑龙江省',
        label: '黑龙江省',
        children: [
          { value: '哈尔滨市', label: '哈尔滨市' },
          { value: '齐齐哈尔市', label: '齐齐哈尔市' },
          { value: '鹤岗市', label: '鹤岗市' },
        ],
      },
    ],
  },
];

const projectIndustryOptions = [
  {
    value: '水利水电',
    label: '水利水电',
    children: [
      {
        value: '水电',
        label: '水电',
        children: [
          { value: '常规水电站', label: '常规水电站' },
          { value: '储水蓄能电站', label: '储水蓄能电站' },
        ],
      },
      {
        value: '水利',
        label: '水利',
        children: [
          { value: '水库', label: '水库' },
          { value: '水电站', label: '水电站' },
          { value: '泵站', label: '泵站' },
          { value: '水闸', label: '水闸' },
          { value: '供水', label: '供水' },
        ],
      },
      { value: '火电', label: '火电' },
      { value: '电网', label: '电网' },
    ],
  },
  {
    value: '新能源',
    label: '新能源',
    children: [
      {
        value: '风电',
        label: '风电',
        children: [
          { value: '陆上风电', label: '陆上风电' },
          { value: '海上风电', label: '海上风电' },
        ],
      },
      { value: '光伏', label: '光伏' },
      { value: '光热', label: '火电' },
    ],
  },
];

type Props = { projectActionCurrent?: ProjectItem };

export default ({ projectActionCurrent }: Props) => {
  const columns: FormColumnsDefine<ProjectSaveParams> = [
    {
      dataIndex: 'id',
      hideInForm: true,
    },

    {
      dataIndex: 'projectId',
      formItemProps: { hidden: true },
      fieldProps: { disabled: true },
      colProps: { span: 0 },
    },
    {
      dataIndex: 'projectCode',
      formItemProps: { hidden: true },
      fieldProps: { disabled: true },
      colProps: { span: 0 },
    },
    {
      title: '项目名称',
      dataIndex: 'projectName',
      colProps: { span: 24 },
      formItemProps: { rules: [{ required: true, message: '' }] },
      renderFormItem: (v1, v2, form) => {
        return <ProjectSearchInput projectId={form.getFieldValue('projectId')} />;
      },
      customFieldProps: (form) => ({
        onChange: (projectName: string, projectCurrent?: ProjectItem) => {
          /** 更新当前表单 */
          form?.setFieldsValue?.({ ...projectCurrent, projectName, projectId: projectCurrent?.id || '' });
        },
      }),
    },

    // 用户负责人信息
    {
      dataIndex: 'userInformationFz',
      formItemProps: { hidden: true },
      fieldProps: { disabled: true },
      colProps: { span: 0 },
    },
    {
      title: '项目负责人',
      dataIndex: 'projectLeaderPerson',
      formItemProps: { rules: VERIFICATION.required },
      renderFormItem: (v1, v2, form) => {
        const userInformationFzJson = form.getFieldValue('userInformationFz');
        const userInformationFz = userInformationFzJson && JSON.parse(userInformationFzJson);

        return <UserSearchInput valueUserInfo={userInformationFz} />;
      },
      customFieldProps: (form) => ({
        onChange: (v: string, userSelection?: UserListItem[]) => {
          /** 更新当前表单 */
          const userInformationFzArr = userSelection?.map((item: any) => ({
            userId: item?.id,
            userCode: item?.userCode,
            userFullName: item?.userRealname,
          }));

          /** 更新字段 */
          const userInformationFz = userInformationFzArr && JSON.stringify(userInformationFzArr);
          const projectLeaderPerson = userSelection?.map((item) => item.userRealname)?.join(',');

          form?.setFieldsValue?.({ projectLeaderPerson, userInformationFz });
        },
      }),
    },

    // 用户审查人信息
    {
      dataIndex: 'userInformationSc',
      formItemProps: { hidden: true },
      fieldProps: { disabled: true },
      colProps: { span: 0 },
    },
    {
      title: '审查人',
      dataIndex: 'projectCheckPerson',
      formItemProps: { rules: VERIFICATION.required },
      renderFormItem: (v1, v2, form) => {
        const userInformationScJson = form.getFieldValue('userInformationSc');
        const userInformationSc = userInformationScJson && JSON.parse(userInformationScJson);

        return <UserSearchInput valueUserInfo={userInformationSc} />;
      },
      customFieldProps: (form) => ({
        onChange: (v: string, userSelection?: UserListItem[]) => {
          /** 更新当前表单 */
          const userInformationScArr = userSelection?.map((item: any) => ({
            userId: item?.id,
            userCode: item?.userCode,
            userFullName: item?.userRealname,
          }));

          /** 更新字段 */
          const userInformationSc = userInformationScArr && JSON.stringify(userInformationScArr);
          const projectCheckPerson = userSelection?.map((item) => item.userRealname)?.join(',');

          form?.setFieldsValue?.({ projectCheckPerson, userInformationSc });
        },
      }),
    },

    {
      title: '项目类型',
      dataIndex: 'projectType',
      valueType: 'select',
      request: async () => valueEnumsRequest('project_type'),
      customFieldProps: { fieldNames: { label: 'label', value: 'label' } },
      formItemProps: { rules: VERIFICATION.required },
    },
    {
      title: '业务类型',
      dataIndex: 'projectBusinessType',
      valueType: 'select',
      request: async () => valueEnumsRequest('busi_type'),
      customFieldProps: { fieldNames: { label: 'label', value: 'label' } },
      formItemProps: { rules: VERIFICATION.required },
    },

    {
      title: '行业类型',
      dataIndex: 'projectIndustry',
      valueType: 'cascader',
      customFieldProps: (form) => ({ options: projectIndustryOptions, changeOnSelect: false }),
      initialValue: projectActionCurrent?.projectIndustry?.split(/[/\-]/).filter(Boolean),
      formItemProps: { rules: VERIFICATION.required },
    },
    {
      title: '国别',
      dataIndex: 'projectCounty',
      valueType: 'cascader',
      customFieldProps: (form) => ({ options: countyOptions, changeOnSelect: false }),
      initialValue: projectActionCurrent?.projectCounty?.split(/[/\-]/).filter(Boolean),
      formItemProps: { rules: VERIFICATION.required },
    },

    {
      title: '工程特征',
      dataIndex: 'feature',
      renderFormItem: () => <FeatureEditInput />,
      formItemProps: { rules: VERIFICATION.required },
    },

    {
      title: '备注信息',
      dataIndex: 'note',
      valueType: 'textarea',
      customFieldProps: { rows: 3, style: { height: 'auto' } },
    },

    {
      title: '是否涉密',
      dataIndex: 'secret',
      valueType: 'radio',
      request: async () => valueEnumsRequest('YES_NO'),
      formItemProps: { rules: VERIFICATION.required },
    },

    {
      valueType: 'divider',
    },

    {
      dataIndex: 'industryCode',
      formItemProps: { hidden: true },
      fieldProps: { disabled: true },
      colProps: { span: 0 },
    },
    {
      title: '所属行业',
      dataIndex: 'industry',
      valueType: 'select',
      request: async () => valueEnumsRequest('PROFESSION'),
      formItemProps: { rules: VERIFICATION.required },

      customFieldProps: (form) => ({
        onChange: (v: string, option: any) => {
          form?.setFieldsValue?.({ industryCode: option?.['data-item']?.value || '' });
        },
        fieldNames: { label: 'label', value: 'label' },
      }),
    },
    {
      title: '地区分类',
      dataIndex: 'projectRegion',
      valueType: 'select',
      request: async () => valueEnumsRequest('AREA_TYPE'),

      dependencies: ['industry', 'industryCode'],
      formItemProps: (form) => {
        const industry = form.getFieldValue('industry');
        const industryCode = form.getFieldValue('industryCode');
        if (industry == '海上风电场' || industryCode == '02') return {};
        else return { rules: VERIFICATION.required };
      },
      customFieldProps: (form) => {
        const fieldNames = { label: 'label', value: 'label' };
        const industry = form.getFieldValue('industry');
        const industryCode = form.getFieldValue('industryCode');
        if (industry == '海上风电场' || industryCode == '02') {
          form?.setFieldsValue?.({ projectRegion: '' });
          return { disabled: true, fieldNames };
        } else return { fieldNames };
      },
    },
    {
      title: '特殊地区地区分类',
      dataIndex: 'projectSpecialRegion',
      valueType: 'select',
      request: async () => valueEnumsRequest('SPE_AREA_TYPE'),

      dependencies: ['industry', 'industryCode'],
      formItemProps: (form) => {
        const industry = form.getFieldValue('industry');
        const industryCode = form.getFieldValue('industryCode');
        if (industry == '海上风电场' || industryCode == '02') return {};
        else return { rules: VERIFICATION.required };
      },
      customFieldProps: (form) => {
        const fieldNames = { label: 'label', value: 'label' };
        const industry = form.getFieldValue('industry');
        const industryCode = form.getFieldValue('industryCode');
        if (industry == '海上风电场' || industryCode == '02') {
          form?.setFieldsValue?.({ projectSpecialRegion: '' });
          return { disabled: true, fieldNames };
        } else return { fieldNames };
      },
    },
  ];

  return columns;
};
