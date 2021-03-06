import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import FilterMenu from './FilterMenu'

const mockSetFilters = jest.fn()
test('render filter menu', async () => {
  render(<FilterMenu setFilters={mockSetFilters} />)

  const year2020Button = screen.getByRole('button', {
    name: '2020'
  })
  expect(year2020Button).toBeTruthy()
  expect(year2020Button).toHaveClass('bg-green-400')
})

test('selecting filter should call setFilters', async () => {
  render(<FilterMenu setFilters={mockSetFilters} />)

  const year2020Button = screen.getByRole('button', {
    name: '2020'
  })
  expect(year2020Button).toBeTruthy()
  expect(year2020Button).toHaveClass('bg-green-400')
  fireEvent.click(year2020Button)
  expect(mockSetFilters).toBeCalled()
  expect(year2020Button).toHaveClass('bg-green-700')
})
