import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
    
function Setting(props) {
  return (
    <div class="setting">
      <div id={props.labelID}>{props.label}</div>
      <div id="setting-controls">
        <button 
          id={props.decrementID}
          onClick={() => props.onClick(props.settingName, "-")}
          >
          <i class="fas fa-arrow-down"></i>
        </button>
        <div id={props.settingValueID}>{props.settingValue}</div>
        <button
          id={props.incrementID}
          onClick={() => props.onClick(props.settingName, "+")}
          >
          <i class="fas fa-arrow-up"></i>
        </button>
      </div>
    </div>
  );
}

function Timer(props) {
  return (
    <div id="timer">
      <div id="timer-label">{props.label}</div>
      <div id="time-left">{props.value}</div>
    </div>
  );
}

class Clock extends React.Component {
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
      <div id="clock-container">
        <h1>25 + 5 Clock</h1>
        <div id="settings-area">
          <Setting
            label="Session Length"
            labelID="session-label"
            decrementID="session-decrement"
            incrementID="session-increment"
            settingName={"sessionLength"}
            settingValue={this.state.sessionLength}
            settingValueID="session-length"
            onClick={this.changeLength}
          />
          <Setting
            label="Break Length"
            labelID="break-label"
            decrementID="break-decrement"
            incrementID="break-increment"
            settingName={"breakLength"}
            settingValue={this.state.breakLength}
            settingValueID="break-length"
            onClick={this.changeLength}
          />
        </div>
        <Timer
          label={this.timerLabel()}
          value={this.timerDisplay()}
        />
        <div id="controls-area">
          <button id="start_stop" onClick={this.startTimer}>Start/Stop</button>
          <button id="reset" onClick={this.resetTimer}>Reset</button>
        </div>
        <audio 
          id="beep"
          ref={this.timerBeep}
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        >
          Your browser does not support the
          <code>audio</code> element.
        </audio>
      </div>
    );
  }
}
  
// ========================================

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);