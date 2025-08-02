import { describe, it, expect } from 'vitest'
import { hexToRgb, rgbToHsl, generateRandomColor } from '../colorUtils'

describe('colorUtils', () => {
  describe('hexToRgb', () => {
    it('converts hex to RGB correctly', () => {
      expect(hexToRgb('#FF0000')).toEqual({ r: 255, g: 0, b: 0 })
      expect(hexToRgb('#00FF00')).toEqual({ r: 0, g: 255, b: 0 })
      expect(hexToRgb('#0000FF')).toEqual({ r: 0, g: 0, b: 255 })
      expect(hexToRgb('#3B82F6')).toEqual({ r: 59, g: 130, b: 246 })
    })

    it('handles hex without # prefix', () => {
      expect(hexToRgb('FF0000')).toEqual({ r: 255, g: 0, b: 0 })
    })

    it('returns null for invalid hex', () => {
      expect(hexToRgb('invalid')).toBeNull()
      expect(hexToRgb('#ZZZ')).toBeNull()
    })
  })

  describe('rgbToHsl', () => {
    it('converts RGB to HSL correctly', () => {
      // Red
      const red = rgbToHsl(255, 0, 0)
      expect(red.h).toBe(0)
      expect(red.s).toBe(100)
      expect(red.l).toBe(50)

      // White
      const white = rgbToHsl(255, 255, 255)
      expect(white.h).toBe(0)
      expect(white.s).toBe(0)
      expect(white.l).toBe(100)

      // Black
      const black = rgbToHsl(0, 0, 0)
      expect(black.h).toBe(0)
      expect(black.s).toBe(0)
      expect(black.l).toBe(0)
    })
  })

  describe('generateRandomColor', () => {
    it('generates valid hex colors', () => {
      for (let i = 0; i < 10; i++) {
        const color = generateRandomColor()
        expect(color).toMatch(/^#[0-9A-F]{6}$/i)
      }
    })

    it('generates different colors', () => {
      const colors = Array.from({ length: 10 }, () => generateRandomColor())
      const uniqueColors = new Set(colors)
      // It's very unlikely that all 10 random colors would be the same
      expect(uniqueColors.size).toBeGreaterThan(1)
    })
  })
})
