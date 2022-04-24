/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";

import Logo from "../../assets/others/Logo1.png";
import Extra from "../contents/Extra";

const TopNav = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  color: #fff;
  padding: 8px 50px;
  align-items: center;
  @media (max-width: 522px) {
    font-size: 14px;
    padding: 8px 1px;
  }
`;

const Number = styled.span`
  @media (max-width: 766px) {
    display: none;
  }
`;

const ApplyNow = styled.div`
  display: flex;
  padding-right: 20px;
  /* span {
    padding-right: 30px;
  } */
  gap: 30px;
`;

const CareerField = styled.span`
  @media (max-width: 500px) {
    display: none;
  }
`;

const StyledLink = styled(NavLink)`
  text-decoration: none;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

const NavLinks = styled.div`
  a {
    font-size: 13.5px;
    text-transform: uppercase;
    font-weight: 600;
  }
  @media (max-width: 1047px) {
    display: none;
  }
`;

const Bar = styled.div`
  color: #111;
  font-size: 34px;
  display: none;
  cursor: pointer;
  @media (max-width: 1047px) {
    display: flex;
    margin-left: auto;
    padding-right: 20px;
  }
`;

const NavDropDown = styled.div`
  flex-direction: column;
  background-color: #fff;
  width: 310px;
  height: 100vh;
  position: fixed;
  top: 0;
  color: red;
  z-index: 99999;
  -webkit-transition: 0.8s ease all;
  transition: 0.8s ease all;
  left: -500px;
  transform: ${(props) => (props.sideBar ? "translateX(500px)" : "")};
  box-shadow: ${(props) =>
    props.sideBar ? "0 0 0 10000px rgba(0, 0, 0, 0.5)" : "0"};
  overflow-x: auto;
  @media (min-width: 1047px) {
    display: none;
  }
`;

const NavDropDownMenu = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 12px;
  background-color: #3459e6;
  align-items: center;
  color: #fff;
  i {
    font-size: 24px;
  }
  h3 {
    color: #fff;
  }
`;

const NavDropDownItems = styled.ul`
  list-style: none;
  padding-left: 0px;
`;

const GalleryNavShow = styled.ul`
  display: ${(props) => (props.galleryShow ? "block" : "none")};
  li {
    list-style: none;
  }
`;

const FamilyShow = styled.ul`
  display: ${(props) => (props.hafam ? "block" : "none")};
  li {
    list-style: none;
  }
`;

const NavDropDownItem = styled.li`
  line-height: 45px;
  border-bottom: 1.8px solid #111;
  a {
    color: #111;
    position: relative;
    text-decoration: none;
    font-size: 17px;
    font-weight: 600;
    display: block;
    padding-left: 8px;
    &:hover {
    }
  }
  span {
    font-size: 18px;
    margin-left: 2px;
  }
