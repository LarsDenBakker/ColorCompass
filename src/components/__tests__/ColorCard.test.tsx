import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
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
})
