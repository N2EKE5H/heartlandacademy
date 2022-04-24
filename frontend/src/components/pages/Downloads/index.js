import React, { useEffect } from "react";
import styled from "styled-components";
import download from "downloadjs";
import moment from "moment";

import ImageHeader from "../../contents/ImageHeader";
import School from "../../../assets/others/School4.jpg";
import Meta from "../../contents/Meta";
import { useSelector, useDispatch } from "react-redux";
import { Container, Placeholder } from "react-bootstrap";
import { listDownloads } from "../../../actions/downloadsActions";
import Message from "../../contents/Message";
import { BASE_URL } from "../../../api";

const NoDownloads = styled.div`
  padding: 140px 60px;
  text-align: center;
`;

const DownloadSection = styled.div`
  margin: 70px 30px;
`;

const DownloadCard = styled.div`
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

const DownloadButton = styled.div`
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

const Downloads = () => {
  const downloadList = useSelector((state) => state.downloadList);
  const { loading, downloads, error } = downloadList;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listDownloads());
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
    const res = await fetch(`${BASE_URL}/api/downloads/${id}/download`);
    const blob = await res.blob();
    download(blob, fileNameGenerator(10));
  };

  const DownloadCardLoader = () => {
    return (
      <DownloadCard className="card">
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

        <DownloadButton>
          <Placeholder xs={1} size="xs" />
        </DownloadButton>
      </DownloadCard>
    );
  };

  return (
    <>
      <Meta title="Downloads" />
      <ImageHeader mtitle="Downloads" title="Downloads" image={School} />

      <Container>
        <DownloadSection className="container">
          {loading ? (
            <>
              <DownloadCardLoader />
              <DownloadCardLoader />
              <DownloadCardLoader />
            </>
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <>
              {downloads && downloads.length === 0 ? (
                <NoDownloads>
                  <h5>
                    Sorry we cant find any new downloadable content at this time
                    :(
                  </h5>
                  <p>Try searching with different query...</p>
                </NoDownloads>
              ) : (
                ""
              )}
              {downloads &&
                downloads.map((download) => (
                  <DownloadCard className="card">
                    <h4>{download.title}</h4>
                    <h6>
                      {download.createdAt &&
                        moment(download.createdAt).format("DD-MMM-YYYY")}
                    </h6>
                    <h5>{download.originalFile}</h5>

                    <DownloadButton>
                      <i
                        className="fas fa-arrow-circle-down"
                        onClick={() => singleFileDownloadHandler(download._id)}
                      ></i>
                    </DownloadButton>
                  </DownloadCard>
                ))}
            </>
          )}
        </DownloadSection>
      </Container>
    </>
  );
};

export default Downloads;
