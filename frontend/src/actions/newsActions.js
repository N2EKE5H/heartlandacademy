import axios from "axios";
import { BASE_URL } from "../api";

import {
  LATEST_NEWS_FAIL,
  LATEST_NEWS_REQUEST,
  LATEST_NEWS_SUCCESS,
  NEWS_CREATE_FAIL,
  NEWS_CREATE_REQUEST,
  NEWS_CREATE_SUCCESS,
  NEWS_DELETE_FAIL,
  NEWS_DELETE_REQUEST,
  NEWS_DELETE_SUCCESS,
  NEWS_DETAILS_FAIL,
  NEWS_DETAILS_REQUEST,
  NEWS_DETAILS_SUCCESS,
  NEWS_LIST_FAIL,
  NEWS_LIST_REQUEST,
  NEWS_LIST_SUCCESS,
  NEWS_UPDATE_FAIL,
  NEWS_UPDATE_REQUEST,
  NEWS_UPDATE_SUCCESS,
} from "./types";

export const listNews = () => async (dispatch) => {
  try {
    dispatch({ type: NEWS_LIST_REQUEST });

    const { data } = await axios.get(`${BASE_URL}/api/news`);

    dispatch({
      type: NEWS_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEWS_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listNewsDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: NEWS_DETAILS_REQUEST });

    const { data } = await axios.get(`${BASE_URL}/api/news/${id}`);

    dispatch({
      type: NEWS_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEWS_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createNews =
  (user, title, author, description, section, image) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: NEWS_CREATE_REQUEST });

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
        `${BASE_URL}/api/news`,
        { user, title, author, description, section, image },
        config
      );

      dispatch({
        type: NEWS_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: NEWS_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteNews = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: NEWS_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`${BASE_URL}/api/news/${id}`, config);

    dispatch({ type: NEWS_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: NEWS_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateNews = (news) => async (dispatch, getState) => {
  try {
    dispatch({ type: NEWS_UPDATE_REQUEST });

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
      `${BASE_URL}/api/news/${news.newsId}`,
      { news },
      config
    );

    dispatch({
      type: NEWS_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEWS_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listLatestNews = () => async (dispatch) => {
  try {
    dispatch({ type: LATEST_NEWS_REQUEST });

    const { data } = await axios.get(`${BASE_URL}/api/news/latest`);

    dispatch({
      type: LATEST_NEWS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LATEST_NEWS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
