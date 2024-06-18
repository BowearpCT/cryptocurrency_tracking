"use client";
import { Menu } from "antd";
import Link from "next/link";

const { Item } = Menu;

const Navbar = () => {
  return (
    <Menu mode="horizontal" theme="dark">
      <Item key="home">
        <Link href="/">Home</Link>
      </Item>
      <Item key="register">
        <Link href="/register">Register</Link>
      </Item>
      <Item key="login">
        <Link href="/login">Login</Link>
      </Item>
    </Menu>
  );
};

export default Navbar;
