"use client";
import { useEffect, useState } from "react";
import { List, Typography, message, Button, Modal, Row, Col, Card } from "antd";
import axiosInstance from "@/app/lib/axios";
import PortfolioForm from "@/app/components/portfolioForm";
import { truncateAddress } from "@/app/utils/formatAddress";

const { Title } = Typography;

interface Portfolio {
  id: number;
  name: string;
  cryptoNetwork: string;
  cryptoAddress: string;
}

const Portfolio: React.FC = () => {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const response = await axiosInstance.get("/portfolio");
        setPortfolios(response.data);
      } catch (error) {
        message.error("Failed to fetch portfolios");
      }
    };
    fetchPortfolios();
  }, []);

  const handlePortfolioCreated = (newPortfolio: Portfolio) => {
    setPortfolios([...portfolios, newPortfolio]);
    setIsModalVisible(false); // Hide the modal after creating a portfolio
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <Title level={2}>My Portfolios</Title>
      <Button type="primary" onClick={() => setIsModalVisible(true)}>
        Create More
      </Button>
      <Modal
        title="Create Portfolio"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <PortfolioForm onPortfolioCreated={handlePortfolioCreated} />
      </Modal>
      <Row gutter={[16, 16]} style={{ marginTop: "16px" }}>
        {portfolios.map((portfolio) => (
          <Col key={portfolio.id} xs={24} sm={12} md={8} lg={6}>
            <Card
              title={portfolio.name}
              bordered={false}
              style={{ height: "100%" }}
              bodyStyle={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <p>
                  <strong>Network:</strong> {portfolio.cryptoNetwork}
                </p>
                <p>
                  <strong>Address:</strong>{" "}
                  {truncateAddress(portfolio.cryptoAddress)}
                </p>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Portfolio;
