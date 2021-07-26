import { Component } from "react";
import './throttle.css';

export default class Throttle extends Component<ThrottleProps> {

  render() {
    return(
      <div className="throttle">
        <div className="clip" style={{left: (this.props.percent*100)+'%'}}></div>
      </div>
    );
  }

}

interface ThrottleProps {
  percent: number;
}