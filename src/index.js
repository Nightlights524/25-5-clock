import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// function Stateless(props) {
//   return (
//     <div>
//     </div>
//   );
// }

// const Stateless = props => {
//   return (
//     <div>
//     </div>
//   );
// }

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }
  
  render() {  
    return (
      <div>
        <h1>25 + 5 Clock</h1>
      </div>
    );
  }
}
  
// ========================================

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);