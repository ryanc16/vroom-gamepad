import { Component } from "react";
import './gague.css';

import gagueBackgroundPng from './gague-background.png';
import gagueFillPng from './gague-fill.png';

export default class Gague extends Component<GagueProps> {

  render() {
    return(
      <div className="gague">
        <img alt="gaguebackground" className="background" src={gagueBackgroundPng} />
        <img alt="gaguefill" className="fill" style={this.getClipRect(this.props.percent)} src={gagueFillPng} />
      </div>
    );
  }

  getClipRect(percentFill: number) {
    const remaining = 100 - (percentFill * 100);
    const clipPath = {
      clipPath: `polygon(0% ${remaining}%, 100% ${remaining}%, 100% 100%, 0% 100%)`
    };

    return clipPath;
  }

}

interface GagueProps {
  percent: number;
}
