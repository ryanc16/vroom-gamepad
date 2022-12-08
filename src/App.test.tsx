import { render, RenderResult } from '@testing-library/react';
import App from './App';

describe('App', () => {

  let result: RenderResult;

  beforeEach(() => {
    result = render(<App />);
  });

  it('can create', () => {
    expect(result.container).toBeInTheDocument();
  });
});
