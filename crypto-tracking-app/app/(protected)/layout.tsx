import { Layout } from "antd";
import Navbar from "../components/navbar";
import classes from "./layout.module.css";
import { Content, Footer, Header } from "antd/es/layout/layout";
import ProtectedRoute from "../components/protectRoute";
type Props = {
  children: string | JSX.Element | JSX.Element[];
};

const ContentLayout = ({ children }: Props) => {
  return (
    <Layout>
      <Header className={"header"}>
        <Navbar />
      </Header>
      <Content className={"container"}>
        <ProtectedRoute>{children}</ProtectedRoute>
      </Content>

      <Footer className={"footer"}>
        {/* <div className={"container"}>
          <p>
            &copy; 2024 CryptoTracker. All rights reserved.{" "}
            <a href="#">Privacy Policy</a>
          </p>
        </div> */}
      </Footer>
    </Layout>
  );
};

export default ContentLayout;
