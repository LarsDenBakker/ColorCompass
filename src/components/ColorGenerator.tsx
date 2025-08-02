import { useState } from 'react'
import { generateRandomColor } from '../utils/colorUtils'

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

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Color Generator</h2>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="color-input"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Choose a color:
          </label>
          <div className="flex gap-2">
            <input
              id="color-input"
              type="color"
              value={colorInput}
              onChange={handleColorInputChange}
              className="w-16 h-12 rounded-md border border-gray-300 dark:border-gray-600 cursor-pointer"
            />
            <input
              type="text"
              value={colorInput}
              onChange={handleColorInputChange}
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="#000000"
            />
          </div>
        </div>

        <button
          onClick={handleRandomColor}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
        >
          🎲 Generate Random Color
        </button>
      </div>
    </div>
  )
}

export default ColorGenerator
