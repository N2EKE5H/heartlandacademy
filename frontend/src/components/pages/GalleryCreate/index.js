import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import { toast } from "react-toastify";

import { Form, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import { useSelector, useDispatch } from "react-redux";
import { addGalleryAlbums } from "../../../actions/galleryActions";
import Message from "../../contents/Message";
import Loader from "../../contents/Loader";
import { GALLERY_ALBUM_CREATE_RESET } from "../../../actions/types";
import { BASE_URL } from "../../../api";

const Section = styled.div`
  height: 100vh;
  padding: 90px 110px;
  @media (max-width: 479px) {
    padding: 90px 50px;
  }
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 50px;
  @media (max-width: 479px) {
    flex-direction: column;
  }
  h3 {
    color: ${(props) => (props.darkmode ? "#fff" : "#111")};
  }
`;

const ButtonContent = styled.div`
  margin-right: 30px;
`;

const AdminImages = ({ history }) => {
  const [name, setName] = useState("");
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [fileError, setFileError] = useState(false);
  const [validated, setValidated] = useState(false);

  const settings = useSelector((state) => state.settings);
  const { darkMode } = settings;

  const galleryAlbumCreate = useSelector((state) => state.galleryAlbumCreate);
  const { success: successCreate, error: successError } = galleryAlbumCreate;

  const ref = useRef();

  const reset = () => {
    ref.current.value = "";
  };

  function clearForm() {
    setName("");
    reset();
    setImages([]);
  }

  useEffect(() => {
    if (successCreate) {
      clearForm();
      toast.success("Album Created Successfully");
      dispatch({ type: GALLERY_ALBUM_CREATE_RESET });
      setValidated(false);
    }
  }, [successCreate, history]);

  const uploadFileHandler = async (e) => {
    console.log("sdfsdfsdf");
    var formData = new FormData();
    for (const key of Object.keys(e.target.files)) {
      formData.append("images", e.target.files[key]);
    }
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post(
        `${BASE_URL}/api/gallery/uploads`,
        formData,
        config
      );
      setImages(data);
      setFileError(false);
      setUploading(false);
    } catch (error) {
      console.log(error);
      setFileError(true);
      setUploading(false);
    }
  };

  const dispatch = useDispatch();

  const galleryHandler = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      dispatch(addGalleryAlbums(name, images));
    }
    setValidated(true);
  };

  return (
    <Section>
      <Title darkmode={darkMode}>
        <h3>Add Images</h3>
        <ButtonContent>
          <LinkContainer to={`/admin/albums/all`}>
            <Button className={darkMode ? "btn-dark" : "btn-primary"}>
              View All
            </Button>
          </LinkContainer>
        </ButtonContent>
      </Title>
      <>
        {successError && <Message variant="danger">{successError}</Message>}
        <Form
          noValidate
          validated={validated}
          className="form-group"
          onSubmit={galleryHandler}
        >
          <Form.Group className="mb-3" controlId="formBasicTitle">
            <Form.Label>Album Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Album Name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide Album Name
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Choose Multipe Images for album</Form.Label>
            <Form.Control
              type="file"
              ref={ref}
              onChange={uploadFileHandler}
              multiple
              required
            />
            {fileError && (
              <Form.Text id="passwordHelpBlock" muted>
                <span className="text-danger ">
                  <i className="fas fa-exclamation-circle"></i> Only image file
                  can be added.
                </span>
              </Form.Text>
            )}
            <Form.Control.Feedback type="invalid">
              Please Select Images
            </Form.Control.Feedback>
          </Form.Group>
          {uploading && <Loader />}

          <Button
            variant="primary"
            disabled={fileError || uploading}
            type="submit"
            className={
              darkMode ? "btn-dark mt-3 btn-lg" : "btn-primary mt-3 btn-lg"
            }
          >
            ADD
          </Button>
        </Form>
      </>
    </Section>
  );
};

export default AdminImages;
