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

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breakLength: 5,
      sessionLength: 25,
      minLength: 1,
      maxLength: 60,
      timerRunning: false
    }
    this.changeLength = this.changeLength.bind(this);
  }

  // changeLength () {
    // alert("changeLength()");
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
      </div>
    );
  }
}
  
// ========================================

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);