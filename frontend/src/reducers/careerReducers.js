import {
  CAREERS_CREATE_FAIL,
  CAREERS_CREATE_REQUEST,
  CAREERS_CREATE_RESET,
  CAREERS_CREATE_SUCCESS,
  CAREERS_DELETE_FAIL,
  CAREERS_DELETE_REQUEST,
  CAREERS_DELETE_SUCCESS,
  CAREERS_DETAILS_FAIL,
  CAREERS_DETAILS_REQUEST,
  CAREERS_DETAILS_RESET,
  CAREERS_DETAILS_SUCCESS,
  CAREERS_LIST_FAIL,
  CAREERS_LIST_REQUEST,
  CAREERS_LIST_SUCCESS,
  CAREERS_UPDATE_FAIL,
  CAREERS_UPDATE_REQUEST,
  CAREERS_UPDATE_RESET,
  CAREERS_UPDATE_SUCCESS,
} from "../actions/types";

export const careersListReducer = (state = { careers: [] }, action) => {
  switch (action.type) {
    case CAREERS_LIST_REQUEST:
      return { loading: true, careers: [] };
    case CAREERS_LIST_SUCCESS:
      return { loading: false, careers: action.payload };
    case CAREERS_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const careerDetailsReducer = (state = { singleCareer: [] }, action) => {
  switch (action.type) {
    case CAREERS_DETAILS_REQUEST:
      return { ...state, loading: true };
    case CAREERS_DETAILS_SUCCESS:
      return { loading: false, singleCareer: action.payload };
    case CAREERS_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case CAREERS_DETAILS_RESET:
      return { singleCareer: [] };
    default:
      return state;
  }
};

export const careerCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CAREERS_CREATE_REQUEST:
      return { loading: true };
    case CAREERS_CREATE_SUCCESS:
      return { loading: false, career: action.payload };
    case CAREERS_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case CAREERS_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const careerDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case CAREERS_DELETE_REQUEST:
      return { loading: true };
    case CAREERS_DELETE_SUCCESS:
      return { loading: false, success: true };
    case CAREERS_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const careerUpdateReducer = (state = { careers: {} }, action) => {
  switch (action.type) {
    case CAREERS_UPDATE_REQUEST:
      return { loading: true };
    case CAREERS_UPDATE_SUCCESS:
      return { loading: false, success: true, careers: action.payload };
    case CAREERS_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case CAREERS_UPDATE_RESET:
      return { careers: {} };
    default:
      return state;
  }
};
