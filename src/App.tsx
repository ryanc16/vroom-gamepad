import { Component, Fragment } from 'react';
import './App.css';
import DrivingHud from './components/driving-hud/driving-hud';
import OptionsMenu from './components/options-menu/options-menu';
import { AppOptions, ColorOption, getOptionsFromUrl } from './services/url-options.service';

export default class App extends Component<any, AppState> {

  appOptions!: AppOptions;

  state = {
    showOptionsMenu: false,
  }

  constructor(props: any) {
    super(props);
    this.appOptions = getOptionsFromUrl();
    this.setAppOptions();
  }

  componentWillMount() {
    document.addEventListener("keyup", this.onKeyUp.bind(this));
  }

  onKeyUp(e: KeyboardEvent) {
    console.log('e', e);
    if(e.key === 'Escape') {
      console.log('Escape');
      this.setState((previousState, props) => {
        return {
          showOptionsMenu: !previousState.showOptionsMenu,
        };
      });
    }
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
      <Fragment >
        <div className="app flex-row"> 
          <DrivingHud />
          { this.state.showOptionsMenu && 
            <OptionsMenu />
          }
        </div>
      </Fragment>
    );
  }
}

interface AppState {
  showOptionsMenu: boolean;
}

function setProperty(root: HTMLElement, name: string, value: string) {
  root.style.setProperty(name, value);
}
