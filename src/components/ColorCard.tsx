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
    <div className="bg-gradient-to-br from-white via-gray-50 to-purple-50 dark:from-gray-800 dark:via-gray-900 dark:to-purple-900 rounded-3xl shadow-2xl overflow-hidden border border-gray-200/50 dark:border-gray-700/50">
      {/* Main Color and Complementary Color */}
      <div className="relative">
        <div className="grid grid-cols-2 h-64 sm:h-80">
          <div
            className="relative flex flex-col items-center justify-center overflow-hidden group cursor-pointer"
            style={{ backgroundColor: color }}
            onClick={() => handleCopy(color)}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-black/10" />
            <div className="relative z-10 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-2xl text-white font-bold text-lg shadow-xl transform group-hover:scale-105 transition-all duration-300">
              Main Color
            </div>
            <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <div className="bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-2 rounded-xl text-sm font-bold text-center">
                Click to copy: {color.toUpperCase()}
              </div>
            </div>
          </div>
          <div
            className="relative flex flex-col items-center justify-center overflow-hidden group cursor-pointer"
            style={{ backgroundColor: complementaryColor }}
            onClick={() => handleCopy(complementaryColor)}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-black/10" />
            <div className="relative z-10 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-2xl text-white font-bold text-lg shadow-xl transform group-hover:scale-105 transition-all duration-300">
              Complementary
            </div>
            <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <div className="bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-2 rounded-xl text-sm font-bold text-center">
                Click to copy: {complementaryColor.toUpperCase()}
              </div>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-white/30 rounded-full" />
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-white/30 rounded-full" />
      </div>

      <div className="p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent mb-6">
          Color Details
        </h2>

        <div className="space-y-4">
          <div
            className="group p-4 bg-gradient-to-r from-gray-50 to-purple-50 dark:from-gray-700 dark:to-purple-900/30 rounded-2xl border border-gray-200/50 dark:border-gray-600/50 hover:shadow-lg transition-all duration-300 cursor-pointer"
            onClick={() => handleCopy(color)}
          >
            <div className="flex justify-between items-center">
              <span className="font-bold text-gray-700 dark:text-gray-300 text-lg">HEX:</span>
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-lg border-2 border-white shadow-lg"
                  style={{ backgroundColor: color }}
                />
                <span className="text-purple-600 dark:text-purple-400 font-mono font-bold text-lg group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors">
                  {color.toUpperCase()}
                </span>
              </div>
            </div>
          </div>

          <div
            className="group p-4 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-700 dark:to-blue-900/30 rounded-2xl border border-gray-200/50 dark:border-gray-600/50 hover:shadow-lg transition-all duration-300 cursor-pointer"
            onClick={() => handleCopy(complementaryColor)}
          >
            <div className="flex justify-between items-center">
              <span className="font-bold text-gray-700 dark:text-gray-300 text-lg">
                Complementary:
              </span>
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-lg border-2 border-white shadow-lg"
                  style={{ backgroundColor: complementaryColor }}
                />
                <span className="text-blue-600 dark:text-blue-400 font-mono font-bold text-lg group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                  {complementaryColor.toUpperCase()}
                </span>
              </div>
            </div>
          </div>

          {rgb && (
            <div
              className="group p-4 bg-gradient-to-r from-gray-50 to-green-50 dark:from-gray-700 dark:to-green-900/30 rounded-2xl border border-gray-200/50 dark:border-gray-600/50 hover:shadow-lg transition-all duration-300 cursor-pointer"
              onClick={() => handleCopy(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`)}
            >
              <div className="flex justify-between items-center">
                <span className="font-bold text-gray-700 dark:text-gray-300 text-lg">RGB:</span>
                <span className="text-green-600 dark:text-green-400 font-mono font-bold text-lg group-hover:text-green-700 dark:group-hover:text-green-300 transition-colors">
                  rgb({rgb.r}, {rgb.g}, {rgb.b})
                </span>
              </div>
            </div>
          )}

          {hsl && (
            <div
              className="group p-4 bg-gradient-to-r from-gray-50 to-cyan-50 dark:from-gray-700 dark:to-cyan-900/30 rounded-2xl border border-gray-200/50 dark:border-gray-600/50 hover:shadow-lg transition-all duration-300 cursor-pointer"
              onClick={() => handleCopy(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l})`)}
            >
              <div className="flex justify-between items-center">
                <span className="font-bold text-gray-700 dark:text-gray-300 text-lg">HSL:</span>
                <span className="text-cyan-600 dark:text-cyan-400 font-mono font-bold text-lg group-hover:text-cyan-700 dark:group-hover:text-cyan-300 transition-colors">
                  hsl({hsl.h}, {hsl.s}%, {hsl.l}%)
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Copy hint */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
            💡 Click any value to copy to clipboard
          </p>
        </div>
      </div>
    </div>
  )
}

export default ColorCard
