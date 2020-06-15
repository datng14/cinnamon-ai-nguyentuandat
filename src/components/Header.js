import React from "react";
import logo from "../assets/img/logo.png";
import styled from "styled-components";
import MenuIcon from "@material-ui/icons/Menu";

const Wrapper = styled.div`
  display: flex;
  border-bottom: 1px solid #ccc;
  justify-content: space-between;
  align-items: center;
  padding: 5px 0;

  .navbar {
    &-left {
      .nav-logo {
        width: 200px;
      }
    }

    &-right {
      display: flex;
      align-items: center;
      .navbar-brand {
        color: #666;
        font-size: 16px;
        margin-left: 5px;
        margin-right: 5px;
        text-decoration: none;
        &:hover {
          font-weight: bold;
        }
      }
    }
  }
`;

function Header(props) {
  return (
    <Wrapper>
      <div className="navbar-left">
        <a href="#home">
          <img src={logo} alt="logo" className="nav-logo" />
        </a>
      </div>
      <div className="navbar-right">
        <a className="navbar-brand" href="#home">
          Home
        </a>
        <MenuIcon />
      </div>
    </Wrapper>
  );
}

export default Header;
