import axios from "axios";
import { BASE_URL } from "../api";
import {
  REGISTRATION_CREATE_FAIL,
  REGISTRATION_CREATE_REQUEST,
  REGISTRATION_CREATE_SUCCESS,
  SUBMITTED_REGISTRATION_FAIL,
  SUBMITTED_REGISTRATION_REQUEST,
  SUBMITTED_REGISTRATION_SUCCESS,
  REGISTRATION_DETAILS_REQUEST,
  REGISTRATION_DETAILS_SUCCESS,
  REGISTRATION_DETAILS_FAIL,
  REGISTRATION_DELETE_REQUEST,
  REGISTRATION_DELETE_FAIL,
  REGISTRATION_DELETE_SUCCESS,
} from "./types";

export const listRegistrations = () => async (dispatch, getState) => {
  try {
    dispatch({ type: SUBMITTED_REGISTRATION_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`${BASE_URL}/api/registrations`, config);

    dispatch({
      type: SUBMITTED_REGISTRATION_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SUBMITTED_REGISTRATION_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createNewRegistrations =
  (
    firstName,
    lastName,
    email,
    phone,
    address,
    preference,
    lvl,
    faculty,
    markSheet,
    ppPhoto,
    characterCerf,
    application,
    attachApplication,
    token
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: REGISTRATION_CREATE_REQUEST });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        `${BASE_URL}/api/registrations`,
        {
          firstName,
          lastName,
          email,
          phone,
          address,
          preference,
          lvl,
          faculty,
          markSheet,
          ppPhoto,
          characterCerf,
          application,
          attachApplication,
          token,
        },
        config
      );

      dispatch({
        type: REGISTRATION_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: REGISTRATION_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listRegistrationDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: REGISTRATION_DETAILS_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `${BASE_URL}/api/registrations/${id}`,
      config
    );

    dispatch({
      type: REGISTRATION_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: REGISTRATION_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteRegistration = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: REGISTRATION_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`${BASE_URL}/api/registrations/${id}`, config);

    dispatch({ type: REGISTRATION_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: REGISTRATION_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
