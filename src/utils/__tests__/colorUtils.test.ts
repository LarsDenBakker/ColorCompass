import { describe, it, expect } from 'vitest'
import {
  hexToRgb,
  rgbToHsl,
  generateRandomColor,
  hslToRgb,
  hslToHex,
  rgbToHex,
  getComplementaryColor,
  getSkinToneHex,
  getColorSuggestions,
  RAL_COLORS,
} from '../colorUtils'

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

  describe('hslToRgb', () => {
    it('converts HSL to RGB correctly', () => {
      // Red
      expect(hslToRgb(0, 100, 50)).toEqual({ r: 255, g: 0, b: 0 })
      // Green
      expect(hslToRgb(120, 100, 50)).toEqual({ r: 0, g: 255, b: 0 })
      // Blue
      expect(hslToRgb(240, 100, 50)).toEqual({ r: 0, g: 0, b: 255 })
      // White
      expect(hslToRgb(0, 0, 100)).toEqual({ r: 255, g: 255, b: 255 })
      // Black
      expect(hslToRgb(0, 0, 0)).toEqual({ r: 0, g: 0, b: 0 })
    })
  })

  describe('hslToHex', () => {
    it('converts HSL to hex correctly', () => {
      expect(hslToHex(0, 100, 50)).toBe('#ff0000')
      expect(hslToHex(120, 100, 50)).toBe('#00ff00')
      expect(hslToHex(240, 100, 50)).toBe('#0000ff')
    })
  })

  describe('rgbToHex', () => {
    it('converts RGB to hex correctly', () => {
      expect(rgbToHex(255, 0, 0)).toBe('#ff0000')
      expect(rgbToHex(0, 255, 0)).toBe('#00ff00')
      expect(rgbToHex(0, 0, 255)).toBe('#0000ff')
      expect(rgbToHex(59, 130, 246)).toBe('#3b82f6')
    })
  })

  describe('getComplementaryColor', () => {
    it('calculates complementary colors correctly', () => {
      // Red should complement to cyan-ish
      const redComplement = getComplementaryColor('#FF0000')
      expect(redComplement).toMatch(/^#[0-9A-F]{6}$/i)

      // Blue should complement to orange-ish
      const blueComplement = getComplementaryColor('#0000FF')
      expect(blueComplement).toMatch(/^#[0-9A-F]{6}$/i)

      // Test that complement of complement returns close to original
      const originalColor = '#3B82F6'
      const complement = getComplementaryColor(originalColor)
      const doubleComplement = getComplementaryColor(complement)
      expect(doubleComplement).toMatch(/^#[0-9A-F]{6}$/i)
    })

    it('handles invalid hex colors gracefully', () => {
      expect(getComplementaryColor('invalid')).toBe('invalid')
    })
  })

  describe('getSkinToneHex', () => {
    it('returns correct hex colors for skin tones', () => {
      expect(getSkinToneHex('light')).toBe('#F5DEB3')
      expect(getSkinToneHex('medium')).toBe('#DEB887')
      expect(getSkinToneHex('dark')).toBe('#CD853F')
      expect(getSkinToneHex('deep')).toBe('#8B4513')
    })
  })

  describe('getColorSuggestions', () => {
    it('returns color suggestions for personal colors', () => {
      const suggestions = getColorSuggestions({
        skinTone: 'light',
        hairColor: 'blonde',
        eyeColor: 'blue',
      })

      expect(suggestions).toBeInstanceOf(Array)
      expect(suggestions.length).toBeGreaterThan(0)
      expect(suggestions.length).toBeLessThanOrEqual(6)

      // All suggestions should be valid hex colors
      suggestions.forEach(color => {
        expect(color).toMatch(/^#[0-9A-F]{6}$/i)
      })
    })

    it('returns different suggestions for different personal colors', () => {
      const lightSuggestions = getColorSuggestions({
        skinTone: 'light',
        hairColor: 'blonde',
        eyeColor: 'blue',
      })

      const darkSuggestions = getColorSuggestions({
        skinTone: 'dark',
        hairColor: 'black',
        eyeColor: 'brown',
      })

      expect(lightSuggestions).not.toEqual(darkSuggestions)
    })
  })

  describe('RAL_COLORS', () => {
    it('contains valid RAL color data', () => {
      expect(RAL_COLORS).toBeInstanceOf(Array)
      expect(RAL_COLORS.length).toBeGreaterThan(0)

      RAL_COLORS.forEach(color => {
        expect(color).toHaveProperty('number')
        expect(color).toHaveProperty('name')
        expect(color).toHaveProperty('hex')
        expect(color.number).toMatch(/^RAL \d+$/)
        expect(color.name).toBeTruthy()
        expect(color.hex).toMatch(/^#[0-9A-F]{6}$/i)
      })
    })
  })
})
