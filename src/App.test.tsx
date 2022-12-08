import { render, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { ColorOption } from './services/url-options.service';

describe('App', () => {

  let result: RenderResult;

  const helpers = {
    getRoot(): HTMLElement | null {
      return document.querySelector(':root');
    }
  }

  beforeEach(() => {
    result = render(<App />);
  });

  it('can create', () => {
    expect(result.container.querySelector('.app')).toBeInTheDocument();
  });

  it('can show the options menu', () => {
    expect(result.container.querySelector('.options-menu')).toBeNull();
    userEvent.type(result.container, '{esc}');
    expect(result.container.querySelector('.options-menu')).toBeInTheDocument();
  });

  it('can set default style options', () => {
    expect(helpers.getRoot()!.style.getPropertyValue('--wheelColor')).toEqual(ColorOption.None);
    expect(helpers.getRoot()!.style.getPropertyValue('--analogStickBorderColor')).toEqual(ColorOption.Black);
    expect(helpers.getRoot()!.style.getPropertyValue('--analogStickFillColor')).toEqual(ColorOption.Gray);
    expect(helpers.getRoot()!.style.getPropertyValue('--analogStickFillOpacity')).toEqual('0.4');
  });
});
