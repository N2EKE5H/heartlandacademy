import {
  ADDED_TEAMS_FAIL,
  ADDED_TEAMS_REQUEST,
  ADDED_TEAMS_SUCCESS,
  TEAMS_CREATE_FAIL,
  TEAMS_CREATE_REQUEST,
  TEAMS_CREATE_RESET,
  TEAMS_CREATE_SUCCESS,
  TEAMS_DELETE_FAIL,
  TEAMS_DELETE_REQUEST,
  TEAMS_DELETE_SUCCESS,
} from "../actions/types";

export const addedTeamsReducer = (state = {}, action) => {
  switch (action.type) {
    case ADDED_TEAMS_REQUEST:
      return { loading: true, teams: [] };
    case ADDED_TEAMS_SUCCESS:
      return { loading: false, teams: action.payload };
    case ADDED_TEAMS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const teamsCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case TEAMS_CREATE_REQUEST:
      return { loading: true };
    case TEAMS_CREATE_SUCCESS:
      return { loading: false, success: true, Teams: action.payload };
    case TEAMS_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case TEAMS_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const teamsDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case TEAMS_DELETE_REQUEST:
      return { loading: true };
    case TEAMS_DELETE_SUCCESS:
      return { loading: false, success: true };
    case TEAMS_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
