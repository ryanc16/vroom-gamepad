import { ChangeEvent, Component } from "react";
import { analogStickBorderColorKey, analogStickFillColorKey, analogStickFillOpacityKey, AnalogStickSize, analogStickSizeKey, ColorOption, getOptionsFromUrl, wheelColorKey, wheelImgUrlKey } from "../../services/url-options.service";
import './options-menu.css';

const lettersOnly: RegExp = /^[a-zA-Z]/;

export default class OptionsMenu extends Component<OptionsMenuProps, OptionsMenuState> {

  state = {
    wheelImgUrl: {
      value: ''
    },
    wheelColor: {
      chooser: "predefined",
      value: ColorOption.Gray
    },
    analogStickFillColor: {
      chooser: "predefined",
      value: ColorOption.Gray
    },
    analogStickFillOpacity: {
      value: 0.4
    },
    analogStickBorderColor: {
      chooser: "predefined",
      value: ColorOption.Black
    },
    analogStickSize: {
      value: AnalogStickSize.Small
    }
  };

  constructor(props: OptionsMenuProps) {
    super(props);
    const urlOpts = getOptionsFromUrl();
    console.log(urlOpts);
    this.setState((prev, props) => {
      return {
        ...prev,
        wheelImgUrl: {
          ...prev.wheelImgUrl,
          value: urlOpts.wheelImgUrl
        },
        wheelColor: {
          ...prev.wheelColor,
          value: urlOpts.wheelColor
        },
        analogStickFillColor: {
          ...prev.analogStickFillColor,
          value: urlOpts.analogStickFillColor
        },
        analogStickFillOpacity: {
          ...prev.analogStickFillOpacity,
          value: urlOpts.analogStickFillOpacity
        },
        analogStickBorderColor: {
          ...prev.analogStickBorderColor,
          value: urlOpts.analogStickBorderColor
        },
        analogStickSize: {
          ...prev.analogStickSize,
          value: urlOpts.analogStickSize
        }
      };
    })
  }

  render() {
    return(
      <div className="options-menu">
        <h2>Options Menu</h2>

        <div>
          <p>{this.generateUrlParams()}</p>
        </div>

        <div>
          <input className="wheel-url-input" name="wheelImg" defaultValue={this.state.wheelImgUrl.value} onChange={this.inputValueChanged} type="text" placeholder="Wheel Asset Url" />
        </div>

        <div className="setting wheel-color">
          <label>Wheel Color:</label>
          { this.renderColorOptions('wheelColor', ColorOption) }
        </div>

        <div className="flex-row">
          <div className="setting">
            <label>Analog Stick Fill Opacity:</label>
            <input className="opacity" type="number" step="0.1" defaultValue={this.state.analogStickFillOpacity.value} name="analogStickFillOpacity" onChange={this.inputValueChanged} />
          </div>

          <div className="setting">
            <label>Analog Stick Fill Opacity:</label>
            { this.renderSelectOptions('analogStickSize', AnalogStickSize) }
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

  renderColorOptions(name: keyof OptionsMenuState, options: Record<string, string | number>) {
    const colorSelectionInputMethodChanged = (e: ChangeEvent<HTMLSelectElement>) => {
      this.setState((prev, props) => {
        return {...prev, [name]: {chooser: e.target.value}}
      });
    };
    
    const renderChooser = () => {
      const value = (this.state[name] as ColorState).chooser;
      if (value === 'predefined') {
        return this.renderSelectOptions(name, options);
      } else if (value === 'custom') {
        return this.renderColorChooser(name);
      }
    }
    return (
      <div>
        <select name="color-method" onChange={colorSelectionInputMethodChanged}>
          <option key="predefined" value="predefined">Predefined</option>
          <option key="custom" value="custom">Custom</option>
        </select>
        {renderChooser()}
      </div>
    );
  }

  renderSelectOptions(name: keyof OptionsMenuState, options: Record<string, string | number>) {
    const list = Object.entries(options)
    .filter(([_, value]) => ((typeof value === 'string' && value.length > 0) || (typeof value === 'number' && value > 0)))
    .filter(([key]) => key.match(lettersOnly))
    .map(([key, value]) => {
      return (
        <option key={key} value={value}>{key}</option>
      );
    });

    return (
      <select name={name} className="color-option-list" defaultValue={this.state[name].value} onChange={this.inputValueChanged}>
        { list }
      </select>
    );
  }

  renderColorChooser(name: keyof OptionsMenuState) {
    return <input type="color" name={name} defaultValue={this.state[name].value} className="color-options-list" onChange={this.inputValueChanged}/>
  }

  private inputValueChanged = (e: ChangeEvent<HTMLInputElement|HTMLSelectElement>) => {
    this.setState((prev, props) => {
      const key = e.target.name as keyof OptionsMenuState;
      return {...prev, [key]: {...prev[key], value: e.target.value}};
    });
  }

  private generateUrlParams = () => {
    const paramMap = {
      [wheelImgUrlKey]: this.state.wheelImgUrl.value,
      [wheelColorKey]: this.state.wheelColor.value,
      [analogStickSizeKey]: this.state.analogStickSize.value,
      [analogStickFillColorKey]: this.state.analogStickFillColor.value,
      [analogStickFillOpacityKey]: this.state.analogStickFillOpacity.value,
      [analogStickBorderColorKey]: this.state.analogStickBorderColor.value
    };
    return "?"+ Object.entries(paramMap).map(([key, value]) => key+"="+value).join("&");
  }

}

interface OptionsMenuState {
  wheelImgUrl: {
    value?: string;
  };
  wheelColor: ColorState;
  analogStickFillColor: ColorState;
  analogStickFillOpacity: {
    value: number;
  };
  analogStickBorderColor: ColorState;
  analogStickSize: {
    value: AnalogStickSize;
  };
}

interface ColorState {
  chooser: string;
  value: ColorOption;
}

interface OptionsMenuProps {

}