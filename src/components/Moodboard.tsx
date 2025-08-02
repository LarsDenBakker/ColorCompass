import { useState, useEffect } from 'react'
import { copyToClipboard } from '../utils/colorUtils'

interface MoodboardProps {
  currentColor: string
  onColorSelect: (color: string) => void
}

const Moodboard = ({ currentColor, onColorSelect }: MoodboardProps) => {
  const [savedColors, setSavedColors] = useState<string[]>([])

  // Load saved colors from localStorage on component mount
  useEffect(() => {
    const saved = localStorage.getItem('colorCompass-moodboard')
    if (saved) {
      try {
        setSavedColors(JSON.parse(saved))
      } catch (error) {
        console.error('Failed to load saved colors:', error)
      }
    }
  }, [])

  // Save colors to localStorage whenever savedColors changes
  useEffect(() => {
    localStorage.setItem('colorCompass-moodboard', JSON.stringify(savedColors))
  }, [savedColors])

  const addColor = () => {
    if (!savedColors.includes(currentColor)) {
      setSavedColors(prev => [...prev, currentColor])
    }
  }

  const removeColor = (colorToRemove: string) => {
    setSavedColors(prev => prev.filter(color => color !== colorToRemove))
  }

  const clearMoodboard = () => {
    setSavedColors([])
  }

  const exportMoodboard = async () => {
    const colorList = savedColors.join('\n')
    await copyToClipboard(colorList)
  }

  const isCurrentColorSaved = savedColors.includes(currentColor)

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">My Moodboard</h2>
        <div className="flex gap-2">
          <button
            onClick={addColor}
            disabled={isCurrentColorSaved}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200 ${
              isCurrentColorSaved
                ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isCurrentColorSaved ? '✓ Added' : '+ Add Current'}
          </button>
          {savedColors.length > 0 && (
            <>
              <button
                onClick={exportMoodboard}
                className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm font-medium transition-colors duration-200"
              >
                📋 Export
              </button>
              <button
                onClick={clearMoodboard}
                className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm font-medium transition-colors duration-200"
              >
                🗑️ Clear
              </button>
            </>
          )}
        </div>
      </div>

      {savedColors.length === 0 ? (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <div className="text-6xl mb-4">🎨</div>
          <p className="text-lg mb-2">Your moodboard is empty</p>
          <p className="text-sm">Add colors you like to create your personal color palette</p>
        </div>
      ) : (
        <>
          {/* Color Grid */}
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 mb-6">
            {savedColors.map((color, index) => (
              <div
                key={index}
                className="relative group aspect-square rounded-lg border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 transition-all duration-200 cursor-pointer hover:scale-105"
                style={{ backgroundColor: color }}
                onClick={() => onColorSelect(color)}
                title={`Click to select ${color}`}
              >
                {/* Remove button */}
                <button
                  onClick={e => {
                    e.stopPropagation()
                    removeColor(color)
                  }}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center text-xs"
                >
                  ×
                </button>

                {/* Color hex display */}
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white text-xs p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-b-lg truncate text-center">
                  {color}
                </div>
              </div>
            ))}
          </div>

          {/* Color List */}
          <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Saved Colors ({savedColors.length})
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-32 overflow-y-auto">
              {savedColors.map((color, index) => (
                <button
                  key={index}
                  onClick={() => onColorSelect(color)}
                  className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <div
                    className="w-6 h-6 rounded border border-gray-300 dark:border-gray-600 flex-shrink-0"
                    style={{ backgroundColor: color }}
                  />
                  <span className="font-mono text-sm text-gray-700 dark:text-gray-300">
                    {color}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Moodboard
