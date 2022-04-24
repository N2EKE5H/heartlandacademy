import {
  REGISTRATION_CREATE_FAIL,
  REGISTRATION_CREATE_REQUEST,
  REGISTRATION_CREATE_RESET,
  REGISTRATION_CREATE_SUCCESS,
  REGISTRATION_DELETE_FAIL,
  REGISTRATION_DELETE_REQUEST,
  REGISTRATION_DELETE_RESET,
  REGISTRATION_DELETE_SUCCESS,
  REGISTRATION_DETAILS_FAIL,
  REGISTRATION_DETAILS_REQUEST,
  REGISTRATION_DETAILS_RESET,
  REGISTRATION_DETAILS_SUCCESS,
  SUBMITTED_REGISTRATION_FAIL,
  SUBMITTED_REGISTRATION_REQUEST,
  SUBMITTED_REGISTRATION_SUCCESS,
} from "../actions/types";

export const submittedRegistrationsReducer = (
  state = { registrations: [] },
  action
) => {
  switch (action.type) {
    case SUBMITTED_REGISTRATION_REQUEST:
      return {
        loading: true,
      };
    case SUBMITTED_REGISTRATION_SUCCESS:
      return {
        loading: false,
        registrations: action.payload,
      };
    case SUBMITTED_REGISTRATION_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const createRegistrationsReducer = (state = {}, action) => {
  switch (action.type) {
    case REGISTRATION_CREATE_REQUEST:
      return { loading: true };
    case REGISTRATION_CREATE_SUCCESS:
      return { loading: false, success: true, registrations: action.payload };
    case REGISTRATION_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case REGISTRATION_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const registrationDetailsReducer = (
  state = { singleRegistration: {} },
  action
) => {
  switch (action.type) {
    case REGISTRATION_DETAILS_REQUEST:
      return { ...state, loading: true };
    case REGISTRATION_DETAILS_SUCCESS:
      return { loading: false, singleRegistration: action.payload };
    case REGISTRATION_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case REGISTRATION_DETAILS_RESET:
      return { singleRegistration: {} };
    default:
      return state;
  }
};

export const registrationsDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case REGISTRATION_DELETE_REQUEST:
      return { loading: true };
    case REGISTRATION_DELETE_SUCCESS:
      return { loading: false, success: true };
    case REGISTRATION_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case REGISTRATION_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
