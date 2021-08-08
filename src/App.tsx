import { Component } from 'react';
import './App.css';
import DrivingHud from './components/driving-hud/driving-hud';
import { AppOptions, ColorOption, getOptionsFromUrl } from './services/url-options.service';

export default class App extends Component {

  appOptions!: AppOptions;

  constructor(props: any) {
    super(props);
    this.appOptions = getOptionsFromUrl();
    this.setAppOptions();
  }

  setAppOptions() {
    console.log('appOptions', this.appOptions);

    const root: HTMLElement = document.querySelector(':root')!;
    setProperty(root, '--wheelColor', this.appOptions.wheelColor || ColorOption.Yellow);
    setProperty(root, '--analogStickFillColor', this.appOptions.analogStickFillColor || ColorOption.Black);
    setProperty(root, '--analogStickFillOpacity', (this.appOptions.analogStickFillOpacity || 1).toString());
    setProperty(root, '--analogStickBorderColor', this.appOptions.analogStickBorderColor || ColorOption.Yellow);
  }

  render() {
    return (
      <DrivingHud />
    );
  }
}

function setProperty(root: HTMLElement, name: string, value: string) {
  root.style.setProperty(name, value);
}
