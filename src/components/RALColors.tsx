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
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">RAL Colors</h2>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search RAL colors..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
        />
      </div>

      {/* Color Grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 max-h-96 overflow-y-auto">
        {filteredColors.map(color => (
          <div
            key={color.number}
            className={`relative group cursor-pointer rounded-lg border-2 transition-all duration-200 hover:scale-105 hover:shadow-lg ${
              selectedRAL === color.number
                ? 'border-blue-500 ring-2 ring-blue-200 dark:ring-blue-800'
                : 'border-gray-300 dark:border-gray-600 hover:border-blue-400'
            }`}
            onClick={() => handleColorClick(color)}
          >
            {/* Color swatch */}
            <div className="w-full h-16 rounded-t-md" style={{ backgroundColor: color.hex }} />

            {/* Color info */}
            <div className="p-2 bg-white dark:bg-gray-800 rounded-b-md">
              <div
                className="text-xs font-mono text-gray-600 dark:text-gray-400 truncate"
                title={color.number}
              >
                {color.number.replace('RAL ', '')}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-500 truncate" title={color.name}>
                {color.name}
              </div>
            </div>

            {/* Copy button (appears on hover) */}
            <button
              onClick={e => handleCopyRAL(color, e)}
              className="absolute top-1 right-1 w-6 h-6 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center text-xs"
              title="Copy RAL info"
            >
              📋
            </button>

            {/* Hex display (appears on hover) */}
            <div className="absolute bottom-2 left-2 right-2 bg-black bg-opacity-70 text-white text-xs rounded px-1 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 truncate">
              {color.hex}
            </div>
          </div>
        ))}
      </div>

      {filteredColors.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          No RAL colors found matching "{searchTerm}"
        </div>
      )}

      <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
        Found {filteredColors.length} of {RAL_COLORS.length} RAL colors
      </div>
    </div>
  )
}

export default RALColors
