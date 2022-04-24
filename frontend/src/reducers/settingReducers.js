import { SIDEBAR_TOGGLE, DARK_MODE, ADMIN_MODE } from "../actions/types";

const SettingsReducer = (state = {}, action) => {
  switch (action.type) {
    case SIDEBAR_TOGGLE:
      return {
        ...state,
        sidebarToggle: action.payload,
      };
    case DARK_MODE:
      return {
        ...state,
        darkMode: action.payload,
      };
    case ADMIN_MODE:
      return {
        ...state,
        adminMode: action.payload,
      };
    default:
      return state;
  }
};

export default SettingsReducer;
