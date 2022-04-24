import { SIDEBAR_TOGGLE, DARK_MODE, ADMIN_MODE } from "./types";

export const sidebarToggler = () => {
  // Get settings from local storage
  const settings = JSON.parse(localStorage.getItem("settings"));

  // Toggle
  settings.sidebarToggle = !settings.sidebarToggle;

  // Set back to Local Storage
  localStorage.setItem("settings", JSON.stringify(settings));

  return {
    type: SIDEBAR_TOGGLE,
    payload: settings.sidebarToggle,
  };
};

export const darkModeChanger = () => {
  // Get settings from local storage
  const settings = JSON.parse(localStorage.getItem("settings"));

  // Toggle
  settings.darkMode = !settings.darkMode;

  // Set back to Local Storage
  localStorage.setItem("settings", JSON.stringify(settings));

  return {
    type: DARK_MODE,
    payload: settings.darkMode,
  };
};

export const adminModeChanger = () => {
  // Get settings from local storage
  const settings = JSON.parse(localStorage.getItem("settings"));

  // Toggle
  settings.adminMode = !settings.adminMode;

  // Set back to Local Storage
  localStorage.setItem("settings", JSON.stringify(settings));

  return {
    type: ADMIN_MODE,
    payload: settings.darkMode,
  };
};
