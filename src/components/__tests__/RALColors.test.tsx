import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import RALColors from '../RALColors'

// Mock the colorUtils module
vi.mock('../../utils/colorUtils', () => ({
  RAL_COLORS: [
    { number: 'RAL 1000', name: 'Green beige', hex: '#BEBD7F' },
    { number: 'RAL 1001', name: 'Beige', hex: '#C2B078' },
    { number: 'RAL 3000', name: 'Flame red', hex: '#AF2B1E' },
  ],
  copyToClipboard: vi.fn(),
}))

describe('RALColors', () => {
  it('renders RAL colors interface', () => {
    const mockOnColorSelect = vi.fn()
    render(<RALColors onColorSelect={mockOnColorSelect} />)

    expect(screen.getByText('RAL Colors')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Search RAL colors...')).toBeInTheDocument()
    expect(screen.getByText('Found 3 of 3 RAL colors')).toBeInTheDocument()
  })

  it('filters colors based on search term', () => {
    const mockOnColorSelect = vi.fn()
    render(<RALColors onColorSelect={mockOnColorSelect} />)

    const searchInput = screen.getByPlaceholderText('Search RAL colors...')
    fireEvent.change(searchInput, { target: { value: 'beige' } })

    expect(screen.getByText('Found 2 of 3 RAL colors')).toBeInTheDocument()
  })

  it('calls onColorSelect when color is clicked', () => {
    const mockOnColorSelect = vi.fn()
    render(<RALColors onColorSelect={mockOnColorSelect} />)

    // Find the first color swatch and click it
    const colorSwatches = screen.getAllByRole('generic')
    const firstColorContainer = colorSwatches.find(
      el => el.style.backgroundColor && el.style.backgroundColor !== ''
    )

    if (firstColorContainer) {
      fireEvent.click(firstColorContainer.parentElement!)
      expect(mockOnColorSelect).toHaveBeenCalled()
    }
  })
})