`;

const Header = () => {
  const [sideBar, setSideBar] = useState(false);
  const [galleryShow, setGalleryShow] = useState(false);
  const [hafam, setHafam] = useState(false);

  useEffect(() => {
    document.onclick = function (e) {
      if (sideBar && e.target.id !== "sideMenu") {
        setSideBar(false);
      }
      if (sideBar && e.target.id === "sideMenu2") {
        setSideBar(true);
      }
    };
  });
  const showSideBar = () => {
    setSideBar(!sideBar);
  };

  const closeSideBar = () => {
    setSideBar(false);
  };

  const galleryShowHandler = () => {
    setGalleryShow(!galleryShow);
  };

  const FamilyShowHandler = () => {
    setHafam(!hafam);
  };

  return (
    <>
      <TopNav className="bg-custom">
        <span>
          {" "}
          <span style={{ marginRight: "20px" }}>
            <i className="fas fa-map-marker-alt"></i> Bafal-13, Kathmandu
          </span>
          <Number>
            <i className="fas fa-phone-alt"></i> 01-523 7058 | 01-523 7283
          </Number>
        </span>
        <span>
          {" "}
          <ApplyNow>
            <Link
              to="/careers"
              style={{ textDecoration: "none", color: "#fff" }}
            >
              <CareerField>Careers</CareerField>
            </Link>
            <Link
              to="/registration"
              style={{ textDecoration: "none", color: "#fff" }}
            >
              <span>Apply Now</span>
            </Link>

            <Extra />
          </ApplyNow>
        </span>
      </TopNav>
      <nav className="navbar navbar-expand-lg text-primary bg-light sticky-top py-1 px-1">
        <a className="navbar-brand pt-0 pb-0" href="/">
          <img src={Logo} alt="logo" style={{ height: "80px" }} />{" "}
        </a>
        <NavLinks className="ms-auto" id="navbarNavDropdown">
          <ul className="navbar-nav navbarNav">
            <StyledLink exact activeClassName="selected" to="/">
              <li className="nav-item">
                <a className="nav-link">Home</a>
              </li>
            </StyledLink>

            <StyledLink exact activeClassName="selected" to="/school">
              <li className="nav-item">
                <a className="nav-link">School</a>
              </li>
            </StyledLink>

            <StyledLink exact activeClassName="selected" to="/college">
              <li className="nav-item">
                <a className="nav-link">College</a>
              </li>
            </StyledLink>

            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdownMenuLink"
                data-toggle="dropdown"
                aria-expanded="false"
                style={{ color: "#3459e6" }}
              >
                HA Family
              </a>
              <div
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <StyledLink exact activeClassName="selected" to="/hafamily/bod">
                  <a className="dropdown-item">BOD</a>
                </StyledLink>
                <StyledLink
                  exact
                  activeClassName="selected"
                  to="/hafamily/honorary"
                >
                  <a className="dropdown-item">Honorary Advisors</a>
                </StyledLink>
                <StyledLink
                  exact
                  activeClassName="selected"
                  to="/hafamily/staffs"
                >
                  <a className="dropdown-item">Staffs</a>
                </StyledLink>
              </div>
            </li>

            <StyledLink exact activeClassName="selected" to="/scholarship">
              <li className="nav-item">
                <a className="nav-link">Scholarship</a>
              </li>
            </StyledLink>

            <StyledLink exact activeClassName="selected" to="/alumni">
              <li className="nav-item">
                <a className="nav-link">Alumni</a>
              </li>
            </StyledLink>

            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdownMenuLink"
                data-toggle="dropdown"
                aria-expanded="false"
                style={{ color: "#3459e6" }}
              >
                Gallery
              </a>
              <div
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <StyledLink
                  exact
                  activeClassName="selected"
                  to="/gallery/albums"
                >
                  <a className="dropdown-item">Albums</a>
                </StyledLink>
                <StyledLink
                  exact
                  activeClassName="selected"
                  to="/gallery/videos"
                >
                  <a className="dropdown-item">Videos</a>
                </StyledLink>
              </div>
            </li>

            <StyledLink exact activeClassName="selected" to="/contact">
              <li className="nav-item">
                <a className="nav-link">Contact</a>
              </li>
            </StyledLink>
          </ul>
        </NavLinks>
        <Bar>
          <i className="fas fa-bars" onClick={showSideBar}></i>
        </Bar>
      </nav>
      <NavDropDown sideBar={sideBar} id="sideMenu">
        <NavDropDownMenu id="sideMenu">
          <h3>Menu</h3>
          <i className="fas fa-times" onClick={closeSideBar}></i>
        </NavDropDownMenu>
        <NavDropDownItems>
          <NavDropDownItem>
            <StyledLink exact activeClassName="drop-active" to="/">
              <a>Home</a>
            </StyledLink>
          </NavDropDownItem>
          <NavDropDownItem>
            <StyledLink exact activeClassName="drop-active" to="/school">
              <a>School</a>
            </StyledLink>
          </NavDropDownItem>

          <NavDropDownItem>
            <StyledLink exact activeClassName="drop-active" to="/college">
              <a>College</a>
            </StyledLink>
          </NavDropDownItem>

          <NavDropDownItem>
            <a
              onClick={FamilyShowHandler}
              className="navDropDownHead"
              id="sideMenu2"
            >
              HA Family{" "}
              <span
                className={
                  hafam ? "fas fa-caret-up first" : "fas fa-caret-down first"
                }
              ></span>
            </a>
            <FamilyShow hafam={hafam}>
              <li>
                <StyledLink
                  exact
                  activeClassName="drop-active"
                  to="/hafamily/bod"
                >
                  <a>BOD</a>
                </StyledLink>
              </li>
              <li>
                <StyledLink
                  exact
                  activeClassName="drop-active"
                  to="/hafamily/honorary"
                >
                  <a>Honorary Advisors</a>
                </StyledLink>
              </li>
              <li>
                <StyledLink
                  exact
                  activeClassName="drop-active"
                  to="/hafamily/staffs"
                >
                  <a>Staffs</a>
                </StyledLink>
              </li>
            </FamilyShow>
          </NavDropDownItem>
          <NavDropDownItem>
            <StyledLink exact activeClassName="drop-active" to="/scholarship">
              <a>Scholarship</a>
            </StyledLink>
          </NavDropDownItem>
          <NavDropDownItem>
            <StyledLink exact activeClassName="drop-active" to="/alumni">
              <a>Alumni</a>
            </StyledLink>
          </NavDropDownItem>

          <NavDropDownItem>
            <a
              onClick={galleryShowHandler}
              className="navDropDownHead"
              id="sideMenu2"
            >
              Gallery{" "}
              <span
                className={
                  galleryShow
                    ? "fas fa-caret-up first"
                    : "fas fa-caret-down first"
                }
              ></span>
            </a>
            <GalleryNavShow galleryShow={galleryShow}>
              <li>
                <StyledLink
                  exact
                  activeClassName="drop-active"
                  to="/gallery/albums"
                >
                  <a>Albums</a>
                </StyledLink>
              </li>
              <li>
                <StyledLink
                  exact
                  activeClassName="drop-active"
                  to="/gallery/videos"
                >
                  <a>Videos</a>
                </StyledLink>
              </li>
            </GalleryNavShow>
          </NavDropDownItem>
          <NavDropDownItem>
            <StyledLink exact activeClassName="drop-active" to="/contact">
              <a>Contact</a>
            </StyledLink>
          </NavDropDownItem>
        </NavDropDownItems>
      </NavDropDown>
    </>
  );
};

export default Header;
