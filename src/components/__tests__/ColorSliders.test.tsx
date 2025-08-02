import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import ColorSliders from '../ColorSliders'

// Mock the colorUtils module
vi.mock('../../utils/colorUtils', () => ({
  hexToRgb: vi.fn((hex: string) => {
    if (hex === '#3B82F6') return { r: 59, g: 130, b: 246 }
    return { r: 255, g: 0, b: 0 }
  }),
  rgbToHsl: vi.fn(() => ({ h: 213, s: 88, l: 60 })),
  hslToHex: vi.fn(() => '#3B82F6'),
}))

describe('ColorSliders', () => {
  it('renders color sliders with initial values', () => {
    const mockOnColorChange = vi.fn()
    render(<ColorSliders selectedColor="#3B82F6" onColorChange={mockOnColorChange} />)

    expect(screen.getByText('Color Sliders')).toBeInTheDocument()
    expect(screen.getByText(/Hue:/)).toBeInTheDocument()
    expect(screen.getByText(/Saturation:/)).toBeInTheDocument()
    expect(screen.getByText(/Lightness:/)).toBeInTheDocument()
  })

  it('calls onColorChange when slider values change', () => {
    const mockOnColorChange = vi.fn()
    render(<ColorSliders selectedColor="#3B82F6" onColorChange={mockOnColorChange} />)

    const hueSlider = screen.getByLabelText(/Hue:/)
    fireEvent.change(hueSlider, { target: { value: '180' } })

    expect(mockOnColorChange).toHaveBeenCalled()
  })
})
