import React, { ChangeEvent, useCallback, useMemo, useRef, useState } from "react";
import { AnalogStickSize, AppOptions, ColorOption, UrlOptions } from "../../services/url-options.service";
import './options-menu.scss';

const lettersOnly: RegExp = /^[a-zA-Z]/;

export default function OptionsMenu(props: OptionsMenuProps): React.ReactElement {

  const [formOptions, setFormOptions] = useState<OptionsMenuState>({
    wheelImgUrl: {
      value: props.appOptions.wheelImgUrl
    },
    wheelColor: {
      chooser: (Object.values(ColorOption) as string[]).includes(props.appOptions.wheelColor) ? ColorMethodType.PREDEFINED : ColorMethodType.CUSTOM,
      value: props.appOptions.wheelColor
    },
    analogStickFillColor: {
      chooser: (Object.values(ColorOption) as string[]).includes(props.appOptions.analogStickFillColor) ? ColorMethodType.PREDEFINED : ColorMethodType.CUSTOM,
      value: props.appOptions.analogStickFillColor
    },
    analogStickFillOpacity: {
      value: props.appOptions.analogStickFillOpacity
    },
    analogStickBorderColor: {
      chooser: (Object.values(ColorOption) as string[]).includes(props.appOptions.analogStickBorderColor) ? ColorMethodType.PREDEFINED : ColorMethodType.CUSTOM,
      value: props.appOptions.analogStickBorderColor
    },
    analogStickSize: {
      value: props.appOptions.analogStickSize
    }
  });

  const customUrlTextAreaRef = useRef<HTMLTextAreaElement>(null);
  const [customUrlCopyBtnText, setCustomUrlCopyBtnText] = useState<string>('Copy');

  const generateUrlParams = useCallback(() => {
    const paramMap = {
      [UrlOptions.wheelImgUrlKey]: formOptions.wheelImgUrl.value,
      [UrlOptions.wheelColorKey]: formOptions.wheelColor.value,
      [UrlOptions.analogStickSizeKey]: formOptions.analogStickSize.value,
      [UrlOptions.analogStickFillColorKey]: formOptions.analogStickFillColor.value,
      [UrlOptions.analogStickFillOpacityKey]: formOptions.analogStickFillOpacity.value,
      [UrlOptions.analogStickBorderColorKey]: formOptions.analogStickBorderColor.value
    };
    return "?" + Object.entries(paramMap).filter(([key, value]) => value != null && value !== '').map(([key, value]) => key + "=" + value).join("&");
  }, [formOptions]);

  const customUrl = useMemo(() => {
    return window.location.protocol + "//" + window.location.host + generateUrlParams();
  }, [generateUrlParams]);

  const copyUrlToClipboard = useCallback(() => {
    if (customUrlTextAreaRef.current != null) {
      customUrlTextAreaRef.current.select();
      setCustomUrlCopyBtnText('Copied!');
    }
    navigator.clipboard.writeText(customUrl);

  }, [customUrl]);

  const inputValueChanged = useCallback((e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const key = e.target.name as keyof OptionsMenuState;
    setFormOptions({ ...formOptions, [key]: { ...formOptions[key], value: e.target.value } });
    setCustomUrlCopyBtnText('Copy');
    props.onOptionChange(key, e.target.value);
  }, [formOptions, props]);

  const renderSelectOptions = useCallback((name: keyof OptionsMenuState, options: Record<string, string | number>) => {
    const list = Object.entries(options)
      .filter(([_, value]) => ((typeof value === 'string' && value.length >= 0) || (typeof value === 'number' && value > 0)))
      .filter(([key]) => key.match(lettersOnly))
      .map(([key, value]) => {
        return (
          value === '' ? <option key={key} value={value}>Default</option> : <option key={key} value={value}>{key}</option>
        );
      });

    return (
      <select name={name} className="color-option-list" defaultValue={formOptions[name].value} onChange={inputValueChanged}>
        {list}
      </select>
    );
  }, [formOptions, inputValueChanged]);

  const renderColorChooser = useCallback((name: keyof OptionsMenuState) => {
    return <input type="color" name={name} defaultValue={formOptions[name].value} className="color-options-list" onChange={inputValueChanged} />
  }, [formOptions, inputValueChanged]);

  const renderColorOptions = useCallback((name: keyof OptionsMenuState, options: Record<string, string | number>) => {
    const colorSelectionInputMethodChanged = (e: ChangeEvent<HTMLSelectElement>) => {
      setFormOptions({ ...formOptions, [name]: { chooser: e.target.value, value: ColorOption.None } });
    };

    const renderChooser = () => {
      const value = (formOptions[name] as ColorState).chooser;
      if (value === ColorMethodType.PREDEFINED) {
        return renderSelectOptions(name, options);
      } else if (value === ColorMethodType.CUSTOM) {
        return renderColorChooser(name);
      }
    }
    const { chooser } = (formOptions[name] as ColorState);
    return (
      <div className={"controls flex-row gap-1 " + name}>
        <select name="color-method" value={chooser} onChange={colorSelectionInputMethodChanged}>
          <option key={ColorMethodType.PREDEFINED} value={ColorMethodType.PREDEFINED}>Predefined</option>
          <option key={ColorMethodType.CUSTOM} value={ColorMethodType.CUSTOM}>Custom</option>
        </select>
        {renderChooser()}
      </div>
    );
  }, [formOptions, renderColorChooser, renderSelectOptions]);



  return (
    <div className="options-menu" style={{ maxWidth: '25%' }}>
      <h2 style={{ marginTop: 0 }}>Options Menu</h2>

      <div className="flex-col gap-1">
        <button className="btn btn-block" onClick={copyUrlToClipboard}>{customUrlCopyBtnText}</button>
        <textarea className="copyurl" ref={customUrlTextAreaRef} value={customUrl} readOnly></textarea>
      </div>
      <hr />

      <h3>Wheel</h3>
      <div className="flex-col gap-1">
        <div className="flex-row">
          <div className="setting card">
            <h4 className="card-heading">
              Wheel Asset Url
            </h4>
            <div className="card-body">
              <input className="wheel-url-input" name="wheelImg" value={formOptions.wheelImgUrl.value} onChange={inputValueChanged} type="text" placeholder="Wheel Asset Url" />
            </div>
          </div>
        </div>
        <div className="flex-row">
          <div className="setting card" style={{ width: '50%' }}>
            <h4 className="card-heading">Wheel Color</h4>
            <div className="card-body">
              {renderColorOptions('wheelColor', ColorOption)}
            </div>
          </div>
        </div>
      </div>

      <h3>Analog Stick</h3>
      <div className="flex-col gap-1">
        <div className="flex-row gap-1">
          <div className="setting card">
            <h4 className="card-heading">Analog Stick Fill Color</h4>
            <div className="card-body">
              {renderColorOptions('analogStickFillColor', ColorOption)}
            </div>
          </div>

          <div className="setting card">
            <h4 className="card-heading">Analog Stick Fill Opacity</h4>
            <div className="card-body controls analogStickFillOpacity">
              <input className="opacity" type="number" step={0.1} min={0} max={1} value={formOptions.analogStickFillOpacity.value} name="analogStickFillOpacity" onChange={inputValueChanged} />
            </div>
          </div>
        </div>
        <div className="flex-row gap-1">
          <div className="setting card">
            <h4 className="card-heading">Analog Stick Size</h4>
            <div className="card-body controls analogStickSize">
              {renderSelectOptions('analogStickSize', AnalogStickSize)}
            </div>
          </div>

          <div className="setting card">
            <h4 className="card-heading">Analog Stick Border Color</h4>
            <div className="card-body">
              {renderColorOptions('analogStickBorderColor', ColorOption)}
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}

enum ColorMethodType {
  PREDEFINED = 'predefined',
  CUSTOM = 'custom'
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
  value: string | ColorOption;
}

interface OptionsMenuProps {
  onOptionChange: (prop: string, value: any) => void;
  appOptions: AppOptions;
}