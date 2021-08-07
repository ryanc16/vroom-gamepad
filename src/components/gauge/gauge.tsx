import { Component } from "react";
import './gauge.css';

import gaugeBackgroundPng from './gauge-horizontal-background.png';
import gaugeThrottleFillPng from './gauge-horizontal-throttle-fill.png';
import gaugeBrakingFillPng from './gauge-horizontal-braking-fill.png';

export default class Gauge extends Component<GaugeProps> {

  render() {
    return(
      <div className="gauge">
        <img alt="gaugeBackground" className="background" src={gaugeBackgroundPng} />
        {<img alt="gaugeThrottleFill" className="fill throttle" style={this.getFillClipRect(this.props.throttle)} src={gaugeThrottleFillPng} />}
        {<img alt="gaugeBrakingFill" className="fill braking" style={this.getFillClipRect(this.props.braking)} src={gaugeBrakingFillPng} />}
      </div>
    );
  }

  getFillClipRect(decimalFill: number) {
    const percentFill = (decimalFill * 100);
    const clipPath = {
      clipPath: `polygon(0% 0%, ${percentFill}% 0%, ${percentFill}% 100%, 0% 100%)`
    };

    return clipPath;
  }

}

interface GaugeProps {
  throttle: number;
  braking: number;
}
