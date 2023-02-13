import { useAuth } from 'hooks/custom-context';
import { Button, Card, Form, Input } from 'antd';
import { HTapeLayout } from 'components';

export const Login = () => {
  const authContext = useAuth();

  const [form] = Form.useForm();

  /**
   * 提交事件
   * @param event
   */
  const handleLogin = async () => {
    form
      .validateFields(['username', 'password'])
      .then(() => {
        authContext.login(form.getFieldsValue(['username', 'password']));
      })
      .catch(() => {});
  };

  // const handleRegister = () => {
  //   authContext.register({
  //     username: usernameRef.current?.value || '',
  //     password: passwordRef.current?.value || ''
  //   });
  // };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Card>
        <Form
          name="basic"
          form={form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600, width: 400 }}
          initialValues={{ remember: true }}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" onClick={handleLogin}>
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
