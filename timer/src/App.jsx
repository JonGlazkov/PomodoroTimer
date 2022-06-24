import React, { useEffect, useState } from 'react'
import './App.scss'

import CategoryNav from './components/CategoryNav'
import Timer from "./components/Timer"
import Settings from "./components/Settings"

import GearIcon from "./assets/icon-settings.svg"


const fontsStyle = { 1: 'font-Orbitron', 2: 'font-Roboto', 3: 'font-Space' }; // Style for the fonts in fontSettings
const colorsStyle = { 1: 'color-red', 2: 'color-blue', 3: 'color-purple' };

const INITIAL_COUNTDOWN_IN_SECONDS = 25 * 60 // 25min

function App() {
  const [duration, setDuration] = useState(INITIAL_COUNTDOWN_IN_SECONDS);
  //25 minutes
  const [seconds, setSeconds] = useState(duration)
  const [runningTime, setRunningTime] = useState(false);
  const [categoryChange, setCategoryChange] = useState(1)
  // 1 = Pomodoro Time, 2 = Short Break, 3 = Long Break
  const [timeSettings, setTimeSettings] = useState({
    pomodoroTime: 25,
    shortTime: 5,
    longTime: 15,
  });
  const [fontSettings, setFontSettings] = useState(1);
  const [colorSettings, setColorSettings] = useState(1);
  const [showModal, setShowModal] = useState(false);

  const [finishedTimerAudio] = useState(
    new Audio(
      'https://github.com/maykbrito/automatic-video-creator/blob/master/audios/kichen-timer.mp3?raw=true'
    )
  )
    finishedTimerAudio.volume = 0.05
  

  //Reset the timer to the start value
  function resetTimer() {
    setSeconds(duration)
    setRunningTime(false)
  }

  // Set the state and change the timer
  function changeCategory(category) {
    if (category === 1) {
      setDuration(timeSettings.pomodoroTime * 60);
      setSeconds(timeSettings.pomodoroTime * 60);
    }
    if (category === 2) {
      setDuration(timeSettings.shortTime * 60)
      setSeconds(timeSettings.shortTime * 60)
    }
    if (category === 3) {
      setDuration(timeSettings.longTime * 60)
      setSeconds(timeSettings.longTime * 60)
    }

    setCategoryChange(category)
    setRunningTime(false);
  }

  //Count down the timer
  useEffect(() => {
    let interval = null;
    if (runningTime && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds - 1)
      }, 1000)
    } else if (seconds <= 0) {
      finishedTimerAudio.play()
      setRunningTime(false)
    } else {
      setRunningTime(false)
      clearInterval(interval)
    };

    return () => clearInterval(interval); // This will run when it is time to clean up.
  }, [duration, finishedTimerAudio, runningTime, seconds])

  useEffect(() => {
    changeCategory(categoryChange);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeSettings]);

  // Show Modal 
  function toggleModal() {
    setShowModal(!showModal)
  }

  function handleNewSettings(newSettings) {
    setTimeSettings(newSettings)
    toggleModal()
  }

  return (
    <div className="page">
      <h2>POMODORO</h2>
      <CategoryNav
        changeCategory={(category) => changeCategory(category)}
        category={categoryChange}
        fontClass={fontsStyle[fontSettings]}
        colorClass={colorsStyle[colorSettings]}
      />
      <Timer
        seconds={seconds}
        toggleRunning={() => setRunningTime(!runningTime)}
        running={runningTime}
        reset={resetTimer}
        duration={duration}
        fontClass={fontsStyle[fontSettings]}
        colorClass={colorsStyle[colorSettings]}
      />
      <img
        src={GearIcon}
        alt="Settings"
        className="settings-icon"
        onClick={toggleModal}
      />
      {showModal && (
        <Settings
          toggleModal={toggleModal}
          setSettings={(newSettings) => handleNewSettings(newSettings)}
          currentSettings={timeSettings}
          setFont={(newFont) => setFontSettings(newFont)}
          currentFont={fontSettings}
          currentColor={colorSettings}
          setColor={(newColor) => setColorSettings(newColor)}
        />
      )}
    </div>
  )
};

export default App
