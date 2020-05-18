/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Menu } from "antd";
import axios from "axios";
import { USER_SERVER } from "../../../Config";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";

function RightMenu(props) {
  const user = useSelector((state) => state.user);

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then((response) => {
      if (response.status === 200) {
        props.history.push("/login");
      } else {
        alert("Log Out Failed");
      }
    });
  };

  if (user.userData && !user.userData.isAuth) {
    return (
      <>
        <ul class="nav user-menu">
          <li class="nav-item dropdown has-arrow main-drop">
            <a href="#" class="dropdown-toggle nav-link" data-toggle="dropdown">
              <span class="user-img">
                <img src="{user.userData.image}" alt="" />
              </span>
              <span>Not logged in</span>
            </a>
            <div class="dropdown-menu">
              <a class="dropdown-item" href="/login">
                Signin
              </a>
              <a class="dropdown-item" href="/register">
                Signup
              </a>
            </div>
          </li>
        </ul>

        <div class="dropdown mobile-user-menu">
          <a
            href="#"
            class="nav-link dropdown-toggle"
            data-toggle="dropdown"
            aria-expanded="false"
          >
            <i class="fa fa-ellipsis-v"></i>
          </a>
          <div class="dropdown-menu dropdown-menu-right">
            <a class="dropdown-item" href="/login">
              Signin
            </a>
            <a class="dropdown-item" href="/register">
              Signup
            </a>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <ul class="nav user-menu">
          <li class="nav-item dropdown has-arrow main-drop">
            <a href="#" class="dropdown-toggle nav-link" data-toggle="dropdown">
              <span class="user-img">
                <img src="{user.userData.image}" alt="" />
              </span>
              <span>Welcome!</span>
            </a>
            <div class="dropdown-menu">
              <a class="dropdown-item" onClick={logoutHandler}>
                Logout
              </a>
            </div>
          </li>
        </ul>

        <div class="dropdown mobile-user-menu">
          <a
            href="#"
            class="nav-link dropdown-toggle"
            data-toggle="dropdown"
            aria-expanded="false"
          >
            <i class="fa fa-ellipsis-v"></i>
          </a>
          <div class="dropdown-menu dropdown-menu-right">
            <a class="dropdown-item" onClick={logoutHandler}>
              Logout
            </a>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(RightMenu);
