"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Typography, Card, Row, Col, message, List } from "antd";
import axiosInstance from "@/app/lib/axios";
// import { fetchCoinData, fetchTokens } from "../../lib/fetchTokens";

const { Title } = Typography;

const PortfolioDetail: React.FC = () => {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const { id } = params;
  const [portfolio, setPortfolio] = useState<any>(null);
  const [tokenData, setTokenData] = useState<any[]>([]);

  useEffect(() => {
    if (id) {
      const fetchPortfolioDetail = async () => {
        try {
          const response = await axiosInstance.get(`/portfolio/${id}/detail`);
          setPortfolio(response.data.portfolio);
          setTokenData(response.data.tokenData);
        } catch (error) {
          message.error("Failed to fetch portfolio details");
        }
      };
      fetchPortfolioDetail();
    }
  }, [id]);

  if (!portfolio) {
    return null;
  }

  return (
    <div style={{ padding: "2rem" }}>
      <Title level={2}>{portfolio.name}</Title>
      <Row gutter={[16, 16]}>
        {tokenData.map((token) => (
          <Col key={token.id} xs={24} sm={12} md={8} lg={6}>
            <Card
              title={token.name}
              bordered={false}
              style={{ height: "100%" }}
              bodyStyle={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <img src={token.image.thumb} alt={token.name} />
                <p>
                  <strong>Price in BTC:</strong>{" "}
                  {token.market_data.current_price.btc}
                </p>
                <p>
                  <strong>24h Change:</strong>{" "}
                  {token.market_data.price_change_percentage_24h}%
                </p>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default PortfolioDetail;
