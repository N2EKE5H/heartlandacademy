import {
  AVAILABLE_CAROUSEL_FAIL,
  AVAILABLE_CAROUSEL_REQUEST,
  AVAILABLE_CAROUSEL_SUCCESS,
  CAROUSEL_CREATE_FAIL,
  CAROUSEL_CREATE_REQUEST,
  CAROUSEL_CREATE_RESET,
  CAROUSEL_CREATE_SUCCESS,
  CAROUSEL_DELETE_FAIL,
  CAROUSEL_DELETE_REQUEST,
  CAROUSEL_DELETE_SUCCESS,
} from "../actions/types";

export const availableCarouselReducer = (state = { carousel: [] }, action) => {
  switch (action.type) {
    case AVAILABLE_CAROUSEL_REQUEST:
      return { loading: true, carousel: [] };
    case AVAILABLE_CAROUSEL_SUCCESS:
      return { loading: false, carousel: action.payload };
    case AVAILABLE_CAROUSEL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const carouselCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CAROUSEL_CREATE_REQUEST:
      return { loading: true };
    case CAROUSEL_CREATE_SUCCESS:
      return { loading: false, success: true, carousel: action.payload };
    case CAROUSEL_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case CAROUSEL_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const carouselDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case CAROUSEL_DELETE_REQUEST:
      return { loading: true };
    case CAROUSEL_DELETE_SUCCESS:
      return { loading: false, success: true };
    case CAROUSEL_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
