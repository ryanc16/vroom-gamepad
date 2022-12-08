import React, { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import './App.scss';
import DrivingHud from './components/driving-hud/driving-hud';
import OptionsMenu from './components/options-menu/options-menu';
import { AnalogStickSize, AppOptions, ColorOption, getOptionsFromUrl } from './services/url-options.service';

const defaultOptions: AppOptions = {
  wheelImgUrl: '',
  wheelColor: ColorOption.None,
  analogStickBorderColor: ColorOption.Black,
  analogStickFillColor: ColorOption.Gray,
  analogStickFillOpacity: 0.4,
  analogStickSize: AnalogStickSize.Small
}

export default function App(): React.ReactElement {

  const [showOptionsMenu, setShowOptionsMenu] = useState<boolean>(false);
  const [appOptions, setAppOptions] = useState<AppOptions>(defaultOptions);

  const onKeyUp = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setShowOptionsMenu(!showOptionsMenu);
    }
  }, [showOptionsMenu]);

  const wheelColor = useMemo<ColorOption>(() => {
    if (appOptions.wheelColor === ColorOption.Yellow) {
      return ColorOption.Yellow;
    } else {
      return ColorOption.Blue;
    }
  }, [appOptions.wheelColor]);

  const setProperty = useCallback((root: HTMLElement, name: string, value: string) => {
    root.style.setProperty(name, value);
  }, []);

  const applyAppOptions = useCallback(() => {
    const root: HTMLElement = document.querySelector(':root')!;
    setProperty(root, '--analogStickBorderColor', appOptions.analogStickBorderColor);
    setProperty(root, '--analogStickFillColor', appOptions.analogStickFillColor);
    setProperty(root, '--analogStickFillOpacity', appOptions.analogStickFillOpacity.toString());
  }, [appOptions, setProperty]);

  const updateAppOption = useCallback((key: string, value: any): void => {
    const p: keyof AppOptions = key as keyof AppOptions;
    setAppOptions(o => ({
      ...o,
      [p]: value as never
    }));
  }, []);

  useEffect(() => {
    document.addEventListener('keyup', onKeyUp);
    return () => {
      document.removeEventListener('keyup', onKeyUp);
    }
  }, [onKeyUp]);

  useEffect(() => {
    const optionsFromUrl = getOptionsFromUrl();
    setAppOptions(o => ({ ...o, ...optionsFromUrl }));
  }, []);

  useEffect(() => {
    applyAppOptions();
  }, [appOptions, applyAppOptions]);

  return (
    <Fragment>
      <div className="app flex-row">
        <DrivingHud analogStickSize={appOptions.analogStickSize} wheelColor={wheelColor} />
        {showOptionsMenu &&
          <OptionsMenu appOptions={appOptions} onOptionChange={updateAppOption} />
        }
      </div>
    </Fragment>
  );
}
