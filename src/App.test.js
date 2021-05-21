import { render } from '@testing-library/react';
import App from './App';

test('renders the app', () => {
  const app = render(<App />);
  expect(app).toBeTruthy();
});
