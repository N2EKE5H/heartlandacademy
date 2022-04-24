import React, { useState, useEffect } from "react";
import styled from "styled-components";
import moment from "moment";
import download from "downloadjs";

import ImageHeader from "../../contents/ImageHeader";
import School from "../../../assets/others/School4.jpg";
import { useSelector, useDispatch } from "react-redux";
import Message from "../../contents/Message";
import PdfModal from "../../contents/PdfModal";
import Meta from "../../contents/Meta";
import { Container, Placeholder } from "react-bootstrap";
import { listNotices } from "../../../actions/noticesActions";
import { BASE_URL } from "../../../api";

const NoNotice = styled.div`
  padding: 140px 60px;
  text-align: center;
`;

const NoticeSection = styled.div`
  margin: 70px 30px;
`;

const NoticeCard = styled.div`
  padding: 10px 20px;
  margin-bottom: 30px;
  h5 {
    text-align: justify;
  }
  h6 {
    color: red;
    font-size: 20px;
  }
  span {
    font-size: 18px;
    cursor: pointer;
  }
`;

const NoticeButton = styled.div`
  text-align: center;
  font-size: 35px;
  i {
    margin-left: 20px;
    cursor: pointer;
    &:hover {
      color: red;
    }
  }
`;

const Notice = () => {
  const [modalShow, setModalShow] = useState(false);
  const [selectedNoticeFile, setSelectedNoticeFile] = useState(null);

  const availableNotices = useSelector((state) => state.availableNotices);
  const { loading, notices, error } = availableNotices;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listNotices());
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

  const NoticeCardLoader = () => {
    return (
      <NoticeCard className="card">
        <h4>
          <Placeholder as="h1" animation="glow">
            <Placeholder xs={6} />
          </Placeholder>
        </h4>
        <h6>
          <Placeholder as="h3" animation="glow">
            <Placeholder xs={3} />
          </Placeholder>
        </h6>
        <h5>
          <Placeholder as="h2" animation="glow">
            <Placeholder xs={4} />
          </Placeholder>
        </h5>
        <NoticeButton>
          <Placeholder xs={1} size="xs" /> <Placeholder xs={1} size="xs" />
        </NoticeButton>
      </NoticeCard>
    );
  };

  return (
    <>
      <Meta title="Notices" />
      <ImageHeader mtitle="Notices" title="Notices" image={School} />
      <Container>
        <NoticeSection className="container">
          {loading ? (
            <>
              <NoticeCardLoader />
              <NoticeCardLoader />
              <NoticeCardLoader />
            </>
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <>
              {notices && notices.length === 0 ? (
                <NoNotice>
                  <h5>Sorry we cant find any new notice at this time :(</h5>
                  <p>Try searching with different query...</p>
                </NoNotice>
              ) : (
                ""
              )}
              {notices &&
                notices.map((notice) => (
                  <NoticeCard className="card">
                    <h4>{notice.title}</h4>
                    <h6>
                      {notice.date && moment(notice.date).format("DD-MMM-YYYY")}
                    </h6>
                    <h5>{notice.description}</h5>
                    <span
                      onClick={() => {
                        setModalShow(true);
                        setSelectedNoticeFile(notice.file);
                      }}
                    >
                      <i className="fas fa-file-pdf"></i> {notice.originalFile}
                    </span>
                    <NoticeButton>
                      <i
                        className="far fa-eye"
                        onClick={() => {
                          setModalShow(true);
                          setSelectedNoticeFile(`${BASE_URL}${notice.file}`);
                        }}
                      ></i>
                      <i
                        className="fas fa-arrow-circle-down"
                        onClick={() => singleFileDownloadHandler(notice._id)}
                      ></i>
                    </NoticeButton>
                  </NoticeCard>
                ))}
            </>
          )}
          {modalShow && selectedNoticeFile && (
            <PdfModal
              show={modalShow}
              onHide={() => setModalShow(false)}
              file={selectedNoticeFile}
            />
          )}
        </NoticeSection>
      </Container>
    </>
  );
};

export default Notice;
