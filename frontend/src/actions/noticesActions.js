import axios from "axios";
import { BASE_URL } from "../api";
import {
  AVAILABLE_NOTICES_FAIL,
  AVAILABLE_NOTICES_REQUEST,
  AVAILABLE_NOTICES_SUCCESS,
  LATEST_NOTICES_FAIL,
  LATEST_NOTICES_REQUEST,
  LATEST_NOTICES_SUCCESS,
  NOTICES_CREATE_FAIL,
  NOTICES_CREATE_REQUEST,
  NOTICES_CREATE_SUCCESS,
  NOTICES_DELETE_FAIL,
  NOTICES_DELETE_REQUEST,
  NOTICES_DELETE_SUCCESS,
} from "./types";

export const listNotices = () => async (dispatch) => {
  try {
    dispatch({ type: AVAILABLE_NOTICES_REQUEST });

    const { data } = await axios.get(`${BASE_URL}/api/notices`);

    dispatch({
      type: AVAILABLE_NOTICES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: AVAILABLE_NOTICES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createNotices =
  (title, description, date, file, originalFile) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: NOTICES_CREATE_REQUEST });

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
        `${BASE_URL}/api/notices`,
        { title, description, date, file, originalFile },
        config
      );

      dispatch({
        type: NOTICES_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: NOTICES_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteNotices = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: NOTICES_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`${BASE_URL}/api/notices/${id}`, config);

    dispatch({ type: NOTICES_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: NOTICES_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listLatestNotices = () => async (dispatch) => {
  try {
    dispatch({ type: LATEST_NOTICES_REQUEST });

    const { data } = await axios.get(`${BASE_URL}/api/notices/latest`);

    dispatch({
      type: LATEST_NOTICES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LATEST_NOTICES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
