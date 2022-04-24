import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import { sidebarToggler, adminModeChanger } from "../../actions/settingActions";
import SettingsModal from "../contents/SettingModal";
import { logOut } from "../../actions/userActions";
import { useHistory } from "react-router-dom";

const Navbar = styled.div`
  height: 70px;
  position: fixed;
  background: ${(props) => (props.darkmode ? "#202124" : "#fff")};
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  width: 100%;
  display: flex;
  justify-content: space-between;
  z-index: 99999;
  transition: all 0.4s ease;
`;

const NavListOne = styled.div`
  display: flex;
  margin-left: 12px;
  align-items: center;
  padding: 20px;
  height: 60px;
  transition: all 0.4s ease;
`;

const LogoDetails = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 120px;
  h4 {
    display: ${(props) => (props.sideBar ? "block" : "none")};
    font-size: 50px;
    margin-top: 10px;
    color: ${(props) => (props.darkmode ? "#fff" : "#111")};
  }
  i {
    margin-top: 10px;
    font-size: 30px;
    cursor: pointer;
    color: ${(props) => (props.darkmode ? "#fff" : "#111")};
    @media (max-width: 585px) {
      pointer-events: none;
    }
  }
`;

const Content = styled.div`
  color: ${(props) => (props.darkmode ? "#fff" : "#111")};
  text-align: center;
  font-size: 23px;
  display: flex;
  gap: 20px;
  padding-left: 50px;
  transition: all 0.4s ease;
  i {
    margin-top: 16px;
    cursor: pointer;
  }
  h3 {
    margin-top: 11px;
    color: ${(props) => (props.darkmode ? "#fff" : "#111")};
    @media (max-width: 730px) {
      display: none;
    }
  }
`;

const User = styled.div`
  color: ${(props) => (props.darkmode ? "#fff" : "#111")};
  display: flex;
  text-align: center;
  justify-content: end;
  gap: 10px;
  margin-top: 8px;
`;

const Details = styled.div`
  text-align: left;
  letter-spacing: 2px;
  font-weight: 400;
  p {
    margin-top: -10px;
    font-weight: 500;
    color: ${(props) => (props.darkmode ? "#fff" : "#111")};
  }
  h3 {
    color: ${(props) => (props.darkmode ? "#fff" : "#111")};
  }
`;

const Info = styled.div`
  i {
    display: flex;
    font-size: 30px;
    padding: 13px 15px;
    cursor: pointer;
    &:hover {
      color: blue;
    }
  }
`;

const AdminTopNav = ({ location }) => {
  const [modalShow, setModalShow] = useState(false);

  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);
  const { darkMode, sidebarToggle, adminMode } = settings;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const sideBarChanger = (e) => {
    dispatch(sidebarToggler());
  };

  let history = useHistory();

  useEffect(() => {
    if (!userInfo) {
      history.push("/admin/login");
      window.location.reload();
    }
  }, [adminMode, history, userInfo]);

  const logoutHandler = (e) => {
    dispatch(logOut());
    dispatch(adminModeChanger());
    history.push("/admin/login");
    window.location.reload();
  };

  return (
    <Navbar darkmode={darkMode}>
      <NavListOne>
        <LogoDetails darkmode={darkMode} sideBar={sidebarToggle}>
          <h4>HA</h4>
          <i
            className={sidebarToggle ? "fas fa-bars" : "fas fa-times"}
            onClick={sideBarChanger}
          ></i>
        </LogoDetails>
        <Content darkmode={darkMode} margin={sidebarToggle}>
          <i className="fas fa-cog" onClick={() => setModalShow(true)}></i>
          <h3>Settings</h3>
        </Content>
        <SettingsModal show={modalShow} onHide={() => setModalShow(false)} />
      </NavListOne>
      <User darkmode={darkMode}>
        <Details darkmode={darkMode}>
          <h3>Heartland</h3>
          <p>{userInfo.name}</p>
        </Details>
        <Info>
          <i className="fas fa-sign-out-alt" onClick={logoutHandler}></i>
        </Info>
      </User>
    </Navbar>
  );
};

export default AdminTopNav;
