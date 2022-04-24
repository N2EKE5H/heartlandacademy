import React, { useEffect } from "react";
import styled from "styled-components";
import download from "downloadjs";

import { Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteDownload,
  listDownloads,
} from "../../../actions/downloadsActions";
import Loader from "../../contents/Loader";
import Message from "../../contents/Message";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { LinkContainer } from "react-router-bootstrap";
import { BASE_URL } from "../../../api";

const Whole = styled.div`
  margin: 30px 50px;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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

const Available = styled.div`
  background: ${(props) => (props.darkmode ? "#202124" : "#fff")};
  display: flex;
  justify-content: space-between;
  padding: 15px 25px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  align-items: center;
  margin-top: 30px;
  border-radius: 30px;
  h5 {
    color: ${(props) => (props.darkmode ? "#e1d9d1" : "#181A18")};
    font-style: italic;
  }
  p {
    font-size: 5px;
  }
`;

const NoDownload = styled.div`
  font-size: 20px;
  display: flex;
  flex-direction: column;
  height: 100vh;
  margin-top: 200px;
  text-align: center;
`;

const DownloadDetails = styled.div`
  h4 {
    color: ${(props) => (props.darkmode ? "#fff" : "#111")};
  }
  p {
    font-weight: 500;
    font-size: 17px;
  }
`;

const DownloadButton = styled.div`
  i {
    font-size: 30px;
    margin-left: 20px;
    cursor: pointer;
    &:hover {
      color: ${(props) => (props.darkmode ? "#e1d9d1" : "#181A18")};
    }
  }
`;

const AllDownloads = styled.div`
  min-height: 100vh;
`;

const AdminAllDownloads = ({ history }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const settings = useSelector((state) => state.settings);
  const { darkMode } = settings;

  const downloadList = useSelector((state) => state.downloadList);
  const { loading, downloads, error } = downloadList;

  const downloadDelete = useSelector((state) => state.downloadDelete);
  const { success: deleteSuccess, error: deleteError } = downloadDelete;

  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      dispatch(listDownloads());
    } else {
      history.push("/admin/login");
    }
    if (deleteSuccess) {
      dispatch(listDownloads());
    }
  }, [dispatch, history, userInfo, deleteSuccess]);

  const downloadDeleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteDownload(id));
      toast.success("File Deleted Successfully");
    }
  };

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

  const downloadFileHandler = async (id) => {
    const res = await fetch(`${BASE_URL}/api/downloads/${id}/download`);
    const blob = await res.blob();
    download(blob, fileNameGenerator(10));
  };
  return (
    <Whole>
      <Title darkmode={darkMode}>
        <h2>Available Downloads</h2>
        <ButtonContent>
          <LinkContainer to={"/admin/downloads"}>
            <Button
              className={darkMode ? "btn-dark btn-lg" : "btn-primary btn-lg"}
            >
              <i className="fas fa-arrow-left "></i>
            </Button>
          </LinkContainer>
        </ButtonContent>
      </Title>
      <AllDownloads>
        {deleteError ? <Message variant="danger">{deleteError}</Message> : ""}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <>
            {downloads && downloads.length === 0 && (
              <NoDownload>
                Sorry we couldn't find any available downloads. Please stay
                updated.
                <div>
                  <Link to="/admin/downloads">
                    <button
                      className={
                        darkMode ? "btn btn-dark mt-4" : "btn btn-primary mt-4"
                      }
                    >
                      Add Some
                    </button>
                  </Link>
                </div>
              </NoDownload>
            )}
            {downloads &&
              downloads.map((download) => (
                <Available darkmode={darkMode}>
                  <DownloadDetails darkmode={darkMode}>
                    <h4>{download.title}</h4>
                    <h5>{download.originalFile}</h5>
                    <p>
                      Added:{" "}
                      {download.createdAt &&
                        download.createdAt.substring(0, 10)}
                    </p>
                  </DownloadDetails>
                  <DownloadButton darkmode={darkMode}>
                    <i
                      className="fas fa-trash"
                      onClick={() => downloadDeleteHandler(download._id)}
                    ></i>
                    <i
                      className="fas fa-arrow-circle-down"
                      onClick={() => downloadFileHandler(download._id)}
                    ></i>
                  </DownloadButton>
                </Available>
              ))}
          </>
        )}
      </AllDownloads>
    </Whole>
  );
};

export default AdminAllDownloads;
