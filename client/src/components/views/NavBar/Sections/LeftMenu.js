import React from "react";
import { Menu } from "antd";
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {
  return (
    <>
      <div class="header-left">
        <a href="/" class="logo">
          <img
            src="https://dreamguys.co.in/smarthr/light/assets/img/logo.png"
            width="40"
            height="40"
            alt=""
          />
        </a>
      </div>
      <div class="page-title-box">
        <h3>Communication Software</h3>
      </div>
    </>
  );
}

export default LeftMenu;
