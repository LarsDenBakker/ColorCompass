import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import ColorGenerator from '../ColorGenerator'

// Mock the colorUtils module
vi.mock('../../utils/colorUtils', () => ({
  generateRandomColor: vi.fn(() => '#AABBCC'),
}))

describe('ColorGenerator', () => {
  it('renders color generator with initial color', () => {
    const mockOnColorChange = vi.fn()
    render(<ColorGenerator selectedColor="#3B82F6" onColorChange={mockOnColorChange} />)

    expect(screen.getByText('Color Generator')).toBeInTheDocument()
    expect(screen.getByDisplayValue('#3B82F6')).toBeInTheDocument()
  })

  it('calls onColorChange when color input changes', () => {
    const mockOnColorChange = vi.fn()
    render(<ColorGenerator selectedColor="#3B82F6" onColorChange={mockOnColorChange} />)

    const textInput = screen.getByDisplayValue('#3B82F6')
    fireEvent.change(textInput, { target: { value: '#FF0000' } })

    expect(mockOnColorChange).toHaveBeenCalledWith('#FF0000')
  })

  it('generates random color when button is clicked', () => {
    const mockOnColorChange = vi.fn()
    render(<ColorGenerator selectedColor="#3B82F6" onColorChange={mockOnColorChange} />)

    const randomButton = screen.getByText('🎲 Generate Random Color')
    fireEvent.click(randomButton)

    expect(mockOnColorChange).toHaveBeenCalledWith('#AABBCC')
  })
})
