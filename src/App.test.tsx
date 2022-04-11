import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';

jest.mock('./services/queryQq');

test('App rendered, should everything in the page', () => {
  const { container } = render(<App />);
  const headText = screen.getByText(/QQ号查询/i);
  const label = container.querySelector('span');
  const input = container.querySelector('input');
  expect(input?.value).toBe("");
  expect(input).toBeInTheDocument();
  expect(headText).toBeInTheDocument();
  expect(label).toBeInTheDocument();
});

test('input qq number, then display info', async () => {

  render(<App />);

  expect(screen.queryByTestId('result')).toBeNull();

  userEvent.type(screen.getByTestId('input'), '287495228');

  expect(await screen.findByTestId('result')).toBeInTheDocument();

});
