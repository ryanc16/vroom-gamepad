import { Component } from "react";
import './pedal.css';

export default class Pedal extends Component<PedalProps> {

  render() {
    return(
      <div className="pedal">
        <div className="clip" style={{bottom: (this.props.percent*100)+'%'}}></div>
      </div>
    );
  }

}

interface PedalProps {
  percent: number;
}