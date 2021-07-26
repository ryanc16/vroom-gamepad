import { Component, Fragment } from 'react';
import './driving-hud.css';
import Gamepad from 'react-gamepad';
import Pedal from '../pedal/pedal';
import Steering from '../steering/steering';

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
      <Fragment>
        <Gamepad onAxisChange={this.onAxisChangeHandler}><div/></Gamepad>
        <div className="driving-hud flex-col">
          <div>
            <Steering axisX={this.state.steering.axisX} axisY={this.state.steering.axisY} />
          </div>
          <div className="flex-row flex-evenly">
            <div className="flex-col flex-center">
              <Pedal percent={this.state.braking} />
              <div>Braking</div>
            </div>
            <div className="flex-col flex-center">
              <Pedal percent={this.state.throttle} />
              <div>Throttle</div>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }

  onAxisChangeHandler = (axisName: string, value: number) => {
    if (axisName === 'RightTrigger') {
      this.setState({throttle: value});
    } else if (axisName === 'LeftTrigger') {
      this.setState({braking: value});
    } else if (axisName === 'LeftStickX') {
      this.setState((previousState, props) => {
        return {
          steering: {
            ...previousState.steering,
            axisX: value
          }
        };
      });
    } else if (axisName === 'LeftStickY') {
      this.setState((previousState, props) => {
        return {
          steering: {
            ...previousState.steering,
            axisY: value
          }
        };
      });
    }
    // else if (axisName === 'LeftStickY') {
    //   if (value >= 0) {
    //     this.setState({throttle: value});
    //   }
    //   if (value <= 0) {
    //     this.setState({braking: value*-1});
    //   }
    // }
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