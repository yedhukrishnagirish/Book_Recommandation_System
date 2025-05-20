import { useEffect, useState } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import "../../utils/css/LoginForm.css";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm();

  // On mount, load user data from storage and fill the form if available
  useEffect(() => {
    const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      form.setFieldsValue({ ...userData, rememberMe: !!localStorage.getItem('user') });
    }
  }, [form]);

  // Handle form submission: save user info and navigate to /book
  const onFinish = (values: { username: string; password: string; rememberMe: boolean }) => {
    setLoading(true);
    const { rememberMe, ...userData } = values;

    setTimeout(() => {
      if (rememberMe) {
        localStorage.setItem('user', JSON.stringify(userData));
        sessionStorage.removeItem('user');
      } else {
        sessionStorage.setItem('user', JSON.stringify(userData));
        localStorage.removeItem('user');
      }

      setLoading(false);
      navigate('/book');
    }, 1000);
  };

  return (
    <div className="login-form-container">
      <h2 className="login-title">Login</h2>
      <Form
        form={form}
        name="login"
        onFinish={onFinish}
        layout="vertical"
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

        <Form.Item name="rememberMe" valuePropName="checked">
          <Checkbox>Remember Me</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
