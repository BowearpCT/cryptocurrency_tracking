"use client";
import React from "react";
import { Row, Col, Card, Typography } from "antd";

const { Title, Paragraph } = Typography;

const features = [
  {
    title: "Real-Time Data",
    description: "Get real-time updates on cryptocurrency prices.",
  },
  {
    title: "Portfolio Management",
    description: "Manage your cryptocurrency portfolio with ease.",
  },
  {
    title: "Secure Transactions",
    description: "Ensure your transactions are secure and reliable.",
  },
];

const Features = () => {
  return (
    <div style={{ padding: "2rem 0" }}>
      <Row gutter={[16, 16]} justify="center">
        {features.map((feature, index) => (
          <Col key={index} xs={24} sm={12} md={8}>
            <Card>
              <Title level={3}>{feature.title}</Title>
              <Paragraph>{feature.description}</Paragraph>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Features;
