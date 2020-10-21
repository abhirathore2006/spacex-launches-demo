import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import Page from '../pages/index';
import mockLaunches from '../components/__mocks__/launches.json'
import {act} from 'react-dom/test-utils';


test('Should render launches', async () => {
  render(<Page launches={mockLaunches} />);

  let programs = screen.getAllByRole('article');
  expect(programs).toHaveLength(6);

  let programImg = screen.getByRole('img', {
    name : 'FalconSat patch'
  });

  expect(programImg).toBeTruthy()
});

test('Should call api on filter change', async ()=>{
  const mockJsonPromise = Promise.resolve(mockLaunches.slice(3));
  const mockFetchPromise = Promise.resolve({ // 3
    json: () => mockJsonPromise,
  });
  window.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

  render(<Page launches={mockLaunches} />);

  let programs = screen.getAllByRole('article');
  expect(programs).toHaveLength(6);
  let year2020Button = screen.getByRole('button', {
    name: '2020'
  });
  expect(year2020Button).toBeTruthy();
  expect(year2020Button).toHaveClass('bg-green-400');
  await act(async ()=>{

    fireEvent.click(year2020Button)

  })
  expect(window.fetch).toBeCalled()
  expect(year2020Button).toHaveClass('bg-green-700');

  programs = screen.getAllByRole('article');
  expect(programs).toHaveLength(3);
})
