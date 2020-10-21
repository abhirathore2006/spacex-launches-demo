import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import ProgramView from './ProgramView';
import mockLaunches from './__mocks__/launches.json'

test('Should render launches', async () => {
  render(<ProgramView launches={mockLaunches} />);

  let programs = screen.getAllByRole('article');
  expect(programs).toHaveLength(6);

  let programImg = screen.getByRole('img', {
    name : 'FalconSat patch'
  });

  expect(programImg).toBeTruthy()
});

