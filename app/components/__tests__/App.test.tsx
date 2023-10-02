import { render } from '@testing-library/react';
import App from '../App/App';

describe('App', () => {
  it ('should render', () => {
    render(<App/>);
  });
});