import { Component, Fragment } from 'react';
import Gamepad from 'react-gamepad';
import ControllerConstants from '../../constants/controller-constants';
import Gauge from '../gauge/gauge';
import Steering from '../steering/steering';
import './driving-hud.css';

export default class DrivingHud extends Component<any, DrivingHudState> {

  state = {
    throttle: 0,
    braking: 0,
    steering: {
      axisY: 0,
      axisX: 0
    }
  };

  render() {
    return (
      <Fragment >
        <Gamepad onAxisChange={this.onAxisChangeHandler}><div/></Gamepad>
        <div className="driving-hud flex-row">
          <div className="flex-col">
            <Gauge throttle={this.state.throttle} braking={this.state.braking} />
            <Steering axisX={this.state.steering.axisX} axisY={this.state.steering.axisY} />
          </div>
        </div>
      </Fragment>
    )
  }

  onAxisChangeHandler = (axisName: string, value: number) => {
    if (axisName === ControllerConstants.RightTrigger) {
      this.setState({throttle: value});
    } else if (axisName === ControllerConstants.LeftTrigger) {
      this.setState({braking: value});
    } else if (axisName === ControllerConstants.LeftStickX) {
      this.setState((previousState, props) => {
        return {
          steering: {
            ...previousState.steering,
            axisX: value
          }
        };
      });
    } else if (axisName === ControllerConstants.LeftStickY) {
      this.setState((previousState, props) => {
        return {
          steering: {
            ...previousState.steering,
            axisY: value
          }
        };
      });
    }
  }

}

interface DrivingHudState {
  throttle: number,
  braking: number,
  steering: {
    axisY: number,
    axisX: number
  }
}
