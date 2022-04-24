import axios from "axios";
import { BASE_URL } from "../api";
import {
  ADDED_TEAMS_FAIL,
  ADDED_TEAMS_REQUEST,
  ADDED_TEAMS_SUCCESS,
  TEAMS_CREATE_FAIL,
  TEAMS_CREATE_REQUEST,
  TEAMS_CREATE_SUCCESS,
  TEAMS_DELETE_FAIL,
  TEAMS_DELETE_REQUEST,
  TEAMS_DELETE_SUCCESS,
} from "./types";

export const listTeams = () => async (dispatch) => {
  try {
    dispatch({ type: ADDED_TEAMS_REQUEST });

    const { data } = await axios.get(`${BASE_URL}/api/teams`);

    dispatch({
      type: ADDED_TEAMS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADDED_TEAMS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createTeams =
  (fullName, desc, image) => async (dispatch, getState) => {
    try {
      dispatch({ type: TEAMS_CREATE_REQUEST });

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
        `${BASE_URL}/api/teams`,
        { fullName, desc, image },
        config
      );

      dispatch({
        type: TEAMS_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: TEAMS_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteTeams = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: TEAMS_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`${BASE_URL}/api/teams/${id}`, config);

    dispatch({ type: TEAMS_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: TEAMS_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
