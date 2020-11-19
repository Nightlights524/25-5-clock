import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// const Stateless = props => {
  //   return (
    //     <div>
    //     </div>
    //   );
    // }
    
function Setting(props) {
  return (
    <div class="setting">
      <div id={props.labelID}>{props.label}</div>
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
  }
  
  changeLength (setting, sign) {
    if (sign === "+") {
      this.setState(prevState => {
        if (prevState[setting] < prevState.maxLength) {
          return {[setting]: prevState[setting] + 1};
        }
        return prevState
      });
    } else if (sign === "-") {
      this.setState(prevState => {
        if (prevState[setting] > prevState.minLength) {
          return {[setting]: prevState[setting] - 1};
        }
        return prevState;
      });
    } else {
      alert("INVALID SETTING CHANGE!!!");
    }
    
    // this.setState({timerValue: });
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
  }

  decrementTimer() {
    if (this.state.timerValue > 0) {
      this.setState((prevState) => ({timerValue: prevState.timerValue - 1}));
    } else {
      //DO SOMETHING WHEN TIMER HITS 0
    }
  }

  timerDisplay() {
    let timeRemaining = this.state.timerValue;
    let minutes = Math.floor(timeRemaining / 60);
    let seconds = timeRemaining - (minutes * 60);

    return minutes.toString() + ":" + seconds.toString();
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
          label="Timer"
          value={this.timerDisplay()}
        />
        <div id="controls-area">
          <button id="start_stop" onClick={this.startTimer}>Start/Stop</button>
          <button id="reset" onClick={this.resetTimer}>Reset</button>
        </div>
      </div>
    );
  }
}
  
// ========================================

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);