import {
  ADDED_MODAL_FAIL,
  ADDED_MODAL_REQUEST,
  ADDED_MODAL_SUCCESS,
  MODAL_CREATE_FAIL,
  MODAL_CREATE_REQUEST,
  MODAL_CREATE_RESET,
  MODAL_CREATE_SUCCESS,
  MODAL_DELETE_FAIL,
  MODAL_DELETE_REQUEST,
  MODAL_DELETE_SUCCESS,
} from "../actions/types";

export const addedModalReducer = (state = {}, action) => {
  switch (action.type) {
    case ADDED_MODAL_REQUEST:
      return { loading: true, modal: [] };
    case ADDED_MODAL_SUCCESS:
      return { loading: false, modal: action.payload };
    case ADDED_MODAL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const modalCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case MODAL_CREATE_REQUEST:
      return { loading: true };
    case MODAL_CREATE_SUCCESS:
      return { loading: false, success: true, modal: action.payload };
    case MODAL_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case MODAL_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const modalDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case MODAL_DELETE_REQUEST:
      return { loading: true };
    case MODAL_DELETE_SUCCESS:
      return { loading: false, success: true };
    case MODAL_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
