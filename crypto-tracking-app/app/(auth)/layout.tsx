import { Layout } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import classes from "./layout.module.css";

type Props = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: Props) => {
  return (
    <Layout className={classes.layout}>
      <Content className={classes.content}>{children}</Content>
    </Layout>
  );
};

export default AuthLayout;
