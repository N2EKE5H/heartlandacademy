import axios from "axios";
import { BASE_URL } from "../api";
import {
  ADDED_TESTIMONIALS_STUDENTS_FAIL,
  ADDED_TESTIMONIALS_STUDENTS_REQUEST,
  ADDED_TESTIMONIALS_STUDENTS_SUCCESS,
  ADDED_TESTIMONIALS_VISITORS_FAIL,
  ADDED_TESTIMONIALS_VISITORS_REQUEST,
  ADDED_TESTIMONIALS_VISITORS_SUCCESS,
  TESTIMONIALS_STUDENTS_CREATE_FAIL,
  TESTIMONIALS_STUDENTS_CREATE_REQUEST,
  TESTIMONIALS_STUDENTS_CREATE_SUCCESS,
  TESTIMONIALS_STUDENTS_DELETE_FAIL,
  TESTIMONIALS_STUDENTS_DELETE_REQUEST,
  TESTIMONIALS_STUDENTS_DELETE_SUCCESS,
  TESTIMONIALS_VISITORS_CREATE_FAIL,
  TESTIMONIALS_VISITORS_CREATE_REQUEST,
  TESTIMONIALS_VISITORS_CREATE_SUCCESS,
  TESTIMONIALS_VISITORS_DELETE_FAIL,
  TESTIMONIALS_VISITORS_DELETE_REQUEST,
  TESTIMONIALS_VISITORS_DELETE_SUCCESS,
} from "./types";

export const listStudentsTestimonials = () => async (dispatch) => {
  try {
    dispatch({ type: ADDED_TESTIMONIALS_STUDENTS_REQUEST });

    const { data } = await axios.get(`${BASE_URL}/api/testimonials/students`);

    dispatch({
      type: ADDED_TESTIMONIALS_STUDENTS_SUCCESS,
      payload: data[0],
    });
  } catch (error) {
    dispatch({
      type: ADDED_TESTIMONIALS_STUDENTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createStudentsTestimonials =
  (fullName, desc, image, message) => async (dispatch, getState) => {
    try {
      dispatch({ type: TESTIMONIALS_STUDENTS_CREATE_REQUEST });

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
        `${BASE_URL}/api/testimonials/students`,
        { fullName, desc, image, message },
        config
      );

      dispatch({
        type: TESTIMONIALS_STUDENTS_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: TESTIMONIALS_STUDENTS_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteStudentsTestimonials =
  (id) => async (dispatch, getState) => {
    try {
      dispatch({ type: TESTIMONIALS_STUDENTS_DELETE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.delete(`${BASE_URL}/api/testimonials/students/${id}`, config);

      dispatch({ type: TESTIMONIALS_STUDENTS_DELETE_SUCCESS });
    } catch (error) {
      dispatch({
        type: TESTIMONIALS_STUDENTS_DELETE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listVisitorsTestimonials = () => async (dispatch) => {
  try {
    dispatch({ type: ADDED_TESTIMONIALS_VISITORS_REQUEST });

    const { data } = await axios.get(`${BASE_URL}/api/testimonials/visitors`);

    dispatch({
      type: ADDED_TESTIMONIALS_VISITORS_SUCCESS,
      payload: data[0],
    });
  } catch (error) {
    dispatch({
      type: ADDED_TESTIMONIALS_VISITORS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createVisitorsTestimonials =
  (fullName, desc, image, message) => async (dispatch, getState) => {
    try {
      dispatch({ type: TESTIMONIALS_VISITORS_CREATE_REQUEST });

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
        `${BASE_URL}/api/testimonials/visitors`,
        { fullName, desc, image, message },
        config
      );

      dispatch({
        type: TESTIMONIALS_VISITORS_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: TESTIMONIALS_VISITORS_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteVisitorsTestimonials =
  (id) => async (dispatch, getState) => {
    try {
      dispatch({ type: TESTIMONIALS_VISITORS_DELETE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.delete(`${BASE_URL}/api/testimonials/visitors/${id}`, config);

      dispatch({ type: TESTIMONIALS_VISITORS_DELETE_SUCCESS });
    } catch (error) {
      dispatch({
        type: TESTIMONIALS_VISITORS_DELETE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
