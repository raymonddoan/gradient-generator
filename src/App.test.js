import { render } from '@testing-library/react';
import App, { getBackgroundCSS } from './App';

test('renders the app', () => {
  const app = render(<App />);
  expect(app).toBeTruthy();
});

describe("getBackgroundColor", () => {
  test('should handle single color', () => {
    const colors = ["#fff"]
    const output = "background: linear-gradient(45deg,#fff);"
    expect(getBackgroundCSS(colors)).toBe(output)
  })

  test('should handle two colors', () => {
    const colors = ["#fff", "#000"]
    const output = "background: linear-gradient(45deg,#fff,#000);"
    expect(getBackgroundCSS(colors)).toBe(output)
  })

  test('should handle multiple color', () => {
    const colors = ["#fff", "#000", "#aaa"]
    const output = "background: linear-gradient(45deg,#fff,#000,#aaa);"
    expect(getBackgroundCSS(colors)).toBe(output)
  })

})