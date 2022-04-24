import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Modal } from "react-bootstrap";
import { darkModeChanger, sidebarToggler } from "../../actions/settingActions";
import useWindowDimensions from "../helpers/windowLength";

export default function SettingsModal(props) {
  const [disableToggle, setDisableToggle] = useState(false);
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);
  const { sidebarToggle, darkMode } = settings;

  const sidebarTogglerHandler = () => {
    dispatch(sidebarToggler());
  };
  const darkModeTogglerHandler = () => {
    dispatch(darkModeChanger());
  };

  const { width } = useWindowDimensions();
  useEffect(() => {
    if (width < 600) {
      setDisableToggle(true);
    } else {
      setDisableToggle(false);
    }
  }, [dispatch, width]);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className={darkMode ? "dark-modal" : "white-modal"}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <h2>
            <i className="fas fa-cog"></i> Settings
          </h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{ marginBottom: "75px" }}>
          <div>
            <label className="switch">
              <input
                type="checkbox"
                checked={!!!sidebarToggle}
                onChange={sidebarTogglerHandler}
                disabled={disableToggle}
              />
              <span className="slider"></span>
            </label>{" "}
            Collapsed Sidebar
          </div>
          <div>
            <label className="switch">
              <input
                type="checkbox"
                checked={!!darkMode}
                onChange={darkModeTogglerHandler}
              />
              <span className="darkModeSlider"></span>
            </label>{" "}
            DarkMode
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
