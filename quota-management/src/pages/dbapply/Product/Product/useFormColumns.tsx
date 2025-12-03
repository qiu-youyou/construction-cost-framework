/*
 * @Author: SHUANG
 * @Date: 2024-02-04 16:02:15
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2024-04-22 17:12:24
 * @Description: 工程造价产品-产品信息
 */
import { FormColumnsDefine } from 'jd-framework-web/package/components';
import VERIFICATION from 'jd-framework-web/package/common/constant/verification';
import { UserListItem } from 'jd-framework-web/package/common/views/system/User/typings';

import UserSearchInput from '@/common/formItems/UserSearchInput';
import { valueEnumsRequest } from '../valueEnums';
import { ProductSaveParams } from './typings';

type Props = {
  type: 'plus' | 'edit';
  dbapplyType?: any[];
};

export default ({ type, dbapplyType }: Props) => {
  const SCPersonColumns =
    type === 'plus'
      ? []
      : [
          {
            dataIndex: 'userInformationSc',
            formItemProps: { hidden: true },
            fieldProps: { disabled: true },
            colProps: { span: 0 },
          },
          {
            title: '审查人',
            dataIndex: 'checkPerson',
            formItemProps: { rules: VERIFICATION.required },

            renderFormItem: (v1: any, v2: any, form: { getFieldValue: (arg0: string) => any }) => {
              const userInformationScJson = form.getFieldValue('userInformationSc');
              const userInformationSc = userInformationScJson && JSON.parse(userInformationScJson);

              return <UserSearchInput valueUserInfo={userInformationSc} />;
            },

            customFieldProps: (form: {
              setFieldsValue: (arg0: {
                checkPerson: string | undefined;
                userInformationSc: string | undefined;
              }) => void;
            }) => ({
              onChange: (v: string, userSelection?: UserListItem[]) => {
                /** 更新当前表单 */
                const userInformationScArr = userSelection?.map((item: any) => ({
                  userId: item?.id,
                  userCode: item?.userCode,
                  userFullName: item?.userRealname,
                }));

                const userInformationSc = userInformationScArr && JSON.stringify(userInformationScArr);
                const checkPerson = userSelection?.map((item) => item.userRealname)?.join(',');
                form?.setFieldsValue?.({ checkPerson, userInformationSc });
              },
            }),
          },
        ];

  const columns: FormColumnsDefine<ProductSaveParams> = [
    {
      dataIndex: 'id',
      hideInForm: true,
    },
    {
      dataIndex: 'projectId',
      hideInForm: true,
    },

    {
      title: '产品名称',
      dataIndex: 'productName',
      formItemProps: { rules: VERIFICATION.required },
    },
    {
      title: '产品阶段',
      dataIndex: 'productPhase',
      valueType: 'select',
      request: async () => valueEnumsRequest('dbapply_phase'),
      formItemProps: { rules: VERIFICATION.required },
    },
    {
      title: '产品类型',
      dataIndex: 'productType',
      valueType: 'select',
      dependencies: ['productPhase'],
      formItemProps: { rules: VERIFICATION.required },
      customFieldProps: (form) => {
        const productPhase = form.getFieldValue('productPhase');
        const productType = form.getFieldValue('productType');
        let options;
        // if (productPhase === '招标设计') {
        if (productPhase === '01') {
          options = dbapplyType?.filter((item: { value: string }) => ['01', '02', '03'].includes(item.value));
        }
        // if (productPhase === '施工详图设计') {
        if (productPhase === '02') {
          options = dbapplyType?.filter((item: { value: string }) => ['04', '05', '06'].includes(item.value));
        }
        // if (productPhase === '完工') {
        if (productPhase === '03') {
          options = dbapplyType?.filter((item: { value: string }) => ['07'].includes(item.value));
        }
        if (!options?.find((item) => item.value == productType)) {
          form.setFieldValue('productType', '');
        }
        return { options };
      },
    },
    {
      title: '版本号',
      dataIndex: 'versionCode',
      formItemProps: { rules: VERIFICATION.required },
    },

    {
      dataIndex: 'userInformationBz',
      formItemProps: { hidden: true },
      fieldProps: { disabled: true },
      colProps: { span: 0 },
    },
    {
      title: '编制人',
      dataIndex: 'editPerson',
      formItemProps: { rules: VERIFICATION.required },
      renderFormItem: (v1, v2, form) => {
        const userInformationBzJson = form.getFieldValue('userInformationBz');
        const userInformationBz = userInformationBzJson && JSON.parse(userInformationBzJson);
        return <UserSearchInput valueUserInfo={userInformationBz} />;
      },

      customFieldProps: (form) => ({
        onChange: (v: string, userSelection?: UserListItem[]) => {
          /** 更新当前表单 */
          const userInformationBzArr = userSelection?.map((item: any) => ({
            userId: item?.id,
            userCode: item?.userCode,
            userFullName: item?.userRealname,
          }));
          const userInformationBz = userInformationBzArr && JSON.stringify(userInformationBzArr);
          const editPerson = userSelection?.map((item) => item.userRealname)?.join(',');
          form?.setFieldsValue?.({ editPerson, userInformationBz });
        },
      }),
    },

    {
      dataIndex: 'userInformationJh',
      formItemProps: { hidden: true },
      fieldProps: { disabled: true },
      colProps: { span: 0 },
    },
    {
      title: '校核人',
      dataIndex: 'proofreadPerson',
      formItemProps: { rules: VERIFICATION.required },
      renderFormItem: (v1, v2, form) => {
        const userInformationJhJson = form.getFieldValue('userInformationJh');
        const userInformationJh = userInformationJhJson && JSON.parse(userInformationJhJson);

        return <UserSearchInput valueUserInfo={userInformationJh} />;
      },

      customFieldProps: (form) => ({
        onChange: (v: string, userSelection?: UserListItem[]) => {
          /** 更新当前表单 */
          const userInformationJhArr = userSelection?.map((item: any) => ({
            userId: item?.id,
            userCode: item?.userCode,
            userFullName: item?.userRealname,
          }));
          const userInformationJh = userInformationJhArr && JSON.stringify(userInformationJhArr);
          const proofreadPerson = userSelection?.map((item) => item.userRealname)?.join(',');
          form?.setFieldsValue?.({ proofreadPerson, userInformationJh });
        },
      }),
    },

    ...SCPersonColumns,
    {
      title: '备注',
      dataIndex: 'note',
      valueType: 'textarea',
      customFieldProps: { rows: 3, style: { height: 'auto' } },
    },
  ];
  return columns;
};
