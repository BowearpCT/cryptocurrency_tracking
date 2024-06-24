"use client";
import React from "react";
import { Typography, Button } from "antd";
import Link from "next/link";

const { Title, Paragraph } = Typography;

const HeroSection = () => {
  return (
    <div
      style={{
        padding: "5rem 1rem",
        textAlign: "center",
        background: "#f0f2f5",
      }}
    >
      <Title level={1}>Track Your Cryptocurrencies</Title>
      <Paragraph style={{ fontSize: "1.25rem" }}>
        Stay updated with real-time data and manage your crypto portfolio
        effectively.
      </Paragraph>
      <Link href="/dashboard">
        <Button type="primary" size="large">
          Get Started
        </Button>
      </Link>
    </div>
  );
};

export default HeroSection;
