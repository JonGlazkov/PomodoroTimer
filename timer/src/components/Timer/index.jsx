import React from "react";
import ProgressBar from "react-customizable-progressbar";
import "./styles.scss";
import useWindowSize from "../../Hooks/UseWindowSize";


const Timer = ({
  seconds,
  running,
  toggleRunning,
  reset,
  duration,
  fontClass,
  colorClass,
}) => {
  //const COUNTDOWN_INITIAL_TIME_IN_SECONDS = 25 * 60 //25min
  const windowSize = useWindowSize();
  const breakPoint = 475; 
  
  //Format of the timer 
  const minutes = Math.floor(seconds / 60)
  const currentSeconds = seconds % 60
  
  //Calculate the percentage of progress for the circle progress bar
  const percentage = (duration / seconds * 100) 
  
  
  function getColor(className) {
    if (className === "color-red") {
      return "#FF0020";
    } else if (className === "color-blue") {
      return "#1BF2F2";
    } else if (className === "color-purple") {
      return "#F207B4";
    }
  }

  return (
    <div className="countdown-container">
      <ProgressBar
        radius={windowSize.width > breakPoint ? 163 : 118}
        progress={100}
        initialAnimation={true}
        trackStrokeColor={"transparent"}
        strokeColor={getColor(colorClass)}
        strokeWidth={windowSize.width > breakPoint ? 11 : 10}
        steps={percentage}
        className="progress-bar"
      >
        <div className="inside-bar" onDoubleClick={reset}>
          <h1 className={`remaining-time ${fontClass}`}>
            {String(minutes).padStart(2, '0')}:{String(currentSeconds).padStart(2, '0')}
          </h1>
          {running || seconds > 0 ? (
            <h3 
              onClick={toggleRunning} 
              className={fontClass}>
              {running ?  "PAUSE" : "START"}
            </h3>
          ) : (
            <h3 
              onClick={reset} 
              className={fontClass}
            >
             RESTART
            </h3>
          )}
        </div>
      </ProgressBar>
    </div>
  )
};

export default Timer;