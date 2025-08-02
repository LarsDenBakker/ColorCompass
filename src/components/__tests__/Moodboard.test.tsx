import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import Moodboard from '../Moodboard'

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})

// Mock the colorUtils module
vi.mock('../../utils/colorUtils', () => ({
  copyToClipboard: vi.fn(),
}))

describe('Moodboard', () => {
  beforeEach(() => {
    localStorageMock.getItem.mockClear()
    localStorageMock.setItem.mockClear()
  })

  it('renders empty moodboard initially', () => {
    localStorageMock.getItem.mockReturnValue(null)
    const mockOnColorSelect = vi.fn()

    render(<Moodboard currentColor="#3B82F6" onColorSelect={mockOnColorSelect} />)

    expect(screen.getByText('My Moodboard')).toBeInTheDocument()
    expect(screen.getByText('Your moodboard is empty')).toBeInTheDocument()
    expect(screen.getByText('+ Add Current')).toBeInTheDocument()
  })

  it('shows saved colors when available', () => {
    localStorageMock.getItem.mockReturnValue(JSON.stringify(['#FF0000', '#00FF00']))
    const mockOnColorSelect = vi.fn()

    render(<Moodboard currentColor="#3B82F6" onColorSelect={mockOnColorSelect} />)

    expect(screen.getByText('Saved Colors (2)')).toBeInTheDocument()
    expect(screen.getByText('📋 Export')).toBeInTheDocument()
    expect(screen.getByText('🗑️ Clear')).toBeInTheDocument()
  })

  it('adds current color to moodboard', () => {
    localStorageMock.getItem.mockReturnValue(JSON.stringify([]))
    const mockOnColorSelect = vi.fn()

    render(<Moodboard currentColor="#3B82F6" onColorSelect={mockOnColorSelect} />)

    const addButton = screen.getByText('+ Add Current')
    fireEvent.click(addButton)

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'colorCompass-moodboard',
      JSON.stringify(['#3B82F6'])
    )
  })

  it('shows "Added" when current color is already saved', () => {
    localStorageMock.getItem.mockReturnValue(JSON.stringify(['#3B82F6']))
    const mockOnColorSelect = vi.fn()

    render(<Moodboard currentColor="#3B82F6" onColorSelect={mockOnColorSelect} />)

    expect(screen.getByText('✓ Added')).toBeInTheDocument()
  })
})
