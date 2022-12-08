import { Component } from "react";
import './steering.scss';
import drawnWheelBluePng from './drawnWheelBlue.png';
import drawnWheelYellowPng from './drawnWheelYellow.png';
import { AnalogStickSize, ColorOption } from "../../services/url-options.service";


export default class Steering extends Component<SteeringProps> {

  private thumbSizePercent: number = AnalogStickSize.Large;

  render() {
    if (this.props.analogStickSize) {
      this.thumbSizePercent = this.props.analogStickSize;
    }

    return (
      <div className="steering">
        {this.renderSteeringWheel()}
        {this.renderThumbStick()}
      </div>
    );
  }

  private renderSteeringWheel() {
    const style = this.calculateSteeringWheelRotation(this.props.axisX);
    let imgSrc = drawnWheelBluePng;
    if (this.props.color === ColorOption.Yellow) {
      imgSrc = drawnWheelYellowPng;
    }
    return <img alt="steeringwheel" className="wheel" style={style} src={imgSrc} />
  }

  private renderThumbStick() {
    const style = { ...this.calculateThumbPosition(this.props.axisX, this.props.axisY, this.thumbSizePercent), width: this.thumbSizePercent + '%', height: this.thumbSizePercent + '%' };
    return (
      <div className="stick-wrapper">
        <div className="stick-thumb" style={style}></div>
      </div>
    );
  }

  private calculateSteeringWheelRotation(axisX: number) {
    const rotation = axisX * (Math.PI / 2);
    return { transform: `rotate(${rotation}rad)` };
  }

  private calculateThumbPosition(axisX: number, axisY: number, maxRadius: number) {
    let adjustedAxisX = axisX;
    let adjustedAxisY = axisY;

    const magnitude = Math.sqrt(Math.pow(axisX, 2) + Math.pow(axisY, 2));
    // outside the Unit Circle
    if (magnitude > 1) {
      const theta = Math.atan2(axisY, axisX); // find the angle

      // given a hypotenuse (c) of 1, find the a and b legs of the inscribed triangle
      adjustedAxisY = Math.sin(theta);
      adjustedAxisX = Math.cos(theta);
    }

    const offset = (100 - maxRadius) / 2; // offset of the top left corner to represent the (0,0) point in coordinate space
    const overlap = offset + 10; // small extra distance. gives the element the appearance of an analog stick

    const left = offset + (adjustedAxisX * overlap) + '%';
    const top = offset + (adjustedAxisY * overlap * -1) + '%'; // negative here flips the y represented in the coordinate plane, to the y in px units
    return { left, top };
  }
}

interface SteeringProps {
  axisX: number;
  axisY: number;

  analogStickSize: AnalogStickSize;
  color: ColorOption;
}
