import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import ColorCard from '../ColorCard'

describe('ColorCard', () => {
  it('displays the color and its details', () => {
    render(<ColorCard color="#3B82F6" />)

    expect(screen.getByText('Color Details')).toBeInTheDocument()
    expect(screen.getByText('#3B82F6')).toBeInTheDocument()
    expect(screen.getByText(/rgb\(59, 130, 246\)/)).toBeInTheDocument()
    expect(screen.getByText(/hsl\(\d+, \d+%, \d+%\)/)).toBeInTheDocument()
  })

  it('displays correct RGB values for red color', () => {
    render(<ColorCard color="#FF0000" />)

    expect(screen.getByText('#FF0000')).toBeInTheDocument()
    expect(screen.getByText('rgb(255, 0, 0)')).toBeInTheDocument()
  })

  it('displays correct RGB values for green color', () => {
    render(<ColorCard color="#00FF00" />)

    expect(screen.getByText('#00FF00')).toBeInTheDocument()
    expect(screen.getByText('rgb(0, 255, 0)')).toBeInTheDocument()
  })

  it('displays correct RGB values for blue color', () => {
    render(<ColorCard color="#0000FF" />)

    expect(screen.getByText('#0000FF')).toBeInTheDocument()
    expect(screen.getByText('rgb(0, 0, 255)')).toBeInTheDocument()
  })

  it('calls onColorChange when complementary color is clicked', async () => {
    const mockOnColorChange = vi.fn()
    const user = userEvent.setup()

    render(<ColorCard color="#3B82F6" onColorChange={mockOnColorChange} />)

    // Find and click the complementary color area (the large color block)
    const complementaryArea = screen.getByText('Complementary').closest('div')
    expect(complementaryArea).toBeInTheDocument()

    await user.click(complementaryArea!)

    // The complementary color for #3B82F6 (blue) should be #F6AF3C (orange)
    expect(mockOnColorChange).toHaveBeenCalledWith('#f6af3c')
  })

  it('does not call onColorChange when complementary color is clicked and no callback provided', async () => {
    const user = userEvent.setup()

    render(<ColorCard color="#3B82F6" />)

    // Find and click the complementary color area
    const complementaryArea = screen.getByText('Complementary').closest('div')
    expect(complementaryArea).toBeInTheDocument()

    // Should not throw or cause any issues
    await user.click(complementaryArea!)
  })
})
