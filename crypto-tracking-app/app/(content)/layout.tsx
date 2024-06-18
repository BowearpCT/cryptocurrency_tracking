import { Layout } from "antd";
import Navbar from "../components/navbar";
import classes from "./layout.module.css";
import { Content, Footer, Header } from "antd/es/layout/layout";
type Props = {
  children: string | JSX.Element | JSX.Element[];
};

const ContentLayout = ({ children }: Props) => {
  return (
    <Layout>
      <Header className={"header"}>
        <Navbar />
        {/* <div className={"container"}> */}
        {/* <div className={"logo"}>KRYPTODIAN</div> */}
        {/* </div> */}
      </Header>
      <Content className={"container"}>{children}</Content>

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
