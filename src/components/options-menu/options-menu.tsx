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

        <details>
          <summary>Wheel Color:</summary>
          { this.renderColorOptions('wheelColor', ColorOption) }
        </details>

        <details>
          <summary>Analog Stick Fill Opacity:</summary>
          { this.renderColorOptions('analogStickFillOpacity', AnalogStickSize) }
        </details>

        <div className="flex-row">
          <details>
            <summary>Analog Stick Fill Color:</summary>
            { this.renderColorOptions('analogStickFillColor', ColorOption) }
          </details>

          <details>
            <summary>Analog Stick Border Color:</summary>
            { this.renderColorOptions('analogStickBorderColor', ColorOption) }
          </details>
        </div>
      </div>
    );
  }

  renderColorOptions(name: string, options: Record<string, string | number>) {
    console.log(Object.entries(options));

    const list = Object.entries(options).filter(([key, value]) => value && key.charCodeAt(0) > 57).map(([key, value]) => {
      return (
        <div className="color-option">
          <input type="radio" name={name} id={name} value={value} ></input>
          <label htmlFor={value.toString()}> {key} </label>
        </div>
      );
    });

    return (
      <div className="color-option-list">
        { list }
      </div>
    )
  }

}
