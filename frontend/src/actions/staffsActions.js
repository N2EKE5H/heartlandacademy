import axios from "axios";
import { BASE_URL } from "../api";
import {
  AVAILABLE_STAFFS_FAIL,
  AVAILABLE_STAFFS_REQUEST,
  AVAILABLE_STAFFS_SUCCESS,
  STAFFS_CREATE_FAIL,
  STAFFS_CREATE_REQUEST,
  STAFFS_CREATE_SUCCESS,
  STAFFS_DELETE_FAIL,
  STAFFS_DELETE_REQUEST,
  STAFFS_DELETE_SUCCESS,
} from "./types";

export const listStaffs = () => async (dispatch) => {
  try {
    dispatch({ type: AVAILABLE_STAFFS_REQUEST });

    const { data } = await axios.get(`${BASE_URL}/api/staffs`);

    dispatch({
      type: AVAILABLE_STAFFS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: AVAILABLE_STAFFS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createStaffs =
  (image, fullName, email, position, phone) => async (dispatch, getState) => {
    try {
      dispatch({ type: STAFFS_CREATE_REQUEST });

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
        `${BASE_URL}/api/staffs`,
        { image, fullName, email, position, phone },
        config
      );

      dispatch({
        type: STAFFS_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: STAFFS_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteStaffs = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: STAFFS_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`${BASE_URL}/api/staffs/${id}`, config);

    dispatch({ type: STAFFS_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: STAFFS_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
