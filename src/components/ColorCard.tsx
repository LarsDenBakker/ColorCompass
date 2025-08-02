import { hexToRgb, rgbToHsl, copyToClipboard, getComplementaryColor } from '../utils/colorUtils'

interface ColorCardProps {
  color: string
}

const ColorCard = ({ color }: ColorCardProps) => {
  const rgb = hexToRgb(color)
  const hsl = rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b) : null
  const complementaryColor = getComplementaryColor(color)

  const handleCopy = async (text: string) => {
    await copyToClipboard(text)
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      {/* Main Color and Complementary Color */}
      <div className="grid grid-cols-2 h-48">
        <div
          className="flex flex-col items-center justify-center text-white text-sm font-medium"
          style={{ backgroundColor: color }}
        >
          <span className="bg-black bg-opacity-50 px-2 py-1 rounded">Main Color</span>
        </div>
        <div
          className="flex flex-col items-center justify-center text-white text-sm font-medium"
          style={{ backgroundColor: complementaryColor }}
        >
          <span className="bg-black bg-opacity-50 px-2 py-1 rounded">Complementary</span>
        </div>
      </div>

      <div className="p-6">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Color Details</h2>

        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
            <span className="font-medium text-gray-700 dark:text-gray-300">HEX:</span>
            <button
              onClick={() => handleCopy(color)}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-mono"
              title="Click to copy"
            >
              {color.toUpperCase()}
            </button>
          </div>

          <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
            <span className="font-medium text-gray-700 dark:text-gray-300">Complementary:</span>
            <button
              onClick={() => handleCopy(complementaryColor)}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-mono"
              title="Click to copy"
            >
              {complementaryColor.toUpperCase()}
            </button>
          </div>

          {rgb && (
            <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
              <span className="font-medium text-gray-700 dark:text-gray-300">RGB:</span>
              <button
                onClick={() => handleCopy(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`)}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-mono"
                title="Click to copy"
              >
                rgb({rgb.r}, {rgb.g}, {rgb.b})
              </button>
            </div>
          )}

          {hsl && (
            <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
              <span className="font-medium text-gray-700 dark:text-gray-300">HSL:</span>
              <button
                onClick={() => handleCopy(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`)}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-mono"
                title="Click to copy"
              >
                hsl({hsl.h}, {hsl.s}%, {hsl.l}%)
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ColorCard
