import axios from "axios";
import { BASE_URL } from "../api";
import {
  AVAILABLE_CAROUSEL_FAIL,
  AVAILABLE_CAROUSEL_REQUEST,
  AVAILABLE_CAROUSEL_SUCCESS,
  CAROUSEL_CREATE_FAIL,
  CAROUSEL_CREATE_REQUEST,
  CAROUSEL_CREATE_SUCCESS,
  CAROUSEL_DELETE_FAIL,
  CAROUSEL_DELETE_REQUEST,
  CAROUSEL_DELETE_SUCCESS,
} from "./types";

export const listCarousel = () => async (dispatch) => {
  try {
    dispatch({ type: AVAILABLE_CAROUSEL_REQUEST });

    const { data } = await axios.get(`${BASE_URL}/api/carousel`);

    dispatch({
      type: AVAILABLE_CAROUSEL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: AVAILABLE_CAROUSEL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createCarousel =
  (title, description, image) => async (dispatch, getState) => {
    try {
      dispatch({ type: CAROUSEL_CREATE_REQUEST });

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
        `${BASE_URL}/api/carousel`,
        { title, description, image },
        config
      );

      dispatch({
        type: CAROUSEL_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CAROUSEL_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteCarousel = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: CAROUSEL_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`${BASE_URL}/api/carousel/${id}`, config);

    dispatch({ type: CAROUSEL_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: CAROUSEL_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
