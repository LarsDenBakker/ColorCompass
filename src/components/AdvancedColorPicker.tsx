import { useState, useEffect, useRef, useCallback } from 'react'
import { hexToRgb, rgbToHsl, hslToHex } from '../utils/colorUtils'

interface AdvancedColorPickerProps {
  selectedColor: string
  onColorChange: (color: string) => void
  isDarkMode: boolean
}

const AdvancedColorPicker = ({
  selectedColor,
  onColorChange,
  isDarkMode,
}: AdvancedColorPickerProps) => {
  const [rgb, setRgb] = useState({ r: 0, g: 0, b: 0 })
  const [hsl, setHsl] = useState({ h: 0, s: 0, l: 0 })
  const [savedColors, setSavedColors] = useState<string[]>([])
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDragging, setIsDragging] = useState(false)

  // Update RGB and HSL when selectedColor changes
  useEffect(() => {
    const rgbColor = hexToRgb(selectedColor)
    if (rgbColor) {
      setRgb(rgbColor)
      const hslColor = rgbToHsl(rgbColor.r, rgbColor.g, rgbColor.b)
      setHsl(hslColor)
    }
  }, [selectedColor])

  const drawColorPicker = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height

    // Create saturation-lightness gradient
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        const saturation = (x / width) * 100
        const lightness = ((height - y) / height) * 100
        const color = `hsl(${hsl.h}, ${saturation}%, ${lightness}%)`
        ctx.fillStyle = color
        ctx.fillRect(x, y, 1, 1)
      }
    }
  }, [hsl.h])

  // Initialize color picker canvas
  useEffect(() => {
    // Only draw canvas in browser environment (not in tests)
    if (typeof window !== 'undefined' && canvasRef.current) {
      drawColorPicker()
    }
  }, [drawColorPicker])

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const saturation = Math.round((x / canvas.width) * 100)
    const lightness = Math.round(((canvas.height - y) / canvas.height) * 100)

    const newHsl = { ...hsl, s: saturation, l: lightness }
    setHsl(newHsl)

    const newHex = hslToHex(newHsl.h, newHsl.s, newHsl.l)
    updateColor(newHex)
  }

  const handleMouseDown = () => setIsDragging(true)
  const handleMouseUp = () => setIsDragging(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isDragging) {
      handleCanvasClick(e)
    }
  }

  const updateColor = (newColor: string) => {
    onColorChange(newColor)
  }

  const saveColor = () => {
    setSavedColors(prev => {
      const updated = [selectedColor, ...prev.filter(c => c !== selectedColor)]
      return updated.slice(0, 12) // Keep only 12 saved colors
    })
  }

  const handleHueChange = (h: number) => {
    const newHsl = { ...hsl, h }
    setHsl(newHsl)
    const newHex = hslToHex(newHsl.h, newHsl.s, newHsl.l)
    updateColor(newHex)
  }

  return (
    <div className="space-y-6">
      {/* Main Color Picker Area */}
      <div
        className={`rounded-lg p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white border border-gray-200'}`}
      >
        {/* Color Picker with Hue Slider */}
        <div className="flex gap-4 mb-6">
          {/* Saturation/Lightness Picker */}
          <div className="flex-1 relative">
            <canvas
              ref={canvasRef}
              width={300}
              height={200}
              className="w-full h-48 rounded border-2 border-gray-300 cursor-crosshair block"
              onClick={handleCanvasClick}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
            />
            {/* Selected color indicator */}
            <div
              className="absolute w-5 h-5 border-3 border-white rounded-full shadow-xl pointer-events-none transform -translate-x-1/2 -translate-y-1/2 bg-transparent"
              style={{
                left: `${(hsl.s / 100) * 100}%`,
                top: `${(1 - hsl.l / 100) * 100}%`,
                zIndex: 10,
                borderWidth: '3px',
                boxShadow: '0 0 0 1px rgba(0,0,0,0.5), 0 4px 8px rgba(0,0,0,0.3)',
              }}
            />
          </div>

          {/* Vertical Hue Slider */}
          <div className="w-8 flex flex-col justify-center">
            <input
              type="range"
              min="0"
              max="360"
              value={hsl.h}
              onChange={e => handleHueChange(parseInt(e.target.value))}
              className="vertical-slider"
              style={{
                background: `linear-gradient(to bottom, 
                  hsl(0, 100%, 50%), hsl(60, 100%, 50%), hsl(120, 100%, 50%), 
                  hsl(180, 100%, 50%), hsl(240, 100%, 50%), hsl(300, 100%, 50%), hsl(360, 100%, 50%)
                )`,
              }}
            />
          </div>
        </div>

        {/* Horizontal Color Preview Bar */}
        <div className="mb-6">
          <div
            className={`w-full h-12 rounded border-2 ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`}
            style={{ backgroundColor: selectedColor }}
          />
        </div>

        {/* Color Values */}
        <div className="space-y-3">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm font-mono">
            <div>
              <div className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                HEX
              </div>
              <div className={isDarkMode ? 'text-white' : 'text-gray-900'}>
                {selectedColor.toUpperCase()}
              </div>
            </div>
            {rgb && (
              <div>
                <div className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  RGB
                </div>
                <div className={isDarkMode ? 'text-white' : 'text-gray-900'}>
                  {rgb.r}, {rgb.g}, {rgb.b}
                </div>
              </div>
            )}
            {hsl && (
              <>
                <div>
                  <div className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    HSB
                  </div>
                  <div className={isDarkMode ? 'text-white' : 'text-gray-900'}>
                    {hsl.h}°, {hsl.s}%, {hsl.l}%
                  </div>
                </div>
                <div>
                  <div className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    HSL
                  </div>
                  <div className={isDarkMode ? 'text-white' : 'text-gray-900'}>
                    {hsl.h}°, {hsl.s}%, {hsl.l}%
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Save Your Color Section */}
      <div
        className={`rounded-lg p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white border border-gray-200'}`}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className={`text-lg font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Save your color
          </h3>
          <button
            onClick={saveColor}
            className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
              isDarkMode
                ? 'bg-gray-700 text-white hover:bg-gray-600'
                : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
            }`}
          >
            Save
          </button>
        </div>

        {/* Saved Colors Grid */}
        <div className="grid grid-cols-6 gap-2">
          {Array.from({ length: 12 }, (_, index) => {
            const savedColor = savedColors[index]
            return (
              <button
                key={index}
                onClick={() => savedColor && updateColor(savedColor)}
                className={`aspect-square rounded border-2 transition-all ${
                  savedColor
                    ? 'border-gray-300 hover:border-gray-400 hover:scale-105'
                    : isDarkMode
                      ? 'border-gray-600 bg-gray-700'
                      : 'border-gray-200 bg-gray-100'
                }`}
                style={savedColor ? { backgroundColor: savedColor } : {}}
                title={savedColor || 'Empty slot'}
              >
                {selectedColor === savedColor && (
                  <div className="w-full h-full border-2 border-white rounded" />
                )}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default AdvancedColorPicker
