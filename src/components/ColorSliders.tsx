import { useState, useEffect } from 'react'
import { hexToRgb, rgbToHsl, hslToHex } from '../utils/colorUtils'

interface ColorSlidersProps {
  selectedColor: string
  onColorChange: (color: string) => void
}

const ColorSliders = ({ selectedColor, onColorChange }: ColorSlidersProps) => {
  const [hsl, setHsl] = useState({ h: 0, s: 0, l: 0 })

  // Update HSL values when selectedColor changes
  useEffect(() => {
    const rgb = hexToRgb(selectedColor)
    if (rgb) {
      const newHsl = rgbToHsl(rgb.r, rgb.g, rgb.b)
      setHsl(newHsl)
    }
  }, [selectedColor])

  const handleSliderChange = (property: 'h' | 's' | 'l', value: number) => {
    const newHsl = { ...hsl, [property]: value }
    setHsl(newHsl)

    const newHex = hslToHex(newHsl.h, newHsl.s, newHsl.l)
    onColorChange(newHex)
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Color Sliders</h3>

      {/* Hue Slider */}
      <div className="space-y-2">
        <label
          htmlFor="hue-slider"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Hue: {hsl.h}°
        </label>
        <input
          id="hue-slider"
          type="range"
          min="0"
          max="360"
          value={hsl.h}
          onChange={e => handleSliderChange('h', parseInt(e.target.value))}
          className="w-full h-3 rounded-lg appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, 
              hsl(0, ${hsl.s}%, ${hsl.l}%), 
              hsl(60, ${hsl.s}%, ${hsl.l}%), 
              hsl(120, ${hsl.s}%, ${hsl.l}%), 
              hsl(180, ${hsl.s}%, ${hsl.l}%), 
              hsl(240, ${hsl.s}%, ${hsl.l}%), 
              hsl(300, ${hsl.s}%, ${hsl.l}%), 
              hsl(360, ${hsl.s}%, ${hsl.l}%)
            )`,
          }}
        />
      </div>

      {/* Saturation Slider */}
      <div className="space-y-2">
        <label
          htmlFor="saturation-slider"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Saturation: {hsl.s}%
        </label>
        <input
          id="saturation-slider"
          type="range"
          min="0"
          max="100"
          value={hsl.s}
          onChange={e => handleSliderChange('s', parseInt(e.target.value))}
          className="w-full h-3 rounded-lg appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, 
              hsl(${hsl.h}, 0%, ${hsl.l}%), 
              hsl(${hsl.h}, 100%, ${hsl.l}%)
            )`,
          }}
        />
      </div>

      {/* Lightness Slider */}
      <div className="space-y-2">
        <label
          htmlFor="lightness-slider"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Lightness: {hsl.l}%
        </label>
        <input
          id="lightness-slider"
          type="range"
          min="0"
          max="100"
          value={hsl.l}
          onChange={e => handleSliderChange('l', parseInt(e.target.value))}
          className="w-full h-3 rounded-lg appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, 
              hsl(${hsl.h}, ${hsl.s}%, 0%), 
              hsl(${hsl.h}, ${hsl.s}%, 50%), 
              hsl(${hsl.h}, ${hsl.s}%, 100%)
            )`,
          }}
        />
      </div>
    </div>
  )
}

export default ColorSliders
