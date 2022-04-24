import axios from "axios";
import { BASE_URL } from "../api";
import {
  ADDED_MODAL_FAIL,
  ADDED_MODAL_REQUEST,
  ADDED_MODAL_SUCCESS,
  MODAL_CREATE_FAIL,
  MODAL_CREATE_REQUEST,
  MODAL_CREATE_SUCCESS,
  MODAL_DELETE_FAIL,
  MODAL_DELETE_REQUEST,
  MODAL_DELETE_SUCCESS,
} from "./types";

export const listModal = () => async (dispatch) => {
  try {
    dispatch({ type: ADDED_MODAL_REQUEST });

    const { data } = await axios.get(`${BASE_URL}/api/modal`);

    dispatch({
      type: ADDED_MODAL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADDED_MODAL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createModal = (image) => async (dispatch, getState) => {
  try {
    dispatch({ type: MODAL_CREATE_REQUEST });

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
      `${BASE_URL}/api/modal`,
      { image },
      config
    );

    dispatch({
      type: MODAL_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MODAL_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteModal = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: MODAL_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`${BASE_URL}/api/modal/${id}`, config);

    dispatch({ type: MODAL_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: MODAL_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
