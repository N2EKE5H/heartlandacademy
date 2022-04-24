import axios from "axios";
import { BASE_URL } from "../api";
import {
  ALL_ADMIN_EVENTS_FAIL,
  ALL_ADMIN_EVENTS_REQUEST,
  ALL_ADMIN_EVENTS_SUCCESS,
  EVENTS_CREATE_FAIL,
  EVENTS_CREATE_REQUEST,
  EVENTS_CREATE_SUCCESS,
  EVENTS_DELETE_FAIL,
  EVENTS_DELETE_REQUEST,
  EVENTS_DELETE_SUCCESS,
  UPCOMING_EVENTS_FAIL,
  UPCOMING_EVENTS_REQUEST,
  UPCOMING_EVENTS_SUCCESS,
  UPCOMING_LATEST_EVENTS_FAIL,
  UPCOMING_LATEST_EVENTS_REQUEST,
  UPCOMING_LATEST_EVENTS_SUCCESS,
} from "./types";

export const listEvents = () => async (dispatch) => {
  try {
    dispatch({ type: UPCOMING_EVENTS_REQUEST });

    const { data } = await axios.get(`${BASE_URL}/api/events/upcomingevents`);

    dispatch({
      type: UPCOMING_EVENTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPCOMING_EVENTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listEventsAdmin = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ALL_ADMIN_EVENTS_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`${BASE_URL}/api/events`, config);

    dispatch({
      type: ALL_ADMIN_EVENTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_ADMIN_EVENTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createEvents =
  (user, title, description, date, image) => async (dispatch, getState) => {
    try {
      dispatch({ type: EVENTS_CREATE_REQUEST });

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
        `${BASE_URL}/api/events`,
        { user, title, description, date, image },
        config
      );

      dispatch({
        type: EVENTS_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: EVENTS_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteEvents = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: EVENTS_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`${BASE_URL}/api/events/${id}`, config);

    dispatch({ type: EVENTS_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: EVENTS_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listUpcomingLatestEvents = () => async (dispatch) => {
  try {
    dispatch({ type: UPCOMING_LATEST_EVENTS_REQUEST });

    const { data } = await axios.get(`${BASE_URL}/api/events/upcoming`);

    dispatch({
      type: UPCOMING_LATEST_EVENTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPCOMING_LATEST_EVENTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
