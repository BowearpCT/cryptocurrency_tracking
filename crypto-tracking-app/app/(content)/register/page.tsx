"use client";
import { useState } from "react";
import useAuthStore from "@/app/stores/auth.store";
import { Button, Card, Form, Input, message, Typography } from "antd";
import { useRouter } from "next/navigation";
import { AxiosError, AxiosResponse } from "axios";
const { Title } = Typography;

const Register = () => {
  const { register, status } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [msgApi, msgContext] = message.useMessage();
  const router = useRouter();

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      await register(values);
      msgApi.success("Registration successful!");
      router.push("/login");
    } catch (error) {
      if (error instanceof Error) msgApi.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "auto",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      {msgContext}
      <Title level={2}>Register</Title>
      <Form name="register" layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="username"
          label="Username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
              type: "email",
            },
          ]}
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
            Register
          </Button>
        </Form.Item>
        {status === "loading" && <p>Loading...</p>}
        {status === "error" && <p>Error registering user.</p>}
      </Form>
    </div>
  );
};

export default Register;
