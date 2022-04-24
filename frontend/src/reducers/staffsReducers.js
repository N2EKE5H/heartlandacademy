import {
  AVAILABLE_STAFFS_FAIL,
  AVAILABLE_STAFFS_REQUEST,
  AVAILABLE_STAFFS_SUCCESS,
  STAFFS_CREATE_FAIL,
  STAFFS_CREATE_REQUEST,
  STAFFS_CREATE_RESET,
  STAFFS_CREATE_SUCCESS,
  STAFFS_DELETE_FAIL,
  STAFFS_DELETE_REQUEST,
  STAFFS_DELETE_SUCCESS,
} from "../actions/types";

export const availableStaffsReducer = (state = { staffs: [] }, action) => {
  switch (action.type) {
    case AVAILABLE_STAFFS_REQUEST:
      return { loading: true, staffs: [] };
    case AVAILABLE_STAFFS_SUCCESS:
      return { loading: false, staffs: action.payload };
    case AVAILABLE_STAFFS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const staffsCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case STAFFS_CREATE_REQUEST:
      return { loading: true };
    case STAFFS_CREATE_SUCCESS:
      return { loading: false, success: true, staffs: action.payload };
    case STAFFS_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case STAFFS_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const staffsDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case STAFFS_DELETE_REQUEST:
      return { loading: true };
    case STAFFS_DELETE_SUCCESS:
      return { loading: false, success: true };
    case STAFFS_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
