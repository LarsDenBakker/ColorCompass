import { useState, useEffect, useRef, useCallback } from 'react'
import { hexToRgb, rgbToHsl, hslToHex, rgbToHex } from '../utils/colorUtils'

interface AdvancedColorPickerProps {
  selectedColor: string
  onColorChange: (color: string) => void
}

// Popular color swatches for quick selection
const POPULAR_COLORS = [
  '#FF6B6B',
  '#4ECDC4',
  '#45B7D1',
  '#96CEB4',
  '#FECA57',
  '#FF9FF3',
  '#54A0FF',
  '#5F27CD',
  '#00D2D3',
  '#FF9F43',
  '#3742FA',
  '#2F3542',
  '#FF3838',
  '#FF6348',
  '#FF4757',
  '#7BED9F',
  '#70A1FF',
  '#5352ED',
  '#FF6B9D',
  '#C44569',
]

const AdvancedColorPicker = ({ selectedColor, onColorChange }: AdvancedColorPickerProps) => {
  const [activeTab, setActiveTab] = useState<'picker' | 'sliders' | 'swatches'>('picker')
  const [rgb, setRgb] = useState({ r: 0, g: 0, b: 0 })
  const [hsl, setHsl] = useState({ h: 0, s: 0, l: 0 })
  const [recentColors, setRecentColors] = useState<string[]>([])
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

    // Add to recent colors
    setRecentColors(prev => {
      const updated = [newColor, ...prev.filter(c => c !== newColor)]
      return updated.slice(0, 12) // Keep only 12 recent colors
    })
  }

  const handleHueChange = (h: number) => {
    const newHsl = { ...hsl, h }
    setHsl(newHsl)
    const newHex = hslToHex(newHsl.h, newHsl.s, newHsl.l)
    updateColor(newHex)
  }

  const handleRgbChange = (component: 'r' | 'g' | 'b', value: number) => {
    const newRgb = { ...rgb, [component]: value }
    setRgb(newRgb)
    const newHex = rgbToHex(newRgb.r, newRgb.g, newRgb.b)
    const newHsl = rgbToHsl(newRgb.r, newRgb.g, newRgb.b)
    setHsl(newHsl)
    updateColor(newHex)
  }

  const handleSliderChange = (property: 'h' | 's' | 'l', value: number) => {
    const newHsl = { ...hsl, [property]: value }
    setHsl(newHsl)
    const newHex = hslToHex(newHsl.h, newHsl.s, newHsl.l)
    updateColor(newHex)
  }

  const tabs = [
    { id: 'picker' as const, label: 'Color Wheel', icon: '🎯' },
    { id: 'sliders' as const, label: 'Sliders', icon: '🎛️' },
    { id: 'swatches' as const, label: 'Swatches', icon: '🎨' },
  ]

  return (
    <div className="bg-gradient-to-br from-white via-gray-50 to-blue-50 dark:from-gray-800 dark:via-gray-900 dark:to-blue-900 rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
      {/* Header with tabs */}
      <div className="bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 p-1">
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-1">
          <div className="flex gap-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg scale-105'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden text-lg">{tab.icon}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Current Color Preview */}
        <div className="mb-6">
          <div className="flex items-center gap-4">
            <div
              className="w-16 h-16 rounded-2xl shadow-xl border-4 border-white dark:border-gray-600 ring-2 ring-gray-200 dark:ring-gray-700"
              style={{ backgroundColor: selectedColor }}
            />
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                Current Color
              </div>
              <div className="font-mono text-lg font-bold text-gray-900 dark:text-white">
                {selectedColor.toUpperCase()}
              </div>
            </div>
          </div>
        </div>

        {/* Color Picker Content */}
        {activeTab === 'picker' && (
          <div className="space-y-6">
            {/* Hue Slider */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Hue: {hsl.h}°
              </label>
              <div className="relative">
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={hsl.h}
                  onChange={e => handleHueChange(parseInt(e.target.value))}
                  className="w-full h-8 rounded-full appearance-none cursor-pointer bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-cyan-500 via-blue-500 via-purple-500 to-red-500 shadow-lg"
                  style={{
                    background: `linear-gradient(to right, 
                      hsl(0, 100%, 50%), hsl(60, 100%, 50%), hsl(120, 100%, 50%), 
                      hsl(180, 100%, 50%), hsl(240, 100%, 50%), hsl(300, 100%, 50%), hsl(360, 100%, 50%)
                    )`,
                  }}
                />
              </div>
            </div>

            {/* Saturation/Lightness Picker */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Saturation & Lightness
              </label>
              <div className="relative">
                <canvas
                  ref={canvasRef}
                  width={300}
                  height={200}
                  className="w-full h-48 rounded-2xl shadow-lg cursor-crosshair border-2 border-gray-200 dark:border-gray-600"
                  onClick={handleCanvasClick}
                  onMouseDown={handleMouseDown}
                  onMouseUp={handleMouseUp}
                  onMouseMove={handleMouseMove}
                />
                {/* Crosshair indicator */}
                <div
                  className="absolute w-4 h-4 border-2 border-white rounded-full shadow-lg pointer-events-none transform -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: `${(hsl.s / 100) * 100}%`,
                    top: `${(1 - hsl.l / 100) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'sliders' && (
          <div className="space-y-6">
            {/* RGB Sliders */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">RGB Values</h3>

              {/* Red Slider */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Red: {rgb.r}
                </label>
                <input
                  type="range"
                  min="0"
                  max="255"
                  value={rgb.r}
                  onChange={e => handleRgbChange('r', parseInt(e.target.value))}
                  className="w-full h-6 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, 
                      rgb(0, ${rgb.g}, ${rgb.b}), 
                      rgb(255, ${rgb.g}, ${rgb.b})
                    )`,
                  }}
                />
              </div>

              {/* Green Slider */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Green: {rgb.g}
                </label>
                <input
                  type="range"
                  min="0"
                  max="255"
                  value={rgb.g}
                  onChange={e => handleRgbChange('g', parseInt(e.target.value))}
                  className="w-full h-6 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, 
                      rgb(${rgb.r}, 0, ${rgb.b}), 
                      rgb(${rgb.r}, 255, ${rgb.b})
                    )`,
                  }}
                />
              </div>

              {/* Blue Slider */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Blue: {rgb.b}
                </label>
                <input
                  type="range"
                  min="0"
                  max="255"
                  value={rgb.b}
                  onChange={e => handleRgbChange('b', parseInt(e.target.value))}
                  className="w-full h-6 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, 
                      rgb(${rgb.r}, ${rgb.g}, 0), 
                      rgb(${rgb.r}, ${rgb.g}, 255)
                    )`,
                  }}
                />
              </div>
            </div>

            {/* HSL Sliders */}
            <div className="space-y-4 border-t border-gray-200 dark:border-gray-600 pt-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">HSL Values</h3>

              {/* Saturation Slider */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Saturation: {hsl.s}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={hsl.s}
                  onChange={e => handleSliderChange('s', parseInt(e.target.value))}
                  className="w-full h-6 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, 
                      hsl(${hsl.h}, 0%, ${hsl.l}%), 
                      hsl(${hsl.h}, 100%, ${hsl.l}%)
                    )`,
                  }}
                />
              </div>

              {/* Lightness Slider */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Lightness: {hsl.l}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={hsl.l}
                  onChange={e => handleSliderChange('l', parseInt(e.target.value))}
                  className="w-full h-6 rounded-lg appearance-none cursor-pointer"
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
          </div>
        )}

        {activeTab === 'swatches' && (
          <div className="space-y-6">
            {/* Popular Colors */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Popular Colors
              </h3>
              <div className="grid grid-cols-5 gap-3">
                {POPULAR_COLORS.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => updateColor(color)}
                    className="aspect-square rounded-2xl border-2 border-gray-200 dark:border-gray-600 hover:border-purple-400 hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl relative group"
                    style={{ backgroundColor: color }}
                    title={color}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                    {selectedColor === color && (
                      <div className="absolute inset-0 ring-4 ring-purple-500 rounded-xl" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Recent Colors */}
            {recentColors.length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  Recent Colors
                </h3>
                <div className="grid grid-cols-6 gap-2">
                  {recentColors.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => updateColor(color)}
                      className="aspect-square rounded-xl border-2 border-gray-200 dark:border-gray-600 hover:border-purple-400 hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
                      style={{ backgroundColor: color }}
                      title={color}
                    >
                      {selectedColor === color && (
                        <div className="absolute inset-0 ring-2 ring-purple-500 rounded-xl" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default AdvancedColorPicker
