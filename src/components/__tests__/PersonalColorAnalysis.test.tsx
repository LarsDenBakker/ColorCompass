import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import PersonalColorAnalysis from '../PersonalColorAnalysis'

// Mock the colorUtils module
vi.mock('../../utils/colorUtils', () => ({
  getSkinToneHex: vi.fn(() => '#F5DEB3'),
  getColorSuggestions: vi.fn(() => ['#E6E6FA', '#B0C4DE', '#F0E68C', '#FFB6C1']),
}))

describe('PersonalColorAnalysis', () => {
  it('renders personal color analysis interface', () => {
    const mockOnColorSelect = vi.fn()
    render(<PersonalColorAnalysis onColorSelect={mockOnColorSelect} />)

    expect(screen.getByText('Personal Color Analysis')).toBeInTheDocument()
    expect(screen.getByText('Skin Tone')).toBeInTheDocument()
    expect(screen.getByText('Hair Color')).toBeInTheDocument()
    expect(screen.getByText('Eye Color')).toBeInTheDocument()
    expect(screen.getByText('Recommended Colors for You')).toBeInTheDocument()
  })

  it('calls onColorSelect when skin tone button is clicked', () => {
    const mockOnColorSelect = vi.fn()
    render(<PersonalColorAnalysis onColorSelect={mockOnColorSelect} />)

    const skinToneButton = screen.getByText('Use my skin tone as background')
    fireEvent.click(skinToneButton)

    expect(mockOnColorSelect).toHaveBeenCalledWith('#F5DEB3')
  })

  it('allows selection of personal characteristics', () => {
    const mockOnColorSelect = vi.fn()
    render(<PersonalColorAnalysis onColorSelect={mockOnColorSelect} />)

    const mediumSkinButton = screen.getByText('medium')
    fireEvent.click(mediumSkinButton)

    const blondeHairButton = screen.getByText('blonde')
    fireEvent.click(blondeHairButton)

    const blueEyeButton = screen.getByText('blue')
    fireEvent.click(blueEyeButton)

    // Verify buttons can be clicked (no errors)
    expect(mediumSkinButton).toBeInTheDocument()
    expect(blondeHairButton).toBeInTheDocument()
    expect(blueEyeButton).toBeInTheDocument()
  })
})
