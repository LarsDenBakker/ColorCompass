import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import ColorGenerator from '../ColorGenerator'

// Mock the colorUtils module
vi.mock('../../utils/colorUtils', () => ({
  generateRandomColor: vi.fn(() => '#AABBCC'),
  hexToRgb: vi.fn((hex: string) => {
    if (hex === '#3B82F6') return { r: 59, g: 130, b: 246 }
    if (hex === '#FF0000') return { r: 255, g: 0, b: 0 }
    return { r: 170, g: 187, b: 204 }
  }),
  rgbToHsl: vi.fn(() => ({ h: 213, s: 88, l: 60 })),
  hslToHex: vi.fn(() => '#3B82F6'),
}))

describe('ColorGenerator', () => {
  it('renders color generator with initial color', () => {
    const mockOnColorChange = vi.fn()
    render(<ColorGenerator selectedColor="#3B82F6" onColorChange={mockOnColorChange} />)

    expect(screen.getByText('🎨 Color Studio')).toBeInTheDocument()
    expect(screen.getByDisplayValue('#3B82F6')).toBeInTheDocument()
    expect(screen.getByText('Current Color')).toBeInTheDocument()
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

    const randomButton = screen.getByText('Generate Random Color')
    fireEvent.click(randomButton)

    expect(mockOnColorChange).toHaveBeenCalledWith('#AABBCC')
  })
})
