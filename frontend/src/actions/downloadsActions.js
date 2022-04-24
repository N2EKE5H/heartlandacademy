import axios from "axios";
import { BASE_URL } from "../api";
import {
  FILE_CREATE_FAIL,
  FILE_CREATE_REQUEST,
  FILE_CREATE_SUCCESS,
  FILE_DELETE_FAIL,
  FILE_DELETE_REQUEST,
  FILE_DELETE_SUCCESS,
  FILE_DOWNLOAD_FAIL,
  FILE_DOWNLOAD_REQUEST,
  FILE_DOWNLOAD_SUCCESS,
  SINGLE_FILE_CREATE_FAIL,
  SINGLE_FILE_CREATE_REQUEST,
  SINGLE_FILE_CREATE_SUCCESS,
} from "./types";

export const listDownloads = () => async (dispatch) => {
  try {
    dispatch({ type: FILE_DOWNLOAD_REQUEST });
    const { data } = await axios.get(`${BASE_URL}/api/downloads`);

    dispatch({
      type: FILE_DOWNLOAD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FILE_DOWNLOAD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createDownload =
  (title, originalFile, file) => async (dispatch, getState) => {
    try {
      dispatch({ type: FILE_CREATE_REQUEST });

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
        `${BASE_URL}/api/downloads`,
        { title, originalFile, file },
        config
      );

      dispatch({
        type: FILE_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: FILE_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteDownload = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: FILE_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`${BASE_URL}/api/downloads/${id}`, config);

    dispatch({ type: FILE_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: FILE_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createSingleDownload = (id) => async (dispatch) => {
  try {
    dispatch({ type: SINGLE_FILE_CREATE_REQUEST });
    console.log(id);

    await axios.get(`http://localhost:5000/api/download/${id}`);

    dispatch({
      type: SINGLE_FILE_CREATE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: SINGLE_FILE_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
