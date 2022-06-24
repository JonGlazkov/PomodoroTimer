import { useState, useRef } from "react";

import CloseIcon from "../../assets/icon-close.svg"
import NumberSelector from "../NumberSelector"
import "../Settings/styles.scss";

const Settings = ({
  toggleModal,
  setSettings,
  currentSettings,
  setFont,
  currentFont,
  currentColor,
  setColor,
}) => {
  const [fontSelection, setFontSelection] = useState(currentFont);
  const [colorSelection, setColorSelection] = useState(currentColor);

  const pomodoroNumber = useRef(25);
  const shortNumber = useRef(5);
  const longNumber = useRef(15);

  // Function to handle Form submission
  const handleSubmit = (e) => {
    e.preventDefault()

    //Create the new settings object with the form's values:
    let newTimeSettings = {
      pomodoroTime: pomodoroNumber.current.value,
      shortTime: shortNumber.current.value,
      longTime: longNumber.current.value,
    };

    setFont(fontSelection);
    setColor(colorSelection);

    setSettings(newTimeSettings);
  };
  return (
    <form className="settings-form">
      <div className="settings-container">
        <div className="header">
          <h2>Settings</h2>
          <img 
            src={CloseIcon} 
            alt="Close" 
            onClick={toggleModal}
          />
        </div>
        <div className="time">
          <h4>Time (Minutes)</h4>
          <p className="pomodoro">Pomodoro</p>
          <p className="short-break">Short Break</p>
          <p className="long-break">Long Break</p>
          <NumberSelector 
            className="pomodoro-number"
            refValue={pomodoroNumber}
            defaultValue={currentSettings.pomodoroTime}
          />
          <NumberSelector 
            className="short-break-number"
            refValue={shortNumber}
            defaultValue={currentSettings.shortTime}
          />
          <NumberSelector 
            className="long-break-number"
            refValue={longNumber}
            defaultValue={currentSettings.longTime}
          />
        </div>
        <div className="font">
          <h4>Font</h4>
          <div className="font-container">
            <button
              type="button"
              className={
                fontSelection === 1 ? `font-1 font-selected` : "font-1"
              }
              onClick={() => setFontSelection(1)}
            >
              Aa
            </button>
            <button
              type="button"
              className={
                fontSelection === 2 ? `font-2 font-selected` : "font-2"
              }
              onClick={() => setFontSelection(2)}
            >
              Aa
            </button>
            <button
              type="button"
              className={
                fontSelection === 3 ? `font-3 font-selected` : "font-3"
              }
              onClick={() => setFontSelection(3)}
            >
              Aa
            </button>
          </div>
        </div>
        <div className="color">
          <h4>Color</h4>
          <div className="color-container">
            <button
              type="button"
              className={
                colorSelection === 1 ? `color-1 color-selected` : "color-1"
              }
              onClick={() => setColorSelection(1)}
            >
              &#10004;
            </button>
            <button
              type="button"
              className={
                colorSelection === 2 ? `color-2 color-selected` : "color-2"
              }
              onClick={() => setColorSelection(2)}
            >
              &#10004;
            </button>
            <button
              type="button"
              className={
                colorSelection === 3 ? `color-3 color-selected` : "color-3"
              }
              onClick={() => setColorSelection(3)}
            >
              &#10004;
            </button>
          </div>
        </div>
      </div>
      <button
        className="apply"
        background={currentColor}
        type="submit"
        onClick={handleSubmit}
      >
        Apply
      </button>
    </form>
  );
};
export default Settings;