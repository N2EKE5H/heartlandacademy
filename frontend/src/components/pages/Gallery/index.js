import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Button, Container } from "react-bootstrap";
import test from "../../../assets/imageheaderphotos/test.JPG";
import placeholder from "../../../assets/default/placeholder.png";

import ImageHeader from "../../contents/ImageHeader";
import Message from "../../contents/Message";
import Meta from "../../contents/Meta";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import { listGalleryAlbums } from "../../../actions/galleryActions";

import GalleryCardLoader from "./GalleryCardLoader";
import { BASE_URL } from "../../../api";

const Title = styled.div`
  color: #444444;
  max-width: 420px;
  margin: auto;
  font-weight: 700;
  color: rgb(1, 34, 55);
  position: relative;
  font-size: 50px;
  text-align: center;
  margin-bottom: 50px;
  &:before {
    position: absolute;
    content: "";
    background: #3459e6;
    width: 75px;
    height: 1px;
    bottom: -18px;
    left: 50%;
    margin-left: -45px;
  }
  &:after {
    position: absolute;
    content: "";
    background: #3459e6;
    width: 75px;
    height: 1px;
    bottom: -22px;
    left: 50%;
    margin-left: -30px;
  }
`;

const AlbumsSection = styled.div`
  margin: 50px 10px;
`;

const NoAlbums = styled.div`
  font-size: 40px;
  margin: 150px 0px;
  text-align: center;
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
  @media (max-width: 484px) {
    height: 200px;
    width: 300px;
  }
  img {
    /* height: auto;
    max-width: 100%;
    vertical-align: middle; */
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
    color: red;
    cursor: pointer;
  }
`;

const ActionButton = styled.div`
  margin-top: 20px;
  text-align: center;
  button {
    border-radius: 30px;
    border: none;
    background: #111;
    &:hover {
      background: #202124;
    }
  }
`;

const HeartlandGallery = () => {
  const dispatch = useDispatch();

  const galleryAlbums = useSelector((state) => state.galleryAlbums);
  const { loading, albums, error } = galleryAlbums;

  useEffect(() => {
    dispatch(listGalleryAlbums());
  }, [dispatch]);

  return (
    <>
      <Meta title="Heartland Gallery | Albums" />
      <ImageHeader mtitle="Gallery" title="Albums" image={test} />
      <Container>
        <AlbumsSection>
          <Title>Albums</Title>
          {loading ? (
            <Cards>
              <GalleryCardLoader />
              <GalleryCardLoader />
              <GalleryCardLoader />
            </Cards>
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <>
              {albums && albums.length === 0 ? (
                <NoAlbums>Sorry we couldn't find any albums.</NoAlbums>
              ) : (
                ""
              )}
              <Cards>
                {albums &&
                  albums.map((album) => (
                    <CardItem key={album._id}>
                      <Card>
                        <CardImage>
                          <img
                            src={`${BASE_URL}${album.images[0]}`}
                            alt="album"
                            onError={(e) => {
                              e.target.src = placeholder; //replacement image imported above
                            }}
                          />
                        </CardImage>
                        <CardContent>
                          <LinkContainer to={`/gallery/albums/${albums._id}`}>
                            <CardTitle>{album.name}</CardTitle>
                          </LinkContainer>
                          <CardInfo>
                            {album.createdAt &&
                              moment(album.createdAt).format("DD-MMM-YYYY")}
                          </CardInfo>
                          <ActionButton>
                            <Link to={`/gallery/albums/${album._id}`}>
                              <Button>View</Button>
                            </Link>
                          </ActionButton>
                        </CardContent>
                      </Card>
                    </CardItem>
                  ))}
              </Cards>
            </>
          )}
        </AlbumsSection>
      </Container>
    </>
  );
};

export default HeartlandGallery;
