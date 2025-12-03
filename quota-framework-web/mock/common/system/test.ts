/*
 * @Author: SHUANG
 * @Date: 2023-07-27 10:39:37
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-11-03 15:23:41
 * @Description:
 */

module.exports = {
  'POST /api/test/success.action': async (req, res) => {
    const arr = [];

    for (let i = 1; i < 11; i++) {
      arr.push({
        id: i,
        testText: `文字Test文字Test文字Test文字Test文字Test文字Test${i}`,
        testSelect: `下拉选择Test下拉选择Test下拉选择Test下拉选择Test${i}`,
        testDigit: 199.568674,
        testTextarea: `文本Test文本Test文本Test${i}`,
        testDate: `2023-07-${i}`,
        dateYear: `2023`,
        testTextChil: `文字Test文字Test文字Test文字Test文字Test${i}`,
        testSelectChil: `下拉选择Test下拉选择Test下拉选择Test下拉选择Test${i}`,
        testDigitChil: `${i}`,
        testTextareaChil: `文本Test文本Test文本Test文本Test${i}`,
        testDateChil: `2023-07-${i}`,
        dateYearChil: `2023`,
      });
    }

    const result = {
      status: 'SUCCESS',
      rows: arr,
      message: '操作成功',
      total: 11,
    };
    res.send(result);
  },

  'POST /api/test/error.action': {
    status: 'ERROR',
    rows: [],
  },
};
