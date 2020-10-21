import React from 'react'
import { render, screen } from '@testing-library/react'
import ProgramView from './ProgramView'
import mockLaunches from './__mocks__/launches.json'

test('Should render launches', async () => {
  render(<ProgramView launches={mockLaunches} />)

  const programs = screen.getAllByRole('article')
  expect(programs).toHaveLength(6)

  const programImg = screen.getByRole('img', {
    name: 'FalconSat patch'
  })

  expect(programImg).toBeTruthy()
})
