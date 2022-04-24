import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import styled from "styled-components";
import { LinkContainer } from "react-router-bootstrap";
import download from "downloadjs";

import { useDispatch, useSelector } from "react-redux";

import Logo from "../../assets/others/Logo1.png";
import Loader from "./Loader";
import { listLatestNotices } from "../../actions/noticesActions";
import { BASE_URL } from "../../api";

const ExtraSidebar = styled.div`
  margin-left: 20px;

  i {
    font-size: 21px;
    &:hover {
      color: rgb(0, 148, 68);
    }
  }
  @media (max-width: 1047px) {
    display: none;
  }
`;

const Section1 = styled.div`
  h5 {
    color: #3459e6;
    text-transform: uppercase;
    font-weight: 500;
    margin-bottom: 18px;
    cursor: pointer;
  }
`;

const NoticeInfo = styled.p`
  font-size: 15px;
  color: #111;
  line-height: 25px;
  margin-bottom: 30px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  padding: 17px 13px;
  border-radius: 14px;
`;

const NoticeBody = styled.ul`
  line-height: 38px;
  li {
    list-style: none;
    text-decoration: underline;
    font-size: 20px;
    padding: 0px;
  }
  i {
    padding-top: 10px;
    float: right;
    padding-right: 30px;
    cursor: pointer;
  }
`;

const Section2 = styled.div`
  h5 {
    color: #3459e6;
    text-transform: uppercase;
    font-weight: 500;
    margin-bottom: 18px;
  }
`;

const Section4 = styled.div`
  display: flex;
  margin-top: 30px;
  justify-content: space-around;
  span {
    font-size: 1em;
    color: #111;
    &:hover {
      color: #3459e6;
    }
  }
`;

const Extra = () => {
  const [show, setShow] = useState(false);
  const [showNoticeInfo, setShowNoticeInfo] = useState(true);
  const [showDownloadInfo, setShowDownloadInfo] = useState(false);

  const latestNotices = useSelector((state) => state.latestNotices);
  const { loading, noticesLatest } = latestNotices;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleNoticeInfo = () => {
    setShowNoticeInfo(!showNoticeInfo);
  };

  const handleDownloadInfo = () => {
    setShowDownloadInfo(!showDownloadInfo);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listLatestNotices());
  }, [dispatch]);

  const fileNameGenerator = (length) => {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  const singleFileDownloadHandler = async (id) => {
    const res = await fetch(`${BASE_URL}/api/notices/${id}/download`);
    const blob = await res.blob();
    download(blob, fileNameGenerator(10));
  };

  return (
    <ExtraSidebar>
      <i className="fas fa-bars" onClick={handleShow}></i>
      <Offcanvas show={show} onHide={handleClose} scroll={true} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <img src={Logo} alt="logo" style={{ height: "60px" }} />{" "}
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Section1 className="container">
            <h5>
              Notice <i className="far fa-clipboard"></i>
              <i
                style={{ float: "right", cursor: "pointer" }}
                className={
                  showNoticeInfo
                    ? `fas fa-chevron-right`
                    : `fas fa-chevron-down`
                }
                onClick={handleNoticeInfo}
              ></i>
            </h5>

            {showNoticeInfo ? (
              <NoticeInfo>
                Please subscribe to our weekly newsletter for getting updated
                notices automatically.
              </NoticeInfo>
            ) : (
              ""
            )}

            <NoticeBody>
              {loading ? (
                <Loader />
              ) : (
                <>
                  {noticesLatest &&
                    noticesLatest.map((notice) => (
                      <li key={notice._id}>
                        {notice.title}{" "}
                        <i
                          className="fas fa-long-arrow-alt-down"
                          onClick={() => singleFileDownloadHandler(notice._id)}
                        ></i>
                      </li>
                    ))}
                </>
              )}
            </NoticeBody>
            <LinkContainer to="/notice">
              <Button className="mb-4 btn-custom">View All</Button>
            </LinkContainer>
          </Section1>
          <Section2 className="container">
            <h5>
              Downloads
              <i className="fas fa-download"></i>
              <i
                style={{ float: "right", cursor: "pointer" }}
                className={
                  showDownloadInfo
                    ? `fas fa-chevron-right`
                    : `fas fa-chevron-down`
                }
                onClick={handleDownloadInfo}
              ></i>
            </h5>

            {showDownloadInfo ? (
              <NoticeInfo>
                Please visit this section to find downloadable content and much
                more
              </NoticeInfo>
            ) : (
              ""
            )}
            <LinkContainer to="/downloads">
              <Button className="mb-4 btn-custom">View All</Button>
            </LinkContainer>
            <div></div>
          </Section2>
          <Section4>
            <span className="fa-stack">
              <i className="fas fa-circle fa-stack-2x"></i>
              <i className="fab fa-facebook-f fa-stack-1x fa-inverse"></i>
            </span>
            <span className="fa-stack">
              <i className="fas fa-circle fa-stack-2x"></i>
              <i className="fab fa-twitter fa-stack-1x fa-inverse"></i>
            </span>
            <span className="fa-stack">
              <i className="fas fa-circle fa-stack-2x"></i>
              <i className="fab fa-linkedin-in fa-stack-1x fa-inverse"></i>
            </span>
            <span className="fa-stack">
              <i className="fas fa-circle fa-stack-2x"></i>
              <i className="fab fa-youtube fa-stack-1x fa-inverse"></i>
            </span>
          </Section4>
        </Offcanvas.Body>
      </Offcanvas>
    </ExtraSidebar>
  );
};

export default Extra;
