import {
  AVAILABLE_NOTICES_FAIL,
  AVAILABLE_NOTICES_REQUEST,
  AVAILABLE_NOTICES_SUCCESS,
  LATEST_NOTICES_FAIL,
  LATEST_NOTICES_REQUEST,
  LATEST_NOTICES_SUCCESS,
  NOTICES_CREATE_FAIL,
  NOTICES_CREATE_REQUEST,
  NOTICES_CREATE_RESET,
  NOTICES_CREATE_SUCCESS,
  NOTICES_DELETE_FAIL,
  NOTICES_DELETE_REQUEST,
  NOTICES_DELETE_SUCCESS,
} from "../actions/types";

export const availableNoticesReducer = (state = { notices: [] }, action) => {
  switch (action.type) {
    case AVAILABLE_NOTICES_REQUEST:
      return { loading: true, notices: [] };
    case AVAILABLE_NOTICES_SUCCESS:
      return { loading: false, notices: action.payload };
    case AVAILABLE_NOTICES_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const noticesCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case NOTICES_CREATE_REQUEST:
      return { loading: true };
    case NOTICES_CREATE_SUCCESS:
      return { loading: false, success: true, notices: action.payload };
    case NOTICES_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case NOTICES_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const noticesDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case NOTICES_DELETE_REQUEST:
      return { loading: true };
    case NOTICES_DELETE_SUCCESS:
      return { loading: false, success: true };
    case NOTICES_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const latestNoticesReducer = (state = { noticesLatest: [] }, action) => {
  switch (action.type) {
    case LATEST_NOTICES_REQUEST:
      return { loading: true, noticesLatest: [] };
    case LATEST_NOTICES_SUCCESS:
      return { loading: false, noticesLatest: action.payload };
    case LATEST_NOTICES_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
