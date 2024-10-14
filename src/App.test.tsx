import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App><div data-testid="test-element-1">test-element-1</div></App>);
  const child = screen.getByTestId('test-element-1')
  expect(child).toBeDefined();
});
