import { useState } from 'react'
import { generateRandomColor } from '../utils/colorUtils'
import AdvancedColorPicker from './AdvancedColorPicker'

interface ColorGeneratorProps {
  selectedColor: string
  onColorChange: (color: string) => void
}

const ColorGenerator = ({ selectedColor, onColorChange }: ColorGeneratorProps) => {
  const [colorInput, setColorInput] = useState(selectedColor)

  const handleRandomColor = () => {
    const randomColor = generateRandomColor()
    setColorInput(randomColor)
    onColorChange(randomColor)
  }

  const handleColorInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value
    setColorInput(color)
    onColorChange(color)
  }

  const handleAdvancedColorChange = (color: string) => {
    setColorInput(color)
    onColorChange(color)
  }

  return (
    <div className="space-y-6">
      {/* Header with manual input and random generator */}
      <div className="bg-gradient-to-br from-white via-purple-50 to-blue-50 dark:from-gray-800 dark:via-purple-900/20 dark:to-blue-900/20 rounded-3xl shadow-2xl border border-purple-200/50 dark:border-purple-700/50 p-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent mb-6">
          🎨 Color Studio
        </h2>

        <div className="space-y-4">
          {/* Manual color input */}
          <div>
            <label
              htmlFor="color-input"
              className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3"
            >
              Enter Color Code
            </label>
            <div className="flex gap-3">
              <input
                id="color-input"
                type="color"
                value={colorInput}
                onChange={handleColorInputChange}
                className="w-16 h-14 rounded-2xl border-3 border-gray-300 dark:border-gray-600 cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              />
              <input
                type="text"
                value={colorInput}
                onChange={handleColorInputChange}
                className="flex-1 px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-3 focus:ring-purple-500/50 focus:border-purple-500 dark:bg-gray-700 dark:text-white text-lg font-mono shadow-lg transition-all duration-300"
                placeholder="#000000"
              />
            </div>
          </div>

          {/* Random color generator */}
          <button
            onClick={handleRandomColor}
            className="w-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 hover:from-purple-600 hover:via-blue-600 hover:to-cyan-600 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-lg"
          >
            <span className="flex items-center justify-center gap-3">
              <span className="text-2xl">🎲</span>
              <span>Generate Random Color</span>
              <span className="text-2xl">✨</span>
            </span>
          </button>
        </div>
      </div>

      {/* Advanced Color Picker */}
      <AdvancedColorPicker
        selectedColor={selectedColor}
        onColorChange={handleAdvancedColorChange}
      />
    </div>
  )
}

export default ColorGenerator
