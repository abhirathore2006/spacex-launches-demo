import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import FilterGroup from './FilterGroup'

const mockData = {
  data: ['True', 'False'],
  selected: 'True',
  filterGroupType: 'TwoKeys',
  filterDispatch: jest.fn()
}
test('render filter items', async () => {
  render(<FilterGroup {...mockData} />)

  const trueButton = screen.getByRole('button', {
    name: 'True'
  })
  expect(trueButton).toBeTruthy()
  expect(trueButton).toHaveClass('bg-green-700')

  const falseButton = screen.getByRole('button', {
    name: 'False'
  })
  expect(falseButton).toBeTruthy()
  expect(falseButton).toHaveClass('bg-green-400')
  // fireEvent.click(screen.getByText('Load Greeting'))

  // await waitFor(() => screen.getByRole('alert'))

  // expect(screen.getByRole('alert')).toHaveTextContent('Oops, failed to fetch!')
  // expect(screen.getByRole('button')).not.toHaveAttribute('disabled')
})

test('selecting filter should dispatch', async () => {
  render(<FilterGroup {...mockData} />)

  const trueButton = screen.getByRole('button', {
    name: 'True'
  })
  expect(trueButton).toBeTruthy()
  expect(trueButton).toHaveClass('bg-green-700')

  fireEvent.click(trueButton)
  expect(mockData.filterDispatch).toBeCalledWith({
    payload: {
      data: 'True',
      filter: 'TwoKeys'
    },
    type: 'off'
  })
})
