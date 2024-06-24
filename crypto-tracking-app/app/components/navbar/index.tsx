"use client";
import useAuthStore from "@/app/stores/auth.store";
import { Menu } from "antd";
import Link from "next/link";

const { Item } = Menu;

const Navbar = () => {
  const { user, logout } = useAuthStore();
  return (
    <Menu mode="horizontal" theme="dark">
      <Item key="home">
        <Link href="/home">Home</Link>
      </Item>

      {user ? (
        <>
          <Item key="portfolio">
            <Link href="/portfolio">Portfolio</Link>
          </Item>
          <Menu.Item key="username" style={{ marginLeft: "auto" }}>
            {user.username}
          </Menu.Item>
          <Menu.Item key="logout" onClick={logout}>
            Logout
          </Menu.Item>
        </>
      ) : (
        <>
          <Menu.Item key="register" style={{ marginLeft: "auto" }}>
            <Link href="/register">Register</Link>
          </Menu.Item>
          <Menu.Item key="login">
            <Link href="/login">Login</Link>
          </Menu.Item>
        </>
      )}
    </Menu>
  );
};

export default Navbar;
