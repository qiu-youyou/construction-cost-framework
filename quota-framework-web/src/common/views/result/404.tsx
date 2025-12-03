import { history } from 'umi';
import { Button, Result } from 'antd';

const NoFoundPage = function () {
  const subTitle = (
    <>
      <p>抱歉，您访问的页面不存在。</p>
      <p>Sorry, the page you visited does not exist.</p>
    </>
  );

  const extra = (
    <Button type="primary" onClick={() => history.push('/')}>
      Back Home 返回首页
    </Button>
  );

  return <Result title="404" status="404" subTitle={subTitle} extra={extra} />;
};
export default NoFoundPage;
