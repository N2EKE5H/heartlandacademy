import axios from "axios";
import { BASE_URL } from "../api";
import {
  GALLERY_VIDEOS_ADD_FAIL,
  GALLERY_VIDEOS_ADD_REQUEST,
  GALLERY_VIDEOS_ADD_SUCCESS,
  GALLERY_VIDEOS_FAIL,
  GALLERY_VIDEOS_REQUEST,
  GALLERY_VIDEOS_SUCCESS,
  GALLERY_VIDEOS_DELETE_REQUEST,
  GALLERY_VIDEOS_DELETE_SUCCESS,
  GALLERY_VIDEOS_DELETE_FAIL,
  GALLERY_ALBUMS_REQUEST,
  GALLERY_ALBUMS_SUCCESS,
  GALLERY_ALBUMS_FAIL,
  SINGLE_ALBUM_REQUEST,
  SINGLE_ALBUM_SUCCESS,
  SINGLE_ALBUM_FAIL,
  GALLERY_ALBUM_CREATE_REQUEST,
  GALLERY_ALBUM_CREATE_SUCCESS,
  GALLERY_ALBUM_CREATE_FAIL,
  GALLERY_ALBUM_DELETE_REQUEST,
  GALLERY_ALBUM_DELETE_SUCCESS,
  GALLERY_ALBUM_DELETE_FAIL,
} from "./types";

export const listGalleryAlbums = () => async (dispatch) => {
  try {
    dispatch({ type: GALLERY_ALBUMS_REQUEST });

    const { data } = await axios.get(`${BASE_URL}/api/gallery/albums`);

    dispatch({
      type: GALLERY_ALBUMS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GALLERY_ALBUMS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addGalleryAlbums =
  (name, images) => async (dispatch, getState) => {
    try {
      dispatch({ type: GALLERY_ALBUM_CREATE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `${BASE_URL}/api/gallery/albums`,
        { name, images },
        config
      );

      dispatch({
        type: GALLERY_ALBUM_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GALLERY_ALBUM_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteGalleryAlbums = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: GALLERY_ALBUM_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`${BASE_URL}/api/gallery/albums/${id}`, config);

    dispatch({ type: GALLERY_ALBUM_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: GALLERY_ALBUM_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const gallerySingleAlbum = (id) => async (dispatch) => {
  try {
    dispatch({ type: SINGLE_ALBUM_REQUEST });

    const { data } = await axios.get(`${BASE_URL}/api/gallery/albums/${id}`);

    dispatch({
      type: SINGLE_ALBUM_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SINGLE_ALBUM_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listGalleryVideos = () => async (dispatch) => {
  try {
    dispatch({ type: GALLERY_VIDEOS_REQUEST });

    const { data } = await axios.get(`${BASE_URL}/api/gallery/videos`);

    dispatch({
      type: GALLERY_VIDEOS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GALLERY_VIDEOS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addGalleryVideos = (src) => async (dispatch, getState) => {
  try {
    dispatch({ type: GALLERY_VIDEOS_ADD_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      `${BASE_URL}/api/gallery/videos`,
      { src },
      config
    );

    dispatch({
      type: GALLERY_VIDEOS_ADD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GALLERY_VIDEOS_ADD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteGalleryVideos = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: GALLERY_VIDEOS_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`${BASE_URL}/api/gallery/videos/${id}`, config);

    dispatch({ type: GALLERY_VIDEOS_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: GALLERY_VIDEOS_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
