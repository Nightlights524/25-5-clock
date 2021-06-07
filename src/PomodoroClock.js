import React from 'react';
import * as styles from "./PomodoroClock.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'
import timerBeep from './timerBeep.mp3';

function Setting(props) {
  return (
    <div className={styles.setting}>
      <div>{props.label}</div>
      <div className={styles.settingControls}>
        <button 
          className={styles.button}
          onClick={() => props.onClick(props.settingName, "-")}
          >
          <FontAwesomeIcon icon={faArrowDown} />
        </button>
        <div>{props.settingValue}</div>
        <button
          className={styles.button}
          onClick={() => props.onClick(props.settingName, "+")}
          >
          <FontAwesomeIcon icon={faArrowUp} />
        </button>
      </div>
    </div>
  );
}

function Timer(props) {
  return (
    <div className={styles.timer}>
      <div>{props.label}</div>
      <div>{props.value}</div>
    </div>
  );
}

class PomodoroClock extends React.Component {
  constructor(props) {
    super(props);
    this.timerBeep = React.createRef();
    this.state = {
      timerValue: 1500,
      breakLength: 5,
      sessionLength: 25,
      minLength: 1,
      maxLength: 60,
      onBreak: false,
      timerRunning: false,
      timerIntervalID: ""
    }
    this.changeLength = this.changeLength.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.decrementTimer = this.decrementTimer.bind(this);
    this.timerDisplay = this.timerDisplay.bind(this);
    this.timerLabel = this.timerLabel.bind(this);
    this.setTimerValue = this.setTimerValue.bind(this);
  }
  
  changeLength (settingName, sign) {
    if (this.state.timerRunning) {
      return;
    }

    if (sign === "+") {
      this.setState(prevState => {
        if (prevState[settingName] < prevState.maxLength) {
          return {[settingName]: prevState[settingName] + 1};
        }
        return prevState
      }, () => this.setTimerValue(settingName));
    } else if (sign === "-") {
      this.setState(prevState => {
        if (prevState[settingName] > prevState.minLength) {
          return {[settingName]: prevState[settingName] - 1};
        }
        return prevState;
      }, () => this.setTimerValue(settingName));
    } else {
      alert("INVALID SETTING CHANGE!!!");
    }
  }
  
  startTimer() {
    if (this.state.timerRunning) {
      clearInterval(this.state.timerIntervalID);
      this.setState({timerRunning: false});
    } else {
      this.setState({
        timerIntervalID: setInterval(this.decrementTimer, 1000),
        timerRunning: true
      });
    }
  }
  
  resetTimer() {
    clearInterval(this.state.timerIntervalID);

    this.setState({
      timerValue: 1500,
      breakLength: 5,
      sessionLength: 25,
      minLength: 1,
      maxLength: 60,
      onBreak: false,
      timerRunning: false,
      timerIntervalID: ""
    });

    this.timerBeep.current.pause();
    this.timerBeep.current.currentTime = 0;
  }

  decrementTimer() {
    if (this.state.timerValue > 0) {
      this.setState((prevState) => ({timerValue: prevState.timerValue - 1}));
    } else {
      if (this.state.onBreak) {
        this.setState({timerValue: this.state.sessionLength * 60});
      } else {
        this.setState({timerValue: this.state.breakLength * 60});
      }
      this.setState((prevState) => ({onBreak: !prevState.onBreak}));
      this.timerBeep.current.play();
    }
  }

  timerDisplay() {
    let minutes = Math.floor(this.state.timerValue / 60);
    let seconds = this.state.timerValue - (minutes * 60);
    
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    return minutes.toString() + ":" + seconds.toString();
  }

  timerLabel() {
    return this.state.onBreak ? "Break" : "Session";
  }

  setTimerValue(settingName) {
    if ((this.state.onBreak && settingName === "sessionLength") ||
        (!this.state.onBreak && settingName === "breakLength")) {
      return;
    }

    let value = this.state.onBreak ? this.state.breakLength * 60 : this.state.sessionLength * 60;
    this.setState({timerValue: value});
  }
  
  render() {  
    return (
      <div className={styles.clockContainer}>
        <h1 className={styles.title}>Pomodoro Clock</h1>
        <div className={styles.settingsArea}>
          <Setting
            label="Session Length"
            settingName={"sessionLength"}
            settingValue={this.state.sessionLength}
            onClick={this.changeLength}
          />
          <Setting
            label="Break Length"
            settingName={"breakLength"}
            settingValue={this.state.breakLength}
            onClick={this.changeLength}
          />
        </div>
        <Timer
          label={this.timerLabel()}
          value={this.timerDisplay()}
        />
        <div className={styles.controlsArea}>
          <button className={styles.button} onClick={this.startTimer}>Start/Stop</button>
          <button className={styles.button} onClick={this.resetTimer}>Reset</button>
        </div>
        <audio 
          ref={this.timerBeep}
          src={timerBeep}
        >
          Your browser does not support the
          <code>audio</code> element.
        </audio>
      </div>
    );
  }
}

export default PomodoroClock