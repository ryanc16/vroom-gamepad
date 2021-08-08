import { Component } from "react";
import { AnalogStickSize, ColorOption } from "../../services/url-options.service";
import './options-menu.css';

export default class OptionsMenu extends Component {

  render() {
    return(
      <div className="options-menu">
        <h2>Options Menu</h2>

        <div>
          <input className="wheel-url-input" type="text" placeholder="Wheel Asset Url" />
        </div>

        <div className="setting wheel-color">
          <label>Wheel Color:</label>
          { this.renderColorOptions('wheelColor', ColorOption) }
        </div>

        <div className="flex-row">
          <div className="setting">
            <label>Analog Stick Fill Opacity:</label>
            <input className="opacity" type="number" />
          </div>

          <div className="setting">
            <label>Analog Stick Fill Opacity:</label>
            { this.renderColorOptions('analogStickSize', AnalogStickSize) }
          </div>
        </div>

        <div className="flex-row">
          <div className="setting">
            <label>Analog Stick Fill Color:</label>
            { this.renderColorOptions('analogStickFillColor', ColorOption) }
          </div>

          <div className="setting">
            <label>Analog Stick Border Color:</label>
            { this.renderColorOptions('analogStickBorderColor', ColorOption) }
          </div>
        </div>
      </div>
    );
  }

  renderColorOptions(name: string, options: Record<string, string | number>) {
    console.log(Object.entries(options));

    const list = Object.entries(options).filter(([key, value]) => value && key.charCodeAt(0) > 57).map(([key, value]) => {
      return (
        <option value={value}>{key}</option>
        // <div className="color-option">
        //   <select name={name}>
        //     <option value={value}>{key}</option>
        //   </select>

        //   <input type="radio" name={name} id={name} value={value} ></input>
        //   <label htmlFor={value.toString()}> {key} </label>
        // </div>
      );
    });

    return (
      <select name={name} className="color-option-list">
        { list }
      </select>
    )
  }

}
