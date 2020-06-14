import React from "react";
import Navbar from "react-bootstrap/Navbar";
import logo from "../assets/img/logo.png";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Wrapper = styled.div`
  .navbar {
    border-bottom: 1px solid #ccc;
  }

  .nav-logo {
    width: 150px;
  }
  .navbar-brand {
    color: #666;
    font-size: 16px;
  }
`;

function Header(props) {
  return (
    <Wrapper>
      <Navbar>
        <Navbar.Brand href="#home">
          <img src={logo} alt="logo" className="nav-logo" />
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Brand href="#">Home</Navbar.Brand>
          <Navbar.Brand href="#">
            <FontAwesomeIcon icon={faBars} color="#666" />
          </Navbar.Brand>
        </Navbar.Collapse>
      </Navbar>
    </Wrapper>
  );
}

export default Header;
