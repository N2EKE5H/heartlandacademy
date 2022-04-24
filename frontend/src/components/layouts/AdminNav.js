import React, { useEffect } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import useWindowDimensions from "../helpers/windowLength";
import { sidebarToggler } from "../../actions/settingActions";

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

const Sidebar = styled.div`
  height: 100%;
  position: fixed;
  width: ${(props) => (props.sideBar ? "280px" : "70px")};
  /* padding: 5px 13px; */
  overflow-x: hidden;
  overflow-y: inherit;
  transition: all 0.5s ease;
  background: ${(props) => (props.darkmode ? "#202124" : "#fff")};
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  i {
    height: 60px;
    line-height: 60px;
  }
  h4 {
    display: ${(props) => (props.sideBar ? "block" : "none")};
  }
  @media (max-width: 400px) {
    width: ${(props) => (props.sideBar ? "70px" : "70px")};
  }
  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(255, 255, 255, 0.3);
    box-shadow: inset 0 0 6px rgba(255, 255, 255, 0.3);
    border-radius: 10px;
  }
  &::-webkit-scrollbar {
    width: 10px;
    background-color: #202124;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(255, 255, 255, 0.3);
    box-shadow: inset 0 0 6px rgba(255, 255, 255, 0.3);
    background-color: #111;
  }
`;

const NavList = styled.ul`
  height: 100%;
  padding-left: 0px;
  padding-top: 75px;
  li {
    list-style: none;
    margin: 4px;
  }
  a {
    margin: 3px 2px;
    list-style: none;
    display: flex;
    justify-content: start;
    align-items: center;
    border-radius: 12px;
    text-decoration: none;
    gap: 20px;
    padding-left: 1px;
    &:hover {
      cursor: pointer;
      background: ${(props) => (props.darkmode ? "#fff" : "#202124")};
      i {
        color: ${(props) => (props.darkmode ? "#111" : "#fff")};
      }
      h4 {
        color: ${(props) => (props.darkmode ? "#111" : "#fff")};
      }
    }
  }
  h4 {
    font-size: 18px;
    font-weight: 500;
    white-space: nowrap;
    pointer-events: none;
    transition: 0.4s;
    margin-left: 20px;
    padding-top: 4px;
    color: ${(props) => (props.darkmode ? "#fff" : "#111")};
  }
  i {
    font-size: 18px;
    border-radius: 12px;
    padding-left: 7px;
    color: ${(props) => (props.darkmode ? "#fff" : "#111")};
  }
`;

const AdminNav = () => {
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();

  const settings = useSelector((state) => state.settings);
  const { sidebarToggle, darkMode } = settings;

  useEffect(() => {
    if (width < 600) {
      dispatch(sidebarToggler());
    }
  }, [dispatch, width]);

  return (
    <>
      <Sidebar sideBar={sidebarToggle} darkmode={darkMode}>
        <NavList darkmode={darkMode}>
          <li>
            <StyledLink
              to="/admin/home"
              activeClassName={darkMode ? "active" : "ractive"}
            >
              <a href="/admin/home">
                <i className="fas fa-home"></i>
                <h4>Home</h4>
              </a>
            </StyledLink>
          </li>
          <li>
            <StyledLink
              to="/admin/modal"
              activeClassName={darkMode ? "active" : "ractive"}
            >
              <a href="/admin/modal">
                <i className="fas fa-image"></i>
                <h4>Modal</h4>
              </a>
            </StyledLink>
          </li>
          <li>
            <StyledLink
              to="/admin/carousel"
              activeClassName={darkMode ? "active" : "ractive"}
            >
              <a href="/admin/carousel">
                <i className="far fa-image"></i>
                <h4>Carousel</h4>
              </a>
            </StyledLink>
          </li>
          <li>
            <StyledLink
              to="/admin/news"
              activeClassName={darkMode ? "active" : "ractive"}
            >
              <a href="/admin/news">
                <i className="far fa-newspaper"></i>
                <h4>News</h4>
              </a>
            </StyledLink>
          </li>
          <li>
            <StyledLink
              to="/admin/events"
              activeClassName={darkMode ? "active" : "ractive"}
            >
              <a href="/admin/events">
                <i className="far fa-calendar-alt"></i>
                <h4>Events</h4>
              </a>
            </StyledLink>
          </li>
          <li>
            <StyledLink
              to="/admin/albums"
              activeClassName={darkMode ? "active" : "ractive"}
            >
              <a href="/admin/albums">
                <i className="far fa-images"></i>
                <h4>Albums</h4>
              </a>
            </StyledLink>
          </li>
          <li>
            <StyledLink
              to="/admin/videos"
              activeClassName={darkMode ? "active" : "ractive"}
            >
              <a href="/admin/videos">
                <i className="fas fa-video"></i>
                <h4>Videos</h4>
              </a>
            </StyledLink>
          </li>
          <li>
            <StyledLink
              to="/admin/testimonials"
              activeClassName={darkMode ? "active" : "ractive"}
            >
              <a>
                <i className="fas fa-comment"></i>
                <h4>Testimonials</h4>
              </a>
            </StyledLink>
          </li>
          <li>
            <StyledLink
              to="/admin/staffs"
              activeClassName={darkMode ? "active" : "ractive"}
            >
              <a href="/admin/staffs">
                <i className="fas fa-users"></i>
                <h4>Staffs</h4>
              </a>
            </StyledLink>
          </li>
          <li>
            <StyledLink
              to="/admin/notices"
              activeClassName={darkMode ? "active" : "ractive"}
            >
              <a href="/admin/notices">
                <i className="fas fa-flag"></i>
                <h4>Notices</h4>
              </a>
            </StyledLink>
          </li>
          <li>
            <StyledLink
              to="/admin/downloads"
              activeClassName={darkMode ? "active" : "ractive"}
            >
              <a href="/admin/downloads">
                <i className="fas fa-download"></i>
                <h4>Downloads</h4>
              </a>
            </StyledLink>
          </li>
          <li>
            <StyledLink
              to="/admin/careers"
              activeClassName={darkMode ? "active" : "ractive"}
            >
              <a>
                <i className="fas fa-suitcase"></i>
                <h4>Careers</h4>
              </a>
            </StyledLink>
          </li>
        </NavList>
      </Sidebar>
    </>
  );
};

export default AdminNav;
