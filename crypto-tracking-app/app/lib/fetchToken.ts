import axios from "axios";

export const fetchTokens = async (address: string) => {
  try {
    const response = await axios.get(
      `/api/etherscan/tokens?address=${address}`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch tokens", error);
    throw error;
  }
};

export const fetchCoinData = async (coinId: string) => {
  try {
    const response = await axios.get(`/api/coin-gecko/coin?id=${coinId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch coin data", error);
    throw error;
  }
};
