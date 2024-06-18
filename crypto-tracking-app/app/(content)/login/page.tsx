"use client";
import { useEffect, useState } from "react";
import { Form, Input, Button, Typography, message } from "antd";
import useAuthStore from "@/app/stores/auth.store";

const { Title } = Typography;

const Login = () => {
  const { login, status } = useAuthStore();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      await login(values);
      // message.success("Login successful!");
    } catch (error) {
      message.error("Login failed!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === "error") {
      message.error("Login failed!");
    }
  }, [status]);

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "auto",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <Title level={2}>Login</Title>
      <Form name="login" onFinish={onFinish} layout="vertical">
        <Form.Item
          name="username"
          label="Username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Login
          </Button>
        </Form.Item>
        {status === "loading" && <p>Loading...</p>}
        {status === "error" && <p>Error logging in.</p>}
      </Form>
    </div>
  );
};

export default Login;
