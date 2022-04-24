import axios from "axios";
import { BASE_URL } from "../api";
import {
  CAREERS_CREATE_FAIL,
  CAREERS_CREATE_REQUEST,
  CAREERS_CREATE_SUCCESS,
  CAREERS_DELETE_FAIL,
  CAREERS_DELETE_REQUEST,
  CAREERS_DELETE_SUCCESS,
  CAREERS_DETAILS_FAIL,
  CAREERS_DETAILS_REQUEST,
  CAREERS_DETAILS_SUCCESS,
  CAREERS_LIST_FAIL,
  CAREERS_LIST_REQUEST,
  CAREERS_LIST_SUCCESS,
  CAREERS_UPDATE_FAIL,
  CAREERS_UPDATE_REQUEST,
  CAREERS_UPDATE_SUCCESS,
} from "./types";

export const listCareers = () => async (dispatch) => {
  try {
    dispatch({ type: CAREERS_LIST_REQUEST });

    const { data } = await axios.get(`${BASE_URL}/api/careers`);

    dispatch({
      type: CAREERS_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CAREERS_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listCareerDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: CAREERS_DETAILS_REQUEST });

    const { data } = await axios.get(`${BASE_URL}/api/careers/${id}`);

    dispatch({
      type: CAREERS_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CAREERS_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createCareer =
  (
    title,
    careerCategory,
    noOfVacancy,
    employmentType,
    location,
    offeredSalary,
    applyBefore,
    educationLevel,
    experienceRequired,
    careerSpecs,
    careerDesc,
    note
  ) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: CAREERS_CREATE_REQUEST });

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
        `${BASE_URL}/api/careers`,
        {
          title,
          careerCategory,
          noOfVacancy,
          employmentType,
          location,
          offeredSalary,
          applyBefore,
          educationLevel,
          experienceRequired,
          careerSpecs,
          careerDesc,
          note,
        },
        config
      );

      dispatch({
        type: CAREERS_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CAREERS_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteCareer = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: CAREERS_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`${BASE_URL}/api/careers/${id}`, config);

    dispatch({ type: CAREERS_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: CAREERS_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateCareer = (career) => async (dispatch, getState) => {
  try {
    dispatch({ type: CAREERS_UPDATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `${BASE_URL}/api/careers/${career.careerId}`,
      { career },
      config
    );

    dispatch({
      type: CAREERS_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CAREERS_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
