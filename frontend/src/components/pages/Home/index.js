import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import PhotoCarousel from "../../contents/PhotoCarousel";
import Details from "../../layouts/Details";
import Teams from "../../layouts/Teams";
import NewsAndEvents from "../../layouts/NewsAndEvents";
import Partners from "../../layouts/Partners";
import PopupModal from "../../contents/PopupModal";
import Meta from "../../contents/Meta";
import { listModal } from "../../../actions/modalActions";

const Home = () => {
  const [modalShow, setModalShow] = useState(false);

  const addedModal = useSelector((state) => state.addedModal);
  const { modal } = addedModal;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listModal());
  }, [dispatch]);

  useEffect(() => {
    if (modal && modal.length !== 0) {
      setModalShow(true);
    }
  }, [modal]);

  return (
    <>
      <Meta />
      <PopupModal show={modalShow} onHide={() => setModalShow(false)} />

      <PhotoCarousel />
      <Details />
      <NewsAndEvents />
      <Teams />
      <Partners />
    </>
  );
};

export default Home;
