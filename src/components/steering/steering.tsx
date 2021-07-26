import { Component } from "react";
import './steering.css';
import steeringWheelPng from './steeringwheel.png';

export default class Steering extends Component<SteeringProps> {

  private readonly thumbSizePercent: number = 70;

  render() {
    return(
      <div className="steering">
        {this.renderSteeringWheel()}
        {this.renderThumbStick()}
      </div>
    );
  }

  private renderSteeringWheel() {
    const style = this.calculateSteeringWheelRotation(this.props.axisX);
    return <img alt="steeringwheel" className="wheel" style={style} src={steeringWheelPng} />
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
    return {transform: `rotate(${rotation}rad)`};
  }

  private calculateThumbPosition(axisX: number, axisY: number, maxRadius: number) {
    const phi = Math.atan2(axisY, axisX);
    const adjustedAxisX = Math.pow(axisX, 2) * Math.cos(phi);
    const adjustedAxisY = Math.pow(axisY, 2) * Math.sin(phi);

    const offset = (100 - maxRadius)/2;
    const overlap = offset + 10;

    const left = offset + (adjustedAxisX * overlap) + '%';
    const top  = offset + (adjustedAxisY * -overlap) + '%';
    return { left, top };
  }

}
interface SteeringProps {
  axisX: number;
  axisY: number;
}