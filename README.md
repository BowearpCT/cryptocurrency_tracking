
# Cryptocurrency Portfolio Tracker

A comprehensive cryptocurrency portfolio tracker that allows users to manage their crypto holdings, view detailed information about their assets, and track profit/loss using CoinGecko and Etherscan APIs.

## Features

- **User Authentication**: Secure login and registration using JWT authentication.
- **Portfolio Management**: Create and manage multiple portfolios.
- **Detailed Asset Information**: View detailed information about each cryptocurrency, including logo, name, price in BTC, and 24-hour price change.
- **Top Coins Feature**: Highlight the top coins in the user’s portfolio.

## Tech Stack

- **Frontend**: Next.js, Ant Design, TypeScript
- **Backend**: NestJS, TypeORM, PostgreSQL
- **APIs**: CoinGecko API, Etherscan API

## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- PostgreSQL
- Etherscan API Key
- CoinGecko API

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/crypto-portfolio-tracker.git
   cd crypto-portfolio-tracker
   ```

2. **Install dependencies:**

   ```bash
   # For the backend
   cd backend
   npm install

   # For the frontend
   cd ../frontend
   npm install
   ```

3. **Configure environment variables:**

   Create a `.env` file in the `backend` directory and add your configuration:

   ```env
   DATABASE_HOST=localhost
   DATABASE_PORT=5432
   DATABASE_USER=your_db_user
   DATABASE_PASSWORD=your_db_password
   DATABASE_NAME=your_db_name
   JWT_SECRET=your_jwt_secret
   ETHERSCAN_API_KEY=your_etherscan_api_key
   ```

4. **Run the backend:**

   ```bash
   cd backend
   npm run start:dev
   ```

5. **Run the frontend:**

   ```bash
   cd ../frontend
   npm run dev
   ```

6. **Access the application:**

   Open your browser and navigate to `http://localhost:3000`.

## Usage

1. **Register and Login:**
   - Navigate to the registration page to create a new account.
   - Log in with your credentials.

2. **Create Portfolio:**
   - After logging in, create a new portfolio by clicking on the "Create More" button.
   - Enter the portfolio name and the associated wallet address.

3. **View Portfolio Details:**
   - Click on a portfolio to view detailed information about the assets it holds.
   - The portfolio detail page displays the cryptocurrencies held, including their logo, name, price in BTC, and 24-hour price change.

4. **Track Top Coins:**
   - The portfolio detail page highlights the top coins based on their value and performance.

## API Endpoints

### Portfolio Endpoints

- `POST /portfolio/create` - Create a new portfolio
- `GET /portfolio` - Get all portfolios for the authenticated user
- `GET /portfolio/:id/detail` - Get detailed information about a specific portfolio

### Etherscan Endpoints

- `GET /etherscan/tokens?address=:address` - Get tokens for a specific wallet address

### CoinGecko Endpoints

- `GET /coin-gecko/coin?id=:coinId` - Get detailed information about a specific cryptocurrency

## Contributing

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Submit a pull request.

## License

This project is licensed under the MIT License.

## Acknowledgements

- [CoinGecko API](https://www.coingecko.com/en/api)
- [Etherscan API](https://etherscan.io/apis)
- [Ant Design](https://ant.design/)
- [NestJS](https://nestjs.com/)
- [Next.js](https://nextjs.org/)
