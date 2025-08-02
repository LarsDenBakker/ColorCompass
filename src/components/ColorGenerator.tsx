import { useState } from 'react'
import { generateRandomColor } from '../utils/colorUtils'
import AdvancedColorPicker from './AdvancedColorPicker'

interface ColorGeneratorProps {
  selectedColor: string
  onColorChange: (color: string) => void
  isDarkMode: boolean
}

const ColorGenerator = ({ selectedColor, onColorChange, isDarkMode }: ColorGeneratorProps) => {
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
      {/* Color Picker and Input Section */}
      <div
        className={`rounded-lg p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white border border-gray-200'}`}
      >
        {/* Manual color input */}
        <div className="mb-6">
          <label
            className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
          >
            Enter Color Code
          </label>
          <div className="flex gap-3">
            <input
              type="color"
              value={colorInput}
              onChange={handleColorInputChange}
              className="w-12 h-10 rounded border-2 border-gray-300 cursor-pointer"
            />
            <input
              type="text"
              value={colorInput}
              onChange={handleColorInputChange}
              className={`flex-1 px-3 py-2 border rounded font-mono text-sm ${
                isDarkMode
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
              placeholder="#000000"
            />
          </div>
        </div>

        {/* Random color generator */}
        <button
          onClick={handleRandomColor}
          className={`w-full py-2 px-4 rounded text-sm font-medium transition-colors ${
            isDarkMode
              ? 'bg-gray-700 text-white hover:bg-gray-600'
              : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
          }`}
        >
          🎲 Generate Random Color
        </button>
      </div>

      {/* Advanced Color Picker */}
      <AdvancedColorPicker
        selectedColor={selectedColor}
        onColorChange={handleAdvancedColorChange}
        isDarkMode={isDarkMode}
      />
    </div>
  )
}

export default ColorGenerator
