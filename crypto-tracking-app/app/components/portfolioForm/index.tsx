import { useState } from "react";
import { Form, Input, Button, message, Select } from "antd";
import axiosInstance from "@/app/lib/axios";
import Portfolio from "@/app/(protected)/portfolio/page";

const { Option } = Select;

const networkOptions = [
  { value: "ethereum", label: "ETH" },
  { value: "binance-smart-chain", label: "BSC" },
  // Add more networks as needed
];

interface PortfolioFormProps {
  onPortfolioCreated: (portfolio: Portfolio) => void;
}

const PortfolioForm: React.FC<PortfolioFormProps> = ({
  onPortfolioCreated,
}: PortfolioFormProps) => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: {
    name: string;
    cryptoNetwork: string;
    cryptoAddress: string;
  }) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post("/portfolio/create", values);
      message.success("Portfolio created successfully!");
      onPortfolioCreated(response.data);
    } catch (error) {
      message.error("Failed to create portfolio");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form name="portfolio" onFinish={onFinish} layout="vertical">
      <Form.Item
        name="name"
        label="Portfolio Name"
        rules={[
          { required: true, message: "Please input the portfolio name!" },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="cryptoNetwork"
        label="Crypto Network"
        rules={[
          { required: true, message: "Please select the crypto network!" },
        ]}
      >
        <Select placeholder="Select a network">
          {networkOptions.map((option) => (
            <Option key={option.value} value={option.value}>
              {option.label}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="cryptoAddress"
        label="Crypto Address"
        rules={[
          { required: true, message: "Please input the crypto address!" },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Create Portfolio
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PortfolioForm;
