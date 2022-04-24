import React, { useEffect, useState } from "react";
import styled from "styled-components";
import download from "downloadjs";
import { useSelector, useDispatch } from "react-redux";
import { Button, Placeholder } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { LinkContainer } from "react-router-bootstrap";

import Message from "../../contents/Message";
import { deleteNotices, listNotices } from "../../../actions/noticesActions";
import PdfModal from "../../contents/PdfModal";
import { BASE_URL } from "../../../api";

const Whole = styled.div`
  margin: 30px 50px;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  @media (max-width: 479px) {
    flex-direction: column;
  }
  h2 {
    color: ${(props) => (props.darkmode ? "#fff" : "#111")};
  }
`;

const ButtonContent = styled.div`
  margin: 15px 40px;
`;

const Notice = styled.div`
  min-height: 100vh;
`;

const NoNotices = styled.div`
  font-size: 20px;
  display: flex;
  flex-direction: column;
  height: 100vh;
  margin-top: 200px;
  text-align: center;
`;

const Available = styled.div`
  background: ${(props) => (props.darkmode ? "#202124" : "#fff")};
  padding: 15px 25px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  align-items: center;
  margin-top: 30px;
  border-radius: 30px;
  word-break: break-all;
  h5 {
    color: red;
    font-style: italic;
  }
  p {
    font-size: 5px;
  }
`;

const NoticeDetails = styled.div`
  h3 {
    color: ${(props) => (props.darkmode ? "#fff" : "#111")};
  }
  p {
    font-weight: 500;
    font-size: 17px;
  }
`;

const NoticeButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  i {
    font-size: 30px;
    margin-left: 20px;
    cursor: pointer;
    &:hover {
      color: ${(props) => (props.darkmode ? "#e1d9d1" : "#181A18")};
    }
  }
`;

const NoticeCardLoader = () => {
  return (
    <Available>
      <NoticeDetails>
        <h4>
          <Placeholder as="h1" animation="glow">
            <Placeholder xs={6} />
          </Placeholder>
        </h4>
        <p>
          <Placeholder as="h3" animation="glow">
            <Placeholder xs={3} />
          </Placeholder>
        </p>
        <p>
          <Placeholder as="h3" animation="glow">
            <Placeholder xs={2} />
          </Placeholder>
        </p>
      </NoticeDetails>
      <NoticeButton>
        <Placeholder xs={1} size="xs" /> <Placeholder xs={1} size="xs" />
        <Placeholder xs={1} size="xs" />
      </NoticeButton>
    </Available>
  );
};

const AdminAllNotices = ({ history }) => {
  const [modalShow, setModalShow] = useState(false);
  const [selectedNoticeFile, setSelectedNoticeFile] = useState(null);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const settings = useSelector((state) => state.settings);
  const { darkMode } = settings;

  const availableNotices = useSelector((state) => state.availableNotices);
  const { loading, notices, error } = availableNotices;

  const noticesDelete = useSelector((state) => state.noticesDelete);
  const { success: deleteSuccess, error: deleteError } = noticesDelete;

  const dispatch = useDispatch();

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

  useEffect(() => {
    if (userInfo) {
      dispatch(listNotices());
    } else {
      history.push("/admin/login");
    }
    if (deleteSuccess) {
      dispatch(listNotices());
    }
  }, [dispatch, history, userInfo, deleteSuccess]);

  const noticeDeleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteNotices(id));
      toast.success("Notice Deleted Successfully");
    }
  };

  return (
    <Whole>
      <Title darkmode={darkMode}>
        <h2>Added Notices</h2>
        <ButtonContent>
          <LinkContainer to={"/admin/notices"}>
            <Button
              className={darkMode ? "btn-dark btn-lg" : "btn-primary btn-lg"}
            >
              <i className="fas fa-arrow-left "></i>
            </Button>
          </LinkContainer>
        </ButtonContent>
      </Title>
      <Notice>
        {notices && notices.length === 0 && (
          <NoNotices>
            Sorry we couldn't find any notices. Please stay updated.
            <div>
              <Link to="/admin/notices">
                <button
                  className={
                    darkMode ? "btn btn-dark mt-4" : "btn btn-primary mt-4"
                  }
                >
                  Add Some
                </button>
              </Link>
            </div>
          </NoNotices>
        )}
        {deleteError ? <Message variant="danger">{deleteError}</Message> : ""}
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
            {notices &&
              notices.map((notice) => (
                <Available darkmode={darkMode} key={notice._id}>
                  <NoticeDetails darkmode={darkMode}>
                    <h3>{notice.title}</h3>
                    <p>{notice.description}</p>
                    <p>
                      Added Date: {notice.date && notice.date.substring(0, 10)}
                    </p>
                    <p>
                      File: {notice.originalFile}{" "}
                      <i className="fas fa-file-pdf"></i>
                    </p>
                  </NoticeDetails>
                  <NoticeButton darkmode={darkMode}>
                    <i
                      className="far fa-eye"
                      onClick={() => {
                        setModalShow(true);
                        setSelectedNoticeFile(`${BASE_URL}${notice.file}`);
                      }}
                    ></i>
                    <i
                      className="fas fa-trash"
                      onClick={() => noticeDeleteHandler(notice._id)}
                    ></i>
                    <i
                      className="fas fa-arrow-circle-down"
                      onClick={() => singleFileDownloadHandler(notice._id)}
                    ></i>
                  </NoticeButton>
                </Available>
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
      </Notice>
    </Whole>
  );
};

export default AdminAllNotices;
