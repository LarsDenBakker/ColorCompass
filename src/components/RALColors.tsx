import { useState } from 'react'
import { RAL_COLORS, copyToClipboard } from '../utils/colorUtils'

interface RALColorsProps {
  onColorSelect: (color: string) => void
}

const RALColors = ({ onColorSelect }: RALColorsProps) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRAL, setSelectedRAL] = useState<string | null>(null)

  const filteredColors = RAL_COLORS.filter(
    color =>
      color.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      color.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleColorClick = (color: (typeof RAL_COLORS)[0]) => {
    setSelectedRAL(color.number)
    onColorSelect(color.hex)
  }

  const handleCopyRAL = async (color: (typeof RAL_COLORS)[0], e: React.MouseEvent) => {
    e.stopPropagation()
    await copyToClipboard(`${color.number} - ${color.name} - ${color.hex}`)
  }

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-2xl p-6 border border-gray-200/50 dark:border-gray-700/50">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-6">
        🎨 RAL Colors
      </h2>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="🔍 Search RAL colors..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:text-white transition-all duration-300 shadow-lg"
        />
      </div>

      {/* Color Grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 max-h-96 overflow-y-auto custom-scrollbar">
        {filteredColors.map(color => (
          <button
            key={color.number}
            className={`group relative cursor-pointer rounded-2xl border-3 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl overflow-hidden ${
              selectedRAL === color.number
                ? 'border-orange-500 ring-2 ring-orange-300 shadow-xl scale-105'
                : 'border-gray-300 dark:border-gray-600 hover:border-orange-400 shadow-lg'
            }`}
            onClick={() => handleColorClick(color)}
            style={{
              backgroundColor: color.hex,
              minHeight: '120px',
            }}
          >
            {/* Gradient overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70" />

            {/* RAL number at top */}
            <div className="absolute top-2 left-2 right-2">
              <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-lg px-2 py-1">
                <div className="text-xs font-bold text-gray-800 dark:text-gray-200 truncate">
                  {color.number.replace('RAL ', '')}
                </div>
              </div>
            </div>

            {/* Color name at bottom */}
            <div className="absolute bottom-2 left-2 right-2">
              <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-lg px-2 py-1">
                <div
                  className="text-xs font-medium text-gray-700 dark:text-gray-300 truncate"
                  title={color.name}
                >
                  {color.name}
                </div>
                <div className="text-xs font-mono text-gray-600 dark:text-gray-400">
                  {color.hex}
                </div>
              </div>
            </div>

            {/* Copy button */}
            <div
              onClick={e => handleCopyRAL(color, e)}
              className="absolute top-2 right-2 w-8 h-8 bg-black/60 hover:bg-black/80 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center text-sm backdrop-blur-sm cursor-pointer"
              title="Copy RAL info"
            >
              📋
            </div>

            {/* Selection indicator */}
            {selectedRAL === color.number && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center text-2xl shadow-lg">
                  ✓
                </div>
              </div>
            )}

            {/* Hover effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        ))}
      </div>

      {filteredColors.length === 0 && (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">🎨</div>
          <div className="text-gray-500 dark:text-gray-400 text-lg">
            No RAL colors found matching "{searchTerm}"
          </div>
        </div>
      )}

      <div className="mt-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 rounded-xl border border-orange-200 dark:border-orange-700">
          <span className="text-orange-600 dark:text-orange-400 font-semibold">
            {filteredColors.length} of {RAL_COLORS.length} RAL colors
          </span>
        </div>
      </div>
    </div>
  )
}

export default RALColors
