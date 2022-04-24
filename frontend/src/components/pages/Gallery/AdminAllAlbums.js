import React, { useEffect } from "react";
import moment from "moment";
import styled from "styled-components";

import {
  deleteGalleryAlbums,
  listGalleryAlbums,
} from "../../../actions/galleryActions";
import Message from "../../contents/Message";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import placeholder from "../../../assets/default/placeholder.png";
import GalleryCardLoader from "./GalleryCardLoader";
import { BASE_URL } from "../../../api";

const AlbumsContainer = styled.div`
  padding: 10px 20px;
  min-height: 100vh;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 25px 0px;
  @media (max-width: 479px) {
    flex-direction: column;
  }
  h2 {
    color: ${(props) => (props.darkmode ? "#fff" : "#111")};
  }
`;

const ButtonContent = styled.div`
  margin: 20px 40px;
`;

const AlbumsSection = styled.div`
  margin: 0px 10px;
`;

const Cards = styled.div`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const CardItem = styled.div`
  display: flex;
  padding: 1rem;
  @media (min-width: 40rem) {
    width: 50%;
  }
  @media (min-width: 56rem) {
    width: 33.333%;
  }
`;

const NoAlbums = styled.div`
  font-size: 20px;
  display: flex;
  flex-direction: column;
  height: 100vh;
  margin-top: 200px;
  text-align: center;
`;

const Card = styled.div`
  background-color: ${(props) => (props.darkmode ? "#202124" : "#fff")};
  border-radius: 0.25rem;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const CardImage = styled.div`
  height: 270px;
  width: 400px;
  overflow: hidden;
  @media (max-width: 484px) {
    height: 200px;
    width: 300px;
  }
  img {
    /* height: auto;
    max-width: 100%;
    vertical-align: middle; */
    /* width: 100%;
    object-fit: contain;
    background-size: cover; */
    object-fit: cover;
    object-position: top;
    display: block;
    height: 100%;
    width: 100%;
  }
`;

const CardContent = styled.div`
  padding: 1rem;
`;

const CardInfo = styled.p`
  color: ${(props) => (props.darkmode ? "#fff" : "#111")};
  font-weight: 500;
`;

const CardTitle = styled.div`
  color: ${(props) => (props.darkmode ? "#fff" : "#111")};
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: capitalize;
  margin: 0px;
  &:hover {
    color: ${(props) => (props.darkmode ? "#e1d9d1" : "#181A18")};
    cursor: pointer;
  }
`;

const ActionButton = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: nowrap;
  margin-top: 20px;
  button {
    border-radius: 30px;
    border: none;
    background: ${(props) => (props.darkmode ? "#fff" : "#111")};
    &:hover {
      background: ${(props) => (props.darkmode ? "#202124" : "#303134")};
    }
  }
`;

const AdminAllAlbums = () => {
  const dispatch = useDispatch();

  const settings = useSelector((state) => state.settings);
  const { darkMode } = settings;

  const galleryAlbums = useSelector((state) => state.galleryAlbums);
  const { loading, albums, error } = galleryAlbums;

  const galleryAlbumDelete = useSelector((state) => state.galleryAlbumDelete);
  const { success, error: deleteError } = galleryAlbumDelete;

  useEffect(() => {
    dispatch(listGalleryAlbums());
    if (success) {
      dispatch(listGalleryAlbums());
    }
  }, [dispatch, success]);

  const albumDeleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteGalleryAlbums(id));
      toast.success("Album Deleted Successfully");
    }
  };
  console.log(albums);
  return (
    <AlbumsContainer>
      <Title darkmode={darkMode}>
        <h2>Added Albums</h2>

        <ButtonContent>
          <LinkContainer to={"/admin/albums"}>
            <Button className="btn-dark">
              <i className="fas fa-arrow-left "></i>
            </Button>
          </LinkContainer>
        </ButtonContent>
      </Title>
      {deleteError ? <Message variant="danger">{deleteError}</Message> : ""}
      {loading ? (
        <Cards>
          <GalleryCardLoader />
          <GalleryCardLoader />
          <GalleryCardLoader />
        </Cards>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <AlbumsSection>
          {albums && albums.length === 0 ? (
            <NoAlbums>
              Sorry we couldn't find any albums. Please add some.
              <div>
                <Link to="/admin/albums">
                  <button
                    className={
                      darkMode ? "btn btn-dark mt-4" : "btn btn-primary mt-4"
                    }
                  >
                    Add Some
                  </button>
                </Link>
              </div>
            </NoAlbums>
          ) : (
            ""
          )}
          <Cards>
            {albums &&
              albums.map((album) => (
                <CardItem key={album._id}>
                  <Card darkmode={darkMode}>
                    <CardImage>
                      <img
                        src={`${BASE_URL}${album.images[0]}` || placeholder}
                        alt="Album"
                        onError={(e) => {
                          e.target.src = placeholder; //replacement image imported above
                        }}
                      />
                    </CardImage>
                    <CardContent>
                      <LinkContainer to={`/admin/albums/all/${album._id}`}>
                        <CardTitle darkmode={darkMode}>{album.name}</CardTitle>
                      </LinkContainer>
                      <CardInfo darkmode={darkMode}>
                        {album.createdAt &&
                          moment(album.createdAt).format("DD-MMM-YYYY")}
                      </CardInfo>
                      <ActionButton>
                        <div>
                          <Link to={`/admin/albums/all/${album._id}`}>
                            <Button>View</Button>
                          </Link>
                        </div>
                        <div>
                          <Button onClick={() => albumDeleteHandler(album._id)}>
                            Delete
                          </Button>
                        </div>
                      </ActionButton>
                    </CardContent>
                  </Card>
                </CardItem>
              ))}
          </Cards>
        </AlbumsSection>
      )}
    </AlbumsContainer>
  );
};

export default AdminAllAlbums;
