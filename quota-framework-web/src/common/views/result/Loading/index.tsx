/*
 * @Author: SHUANG
 * @Date: 2023-06-15 21:10:12
 * @LastEditors: s_qiu s.qiu@foxmail.com
 * @LastEditTime: 2023-07-20 09:32:15
 * @Description: 系统Loading
 */
const Loading = function () {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        minHeight: 420,
      }}
    >
      <div className="page-loading-warp">
        <div className="ant-spin ant-spin-lg ant-spin-spinning">
          <span className="ant-spin-dot ant-spin-dot-spin">
            <i className="ant-spin-dot-item"></i>
            <i className="ant-spin-dot-item"></i>
            <i className="ant-spin-dot-item"></i>
            <i className="ant-spin-dot-item"></i>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Loading;
