import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  const renderResult: RenderResult = render(<App />);
  expect(renderResult).not.toBe(undefined);
});
